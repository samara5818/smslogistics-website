import type { FormEvent } from "react";
import Container from "./Container";

const enquiryEmail = "team@smslogisticsin.com";

export default function FinalCTA() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Logistics enquiry from ${data.get("name")}`);
    const body = encodeURIComponent([
      `Name: ${data.get("name")}`, `Phone: ${data.get("phone")}`,
      `Email: ${data.get("email")}`, `Service: ${data.get("service")}`,
      "", "Requirement:", String(data.get("requirement")),
    ].join("\n"));
    window.location.href = `mailto:${enquiryEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="quote" className="border-y border-white/10 bg-brand-700 py-16 sm:py-20" aria-labelledby="final-cta-title">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="text-white">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-200">Request a quote</p>
            <h2 id="final-cta-title" className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">Tell us what you need to move.</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-blue-100">Share the basic shipment details and your preferred timing. Your email app will open with the enquiry prepared for our operations team.</p>
            <p className="mt-7 text-sm text-white/80">Prefer email? <a className="font-bold text-white underline underline-offset-4" href={`mailto:${enquiryEmail}`}>{enquiryEmail}</a></p>
          </div>

          <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-semibold text-slate-700">Name<input required name="name" autoComplete="name" className="mt-2 h-12 w-full rounded-lg border border-slate-300 px-4 outline-none focus:border-brand-600 focus:ring-2 focus:ring-blue-100" /></label>
              <label className="text-sm font-semibold text-slate-700">Phone<input required name="phone" type="tel" autoComplete="tel" className="mt-2 h-12 w-full rounded-lg border border-slate-300 px-4 outline-none focus:border-brand-600 focus:ring-2 focus:ring-blue-100" /></label>
              <label className="text-sm font-semibold text-slate-700">Email<input required name="email" type="email" autoComplete="email" className="mt-2 h-12 w-full rounded-lg border border-slate-300 px-4 outline-none focus:border-brand-600 focus:ring-2 focus:ring-blue-100" /></label>
              <label className="text-sm font-semibold text-slate-700">Service<select name="service" className="mt-2 h-12 w-full rounded-lg border border-slate-300 bg-white px-4 outline-none focus:border-brand-600 focus:ring-2 focus:ring-blue-100"><option>Freight transport</option><option>Warehouse support</option><option>Route planning</option><option>Last-mile delivery</option><option>Other</option></select></label>
            </div>
            <label className="mt-5 block text-sm font-semibold text-slate-700">Shipment requirement<textarea required name="requirement" rows={4} placeholder="Pickup, destination, goods, weight, and preferred date" className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-brand-600 focus:ring-2 focus:ring-blue-100" /></label>
            <button type="submit" className="mt-5 h-14 w-full rounded-lg bg-brand-700 px-8 text-sm font-bold text-white transition hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2">Prepare Email Enquiry</button>
            <p className="mt-3 text-center text-xs leading-5 text-slate-500">No details are stored on this website.</p>
          </form>
        </div>
      </Container>
    </section>
  );
}
