import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type BannerSlide = {
  image: string;
  alt: string;
  title: string;
  text: string;
  fit: "contain" | "cover";
};

export function Banner({
  slides,
  label,
  id,
  accent = "text-brand",
}: {
  slides: readonly BannerSlide[];
  label: string;
  id?: string;
  accent?: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;
  const slide = slides[index] ?? slides[0];

  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [paused, count, index]);

  function go(next: number) {
    setIndex((next + count) % count);
  }

  if (!slide) return null;

  return (
    <section
      aria-roledescription="carrossel"
      aria-label={label}
      id={id}
      className="relative scroll-mt-24 bg-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          go(index - 1);
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          go(index + 1);
        }
      }}
    >
      <div className="banner-frame relative overflow-hidden">
        {slides.map((item, itemIndex) => (
          <div
            key={item.image}
            className={`banner-fade pointer-events-none absolute inset-0 ${itemIndex === index ? "opacity-100" : "opacity-0"}`}
            aria-hidden={itemIndex !== index}
          >
            <img
              src={item.image}
              alt={itemIndex === index ? item.alt : ""}
              className="size-full object-cover object-center"
            />
            {item.fit === "contain" ? null : <div className="banner-scrim absolute inset-0" />}
          </div>
        ))}
        {slide.fit === "contain" ? null : (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-16 pb-16 md:px-24">
            <div className="mx-auto max-w-6xl text-paper" aria-live="polite">
              <p className={`text-xs font-semibold uppercase tracking-widest ${accent}`}>{slide.title}</p>
              <p className="mt-2 max-w-xl font-display text-2xl font-semibold text-balance md:text-4xl">{slide.text}</p>
            </div>
          </div>
        )}
        <button
          type="button"
          aria-label="Imagem anterior"
          onClick={() => go(index - 1)}
          className="absolute top-1/2 left-4 z-20 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-paper text-ink shadow-soft touch-manipulation md:left-5"
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label="Imagem seguinte"
          onClick={() => go(index + 1)}
          className="absolute top-1/2 right-4 z-20 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-paper text-ink shadow-soft touch-manipulation md:right-5"
        >
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
        <div className="absolute inset-x-0 bottom-1 z-20 flex justify-center">
          {slides.map((item, itemIndex) => (
            <button
              key={item.image}
              type="button"
              aria-label={`Mostrar ${item.title}`}
              aria-current={itemIndex === index ? "true" : undefined}
              onClick={() => go(itemIndex)}
              className="grid size-11 place-items-center touch-manipulation"
            >
              <span className={`block h-1.5 rounded-full ${itemIndex === index ? "w-6 bg-brand" : "w-1.5 bg-paper/70"}`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
