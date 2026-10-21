const bars = [
  { label: "Seg", h: "h-10" },
  { label: "Ter", h: "h-14" },
  { label: "Qua", h: "h-12" },
  { label: "Qui", h: "h-16" },
  { label: "Sex", h: "h-11" },
];

const stats = [
  { label: "Presentes", value: "128" },
  { label: "Pontuais", value: "116" },
  { label: "Atrasos", value: "7" },
  { label: "Faltas", value: "5" },
];

export function DashboardPreview() {
  return (
    <div className="bg-mist text-ink">
      <div className="flex items-center justify-between border-b border-line bg-paper px-3 py-2">
        <p className="font-display text-xs font-semibold">AssiduPro</p>
        <p className="text-xs text-muted">Demonstração</p>
      </div>
      <div className="grid grid-cols-4 gap-2 p-3">
        {stats.map((item) => (
          <div key={item.label} className="rounded-xl bg-paper px-2 py-2 shadow-soft">
            <p className="text-xs text-muted">{item.label}</p>
            <p className="font-display text-lg font-semibold tabular-nums">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-2 px-3 pb-3 sm:grid-cols-5">
        <div className="rounded-xl bg-paper p-3 shadow-soft sm:col-span-3">
          <p className="text-xs font-medium text-muted">Presenças na semana</p>
          <div className="mt-3 flex h-20 items-end gap-2">
            {bars.map((bar) => (
              <div key={bar.label} className="flex flex-1 flex-col items-center gap-1">
                <div className={`w-full rounded-t-md bg-brand ${bar.h}`} />
                <span className="text-xs text-muted">{bar.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-paper p-3 shadow-soft sm:col-span-2">
          <p className="text-xs font-medium text-muted">Últimos registos</p>
          <ul className="mt-2 space-y-2 text-xs">
            <li className="flex justify-between gap-2">
              <span>Entrada</span>
              <span className="tabular-nums text-muted">07:58</span>
            </li>
            <li className="flex justify-between gap-2">
              <span>Entrada</span>
              <span className="tabular-nums text-muted">08:04</span>
            </li>
            <li className="flex justify-between gap-2">
              <span>Saída</span>
              <span className="tabular-nums text-muted">12:01</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function ReportPreview() {
  const rows = [
    ["Departamento", "Presentes", "Faltas"],
    ["Operações", "42", "1"],
    ["Administração", "18", "0"],
    ["Escola", "36", "2"],
  ];
  return (
    <div className="bg-paper p-3 text-ink">
      <p className="font-display text-xs font-semibold">Relatório diário</p>
      <p className="mt-1 text-xs text-muted">Pronto para PDF e Excel</p>
      <div className="mt-3 overflow-hidden rounded-xl border border-line">
        {rows.map((row, index) => (
          <div
            key={row[0]}
            className={`grid grid-cols-3 gap-2 px-2 py-2 text-xs ${index === 0 ? "bg-mist font-medium" : "border-t border-line"}`}
          >
            {row.map((cell) => (
              <span key={cell} className="tabular-nums">
                {cell}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function PhonePreview() {
  return (
    <div className="bg-paper px-3 py-4 text-center text-ink">
      <p className="font-display text-xs font-semibold">AssiduPro</p>
      <div className="mx-auto mt-4 grid size-14 place-items-center rounded-full bg-brand">
        <span className="font-display text-lg font-semibold text-ink">✓</span>
      </div>
      <p className="mt-3 text-sm font-semibold">Presença registada</p>
      <p className="mt-1 font-display text-2xl font-semibold tabular-nums">08:02</p>
      <p className="mt-1 text-xs text-muted">Entrada confirmada</p>
    </div>
  );
}
