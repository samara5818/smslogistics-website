import Container from "./Container";

export default function FinalCTA() {
  return (
    <section
      id="quote"
      className="border-y border-white/10 bg-brand-700 py-16 sm:py-20"
      aria-labelledby="final-cta-title"
    >
      <Container>
        <div className="mx-auto max-w-4xl py-4 text-center">
          <h2 id="final-cta-title" className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Ready to transform your supply chain visibility?
          </h2>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <a
              href="/request-demo"
              className="inline-flex h-14 w-full min-w-[220px] items-center justify-center rounded-lg bg-white px-8 text-sm font-bold text-brand-800 transition hover:-translate-y-0.5 hover:bg-blue-50 sm:w-auto"
            >
              Request Demo
            </a>
            <a
              href="/talk-to-sales"
              className="inline-flex h-14 w-full min-w-[220px] items-center justify-center rounded-lg border border-white/40 bg-white/10 px-8 text-sm font-bold text-white transition hover:bg-white/20 sm:w-auto"
            >
              Talk to Sales
            </a>
          </div>

          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-white/70">Trusted by global logistics teams</p>
        </div>
      </Container>
    </section>
  );
}
