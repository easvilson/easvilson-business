import { useEffect, useId, useRef, useState, type ChangeEvent } from "react";
import { fileToPhoto } from "@/lib/cms";
import { useSite } from "@/lib/site-context";
import type { SiteContent } from "@/content/site";

type Tab = "historia" | "fotos" | "textos";

function TextField({
  label,
  value,
  max,
  rows,
  onChange,
}: {
  label: string;
  value: string;
  max: number;
  rows?: number;
  onChange: (value: string) => void;
}) {
  const id = useId();
  const shared = {
    id,
    value,
    maxLength: max,
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event.target.value),
    className: "mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2 text-sm text-ink",
  };
  return (
    <label htmlFor={id} className="block text-sm font-medium">
      {label}
      {rows ? <textarea {...shared} rows={rows} /> : <input {...shared} type="text" />}
    </label>
  );
}

export function AdminPanel() {
  const { content, notice, adminOpen, setAdminOpen, update, reset, exportJson, importJson } = useSite();
  const [tab, setTab] = useState<Tab>("historia");
  const [error, setError] = useState<string | null>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!adminOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setAdminOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [adminOpen, setAdminOpen]);

  if (!adminOpen) return null;

  const about = content.about;
  const patch = (next: Partial<SiteContent>) => update({ ...content, ...next });
  const patchAbout = (next: Partial<SiteContent["about"]>) => update({ ...content, about: { ...about, ...next } });

  async function addPhoto(file: File | undefined) {
    if (!file) return;
    setError(null);
    if (about.photos.length >= 6) {
      setError("O máximo são 6 fotografias.");
      return;
    }
    try {
      const photo = await fileToPhoto(file);
      patchAbout({ photos: [...about.photos, photo] });
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Não foi possível adicionar a fotografia.");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 sm:items-center sm:p-6"
      onMouseDown={() => setAdminOpen(false)}
    >
      <div
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-title"
        tabIndex={-1}
        className="max-h-[100dvh] w-full overflow-y-auto bg-paper p-5 shadow-lift outline-none sm:max-h-[90vh] sm:max-w-2xl sm:rounded-3xl sm:p-6"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-deep">Interno</p>
            <h2 id="admin-title" className="font-display text-2xl font-semibold">
              Painel de conteúdo
            </h2>
            <p className="mt-1 text-sm text-muted">
              As alterações ficam apenas neste navegador. Não são enviadas para um servidor.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex h-11 items-center rounded-full border border-line px-4 text-sm font-medium"
            onClick={() => setAdminOpen(false)}
          >
            Fechar
          </button>
        </div>

        <div className="mt-5 flex gap-2" role="tablist">
          {(
            [
              ["historia", "História"],
              ["fotos", "Fotografias"],
              ["textos", "Textos"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              className={`h-11 rounded-full px-4 text-sm font-medium ${tab === id ? "bg-ink text-paper" : "bg-mist text-ink"}`}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-5 space-y-4">
          {tab === "historia" ? (
            <>
              <TextField
                label="Título da história"
                value={about.storyTitle}
                max={80}
                onChange={(storyTitle) => patchAbout({ storyTitle })}
              />
              <TextField
                label="História"
                value={about.story}
                max={4000}
                rows={12}
                onChange={(story) => patchAbout({ story })}
              />
              <p className="text-xs text-muted">Separe parágrafos com uma linha em branco.</p>
            </>
          ) : null}

          {tab === "fotos" ? (
            <>
              <div className="grid gap-3 sm:grid-cols-2">
                {about.photos.map((photo) => (
                  <div key={photo.id} className="rounded-2xl border border-line p-3">
                    <img src={photo.src} alt="" className="aspect-4/5 w-full rounded-xl object-cover object-top" />
                    <input
                      value={photo.caption}
                      maxLength={140}
                      aria-label="Legenda"
                      className="mt-2 w-full rounded-xl border border-line px-3 py-2 text-sm"
                      onChange={(event) =>
                        patchAbout({
                          photos: about.photos.map((item) =>
                            item.id === photo.id ? { ...item, caption: event.target.value } : item,
                          ),
                        })
                      }
                    />
                    <button
                      type="button"
                      className="mt-2 text-sm font-medium text-brand-deep"
                      onClick={() => patchAbout({ photos: about.photos.filter((item) => item.id !== photo.id) })}
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="sr-only"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  void addPhoto(file);
                  event.target.value = "";
                }}
              />
              <button
                type="button"
                className="inline-flex h-11 items-center rounded-full bg-brand px-4 text-sm font-semibold text-ink disabled:opacity-50"
                disabled={about.photos.length >= 6}
                onClick={() => fileRef.current?.click()}
              >
                Adicionar fotografia
              </button>
            </>
          ) : null}

          {tab === "textos" ? (
            <>
              <TextField label="Título principal" value={content.heroTitle} max={140} onChange={(heroTitle) => patch({ heroTitle })} />
              <TextField
                label="Subtítulo"
                value={content.heroSubtitle}
                max={360}
                rows={3}
                onChange={(heroSubtitle) => patch({ heroSubtitle })}
              />
              <TextField label="Apresentação" value={about.lead} max={280} rows={3} onChange={(lead) => patchAbout({ lead })} />
              <TextField label="Texto institucional" value={about.body} max={900} rows={4} onChange={(body) => patchAbout({ body })} />
              <TextField label="Missão" value={about.mission} max={400} rows={3} onChange={(mission) => patchAbout({ mission })} />
              <TextField label="Visão" value={about.vision} max={400} rows={3} onChange={(vision) => patchAbout({ vision })} />
              {about.values.map((value, index) => (
                <div key={index} className="grid gap-3 sm:grid-cols-2">
                  <TextField
                    label={`Valor ${index + 1}`}
                    value={value.title}
                    max={40}
                    onChange={(title) =>
                      patchAbout({
                        values: about.values.map((item, itemIndex) => (itemIndex === index ? { ...item, title } : item)),
                      })
                    }
                  />
                  <TextField
                    label="Descrição"
                    value={value.text}
                    max={220}
                    onChange={(text) =>
                      patchAbout({
                        values: about.values.map((item, itemIndex) => (itemIndex === index ? { ...item, text } : item)),
                      })
                    }
                  />
                </div>
              ))}
            </>
          ) : null}
        </div>

        {error ? <p className="mt-4 text-sm font-medium">{error}</p> : null}
        {notice ? <p className="mt-4 text-sm font-medium">{notice}</p> : null}
        {!notice && !error ? (
          <p className="mt-4 text-sm text-muted">As alterações gravam-se automaticamente neste navegador.</p>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-2">
          <button type="button" className="h-11 rounded-full border border-line px-4 text-sm font-medium" onClick={exportJson}>
            Exportar
          </button>
          <label className="inline-flex h-11 cursor-pointer items-center rounded-full border border-line px-4 text-sm font-medium">
            Importar
            <input
              type="file"
              accept="application/json"
              className="sr-only"
              onChange={async (event) => {
                const file = event.target.files?.[0];
                event.target.value = "";
                if (!file || file.size > 5_000_000) {
                  setError("Escolha um ficheiro JSON até 5 MB.");
                  return;
                }
                importJson(await file.text());
              }}
            />
          </label>
          <button
            type="button"
            className="h-11 rounded-full border border-line px-4 text-sm font-medium"
            onClick={() => {
              if (window.confirm("Repor os textos e as fotografias originais neste navegador?")) reset();
            }}
          >
            Repor original
          </button>
        </div>
      </div>
    </div>
  );
}
