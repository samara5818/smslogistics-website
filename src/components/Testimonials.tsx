import Container from "./Container";

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-[#f2f4f6] py-16 sm:py-20 lg:py-24" aria-labelledby="testimonials-title">
      <Container>
        <p className="text-center text-xs font-bold uppercase tracking-[0.22em] text-brand-700">Customer impact</p>
        <h2 id="testimonials-title" className="mt-3 text-center font-display text-3xl font-bold tracking-tight text-brand-950 sm:text-4xl lg:text-5xl">
          Results teams can measure
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-12">
          <article className="enterprise-card min-h-[320px] rounded-2xl p-8 lg:col-span-7 lg:p-10">
            <span className="inline-flex rounded bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-700">Operations team</span>
            <p className="mt-8 font-display text-2xl font-semibold leading-relaxed text-slate-800 sm:text-3xl">
              “We reduced manual exception chasing and improved on-time performance in under one
              quarter.”
            </p>
            <p className="mt-6 text-sm font-semibold text-slate-900">Head of Operations, 3PL Network</p>
          </article>

          <article className="min-h-[320px] rounded-2xl bg-brand-700 p-8 text-white shadow-enterprise lg:col-span-5 lg:p-10">
            <span className="inline-flex rounded bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider">Case study</span>
            <h3 className="mt-8 font-display text-2xl font-bold">Multi-carrier delivery control</h3>
            <p className="mt-4 text-sm leading-7 text-slate-700">
              <span className="text-white/80">Problem: Delivery delays across multi-carrier lanes.
              <br />
              Solution: Unified tracking, predictive ETAs, and workflow automation.
              </span>
            </p>
            <div className="mt-8 flex gap-8"><div><strong className="font-display text-4xl">30%</strong><span className="block text-xs text-white/70">fewer exceptions</span></div><div><strong className="font-display text-4xl">12%</strong><span className="block text-xs text-white/70">OTIF increase</span></div></div>
          </article>
        </div>
      </Container>
    </section>
  );
}
