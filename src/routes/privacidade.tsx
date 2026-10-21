import { createFileRoute, Link } from "@tanstack/react-router";
import { company } from "@/content/site";
import { PageShell } from "@/components/shell";

export const Route = createFileRoute("/privacidade")({
  component: function Privacy() {
    return (
      <PageShell>
        <article className="mx-auto max-w-3xl px-5 py-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-deep">Easvilson Business</p>
          <h1 className="mt-3 font-display text-4xl font-semibold">Política de Privacidade</h1>
          <div className="mt-8 space-y-4 text-pretty text-muted">
            <p>
              Este site apresenta a Easvilson Business, o AssiduPro, o AssiduLocal e os serviços de instalação. Não cria
              contas e não guarda pedidos de contacto num servidor.
            </p>
            <p>
              O formulário de demonstração apenas prepara uma mensagem no WhatsApp ou no email do visitante. O nome, a
              empresa, o telefone e a mensagem não são armazenados por este site.
            </p>
            <p>
              Textos e fotografias editados no painel interno permanecem no navegador do equipamento usado para a
              edição, através do armazenamento local. Não são transmitidos à Easvilson Business nem a terceiros por este
              site.
            </p>
            <p>
              Ligações para WhatsApp, telefone e email saem deste site e passam a seguir as regras desses serviços.
            </p>
            <p>
              Para qualquer questão sobre dados, escreva para{" "}
              <a className="font-medium text-ink" href={`mailto:${company.email}`}>
                {company.email}
              </a>
              .
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
