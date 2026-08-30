import { FormEvent, useEffect, useMemo, useState } from "react";
import Container from "../components/Container";
import Header from "../components/Header";

type Step = "route" | "load" | "vehicle" | "requirements" | "price";
type FormData = {
  pickup: string; delivery: string; distance: number | null; loadType: string; weight: string;
  packageCount: string; dimensions: string; recommendedVehicle: string; selectedVehicle: string;
  bodyType: string; pickupDate: string; pickupTime: string; loadingPoints: string;
  unloadingPoints: string; loadingAssistance: boolean; specialRequirements: string;
};
type Estimate = {
  recommendedVehicle: string; distance: number; transitEstimate: string;
  estimatedPriceMin: number; estimatedPriceMax: number; estimateId: string;
};

const steps: Array<{ key: Step; label: string }> = [
  { key: "route", label: "Route" }, { key: "load", label: "Load" },
  { key: "vehicle", label: "Vehicle" }, { key: "requirements", label: "Requirements" },
  { key: "price", label: "Price" },
];
const initialData: FormData = {
  pickup: "", delivery: "", distance: null, loadType: "", weight: "", packageCount: "",
  dimensions: "", recommendedVehicle: "", selectedVehicle: "", bodyType: "",
  pickupDate: "", pickupTime: "", loadingPoints: "1", unloadingPoints: "1",
  loadingAssistance: false, specialRequirements: "",
};
const showServiceTiers = false;
const numberFormat = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });
const currencyFormat = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

function PinIcon() {
  return <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>;
}

function Progress({ current }: { current: Step }) {
  const active = steps.findIndex((step) => step.key === current);
  return <ol className="flex w-full items-start" aria-label="Estimator progress">
    {steps.map((step, index) => {
      const complete = index < active; const currentStep = index === active;
      return <li key={step.key} className="relative flex flex-1 flex-col items-center">
        {index > 0 && <span className={`absolute right-1/2 top-4 h-0.5 w-full ${index <= active ? "bg-emerald-500" : "bg-slate-200"}`} />}
        <span className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${complete ? "bg-emerald-500 text-white" : currentStep ? "bg-brand-700 text-white" : "border border-slate-300 bg-white text-slate-400"}`}>{complete ? "✓" : index + 1}</span>
        <span className={`mt-2 text-xs font-semibold ${currentStep ? "text-brand-700" : "hidden text-slate-400 lg:block"}`}>{step.label}</span>
      </li>;
    })}
  </ol>;
}

function RouteSummary({ data, distanceState }: { data: FormData; distanceState: "idle" | "loading" | "ready" | "error" }) {
  const distanceText = distanceState === "loading" ? "Calculating route…" : distanceState === "ready" && data.distance !== null ? `${numberFormat.format(data.distance)} km` : data.pickup && data.delivery ? "Distance will be calculated" : "Enter both locations";
  return <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-enterprise lg:sticky lg:top-24">
    <h2 className="text-base font-semibold text-slate-950">Live route summary</h2>
    <div className="mt-7 grid grid-cols-[18px_1fr] gap-x-3">
      <div className="flex flex-col items-center"><span className="mt-1 h-3 w-3 rounded-full bg-brand-700"/><span className="my-1 min-h-12 w-px flex-1 bg-slate-300"/><span className="mb-1 h-3 w-3 rounded-full border-2 border-brand-700 bg-white"/></div>
      <div className="space-y-7"><div><p className="text-xs font-medium uppercase tracking-wider text-slate-400">Pickup</p><p className={`mt-1 font-medium ${data.pickup ? "text-slate-900" : "text-slate-400"}`}>{data.pickup || "Pickup"}</p></div><div><p className="text-xs font-medium uppercase tracking-wider text-slate-400">Delivery</p><p className={`mt-1 font-medium ${data.delivery ? "text-slate-900" : "text-slate-400"}`}>{data.delivery || "Delivery"}</p></div></div>
    </div>
    <div className="mt-7 rounded-xl bg-blue-50 p-4"><p className="text-xs font-semibold uppercase tracking-wider text-brand-700">Estimated distance</p><p className="mt-1 text-xl font-semibold text-slate-950" aria-live="polite">{distanceText}</p></div>
  </aside>;
}

export default function PricingCalculator() {
  const [currentStep, setCurrentStep] = useState<Step>("route");
  const [data, setData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [distanceState, setDistanceState] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [estimate, setEstimate] = useState<Estimate | null>(null);
  const [estimateState, setEstimateState] = useState<"idle" | "loading" | "error">("idle");

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => setData((old) => ({ ...old, [key]: value }));

  useEffect(() => {
    if (!data.pickup.trim() || !data.delivery.trim()) { setDistanceState("idle"); update("distance", null); return; }
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setDistanceState("loading");
      try {
        // TODO: Replace free-text geocoding with the organisation's chosen Places autocomplete provider.
        const geocode = async (query: string) => {
          const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`, { signal: controller.signal, headers: { "Accept-Language": "en" } });
          if (!response.ok) throw new Error("Geocoding failed");
          const results = await response.json() as Array<{ lat: string; lon: string }>;
          if (!results[0]) throw new Error("Location not found");
          return [Number(results[0].lon), Number(results[0].lat)] as const;
        };
        const [pickup, delivery] = await Promise.all([geocode(data.pickup), geocode(data.delivery)]);
        const route = await fetch(`https://router.project-osrm.org/route/v1/driving/${pickup.join(",")};${delivery.join(",")}?overview=false`, { signal: controller.signal });
        if (!route.ok) throw new Error("Routing failed");
        const result = await route.json() as { routes?: Array<{ distance: number }> };
        if (!result.routes?.[0]) throw new Error("Route unavailable");
        update("distance", Math.round(result.routes[0].distance / 1000)); setDistanceState("ready");
      } catch (error) { if ((error as Error).name !== "AbortError") { update("distance", null); setDistanceState("error"); } }
    }, 700);
    return () => { window.clearTimeout(timer); controller.abort(); };
  }, [data.pickup, data.delivery]);

  const continueRoute = () => {
    const next: Record<string, string> = {};
    if (!data.pickup.trim()) next.pickup = "Enter a pickup location";
    if (!data.delivery.trim()) next.delivery = "Enter a delivery location";
    setErrors(next); if (!Object.keys(next).length) setCurrentStep("load");
  };
  const calculate = async (event: FormEvent) => {
    event.preventDefault(); setCurrentStep("price"); setEstimateState("loading"); setEstimate(null);
    try {
      const response = await fetch("/api/freight/estimate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!response.ok) throw new Error("Estimate unavailable");
      setEstimate(await response.json() as Estimate); setEstimateState("idle");
    } catch { setEstimateState("error"); }
  };
  const whatsappUrl = useMemo(() => {
    const number = import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined;
    if (!number || !estimate) return "";
    const message = `Freight enquiry ${estimate.estimateId}: ${data.pickup} to ${data.delivery}, ${numberFormat.format(estimate.distance)} km, estimate ${currencyFormat.format(estimate.estimatedPriceMin)}–${currencyFormat.format(estimate.estimatedPriceMax)}.`;
    return `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
  }, [data.delivery, data.pickup, estimate]);
  const phone = import.meta.env.VITE_TRANSPORT_PHONE as string | undefined;

  return <div className="min-h-screen bg-[#f7f9fb]">
    <Header forceSolid />
    <main className="pt-16 lg:pt-[76px]">
      <section className="border-b border-slate-200 bg-white px-4 py-12 sm:py-16">
        <h1 className="text-center text-[22px] font-medium tracking-tight text-slate-950 sm:text-[30px]">Calculate your freight price instantly</h1>
        <p className="mx-auto mt-3 max-w-[520px] text-center text-[13px] leading-6 text-slate-500 sm:text-[15px]">Enter your pickup location, destination and load details, and we&apos;ll recommend the right vehicle and estimated freight price.</p>
        <div className="mx-auto mt-7 grid max-w-4xl grid-cols-2 gap-2 lg:grid-cols-4">{["Instant estimate", "Vehicle recommendation", "Transparent pricing", "Business and personal loads"].map((item) => <div key={item} className="flex min-h-11 items-center justify-center gap-2 rounded-full border border-slate-200 px-3 text-center text-xs font-medium text-slate-700"><span className="text-brand-700">✓</span>{item}</div>)}</div>
      </section>

      <section className="py-10 sm:py-14"><Container><div className="mx-auto max-w-5xl"><Progress current={currentStep}/>
        <div className="mt-10 grid gap-7 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-enterprise sm:p-8">
            {currentStep === "route" && <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">Step 1 of 5</p><h2 className="mt-2 text-2xl font-semibold text-slate-950">Where is your freight going?</h2><p className="mt-2 text-sm text-slate-500">Enter complete city, area, or address details for a more accurate route.</p>
              <div className="mt-7 space-y-5">{(["pickup", "delivery"] as const).map((key) => <label key={key} className="block text-sm font-semibold text-slate-700"><span className="capitalize">{key} location</span><span className="relative mt-2 block"><span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-700"><PinIcon/></span><input value={data[key]} onChange={(e) => { update(key, e.target.value); setErrors((old) => ({ ...old, [key]: "" })); }} autoComplete="off" placeholder={`Enter ${key} city or address`} className="h-14 w-full rounded-xl border border-slate-300 pl-12 pr-4 outline-none focus:border-brand-600 focus:ring-2 focus:ring-blue-100"/></span>{errors[key] && <span className="mt-2 block text-xs font-medium text-red-600">{errors[key]}</span>}</label>)}</div>
              <div className="mt-7 lg:hidden"><RouteSummary data={data} distanceState={distanceState}/></div>
              <button type="button" onClick={continueRoute} className="mt-7 h-14 w-full rounded-xl bg-brand-700 px-6 text-sm font-bold text-white transition hover:bg-brand-600">Continue to load details</button>
            </div>}
            {currentStep === "load" && <Placeholder title="Load details" description="Load-type, weight, package-count, and dimensions controls will be completed in the next estimator phase." back={() => setCurrentStep("route")} next={() => setCurrentStep("vehicle")}/>}
            {currentStep === "vehicle" && <Placeholder title="Vehicle selection" description="Vehicle recommendation and selection controls will be completed in the next estimator phase." back={() => setCurrentStep("load")} next={() => setCurrentStep("requirements")}/>}
            {currentStep === "requirements" && <form onSubmit={calculate}><Placeholder title="Shipment requirements" description="Pickup timing and operational requirement controls will be completed in the next estimator phase." back={() => setCurrentStep("vehicle")} nextLabel="Calculate freight price" submit/></form>}
            {currentStep === "price" && <Result estimate={estimate} state={estimateState} data={data} whatsappUrl={whatsappUrl} phone={phone}/>}
          </div>
          <div className="hidden lg:block"><RouteSummary data={data} distanceState={distanceState}/></div>
        </div>
      </div></Container></section>
      <section className="border-t border-slate-200 bg-white py-14"><Container><div className="mx-auto max-w-3xl text-center"><h2 className="text-2xl font-semibold text-slate-950">Frequently asked questions</h2><p className="mt-3 text-sm text-slate-500">Detailed estimator FAQs will be added with the remaining shipment steps.</p></div></Container></section>
      <section className="bg-brand-950 py-12 text-center text-white"><Container><h2 className="text-2xl font-semibold">Need contract transportation support?</h2><p className="mt-3 text-sm text-white/70">Contract-lane enquiry options will be added in the next phase.</p></Container></section>
    </main>
  </div>;
}

function Placeholder({ title, description, back, next, nextLabel = "Continue", submit = false }: { title: string; description: string; back: () => void; next?: () => void; nextLabel?: string; submit?: boolean }) {
  return <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">Estimator setup</p><h2 className="mt-2 text-2xl font-semibold">{title}</h2><div className="mt-7 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-7 text-sm leading-6 text-slate-600">{description}</div><div className="mt-7 flex gap-3"><button type="button" onClick={back} className="h-12 rounded-xl border border-slate-300 px-5 text-sm font-semibold">Back</button><button type={submit ? "submit" : "button"} onClick={submit ? undefined : next} className="h-12 flex-1 rounded-xl bg-brand-700 px-5 text-sm font-bold text-white">{nextLabel}</button></div></div>;
}

function Result({ estimate, state, data, whatsappUrl, phone }: { estimate: Estimate | null; state: "idle" | "loading" | "error"; data: FormData; whatsappUrl: string; phone?: string }) {
  if (state === "loading") return <div className="py-16 text-center" aria-live="polite"><span className="mx-auto block h-9 w-9 animate-spin rounded-full border-4 border-blue-100 border-t-brand-700"/><p className="mt-5 font-medium text-slate-700">Finding the best transportation estimate for your shipment…</p></div>;
  if (state === "error" || !estimate) return <div className="py-12 text-center"><h2 className="text-xl font-semibold">We couldn&apos;t calculate an estimate</h2><p className="mt-3 text-sm text-slate-500">The pricing service is not available yet. Please request a final quote from our team.</p><a href="/#quote" className="mt-6 inline-flex h-12 items-center rounded-xl bg-brand-700 px-6 text-sm font-bold text-white">Request final quote</a></div>;
  return <div><p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-brand-700">Estimated freight price</p><p className="mt-3 text-center text-[28px] font-medium text-brand-700 sm:text-[36px]">{currencyFormat.format(estimate.estimatedPriceMin)} – {currencyFormat.format(estimate.estimatedPriceMax)}</p><p className="mt-2 text-center text-sm text-slate-500">Estimate ID: {estimate.estimateId}</p>
    {!showServiceTiers && <div className="mt-7 rounded-xl border border-blue-200 bg-blue-50 p-5 text-center"><p className="font-semibold text-slate-900">{estimate.recommendedVehicle}</p><p className="mt-1 text-sm text-slate-600">{numberFormat.format(estimate.distance)} km · {estimate.transitEstimate}</p></div>}
    <div className="mt-6 grid gap-4 md:grid-cols-2"><div className="rounded-xl border border-slate-200 p-5"><h3 className="font-semibold">Shipment summary</h3><dl className="mt-3 space-y-2 text-sm text-slate-600"><div className="flex justify-between gap-4"><dt>Route</dt><dd className="text-right">{data.pickup} → {data.delivery}</dd></div><div className="flex justify-between"><dt>Distance</dt><dd>{numberFormat.format(estimate.distance)} km</dd></div><div className="flex justify-between"><dt>Vehicle</dt><dd>{estimate.recommendedVehicle}</dd></div></dl></div><div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-xs leading-5 text-amber-950">The displayed freight price is an estimated transportation cost based on the information provided. Final pricing may vary depending on actual shipment weight and dimensions, vehicle availability, route conditions, toll charges, loading/unloading requirements, waiting time, restricted-entry timings and other operational requirements. Final commercial pricing will be confirmed by SMS Logistics before vehicle placement.</div></div>
    <div className="mt-6 grid gap-3 sm:grid-cols-3"><a href="/#quote" className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-700 px-4 text-sm font-bold text-white">Request final quote</a>{whatsappUrl ? <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center justify-center rounded-xl border border-emerald-600 px-4 text-sm font-bold text-emerald-700">WhatsApp us</a> : <span className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 text-sm text-slate-400">WhatsApp unavailable</span>}{phone ? <a href={`tel:${phone}`} className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-300 px-4 text-sm font-bold">Call now</a> : <span className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 text-sm text-slate-400">Call unavailable</span>}</div>
  </div>;
}
