import { z } from "zod";
import { defaultSite, type Photo, type SiteContent } from "@/content/site";

const KEY = "easvilson.cms.v1";
const MAX_DATA_URL = 1_600_000;

const photoSchema = z.object({
  id: z.string().regex(/^[a-zA-Z0-9_-]{4,40}$/),
  src: z.string().max(MAX_DATA_URL),
  alt: z.string().max(400),
  caption: z.string().max(400),
});

const storedSchema = z.object({
  v: z.literal(1),
  heroTitle: z.string().max(200),
  heroSubtitle: z.string().max(500),
  about: z.object({
    lead: z.string().max(400),
    body: z.string().max(1200),
    storyTitle: z.string().max(120),
    story: z.string().max(5000),
    mission: z.string().max(600),
    vision: z.string().max(600),
    values: z.array(z.object({ title: z.string().max(80), text: z.string().max(300) })).max(4),
    photos: z.array(photoSchema).max(6),
  }),
});

export function cleanText(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/[<>]/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, max);
}

function line(value: unknown, max: number, fallback: string): string {
  if (typeof value !== "string") return fallback;
  const next = cleanText(value, max).replace(/\s+/g, " ").trim();
  return next.length > 0 ? next : fallback;
}

function safeSrc(src: string): boolean {
  if (src.startsWith("/media/")) {
    return /^\/media\/[a-z0-9][a-z0-9._-]{0,80}$/i.test(src);
  }
  return /^data:image\/(jpeg|png|webp);base64,[a-z0-9+/=\s]+$/i.test(src) && src.length <= MAX_DATA_URL;
}

export function normalizeSite(input: unknown): SiteContent {
  const parsed = storedSchema.safeParse(input);
  if (!parsed.success) return defaultSite;
  const data = parsed.data;
  const base = defaultSite.about;
  const photos: Photo[] = [];
  for (const photo of data.about.photos) {
    if (!safeSrc(photo.src)) continue;
    photos.push({
      id: photo.id,
      src: photo.src,
      alt: line(photo.alt, 120, "Fotografia institucional"),
      caption: cleanText(photo.caption, 140).replace(/\s+/g, " ").trim(),
    });
  }
  const stock = photos.length > 0 && photos.every((photo) => photo.src === "/media/fundador-1.jpg" || photo.src === "/media/fundador-2.jpg");
  if (photos.length === 0 || stock) {
    photos.splice(0, photos.length, ...base.photos);
  }
  const values = base.values.map((item, index) => {
    const incoming = data.about.values[index];
    if (!incoming) return item;
    return {
      title: line(incoming.title, 40, item.title),
      text: line(incoming.text, 220, item.text),
    };
  });
  return {
    heroTitle: line(data.heroTitle, 140, defaultSite.heroTitle),
    heroSubtitle: line(data.heroSubtitle, 360, defaultSite.heroSubtitle),
    about: {
      lead: line(data.about.lead, 280, base.lead),
      body: (() => {
        const previous =
          "A Easvilson Business desenvolve software e acompanha a instalação de leitores biométricos e RFID. O trabalho é tornar o controlo de assiduidade simples de operar e claro para a gestão — na cloud ou na rede local da organização.";
        const body = line(data.about.body, 900, base.body);
        return body === previous ? base.body : body;
      })(),
      storyTitle: line(data.about.storyTitle, 80, base.storyTitle),
      story: (() => {
        const story = cleanText(data.about.story, 4000);
        return story.length > 0 ? story : base.story;
      })(),
      mission: line(data.about.mission, 400, base.mission),
      vision: line(data.about.vision, 400, base.vision),
      values,
      photos,
    },
  };
}

export function loadSite(): SiteContent {
  if (typeof window === "undefined") return defaultSite;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return defaultSite;
    return normalizeSite(JSON.parse(raw) as unknown);
  } catch {
    return defaultSite;
  }
}

export function saveSite(content: SiteContent): string | null {
  const safe = normalizeSite({ v: 1, ...content });
  try {
    const payload = JSON.stringify({ v: 1, ...safe });
    if (payload.length > 4_500_000) {
      return "As fotografias excedem o espaço disponível neste navegador.";
    }
    window.localStorage.setItem(KEY, payload);
    return null;
  } catch {
    return "Não foi possível guardar neste navegador.";
  }
}

export function clearSite(): void {
  window.localStorage.removeItem(KEY);
}

export function readImport(text: string): SiteContent | null {
  try {
    const data = JSON.parse(text) as unknown;
    if (!data || typeof data !== "object") return null;
    const record = data as Record<string, unknown>;
    const candidate = record.v === 1 ? record : { v: 1, ...record };
    const parsed = storedSchema.safeParse(candidate);
    if (!parsed.success) return null;
    return normalizeSite(parsed.data);
  } catch {
    return null;
  }
}

export function fileToPhoto(file: File): Promise<Photo> {
  const allowed = new Set(["image/jpeg", "image/png", "image/webp"]);
  if (!allowed.has(file.type)) {
    return Promise.reject(new Error("Use uma imagem JPG, PNG ou WebP."));
  }
  if (file.size > 8_000_000) {
    return Promise.reject(new Error("A imagem passa de 8 MB."));
  }
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      const max = 1280;
      const scale = Math.min(1, max / Math.max(image.width, image.height));
      const width = Math.max(1, Math.round(image.width * scale));
      const height = Math.max(1, Math.round(image.height * scale));
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      if (!context) {
        URL.revokeObjectURL(url);
        reject(new Error("Não foi possível ler a imagem."));
        return;
      }
      context.drawImage(image, 0, 0, width, height);
      const src = canvas.toDataURL("image/jpeg", 0.82);
      URL.revokeObjectURL(url);
      if (!safeSrc(src)) {
        reject(new Error("A imagem continua grande demais depois de reduzida."));
        return;
      }
      const id = crypto.randomUUID().replace(/-/g, "").slice(0, 16);
      resolve({
        id,
        src,
        alt: "Fotografia institucional",
        caption: "",
      });
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Ficheiro de imagem inválido."));
    };
    image.src = url;
  });
}
