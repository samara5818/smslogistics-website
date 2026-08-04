import Container from "./Container";

const outcomes = [
  {
    icon: "01",
    title: "Real-Time Visibility",
    summary: "Monitor all lanes in one dashboard.",
    bullets: ["Milestone tracking", "Predictive ETA confidence"],
  },
  {
    icon: "02",
    title: "Exception Management",
    summary: "Catch issues before SLA breaches.",
    bullets: ["Alert prioritization", "Automated workflows"],
  },
  {
    icon: "03",
    title: "Cost Optimization",
    summary: "Reduce waste across planning and routing.",
    bullets: ["Lane performance insights", "Carrier mix balancing"],
  },
  {
    icon: "04",
    title: "Partner Network",
    summary: "Connect carriers and teams on one platform.",
    bullets: ["EDI and API integrations", "Shared operations views"],
  },
];

export default function Outcomes() {
  return (
    <section id="outcomes" className="bg-[#f2f4f6] py-16 sm:py-20 lg:py-24" aria-labelledby="outcomes-title">
      <Container>
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-700">Operational outcomes</p>
          <h2 id="outcomes-title" className="mt-3 font-display text-3xl font-bold tracking-tight text-brand-950 sm:text-4xl lg:text-5xl">
            Outcomes that improve reliability and cost
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">One connected operational layer for every shipment, partner, and exception.</p>
          </div>
          <a href="#how-it-works" className="text-sm font-bold text-brand-700 hover:underline">See how the platform works →</a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {outcomes.map((item) => (
            <article
              key={item.title}
              className="enterprise-card group flex min-h-[290px] flex-col rounded-xl p-7"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-xs font-bold text-brand-700">{item.icon}</div>
              <h3 className="mt-6 font-display text-xl font-bold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.summary}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2"><span className="text-brand-600">✓</span>{bullet}</li>
                ))}
              </ul>
              <a href="#quote" className="mt-auto pt-6 text-sm font-bold text-brand-700 hover:text-brand-600">
                Learn more →
              </a>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
