import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { company, nav } from "@/content/site";

function itemHref(pathname: string, href: string): string {
  if (pathname === "/" && href.startsWith("/#")) return href.slice(1);
  return href;
}

function isCurrent(pathname: string, href: string, section: string): boolean {
  if (href.startsWith("/#")) return pathname === "/" && section === href.slice(2);
  return pathname === href;
}

export function Header() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("inicio");

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;
    const nodes = nav
      .filter((item) => item.href.startsWith("/#"))
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.3] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname]);

  const demo = itemHref(pathname, "/#contacto");

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-5">
        <a href={itemHref(pathname, "/#inicio")} className="shrink-0" aria-label="Easvilson Business, início">
          <img src="/media/logo.png" alt="" className="h-10 w-auto" />
        </a>
        <nav className="hidden items-center gap-5 lg:flex" aria-label="Principal">
          {nav.map((item) => (
            <a
              key={item.id}
              href={itemHref(pathname, item.href)}
              className={`text-sm font-medium ${isCurrent(pathname, item.href, active) ? "text-brand-deep" : "text-ink"}`}
              aria-current={isCurrent(pathname, item.href, active) ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={demo}
            className="hidden h-11 items-center rounded-full bg-brand px-4 text-sm font-semibold text-ink sm:inline-flex"
          >
            Solicitar Demonstração
          </a>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-line lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
          </button>
        </div>
      </div>
      {open ? (
        <nav id="menu-mobile" className="menu-panel border-t border-line px-5 py-3 lg:hidden" aria-label="Mobile">
          {nav.map((item) => (
            <a
              key={item.id}
              href={itemHref(pathname, item.href)}
              className="flex h-11 items-center text-sm font-medium"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href={demo}
            className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-brand px-4 text-sm font-semibold text-ink"
            onClick={() => setOpen(false)}
          >
            Solicitar Demonstração
          </a>
        </nav>
      ) : null}
    </header>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <img src="/media/logo-light.png" alt="Easvilson Business" className="h-10 w-auto" />
          <p className="mt-4 max-w-sm text-sm text-line">{company.slogan}</p>
        </div>
        <div>
          <p className="text-sm font-semibold">Menu</p>
          <ul className="mt-3 space-y-2 text-sm text-line">
            {nav.map((item) => (
              <li key={item.id}>
                <a href={item.href} className="hover:text-paper">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">Contacto</p>
          <ul className="mt-3 space-y-2 text-sm text-line">
            <li>
              <a href={`tel:${company.phoneTel}`} className="hover:text-paper">
                {company.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className="hover:text-paper">
                {company.email}
              </a>
            </li>
            <li>
              <a href={`https://wa.me/${company.whatsapp}`} className="hover:text-paper" target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-5 text-sm text-line sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Easvilson Business. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <Link to="/privacidade" className="hover:text-paper">
              Política de Privacidade
            </Link>
            <Link to="/termos" className="hover:text-paper">
              Termos de Utilização
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-7" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

export function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${company.whatsapp}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed right-5 bottom-5 z-50 grid size-14 place-items-center rounded-full bg-whatsapp text-paper shadow-lift"
    >
      <WhatsAppIcon />
    </a>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const onScreen = (node: HTMLElement) => {
      const rect = node.getBoundingClientRect();
      return rect.bottom > window.innerHeight * 0.08 && rect.top < window.innerHeight * 0.92;
    };
    nodes.forEach((node) => node.classList.toggle("is-in", onScreen(node)));
    document.documentElement.classList.add("motion");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => entry.target.classList.toggle("is-in", entry.isIntersecting));
      },
      { rootMargin: "-8% 0px -8% 0px", threshold: 0 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-paper focus:px-4 focus:py-2"
      >
        Saltar para o conteúdo
      </a>
      <Header />
      <main id="conteudo">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
