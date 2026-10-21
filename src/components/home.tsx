import { useEffect, useState, type ReactNode } from "react";
import {
  BarChart3,
  Cable,
  ChevronLeft,
  ChevronRight,
  Cloud,
  Code2,
  FileText,
  Fingerprint,
  Globe,
  GraduationCap,
  Headphones,
  Monitor,
  RefreshCw,
  Shield,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  UserCheck,
  Users,
  Wrench,
} from "lucide-react";
import {
  assiduFeatures,
  banners,
  benefits,
  company,
  flow,
  products,
  reasons,
  sectors,
  services,
  skincare,
} from "@/content/site";
import { useSite } from "@/lib/site-context";
import { AngolaMap } from "@/components/angola-map";
import { DashboardPreview, PhonePreview, ReportPreview } from "@/components/dashboard";

const serviceIcons = [Cloud, Monitor, Fingerprint, GraduationCap, Globe, Code2, Smartphone];
const benefitIcons = [TrendingUp, UserCheck, ShieldCheck, FileText, Cable, Cloud];
const reasonIcons = [Users, Headphones, GraduationCap, Wrench, RefreshCw, Shield, Cable];

function Section({
  id,
  eyebrow,
  title,
  children,
  tone = "paper",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  tone?: "paper" | "mist";
}) {
  return (
    <section id={id} className={`scroll-mt-24 py-20 md:py-24 ${tone === "mist" ? "bg-mist" : "bg-paper"}`}>
      <div data-reveal className="mx-auto max-w-6xl px-5">
        {eyebrow ? <p className="text-xs font-semibold uppercase tracking-widest text-brand-deep">{eyebrow}</p> : null}
        {title ? <h2 className="mt-3 max-w-3xl font-display text-3xl font-semibold text-balance md:text-4xl">{title}</h2> : null}
        <div className={title || eyebrow ? "mt-10" : ""}>{children}</div>
      </div>
    </section>
  );
}

function RotatingBanner() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = banners.length;
  const slide = banners[index] ?? banners[0];

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, 15000);
    return () => window.clearInterval(id);
  }, [paused, count, index]);

  function go(next: number) {
    setIndex((next + count) % count);
  }

  return (
    <section
      aria-roledescription="carrossel"
      aria-label="Destaques"
      id="inicio"
      className="relative scroll-mt-24 bg-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
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
        {banners.map((item, itemIndex) => (
          <div
            key={item.image}
            className={`banner-fade absolute inset-0 ${itemIndex === index ? "opacity-100" : "pointer-events-none opacity-0"}`}
            aria-hidden={itemIndex !== index}
          >
            <img
              src={item.image}
              alt={itemIndex === index ? item.alt : ""}
              className={`size-full object-cover ${item.fit === "contain" ? "object-center" : "object-top"}`}
            />
            {item.fit === "contain" ? null : <div className="banner-scrim absolute inset-0" />}
          </div>
        ))}
        {slide.fit === "contain" ? null : (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 px-16 pb-16 md:px-24">
            <div className="mx-auto max-w-6xl text-paper" aria-live="polite">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand">{slide.title}</p>
              <p className="mt-2 max-w-xl font-display text-2xl font-semibold text-balance md:text-4xl">{slide.text}</p>
            </div>
          </div>
        )}
        <button
          type="button"
          aria-label="Imagem anterior"
          onClick={() => go(index - 1)}
          className="absolute top-1/2 left-3 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-paper text-ink shadow-soft md:left-5"
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label="Imagem seguinte"
          onClick={() => go(index + 1)}
          className="absolute top-1/2 right-3 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-paper text-ink shadow-soft md:right-5"
        >
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
        <div className="absolute inset-x-0 bottom-3 flex justify-center">
          {banners.map((item, itemIndex) => (
            <button
              key={item.image}
              type="button"
              aria-label={`Mostrar ${item.title}`}
              aria-current={itemIndex === index ? "true" : undefined}
              onClick={() => go(itemIndex)}
              className="grid size-11 place-items-center"
            >
              <span className={`block h-1.5 rounded-full ${itemIndex === index ? "w-6 bg-brand" : "w-1.5 bg-paper/70"}`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Laptop({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-ink p-2 shadow-lift">
      <div className="overflow-hidden rounded-2xl border border-white/10">{children}</div>
      <div className="mx-auto mt-2 h-2 w-28 rounded-b-xl bg-ink" />
    </div>
  );
}

function ContactForm() {
  const [nome, setNome] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [telefone, setTelefone] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [error, setError] = useState<string | null>(null);

  function message() {
    return `Pedido de demonstração\nNome: ${nome}\nEmpresa: ${empresa}\nTelefone: ${telefone}\n\n${mensagem}`.trim();
  }

  function validate(): boolean {
    if (nome.trim().length < 2 || empresa.trim().length < 2) {
      setError("Indique o nome e a empresa.");
      return false;
    }
    if (!/^[0-9+\s()-]{6,20}$/.test(telefone.trim())) {
      setError("Indique um telefone válido.");
      return false;
    }
    if (mensagem.length > 500) {
      setError("A mensagem é demasiado longa.");
      return false;
    }
    setError(null);
    return true;
  }

  return (
    <form
      id="pedido"
      className="rounded-3xl border border-line bg-paper p-5 shadow-soft md:p-6"
      onSubmit={(event) => {
        event.preventDefault();
        if (!validate()) return;
        const url = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message())}`;
        window.open(url, "_blank", "noopener,noreferrer");
      }}
    >
      <h3 className="font-display text-xl font-semibold">Solicitar demonstração</h3>
      <p className="mt-2 text-sm text-muted">O pedido abre no WhatsApp. Nada fica gravado neste site.</p>
      <div className="mt-5 grid gap-3">
        <label className="text-sm font-medium">
          Nome
          <input
            required
            name="nome"
            autoComplete="name"
            maxLength={80}
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            suppressHydrationWarning
            className="mt-1 h-11 w-full rounded-xl border border-line px-3"
          />
        </label>
        <label className="text-sm font-medium">
          Empresa
          <input
            required
            name="organization"
            autoComplete="organization"
            maxLength={80}
            value={empresa}
            onChange={(event) => setEmpresa(event.target.value)}
            suppressHydrationWarning
            className="mt-1 h-11 w-full rounded-xl border border-line px-3"
          />
        </label>
        <label className="text-sm font-medium">
          Telefone
          <input
            required
            name="tel"
            autoComplete="tel"
            inputMode="tel"
            maxLength={20}
            value={telefone}
            onChange={(event) => setTelefone(event.target.value)}
            suppressHydrationWarning
            className="mt-1 h-11 w-full rounded-xl border border-line px-3"
          />
        </label>
        <label className="text-sm font-medium">
          Mensagem
          <textarea
            name="mensagem"
            maxLength={500}
            rows={4}
            value={mensagem}
            onChange={(event) => setMensagem(event.target.value)}
            suppressHydrationWarning
            className="mt-1 w-full rounded-xl border border-line px-3 py-2"
          />
        </label>
      </div>
      {error ? <p className="mt-3 text-sm font-medium">{error}</p> : null}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button type="submit" className="inline-flex h-11 items-center justify-center rounded-full bg-brand px-5 text-sm font-semibold text-ink">
          Falar no WhatsApp
        </button>
        <a
          className="inline-flex h-11 items-center justify-center rounded-full border border-line px-5 text-sm font-semibold"
          href={`mailto:${company.email}?subject=${encodeURIComponent("Pedido de demonstração")}&body=${encodeURIComponent(message())}`}
          onClick={(event) => {
            if (!validate()) event.preventDefault();
          }}
        >
          Enviar por email
        </a>
      </div>
    </form>
  );
}

export function HomePage() {
  const { content } = useSite();

  return (
    <>
      <RotatingBanner />
      <section className="bg-paper">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:py-24 lg:grid-cols-2">
          <div data-reveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-deep">{company.slogan}</p>
            <h1 className="mt-4 font-display text-4xl font-semibold text-balance md:text-5xl">{content.heroTitle}</h1>
            <p className="mt-5 max-w-xl text-lg text-pretty text-muted">{content.heroSubtitle}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#contacto" className="inline-flex h-12 items-center justify-center rounded-full bg-brand px-6 text-sm font-semibold text-ink">
                Solicitar Demonstração
              </a>
            </div>
            <p className="mt-6 text-sm text-muted">Empresas, escolas, hospitais e instituições.</p>
          </div>
          <div data-reveal className="rounded-3xl bg-mist p-4 md:p-6">
            <Laptop>
              <DashboardPreview />
            </Laptop>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="overflow-hidden rounded-2xl border border-line bg-paper shadow-soft">
                <ReportPreview />
              </div>
              <div className="mx-auto w-full max-w-48 overflow-hidden rounded-3xl border border-line bg-paper shadow-soft">
                <PhonePreview />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {products.map((product) => (
                <figure key={product.name} className="rounded-2xl bg-paper p-2 shadow-soft">
                  <img src={product.image} alt={product.alt} className="aspect-square w-full object-contain" />
                  <figcaption className="truncate px-1 pb-1 text-xs font-medium">{product.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper pb-6" aria-label="Onde a solução é usada">
        <div data-reveal className="mx-auto grid max-w-6xl gap-4 px-5 md:grid-cols-3">
          {sectors.map((sector) => (
            <figure key={sector.title} className="overflow-hidden rounded-3xl border border-line bg-paper shadow-soft">
              <img src={sector.image} alt={sector.alt} className="aspect-3/2 w-full object-cover" />
              <figcaption className="px-4 py-3 text-sm font-semibold">{sector.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <Section id="servicos" eyebrow="Serviços" title="Da cloud ao equipamento instalado." tone="mist">
        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = serviceIcons[index] ?? Cloud;
            return (
              <article key={service.title} className="rounded-3xl border border-line bg-paper p-6 shadow-soft">
                <span className="grid size-11 place-items-center rounded-2xl bg-brand text-ink">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm text-pretty text-muted">{service.text}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {service.points.map((point) => (
                    <li key={point} className="rounded-full bg-mist px-3 py-1 text-xs font-medium">
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </Section>

      <Section id="produtos" eyebrow="Produtos" title="Equipamentos que integramos.">
        <div className="grid gap-5 lg:grid-cols-3">
          {products.map((product) => (
            <article key={product.name} className="overflow-hidden rounded-3xl border border-line bg-paper shadow-soft">
              <div className="bg-mist p-6">
                <img src={product.image} alt={product.alt} className="mx-auto aspect-4/3 w-full object-contain" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-semibold">{product.name}</h3>
                <p className="mt-2 text-sm text-pretty text-muted">{product.summary}</p>
                <ul className="mt-4 space-y-2">
                  {product.specs.map((spec) => (
                    <li key={spec} className="flex items-center gap-2 text-sm">
                      <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
        <figure className="mt-6 overflow-hidden rounded-3xl bg-mist">
          <img src="/media/rfid.jpg" alt="Cartão RFID e tag" className="mx-auto max-h-80 w-full object-contain" />
          <figcaption className="px-5 py-4 text-sm text-muted">Cartão RFID e tag para identificação de colaboradores.</figcaption>
        </figure>
      </Section>

      <Section id="skincare" eyebrow="Skincare" title="Produtos de cuidado da pele.">
        <p className="max-w-2xl text-pretty text-muted">
          Além da tecnologia, a Easvilson Business disponibiliza produtos de skincare. A lista muda; confirme a
          disponibilidade no pedido.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {skincare.map((item) => (
            <article key={item.title} className="rounded-3xl border border-line bg-paper p-5 shadow-soft">
              <h3 className="font-display text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-pretty text-muted">{item.text}</p>
            </article>
          ))}
        </div>
        <a
          href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent("Olá. Quero a lista de produtos de skincare.")}`}
          className="mt-8 inline-flex h-11 items-center rounded-full bg-brand px-5 text-sm font-semibold text-ink"
          target="_blank"
          rel="noreferrer"
        >
          Pedir catálogo no WhatsApp
        </a>
      </Section>

      <Section id="assidupro" eyebrow="AssiduPro" title="Gestão de presença num painel só." tone="mist">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Laptop>
            <DashboardPreview />
          </Laptop>
          <ul className="grid gap-3 sm:grid-cols-2">
            {assiduFeatures.map((feature) => (
              <li key={feature} className="flex items-center gap-3 rounded-2xl border border-line bg-paper px-4 py-3 text-sm font-medium shadow-soft">
                <BarChart3 className="size-4 text-brand-deep" aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section eyebrow="Como funciona" title="Do colaborador ao relatório.">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <img src="/media/acesso.jpg" alt="Colaborador a aproximar um cartão RFID do leitor" className="aspect-3/2 w-full rounded-3xl object-cover shadow-soft" />
          <ol className="grid gap-3">
            {flow.map((step, index) => (
              <li key={step.title} className="grid grid-cols-[auto_1fr] items-center gap-4 rounded-2xl border border-line px-4 py-3">
                <span className="font-display text-sm font-semibold tabular-nums text-brand-deep">0{index + 1}</span>
                <span>
                  <span className="block font-semibold">{step.title}</span>
                  <span className="block text-sm text-muted">{step.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section eyebrow="Benefícios" title="O que muda na operação." tone="mist">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefitIcons[index] ?? Shield;
            return (
              <article key={benefit.title} className="rounded-3xl bg-paper p-5 shadow-soft">
                <Icon className="size-5 text-brand-deep" aria-hidden="true" />
                <h3 className="mt-4 font-display text-lg font-semibold">{benefit.title}</h3>
                <p className="mt-2 text-sm text-muted">{benefit.text}</p>
              </article>
            );
          })}
        </div>
      </Section>

      <Section eyebrow="Porquê a Easvilson Business" title="Uma equipa para software, equipamento e suporte.">
        <div className="grid gap-4 md:grid-cols-2">
          {reasons.map((reason, index) => {
            const Icon = reasonIcons[index] ?? Users;
            return (
              <article key={reason.title} className="flex gap-4 rounded-3xl border border-line p-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-mist">
                  <Icon className="size-5 text-brand-deep" aria-hidden="true" />
                </span>
                <span>
                  <h3 className="font-semibold">{reason.title}</h3>
                  <p className="mt-1 text-sm text-muted">{reason.text}</p>
                </span>
              </article>
            );
          })}
        </div>
      </Section>

      <Section eyebrow="Clientes" title="Espaço reservado aos logótipos." tone="mist">
        <p className="max-w-2xl text-sm text-muted">
          Esta área fica pronta para os logótipos reais. Não apresentamos empresas que ainda não autorizaram o uso da marca.
        </p>
        <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
          {["01", "02", "03", "04", "05", "06"].map((slot) => (
            <li
              key={slot}
              className="grid h-24 place-items-center rounded-2xl border border-dashed border-line bg-paper text-sm text-muted"
            >
              Logótipo {slot}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="contacto" eyebrow="Contacto" title="Peça uma demonstração.">
        <div className="grid gap-8 lg:grid-cols-2">
          <ContactForm />
          <div className="space-y-4">
            <div className="rounded-3xl border border-line p-5">
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-muted">Telefone</dt>
                  <dd className="mt-1 font-semibold">
                    <a href={`tel:${company.phoneTel}`}>{company.phoneDisplay}</a>
                  </dd>
                </div>
                <div>
                  <dt className="text-muted">Email</dt>
                  <dd className="mt-1 font-semibold">
                    <a href={`mailto:${company.email}`}>{company.email}</a>
                  </dd>
                </div>
                <div>
                  <dt className="text-muted">Website</dt>
                  <dd className="mt-1 font-semibold">
                    <a href={company.websiteUrl} target="_blank" rel="noreferrer">
                      {company.website}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
            <AngolaMap />
          </div>
        </div>
      </Section>
    </>
  );
}
