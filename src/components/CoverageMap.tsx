import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CircleMarker, MapContainer, Popup, TileLayer, useMap } from "react-leaflet";
import Container from "./Container";

type CoveragePoint = {
  region: string;
  position: [number, number];
  summary: string;
  services: string[];
  partnerNote: string;
};

type Mode = "Ocean" | "Air" | "Road" | "Rail";

const center: [number, number] = [20, 0];
const locationRotationMs = 4200;

const modes: Mode[] = ["Ocean", "Air", "Road", "Rail"];

const coveragePoints: CoveragePoint[] = [
  {
    region: "Singapore Hub",
    position: [1.3521, 103.8198],
    summary: "APAC gateway supporting cross-dock operations and multimodal transfer planning.",
    services: ["Port transfer", "Cross-dock handling", "Carrier coordination"],
    partnerNote: "Regional forwarding partner enabled for fast handoffs.",
  },
  {
    region: "Rotterdam Corridor",
    position: [51.9244, 4.4777],
    summary: "European intake lane with customs visibility and rail handoff coverage.",
    services: ["Ocean arrival", "Rail handoff", "ETA exception monitoring"],
    partnerNote: "Customs broker support available for corridor operations.",
  },
  {
    region: "US Midwest Lane",
    position: [41.8781, -87.6298],
    summary: "High-volume inland routing with warehouse staging and SLA monitoring.",
    services: ["Road dispatch", "Warehouse staging", "Linehaul planning"],
    partnerNote: "Dedicated carrier pool active for regional distribution.",
  },
  {
    region: "Mumbai Network",
    position: [19.076, 72.8777],
    summary: "Domestic and export-facing operations with route control across western India.",
    services: ["Export coordination", "Drayage support", "Milestone tracking"],
    partnerNote: "Port and road partner coverage aligned for urgent movement.",
  },
];

const modeStats: Record<Mode, Array<{ label: string; value: string }>> = {
  Ocean: [
    { label: "Countries", value: "100+" },
    { label: "Ports", value: "250+" },
    { label: "Carriers", value: "12K+" },
    { label: "Events/Day", value: "1.6M" },
  ],
  Air: [
    { label: "Countries", value: "85+" },
    { label: "Airports", value: "180+" },
    { label: "Carriers", value: "4.8K+" },
    { label: "Events/Day", value: "720K" },
  ],
  Road: [
    { label: "Countries", value: "40+" },
    { label: "Road Hubs", value: "520+" },
    { label: "Carriers", value: "8.1K+" },
    { label: "Events/Day", value: "2.1M" },
  ],
  Rail: [
    { label: "Countries", value: "32+" },
    { label: "Rail Hubs", value: "140+" },
    { label: "Carriers", value: "1.2K+" },
    { label: "Events/Day", value: "380K" },
  ],
};

function MapResizeFix() {
  const map = useMap();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      map.invalidateSize();
    }, 250);

    return () => window.clearTimeout(timer);
  }, [map]);

  return null;
}

function ActiveLocationController({ point }: { point: CoveragePoint }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(point.position, 4, {
      animate: true,
      duration: 1.8,
    });
  }, [map, point]);

  return null;
}

export default function CoverageMap() {
  const [activeMode, setActiveMode] = useState<Mode>("Ocean");
  const [activePointIndex, setActivePointIndex] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    if (!autoRotate) {
      return;
    }

    const timer = window.setInterval(() => {
      setActivePointIndex((prev) => (prev + 1) % coveragePoints.length);
    }, locationRotationMs);

    return () => window.clearInterval(timer);
  }, [autoRotate]);

  const activePoint = coveragePoints[activePointIndex];

  return (
    <motion.section
      id="coverage"
      className="relative overflow-hidden bg-slate-950 py-16 sm:py-20 lg:py-24"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      aria-labelledby="coverage-title"
    >
      <div className="absolute inset-0 z-0">
        <MapContainer
          center={center}
          zoom={2}
          scrollWheelZoom={false}
          zoomControl
          style={{ height: "100%", width: "100%" }}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapResizeFix />
          <ActiveLocationController point={activePoint} />

          {coveragePoints.map((point, index) => {
            const isActive = index === activePointIndex;

            return (
              <CircleMarker
                key={point.region}
                center={point.position}
                radius={isActive ? 10 : 7}
                pathOptions={{
                  color: isActive ? "#dbeafe" : "#0f172a",
                  fillColor: isActive ? "#60a5fa" : "#1d4ed8",
                  fillOpacity: isActive ? 1 : 0.86,
                  weight: isActive ? 3 : 2,
                }}
              >
                <Popup>
                  <div className="max-w-[260px]">
                    <p className="font-semibold text-slate-900">{point.region}</p>
                    <p className="mt-2 text-sm text-slate-700">{point.summary}</p>
                    <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-slate-700">
                      {point.services.map((service) => (
                        <li key={`${point.region}-${service}`}>{service}</li>
                      ))}
                    </ul>
                    <p className="mt-2 text-xs text-slate-500">{point.partnerNote}</p>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </div>

      <Container className="relative z-20 max-w-none px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[640px] items-center justify-end py-6 sm:min-h-[700px] lg:pr-0">
          <div className="w-full max-w-[320px] p-2 text-white sm:max-w-[340px] lg:h-[220px] lg:w-[360px] lg:max-w-none">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-200/80">Coverage</p>
            <h2 id="coverage-title" className="mt-2 text-lg font-semibold tracking-tight sm:text-xl">
              Global map and live region context
            </h2>

            <div className="mt-3">
              <label htmlFor="coverage-location" className="sr-only">
                Select active location
              </label>
              <select
                id="coverage-location"
                value={activePointIndex}
                onChange={(event) => {
                  setAutoRotate(false);
                  setActivePointIndex(Number(event.target.value));
                }}
                className="h-9 w-full rounded-lg border border-white/35 bg-transparent px-3 text-sm font-medium text-white outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-300/30"
              >
                {coveragePoints.map((point, index) => (
                  <option key={point.region} value={index} className="bg-slate-900 text-white">
                    {point.region}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_120px]">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-100/70">
                  Active Location
                </p>
                <h3 className="mt-1 text-lg font-semibold">{activePoint.region}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-5 text-white/78">{activePoint.summary}</p>
                <p className="mt-2 text-[10px] uppercase tracking-wide text-white/55">{activePoint.partnerNote}</p>
              </div>

              <div className="grid gap-2 lg:grid-rows-3">
                {modeStats[activeMode].slice(0, 3).map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-white/15 bg-transparent px-3 py-2">
                    <p className="text-base font-semibold tracking-tight text-white">{stat.value}</p>
                    <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.14em] text-white/75">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 flex items-center gap-3 overflow-x-auto pb-1">
              {modes.map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => {
                    setAutoRotate(false);
                    setActiveMode(mode);
                  }}
                  className={`shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] transition ${
                    activeMode === mode
                      ? "text-amber-300"
                      : "text-white/75 hover:text-white"
                  }`}
                >
                  {mode}
                </button>
              ))}

              <a
                href="#quote"
                className="ml-auto inline-flex h-8 shrink-0 items-center justify-center rounded-lg border border-white/25 bg-transparent px-3 text-[10px] font-semibold text-white transition hover:bg-white/10"
              >
                Check Lanes
              </a>
            </div>
          </div>
        </div>
      </Container>
    </motion.section>
  );
}
