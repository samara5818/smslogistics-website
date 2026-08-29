import Container from "./Container";

const logos = ["Retail", "Manufacturing", "Pharma", "E-commerce", "Distribution", "Cold Chain"];

const metrics = [
  { value: "Plan", label: "Routes and Capacity" },
  { value: "Move", label: "Freight and Inventory" },
  { value: "Deliver", label: "To the Final Mile" },
];

export default function TrustStrip() {
  return (
    <section className="border-b border-slate-200 bg-white py-12 sm:py-14" aria-labelledby="trust-strip-title">
      <Container>
        <h2
          id="trust-strip-title"
          className="text-center text-xs font-bold uppercase tracking-[0.22em] text-slate-500"
        >
          Logistics support for growing businesses
        </h2>

        <div className="mt-8 flex gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-6 lg:gap-6">
          {logos.map((logo, idx) => (
            <div
              key={`${logo}-${idx}`}
              className="flex h-14 w-40 shrink-0 items-center justify-center text-sm font-bold uppercase tracking-wider text-slate-400"
            >
              {logo}
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-5">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="enterprise-card flex h-[104px] items-center justify-center rounded-xl text-center"
            >
              <p className="font-display text-2xl font-bold text-brand-700">
                {metric.value} <span className="block pt-1 font-sans text-xs font-semibold uppercase tracking-wider text-slate-500">{metric.label}</span>
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
