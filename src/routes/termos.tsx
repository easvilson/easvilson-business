import { createFileRoute, Link } from "@tanstack/react-router";
import { company } from "@/content/site";
import { PageShell } from "@/components/shell";

export const Route = createFileRoute("/termos")({
  component: function Terms() {
    return (
      <PageShell>
        <article className="mx-auto max-w-3xl px-5 py-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-deep">Easvilson Business</p>
          <h1 className="mt-3 font-display text-4xl font-semibold">Termos de Utilização</h1>
          <div className="mt-8 space-y-4 text-pretty text-muted">
            <p>
              O conteúdo deste site é institucional. Serve para apresentar a Easvilson Business, os produtos AssiduPro e
              AssiduLocal, e os serviços de equipamento, instalação e formação.
            </p>
            <p>
              As características dos leitores seguem a informação pública dos fabricantes e podem variar conforme o
              modelo e a versão. A proposta comercial confirma o que será instalado.
            </p>
            <p>
              O painel mostrado no site é uma demonstração visual. Não representa dados reais de colaboradores.
            </p>
            <p>
              Marcas como ZKTeco e Hikvision pertencem aos respetivos titulares. A Easvilson Business comercializa e
              integra esses equipamentos.
            </p>
            <p>
              Contacto: {company.email} · {company.phoneDisplay}.
            </p>
          </div>
          <Link to="/" className="mt-8 inline-flex h-11 items-center text-sm font-semibold text-brand-deep">
            Voltar ao início
          </Link>
        </article>
      </PageShell>
    );
  },
});
