import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/home";
import { PageShell } from "@/components/shell";

export const Route = createFileRoute("/")({
  component: function Home() {
    return (
      <PageShell>
        <HomePage />
      </PageShell>
    );
  },
});
