import Footer from "../components/Footer";
import Header from "../components/Header";
import Container from "../components/Container";

type IconName = "truck" | "warehouse" | "route" | "people" | "shield" | "chart" | "speed" | "cloud";

function Icon({ name, className = "h-6 w-6" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, JSX.Element> = {
    truck: <><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></>,
    warehouse: <><path d="m3 10 9-6 9 6v10H3z" /><path d="M7 14h10M7 17h10" /></>,
    route: <><circle cx="6" cy="18" r="2" /><circle cx="18" cy="6" r="2" /><path d="M8 18h2a3 3 0 0 0 3-3V9a3 3 0 0 1 3-3" /></>,
    people: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2" /><path d="M3 19a6 6 0 0 1 12 0M15 14a5 5 0 0 1 6 5" /></>,
    shield: <><path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6z" /><path d="m9 12 2 2 4-5" /></>,
    chart: <><path d="M4 19V5M4 19h16" /><path d="m7 15 4-4 3 2 5-6" /></>,
    speed: <><path d="M5 18a8 8 0 1 1 14 0" /><path d="m12 14 4-4" /><path d="M7 15h.01M12 8h.01M17 15h.01" /></>,
    cloud: <><path d="M7 18h10a4 4 0 0 0 .5-8A6 6 0 0 0 6 9a4.5 4.5 0 0 0 1 9Z" /><path d="m9 14 2 2 4-4" /></>,
  };

  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

const serviceImages = {
  delivery: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhfmClhj9zJsvDDTqyzyAxBvB1wVJ61ZwC217wNjmgEbaVG_XbRhjgOlY6PfAQW_PvQNw49aY9MlI6umDh1xyOpOwL4owacr3IfeCU7HDLga4MQqwBXwCyLWFFYEvZXX4e6-ASR5-RiWVdgd7YRxc_IUauqKycAGZlBZUaGZl0rKc_38lszfcpLgdsSediQ4lPfVi07um9wP0QuJ1H2srl_rC0DCJsCJ9uELfF5D1oeq8nSsuSV4Ntys3fEty8gVn7TX_t4A2_wOM",
  warehouse: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4svk-ahelTFuMiJF9OxjGb-VGsMp4UCuw3CImFSLtHOOGi-7Lkf-j7cjYCpnsP2Me71CCRstyynracgsZg8ty0Ba4taBEDml3KhN5wtGObc6RNZ4oF8a7xm-P67efh11NZizxQSaqYx5Fo9-V9oM_r0_9m8-UzBF3DBturSjso-KMhNbIoBa2XRMlztKU1wi0XDKlk_DVMCM_wygqXyukZtPzXQQj-MvvnEcHV7h8SGN4slzsk3k9S977vwz6fmPxyRa9xqIZTfE",
  transport: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQrp_vEYeMe8MpqMHH7Mgy1iKmL43M2IJNpI_g9QOV2ktXTfpXOQmtSz56ow_sPWUSVAZvqySSl1LhZ__CpFmJh9vDH2sv_uBWfvXeAoX0WB87IhlHxUwxsLHkUKG-_2RSahsNX3zcm-Aq1D7erTHYQjE_oNRqjWQ-uuwmXPQX69PO8ryxoGUj_l6lCUM3HFT9q5sDEO52in2SHoHHL8mv_edOyX8OcBaZ1wmn_GMPZCJnXsywo23Zid5mJnie40eaCxQELcvPmaM",
  workforce: "https://lh3.googleusercontent.com/aida-public/AB6AXuDk1K1KeHGzrgWLgxdXRec9TGDTCbDy2O1Z-1Cn4N1aju4DgsgnI6E6Fp-k8FDkXZBq21P26f0bH_gW4BXnCOCy5LIF0c4SxR717xoW2o64gfJ84fpXiDZpcnGdLRr8Au6UjVTgF5E0G4j-eqNItOLq7WQ_Vmqa87bChx4SS34_mbBIbD87OCzNbLw9VHMzb_5nJQQFPA7BhLc1pKQ5OMfSw_PWJXuJ25x7cc3DsqPvU8dj71LjY3DaENZYHwXGpJlnKxlugQwmwUs",
};

const accuracyTools: Array<{ icon: IconName; title: string; body: string }> = [
  { icon: "chart", title: "Predictive Planning", body: "Lane history and active events help teams anticipate volume and capacity pressure." },
  { icon: "speed", title: "Dynamic Workflows", body: "Prioritized alerts route each operational exception to the right owner faster." },
  { icon: "cloud", title: "Connected Telemetry", body: "Carrier, API, EDI, and shipment signals stay visible in one operational view." },
];

export default function Operations() {
  return (
    <div className="min-h-screen bg-[#f7f9fb]">
      <Header forceSolid />

      <main className="pt-16 lg:pt-[76px]">
        <section className="border-b border-slate-200 bg-white py-16 sm:py-20 lg:py-24">
          <Container>
            <div className="max-w-4xl">
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-brand-700">Engineered for precision</span>
              <h1 className="mt-4 text-balance font-display text-4xl font-bold leading-tight tracking-tight text-brand-950 sm:text-5xl lg:text-[56px]">
                Global logistics infrastructure, local operational excellence.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                SMS Logistics connects physical execution with real-time shipment intelligence, helping teams move freight with better visibility, coordination, and control.
              </p>
            </div>
          </Container>
        </section>

        <section className="py-16 sm:py-20 lg:py-24" aria-labelledby="operations-pillars">
          <Container>
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-700">Core services</p>
              <h2 id="operations-pillars" className="mt-3 font-display text-3xl font-bold tracking-tight text-brand-950 sm:text-4xl">Core operational pillars</h2>
              <p className="mt-4 text-slate-600">Specialized services working together to support reliable movement across each shipment stage.</p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
              <article className="enterprise-card overflow-hidden rounded-xl lg:col-span-8 md:grid md:grid-cols-2">
                <div className="flex flex-col p-8 lg:p-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-brand-700"><Icon name="truck" /></div>
                  <h3 className="mt-6 font-display text-2xl font-bold text-slate-950">Last-Mile Fulfillment</h3>
                  <p className="mt-4 leading-7 text-slate-600">High-velocity delivery coordination supported by active milestone tracking and clearer final-mile workflows.</p>
                  <ul className="mt-6 space-y-3 text-sm font-medium text-slate-700">
                    {["Regional delivery coordination", "Real-time shipment milestones", "Scheduled delivery windows"].map((item) => <li key={item} className="flex gap-3"><span className="text-brand-600">✓</span>{item}</li>)}
                  </ul>
                  <a href="#operations-contact" className="mt-8 text-sm font-bold text-brand-700 hover:underline">Explore last-mile solutions →</a>
                </div>
                <img src={serviceImages.delivery} alt="Delivery operations" className="min-h-[300px] h-full w-full object-cover" />
              </article>

              <article className="enterprise-card overflow-hidden rounded-xl lg:col-span-4">
                <img src={serviceImages.warehouse} alt="Warehouse operations" className="h-52 w-full object-cover" />
                <div className="p-8">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 text-brand-700"><Icon name="warehouse" /></div>
                  <h3 className="mt-6 font-display text-2xl font-bold text-slate-950">Smart Warehousing</h3>
                  <p className="mt-3 leading-7 text-slate-600">Structured storage and fulfillment coordination with inventory events visible across connected operations.</p>
                  <p className="mt-6 border-t border-slate-200 pt-4 text-xs font-bold uppercase tracking-wider text-brand-700">Visibility from intake to dispatch</p>
                </div>
              </article>

              <article className="enterprise-card overflow-hidden rounded-xl lg:col-span-12 lg:grid lg:grid-cols-2">
                <img src={serviceImages.transport} alt="Long-haul freight transport" className="min-h-[380px] h-full w-full object-cover" />
                <div className="flex flex-col justify-center p-8 lg:p-14">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-brand-700"><Icon name="route" /></div>
                  <h3 className="mt-6 font-display text-3xl font-bold text-slate-950">Freight Transportation</h3>
                  <p className="mt-4 text-lg leading-8 text-slate-600">Multimodal shipment planning for road, rail, air, and ocean movements, with route visibility and exception control in one place.</p>
                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg bg-slate-100 p-5"><p className="text-sm font-bold text-brand-700">Multimodal Control</p><p className="mt-2 text-sm leading-6 text-slate-600">Plan across transport modes and shared handoffs.</p></div>
                    <div className="rounded-lg bg-slate-100 p-5"><p className="text-sm font-bold text-brand-700">Route Intelligence</p><p className="mt-2 text-sm leading-6 text-slate-600">Track milestone changes and delivery risk early.</p></div>
                  </div>
                </div>
              </article>
            </div>
          </Container>
        </section>

        <section className="bg-white py-20 lg:py-28">
          <Container>
            <div className="grid items-center gap-16 lg:grid-cols-2">
              <div className="relative pb-12">
                <img src={serviceImages.workforce} alt="Logistics team coordinating warehouse operations" className="aspect-square w-full rounded-2xl object-cover shadow-enterprise" />
                <div className="absolute bottom-0 right-3 max-w-xs rounded-xl border border-slate-200 bg-white/90 p-6 shadow-enterprise backdrop-blur-xl sm:right-10">
                  <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-700 text-white"><Icon name="people" className="h-5 w-5" /></span><strong className="font-display text-xl">People + Process</strong></div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">Clear ownership and connected workflows across field and control-tower teams.</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-700">Operational discipline</p>
                <h2 className="mt-3 font-display text-3xl font-bold text-brand-950 sm:text-4xl">The power of human precision</h2>
                <p className="mt-6 text-lg leading-8 text-slate-600">Technology works best when teams have clear context and accountability. Our operating model keeps shipment events, ownership, and partner coordination aligned.</p>
                <div className="mt-8 space-y-7">
                  <div className="flex gap-4"><span className="text-brand-700"><Icon name="people" /></span><div><h3 className="font-display text-xl font-bold">Coordinated Execution</h3><p className="mt-2 leading-7 text-slate-600">Shared operational views help field teams, carriers, and planners work from the same information.</p></div></div>
                  <div className="flex gap-4"><span className="text-brand-700"><Icon name="shield" /></span><div><h3 className="font-display text-xl font-bold">Controlled Oversight</h3><p className="mt-2 leading-7 text-slate-600">Prioritized alerts and defined workflows improve accountability when exceptions occur.</p></div></div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section id="operations-contact" className="py-16 sm:py-20 lg:py-24">
          <Container>
            <div className="relative overflow-hidden rounded-3xl bg-brand-700 px-6 py-16 text-center text-white sm:px-10 lg:px-20 lg:py-20">
              <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="relative mx-auto max-w-4xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em]"><span className="h-2 w-2 animate-pulse rounded-full bg-blue-200" />Connected operations</div>
                <h2 className="mt-7 font-display text-4xl font-bold tracking-tight sm:text-5xl">Operational clarity at every milestone</h2>
                <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-100">A connected operational layer turns fragmented shipment data into timely decisions, coordinated workflows, and measurable service performance.</p>
                <div className="mt-12 grid gap-5 text-left md:grid-cols-3">
                  {accuracyTools.map((tool) => (
                    <article key={tool.title} className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md">
                      <Icon name={tool.icon} className="h-7 w-7 text-blue-100" />
                      <h3 className="mt-5 font-display text-lg font-bold">{tool.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-blue-100/80">{tool.body}</p>
                    </article>
                  ))}
                </div>
                <a href="/#quote" className="mt-10 inline-flex h-14 items-center justify-center rounded-lg bg-white px-8 text-sm font-bold text-brand-800 transition hover:-translate-y-0.5 hover:bg-blue-50">Discuss your operation</a>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
