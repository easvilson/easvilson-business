import { createFileRoute } from "@tanstack/react-router";
import { company, skincareCatalogs } from "@/content/site";
import { PageShell } from "@/components/shell";

export const Route = createFileRoute("/skincare")({
  head: () => ({
    meta: [
      { title: "Skincare — Easvilson Business" },
      {
        name: "description",
        content: "Catálogos de skincare da Easvilson Business: rosto, corpo e proteção. Encomenda pelo WhatsApp.",
      },
    ],
  }),
  component: SkincarePage,
});

function orderHref(name: string) {
  const text = `Olá. Quero encomendar do catálogo de skincare: ${name}.`;
  return `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(text)}`;
}

function SkincarePage() {
  return (
    <PageShell>
      <article>
        <header className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <p className="text-xs font-semibold uppercase tracking-widest text-skin-deep">Skincare</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold text-balance md:text-5xl">
            Cuidado da pele, em catálogo.
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg text-[#5c4a42]">
            Três catálogos: rosto, corpo e proteção. O preço e a disponibilidade confirmam-se no pedido, pelo WhatsApp.
          </p>
        </header>
        <div id="catalogos" className="mx-auto max-w-6xl space-y-16 px-5 pb-20">
          {skincareCatalogs.map((catalog) => (
            <section key={catalog.id} aria-labelledby={catalog.id} data-reveal>
              <h2 id={catalog.id} className="font-display text-3xl font-semibold">
                Catálogo {catalog.title}
              </h2>
              <p className="mt-2 text-sm text-[#5c4a42]">{catalog.text}</p>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {catalog.items.map((item) => (
                  <li key={item.name} className="flex flex-col rounded-3xl border border-skin-line bg-paper p-5 shadow-soft">
                    <h3 className="font-display text-lg font-semibold">{item.name}</h3>
                    <p className="mt-2 flex-1 text-sm text-[#5c4a42]">{item.text}</p>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-skin-deep">Sob consulta</p>
                    <a
                      href={orderHref(item.name)}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex h-11 items-center justify-center rounded-full bg-skin-deep px-4 text-sm font-semibold text-paper"
                    >
                      Pedir no WhatsApp
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </article>
    </PageShell>
  );
}
