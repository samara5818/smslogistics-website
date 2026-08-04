import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";

const images = {
  dashboard: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5X3se7r4U4k7kqF2EZvKv2DqVaxHBwalRlc2g2sNXbzXPNB6cVVj4OLrQJ3z0Sh2LEKmrePLmnRsagT6J2VX9QouX6Bq41-6ZCZNef4Kye_LQq0Y5mtBKWN44vhFN7NcI3X6kWvfInnzsPIZgqRe7NsERJYE8pelLGkdJLOI_icGSLIUodUl4g4tnbLHcdYwex6Va9NVfSop1ye4Tx1HOzEKiuv1Ion6dMKRK6OgiAEvVHJb-mPG0ouNTkpqNMbomRm-G9suAYII",
  mobile: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxyMGMRd8rnTkPTFnT8JaEZGYqA3w65tbIDKeN0I_eCaWoVFPkpRXnuqQORcM-exB9_qVeHJE4NlVQ6_q8-K2mV80USqgQX5cOzoiyw0MTpzOzabTaW7kQRWGaXS8FCdxfU7W4CZDETbT1UzABi4DoOKKtY1-Npxt25nwNU4U4MDxyXUMovTf3ohh1A9lmuz1w1-AUqMVRH1YmTOVpneAGmn1Bbu77z-WSioqOEeP02-5z5mfXxp-VV5sc6ZIvFzc5gNQjEVz0z18",
  fleet: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvbW_Ydh6ZNv5sRK307REvSw9YXby-aLRiffcVnlaXOixdIFVL1lBIxpMrMIUswN_vjjKJVIF-z3x0quMERNk0NNSjnHSHVvPcWh2YmbnHwjFgAPI6I6uKgaOpyOVoUw9FCBQEcr0hWkkp9gDWg9rvy-uJvLHZnL4_YzF6h4F_7FPnn_3li0nh5BFjonscMd9xjEf8gjM0Q3SZgDTyGixmtWt-ZsFo8r2veKEjEpqS4tt_SJ-AWa-h9sxRnrUUDCN-AtN7D56caeY",
  attendance: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZKFXdDxp_cElVc3kpXfWef9XS4l6zn04nQtGrxhU1PqHm-RlmIizQqduh7dokVYhg4ynGY-sKP8lxETultlCnuBOUY-Lh0fH9rjpumcWG3ljcjylcjRqnuC16kzORBLz9EmRRtMAvJo9dTezc8VLxxnHpahnaegdGNn48ZJK8op3iUKYifdAthujQntUpfMrCz8kNn3l0_-R5tD3igdhbllA1LHhTBjFLCsU-1MOiJYTJ6_dYejn6QerI9c7XXDvo3s7lozYNIns",
};

function FeatureIcon({ children }: { children: string }) {
  return <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-xl font-bold text-brand-700">{children}</span>;
}

export default function Technology() {
  return (
    <div className="min-h-screen bg-[#f7f9fb]">
      <Header forceSolid />

      <main className="pt-16 lg:pt-[76px]">
        <section className="overflow-hidden bg-[radial-gradient(circle_at_top_right,#dfe9ff_0%,#f7f9fb_52%)] py-20 lg:py-28">
          <Container>
            <div className="grid items-center gap-14 lg:grid-cols-2">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-700"><span className="h-2 w-2 rounded-sm bg-brand-700" />Operational intelligence</span>
                <h1 className="mt-6 text-balance font-display text-4xl font-bold leading-tight tracking-tight text-brand-950 sm:text-5xl lg:text-[58px]">
                  The digital backbone for connected logistics
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">CIX connects shipment milestones, partner signals, exceptions, and operational workflows so teams can make decisions from one shared view.</p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <a href="#platform" className="inline-flex h-13 items-center justify-center rounded-lg bg-brand-700 px-8 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-brand-600">Explore the platform</a>
                  <a href="/#quote" className="inline-flex h-13 items-center justify-center rounded-lg border border-slate-300 bg-white px-8 py-4 text-sm font-bold text-brand-700 transition hover:bg-slate-50">Request a technical demo</a>
                </div>
              </div>

              <div className="relative pb-12 pl-8">
                <div className="rotate-2 rounded-2xl border border-white/70 bg-white/70 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.16)] backdrop-blur-xl">
                  <img src={images.dashboard} alt="Logistics visibility dashboard" className="w-full rounded-xl" />
                </div>
                <div className="absolute bottom-0 left-0 hidden w-44 -rotate-3 rounded-xl border border-white/70 bg-white/80 p-3 shadow-2xl backdrop-blur-xl sm:block">
                  <img src={images.mobile} alt="Mobile operations interface" className="rounded-lg" />
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section id="platform" className="py-20 lg:py-24">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-700">Integrated ecosystem</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-brand-950 sm:text-4xl">One operational source of truth</h2>
              <p className="mt-4 leading-7 text-slate-600">Bring carriers, control-tower teams, field operations, and shipment events into a clearer shared workflow.</p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-12">
              <article className="enterprise-card overflow-hidden rounded-xl md:col-span-8 md:grid md:grid-cols-2">
                <div className="p-8 lg:p-10">
                  <FeatureIcon>⌘</FeatureIcon>
                  <h3 className="mt-6 font-display text-2xl font-bold">CIX Operations Control</h3>
                  <p className="mt-4 leading-7 text-slate-600">Coordinate multimodal shipments with milestone monitoring, predictive context, and configurable exception workflows.</p>
                  <ul className="mt-6 space-y-3 text-sm font-medium text-slate-700"><li className="flex gap-3"><span className="text-brand-600">✓</span>Unified shipment timelines</li><li className="flex gap-3"><span className="text-brand-600">✓</span>Prioritized exception workflows</li></ul>
                </div>
                <div className="flex items-center bg-slate-100 p-6"><img src={images.fleet} alt="Fleet status interface" className="rounded-lg shadow-enterprise transition duration-500 hover:scale-[1.02]" /></div>
              </article>

              <article className="rounded-xl bg-brand-700 p-8 text-white shadow-enterprise md:col-span-4 lg:p-10">
                <span className="text-4xl">⌖</span>
                <h3 className="mt-6 font-display text-2xl font-bold">Live milestone tracking</h3>
                <p className="mt-4 leading-7 text-blue-100">Monitor asset and shipment progress using available carrier, partner, and device signals—without forcing unsupported precision claims.</p>
                <div className="mt-10 border-t border-white/20 pt-6"><p className="text-xs font-bold uppercase tracking-wider text-blue-200">Operational focus</p><p className="mt-2 font-display text-2xl font-bold">Timely, usable context</p></div>
              </article>

              <article className="enterprise-card rounded-xl p-8 md:col-span-4 lg:p-10">
                <FeatureIcon>↔</FeatureIcon>
                <h3 className="mt-6 font-display text-2xl font-bold">Partner workspace</h3>
                <p className="mt-4 leading-7 text-slate-600">Give carriers and operational partners a structured place for status updates, documents, and shared handoffs.</p>
                <div className="mt-8 rounded-lg bg-slate-100 p-4"><p className="text-sm font-bold text-brand-700">Connected onboarding</p><p className="mt-1 text-xs text-slate-500">Shared requirements and operational context</p></div>
              </article>

              <article className="enterprise-card overflow-hidden rounded-xl md:col-span-8 md:grid md:grid-cols-[1.15fr_.85fr]">
                <div className="p-8 lg:p-10">
                  <FeatureIcon>✓</FeatureIcon>
                  <h3 className="mt-6 font-display text-2xl font-bold">Field workflow verification</h3>
                  <p className="mt-4 leading-7 text-slate-600">Support structured check-ins, task confirmation, and accountable field execution while respecting the systems and policies deployed by each operation.</p>
                  <div className="mt-7 flex flex-wrap gap-2">{["Check-ins", "Task status", "Handoffs"].map((item) => <span key={item} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-brand-700">{item}</span>)}</div>
                </div>
                <img src={images.attendance} alt="Mobile field workflow" className="h-full min-h-72 w-full object-cover" />
              </article>
            </div>
          </Container>
        </section>

        <section className="overflow-hidden bg-[#eef1f4] py-20 lg:py-24">
          <Container>
            <div className="grid items-center gap-14 lg:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-700">Control-tower visibility</p>
                <h2 className="mt-3 font-display text-3xl font-bold text-brand-950 sm:text-4xl">Operational visibility teams can act on</h2>
                <p className="mt-5 text-lg leading-8 text-slate-600">Move beyond a simple tracking link. Bring transit milestones, estimated arrival context, and active exceptions into a unified operational view.</p>
                <div className="mt-8 space-y-6">
                  <div className="flex gap-4"><FeatureIcon>⌁</FeatureIcon><div><h3 className="font-display text-lg font-bold">Performance context</h3><p className="mt-1 leading-7 text-slate-600">Review lane and partner patterns to support better planning decisions.</p></div></div>
                  <div className="flex gap-4"><FeatureIcon>!</FeatureIcon><div><h3 className="font-display text-lg font-bold">Exception management</h3><p className="mt-1 leading-7 text-slate-600">Surface potential delays and route each issue into a defined response workflow.</p></div></div>
                </div>
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_25px_70px_rgba(15,23,42,0.14)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(0,64,139,.16),transparent_18%),radial-gradient(circle_at_70%_65%,rgba(0,87,184,.17),transparent_16%),linear-gradient(to_right,rgba(148,163,184,.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,.15)_1px,transparent_1px)] bg-[size:auto,auto,36px_36px,36px_36px]" />
                <svg viewBox="0 0 600 420" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true"><path d="M70 315C170 280 170 120 290 150s115 145 240 70" stroke="#0758c7" strokeWidth="4" strokeDasharray="9 9" /><circle cx="70" cy="315" r="9" fill="#0758c7" /><circle cx="290" cy="150" r="9" fill="#0758c7" /><circle cx="530" cy="220" r="9" fill="#0758c7" /></svg>
                <div className="absolute left-5 top-5 rounded-lg border border-white/70 bg-white/85 px-4 py-3 shadow-enterprise backdrop-blur"><div className="flex items-center gap-2"><span className="h-2 w-2 animate-pulse rounded-full bg-green-500" /><span className="text-xs font-bold">Network signals connected</span></div></div>
                <div className="absolute bottom-5 right-5 rounded-lg border border-white/70 bg-white/85 p-4 shadow-enterprise backdrop-blur"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Current view</p><p className="mt-1 text-sm font-bold text-brand-700">Live operational context</p></div>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-white py-20 text-center lg:py-24">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className="font-display text-4xl font-bold text-brand-950 sm:text-5xl">Ready to improve supply-chain intelligence?</h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">See how connected shipment data and operational workflows can support your lanes, partners, and customers.</p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"><a href="/#quote" className="inline-flex h-14 items-center justify-center rounded-lg bg-brand-700 px-9 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-brand-600">Book a technical demo</a><a href="/operations" className="inline-flex h-14 items-center justify-center rounded-lg bg-slate-200 px-9 text-sm font-bold text-slate-800 transition hover:bg-slate-300">Explore operations</a></div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
