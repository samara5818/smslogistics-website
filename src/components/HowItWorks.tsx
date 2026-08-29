import Container from "./Container";

const steps = [
  {
    title: "Share Your Requirement",
    detail: "Tell us the pickup, destination, shipment details, and timing.",
  },
  {
    title: "Confirm the Plan",
    detail: "We review the route, handling needs, schedule, and commercial estimate.",
  },
  {
    title: "Move and Coordinate",
    detail: "Our team coordinates the movement and keeps you informed through delivery.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="how-it-works-title">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-700">A clear, practical process</p>
          <h2
            id="how-it-works-title"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-brand-950 sm:text-4xl lg:text-5xl"
          >
            From requirement to delivery
          </h2>
        </div>

        <div className="relative mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="enterprise-card relative min-h-[210px] rounded-xl p-7"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-700 text-sm font-bold text-white">{index + 1}</div>
              <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-slate-500">Step {index + 1}</p>
              <h3 className="mt-2 font-display text-xl font-bold text-slate-900">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-700">{step.detail}</p>
            </article>
          ))}
        </div>

        <a
          href="#quote"
          className="mx-auto mt-10 flex h-12 w-fit min-w-[190px] items-center justify-center rounded-lg bg-brand-700 px-6 text-sm font-bold text-white transition hover:bg-brand-600"
        >
          Talk to an Expert
        </a>
      </Container>
    </section>
  );
}
