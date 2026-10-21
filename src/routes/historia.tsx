import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/shell";
import { useSite } from "@/lib/site-context";

export const Route = createFileRoute("/historia")({
  head: () => ({
    meta: [
      { title: "A nossa história — Easvilson Business" },
      {
        name: "description",
        content: "Como a Easvilson Business passou do registo em papel para software e equipamentos de presença.",
      },
    ],
  }),
  component: Historia,
});

function Historia() {
  const { content } = useSite();
  const about = content.about;
  const paragraphs = about.story
    .split(/\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean);
  const photo = about.photos[1] ?? about.photos[0];

  return (
    <PageShell>
      <article className="mx-auto grid max-w-6xl items-start gap-10 px-5 py-16 md:py-24 lg:grid-cols-2">
        <div data-reveal>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-deep">Easvilson Business</p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-balance md:text-5xl">{about.storyTitle}</h1>
          <div className="mt-8 space-y-4 text-pretty text-lg text-muted">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <Link to="/quem-somos" className="mt-8 inline-flex h-11 items-center text-sm font-semibold text-brand-deep">
            Quem somos
          </Link>
        </div>
        {photo ? (
          <figure data-reveal className="overflow-hidden rounded-3xl bg-mist shadow-soft">
            <img src={photo.src} alt={photo.alt} className="aspect-4/5 w-full object-cover object-top" />
            {photo.caption ? <figcaption className="px-4 py-3 text-sm font-medium">{photo.caption}</figcaption> : null}
          </figure>
        ) : null}
      </article>
    </PageShell>
  );
}
