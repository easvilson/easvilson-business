import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { defaultSite, type SiteContent } from "@/content/site";
import { clearSite, loadSite, readImport, saveSite } from "@/lib/cms";

type SiteApi = {
  content: SiteContent;
  notice: string | null;
  adminOpen: boolean;
  setAdminOpen: (open: boolean) => void;
  update: (next: SiteContent) => void;
  reset: () => void;
  exportJson: () => void;
  importJson: (text: string) => void;
};

const SiteContext = createContext<SiteApi | null>(null);

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable;
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultSite);
  const [notice, setNotice] = useState<string | null>(null);
  const [adminOpen, setAdminOpen] = useState(false);

  useEffect(() => {
    setContent(loadSite());
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.repeat || isTypingTarget(event.target)) return;
      const combo = event.code === "KeyE" && event.shiftKey && (event.ctrlKey || event.metaKey) && !event.altKey;
      if (!combo) return;
      event.preventDefault();
      setAdminOpen((open) => !open);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const update = useCallback((next: SiteContent) => {
    setContent(next);
    setNotice(saveSite(next));
  }, []);

  const reset = useCallback(() => {
    clearSite();
    setContent(defaultSite);
    setNotice(null);
  }, []);

  const exportJson = useCallback(() => {
    const blob = new Blob([JSON.stringify({ v: 1, ...content }, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "easvilson-conteudo.json";
    link.click();
    URL.revokeObjectURL(url);
  }, [content]);

  const importJson = useCallback((text: string) => {
    const next = readImport(text);
    if (!next) {
      setNotice("O ficheiro não tem o formato esperado.");
      return;
    }
    setContent(next);
    setNotice(saveSite(next));
  }, []);

  const api = useMemo<SiteApi>(
    () => ({ content, notice, adminOpen, setAdminOpen, update, reset, exportJson, importJson }),
    [adminOpen, content, exportJson, importJson, notice, reset, update],
  );

  return <SiteContext.Provider value={api}>{children}</SiteContext.Provider>;
}

export function useSite(): SiteApi {
  const value = useContext(SiteContext);
  if (!value) throw new Error("Conteúdo indisponível.");
  return value;
}
