import { useMemo, useState } from "react";
import Header from "../components/Header";
import { navigate } from "../utils/navigation";

type Mode = "Road" | "Air" | "Ocean" | "Rail";
type ServiceLevel = "Standard" | "Express" | "Dedicated";

const modeBaseRate: Record<Mode, number> = {
  Road: 1.4,
  Air: 4.8,
  Ocean: 0.9,
  Rail: 1.1,
};

const serviceMultiplier: Record<ServiceLevel, number> = {
  Standard: 1,
  Express: 1.32,
  Dedicated: 1.58,
};

export default function PricingCalculator() {
  const [mode, setMode] = useState<Mode>("Road");
  const [serviceLevel, setServiceLevel] = useState<ServiceLevel>("Standard");
  const [distanceKm, setDistanceKm] = useState(850);
  const [weightKg, setWeightKg] = useState(1200);
  const [stops, setStops] = useState(2);
  const [insurance, setInsurance] = useState(true);
  const [temperatureControlled, setTemperatureControlled] = useState(false);

  const estimate = useMemo(() => {
    const base = distanceKm * modeBaseRate[mode];
    const weightFactor = Math.max(weightKg / 100, 1) * 18;
    const stopFactor = stops * 65;
    const insuranceFee = insurance ? 140 : 0;
    const temperatureFee = temperatureControlled ? 220 : 0;
    const subtotal =
      (base + weightFactor + stopFactor + insuranceFee + temperatureFee) *
      serviceMultiplier[serviceLevel];

    return {
      subtotal,
      fuelSurcharge: subtotal * 0.08,
      platformFee: subtotal * 0.025,
    };
  }, [distanceKm, insurance, mode, serviceLevel, stops, temperatureControlled, weightKg]);

  const total = estimate.subtotal + estimate.fuelSurcharge + estimate.platformFee;

  return (
    <main className="min-h-screen bg-[#eef3f8]">
      <Header forceSolid />
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#08152d,#102449_50%,#19386b)] px-6 py-24 text-white sm:px-8 md:py-28 lg:px-12">
        <div className="mx-auto max-w-[1480px]">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div className="max-w-[720px]">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-200/80">
                Pricing Calculator
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Estimate shipment cost with logistics-grade inputs
              </h1>
              <p className="mt-5 max-w-[620px] text-lg leading-8 text-white/78">
                Configure transport mode, distance, weight, stops, and service level to get a fast
                commercial estimate before you request a final quote.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-2xl border border-white/12 bg-white/8 p-4 backdrop-blur-sm">
                <p className="text-2xl font-semibold">4</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/60">Modes</p>
              </div>
              <div className="rounded-2xl border border-white/12 bg-white/8 p-4 backdrop-blur-sm">
                <p className="text-2xl font-semibold">24h</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/60">Response SLA</p>
              </div>
              <div className="rounded-2xl border border-white/12 bg-white/8 p-4 backdrop-blur-sm">
                <p className="text-2xl font-semibold">Live</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/60">Inputs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-8 sm:px-8 lg:px-12 lg:py-10">
        <div className="mx-auto grid max-w-[1480px] gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-8">
            <div className="grid gap-6 md:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Transport Mode</span>
                <select
                  value={mode}
                  onChange={(event) => setMode(event.target.value as Mode)}
                  className="mt-3 h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-base text-slate-900 outline-none focus:border-blue-500"
                >
                  <option>Road</option>
                  <option>Air</option>
                  <option>Ocean</option>
                  <option>Rail</option>
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Service Level</span>
                <select
                  value={serviceLevel}
                  onChange={(event) => setServiceLevel(event.target.value as ServiceLevel)}
                  className="mt-3 h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-base text-slate-900 outline-none focus:border-blue-500"
                >
                  <option>Standard</option>
                  <option>Express</option>
                  <option>Dedicated</option>
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Distance (km)</span>
                <input
                  type="number"
                  min={1}
                  value={distanceKm}
                  onChange={(event) => setDistanceKm(Number(event.target.value) || 0)}
                  className="mt-3 h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-base text-slate-900 outline-none focus:border-blue-500"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Shipment Weight (kg)</span>
                <input
                  type="number"
                  min={1}
                  value={weightKg}
                  onChange={(event) => setWeightKg(Number(event.target.value) || 0)}
                  className="mt-3 h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-base text-slate-900 outline-none focus:border-blue-500"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Stops / Handoffs</span>
                <input
                  type="number"
                  min={0}
                  value={stops}
                  onChange={(event) => setStops(Number(event.target.value) || 0)}
                  className="mt-3 h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-base text-slate-900 outline-none focus:border-blue-500"
                />
              </label>

              <div className="grid gap-3 pt-8">
                <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                  <input
                    type="checkbox"
                    checked={insurance}
                    onChange={(event) => setInsurance(event.target.checked)}
                    className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-slate-700">Cargo insurance</span>
                </label>
                <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                  <input
                    type="checkbox"
                    checked={temperatureControlled}
                    onChange={(event) => setTemperatureControlled(event.target.checked)}
                    className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-slate-700">Temperature controlled</span>
                </label>
              </div>
            </div>

            <div className="mt-8 rounded-[28px] bg-[linear-gradient(135deg,#e8eef9,#f7f9fc)] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                Calculation Logic
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/60 bg-white/70 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Mode Rate</p>
                  <p className="mt-2 text-xl font-semibold text-slate-950">{modeBaseRate[mode].toFixed(1)} / km</p>
                </div>
                <div className="rounded-2xl border border-white/60 bg-white/70 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Service Factor</p>
                  <p className="mt-2 text-xl font-semibold text-slate-950">{serviceMultiplier[serviceLevel].toFixed(2)}x</p>
                </div>
                <div className="rounded-2xl border border-white/60 bg-white/70 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Stops</p>
                  <p className="mt-2 text-xl font-semibold text-slate-950">{stops}</p>
                </div>
              </div>
            </div>
          </div>

          <aside className="rounded-[32px] bg-[linear-gradient(160deg,#08152d,#102449_58%,#152f59)] p-6 text-white shadow-[0_28px_80px_rgba(15,23,42,0.18)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-200/70">
              Estimated Price
            </p>
            <p className="mt-4 text-5xl font-semibold tracking-tight">
              ${total.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
            <p className="mt-3 max-w-[420px] text-base leading-7 text-white/72">
              This is a planning estimate based on your current inputs. Final commercial pricing can
              change with lane constraints, customs handling, partner capacity, and regulatory fees.
            </p>

            <div className="mt-8 grid gap-3">
              <div className="flex items-center justify-between rounded-2xl border border-white/12 bg-white/8 px-4 py-4">
                <span className="text-white/70">Base estimate</span>
                <span className="font-semibold">${estimate.subtotal.toFixed(0)}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/12 bg-white/8 px-4 py-4">
                <span className="text-white/70">Fuel surcharge</span>
                <span className="font-semibold">${estimate.fuelSurcharge.toFixed(0)}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/12 bg-white/8 px-4 py-4">
                <span className="text-white/70">Platform fee</span>
                <span className="font-semibold">${estimate.platformFee.toFixed(0)}</span>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <div className="rounded-2xl border border-white/12 bg-white/8 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-white/55">Lead Time</p>
                <p className="mt-2 text-xl font-semibold">{mode === "Air" ? "6-24 hrs" : mode === "Road" ? "1-3 days" : mode === "Rail" ? "2-5 days" : "5-12 days"}</p>
              </div>
              <div className="rounded-2xl border border-white/12 bg-white/8 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-white/55">Best Use</p>
                <p className="mt-2 text-xl font-semibold">{serviceLevel}</p>
              </div>
              <div className="rounded-2xl border border-white/12 bg-white/8 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-white/55">Mode</p>
                <p className="mt-2 text-xl font-semibold">{mode}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href="#"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-6 text-sm font-semibold text-slate-950 transition hover:bg-white/90"
              >
                Request Final Quote
              </a>
              <a
                href="/login"
                onClick={(event) => {
                  event.preventDefault();
                  navigate("/login");
                }}
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Save in Portal
              </a>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
