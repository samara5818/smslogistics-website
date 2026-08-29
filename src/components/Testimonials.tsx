import Container from "./Container";

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-[#f2f4f6] py-16 sm:py-20 lg:py-24" aria-labelledby="testimonials-title">
      <Container>
        <p className="text-center text-xs font-bold uppercase tracking-[0.22em] text-brand-700">Why work with us</p>
        <h2 id="testimonials-title" className="mt-3 text-center font-display text-3xl font-bold tracking-tight text-brand-950 sm:text-4xl lg:text-5xl">
          Straightforward logistics support
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-12">
          <article className="enterprise-card min-h-[320px] rounded-2xl p-8 lg:col-span-7 lg:p-10">
            <span className="inline-flex rounded bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-700">Clear coordination</span>
            <p className="mt-8 font-display text-2xl font-semibold leading-relaxed text-slate-800 sm:text-3xl">
              One point of coordination for shipment requirements, route planning, handling needs,
              and delivery updates.
            </p>
            <p className="mt-6 text-sm font-semibold text-slate-900">Built for businesses that value responsive service</p>
          </article>

          <article className="min-h-[320px] rounded-2xl bg-brand-700 p-8 text-white shadow-enterprise lg:col-span-5 lg:p-10">
            <span className="inline-flex rounded bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider">Local knowledge</span>
            <h3 className="mt-8 font-display text-2xl font-bold">Focused on Andhra Pradesh</h3>
            <p className="mt-4 text-base leading-7 text-white/80">
              Regional lane knowledge and practical coordination for freight, warehousing, and
              last-mile requirements in and around Guntur.
            </p>
            <a href="#quote" className="mt-8 inline-flex text-sm font-bold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white">Discuss your requirement →</a>
          </article>
        </div>
      </Container>
    </section>
  );
}
