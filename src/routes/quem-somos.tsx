import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/shell";
import { useSite } from "@/lib/site-context";

export const Route = createFileRoute("/quem-somos")({
  head: () => ({
    meta: [
      { title: "Quem somos — Easvilson Business" },
      {
        name: "description",
        content:
          "A Easvilson Business desenvolve software e acompanha a instalação de leitores biométricos e RFID em Angola.",
      },
    ],
  }),
  component: QuemSomos,
});

function QuemSomos() {
  const { content } = useSite();
  const about = content.about;

  return (
    <PageShell>
      <article className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-deep">Quem somos</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold text-balance md:text-5xl">{about.lead}</h1>
        <div data-reveal className="mt-10 grid items-start gap-10 lg:grid-cols-2">
          <div>
            <p className="text-pretty text-lg text-muted">{about.body}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <section className="rounded-3xl bg-mist p-5">
                <h2 className="font-display text-lg font-semibold">Missão</h2>
                <p className="mt-2 text-sm text-pretty text-muted">{about.mission}</p>
              </section>
              <section className="rounded-3xl bg-mist p-5">
                <h2 className="font-display text-lg font-semibold">Visão</h2>
                <p className="mt-2 text-sm text-pretty text-muted">{about.vision}</p>
              </section>
            </div>
            <Link to="/historia" className="mt-8 inline-flex h-11 items-center text-sm font-semibold text-brand-deep">
              Ler a nossa história
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {about.photos.map((photo, index) => (
              <figure
                key={photo.id}
                className={`overflow-hidden rounded-3xl bg-mist shadow-soft ${index === 0 ? "sm:col-span-2" : ""}`}
              >
                <img src={photo.src} alt={photo.alt} className="aspect-4/5 w-full object-cover object-top sm:aspect-16/10" />
                {photo.caption ? <figcaption className="px-4 py-3 text-sm font-medium">{photo.caption}</figcaption> : null}
              </figure>
            ))}
          </div>
        </div>
        <h2 className="mt-16 font-display text-3xl font-semibold">Valores</h2>
        <ul data-reveal className="mt-6 grid gap-3 sm:grid-cols-2">
          {about.values.map((value) => (
            <li key={value.title} className="rounded-2xl border border-line p-5">
              <p className="font-semibold">{value.title}</p>
              <p className="mt-1 text-sm text-muted">{value.text}</p>
            </li>
          ))}
        </ul>
      </article>
    </PageShell>
  );
}
