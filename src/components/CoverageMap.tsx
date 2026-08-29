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

const center: [number, number] = [16.4, 80.55];
const locationRotationMs = 4200;

const modes: Mode[] = ["Ocean", "Air", "Road", "Rail"];

const coveragePoints: CoveragePoint[] = [
  {
    region: "Guntur",
    position: [16.3067, 80.4365],
    summary: "Core service area for freight coordination, warehouse support, and local delivery.",
    services: ["Freight coordination", "Warehouse support", "Last-mile delivery"],
    partnerNote: "Contact us to confirm service availability for your pickup and destination.",
  },
  {
    region: "Vijayawada",
    position: [16.5062, 80.648],
    summary: "Regional corridor support for scheduled freight and distribution movements.",
    services: ["Road freight", "Delivery scheduling", "Route coordination"],
    partnerNote: "Coverage depends on shipment type, timing, and handling requirements.",
  },
  {
    region: "Amaravati",
    position: [16.573, 80.3575],
    summary: "Local and regional logistics coordination across the capital-region corridor.",
    services: ["Local dispatch", "Route planning", "Business deliveries"],
    partnerNote: "Ask our team to confirm the right service plan for your movement.",
  },
];

const modeStats: Record<Mode, Array<{ label: string; value: string }>> = {
  Ocean: [
    { label: "Support", value: "Port" },
    { label: "Planning", value: "Routes" },
    { label: "Handling", value: "Cargo" },
    { label: "Updates", value: "Direct" },
  ],
  Air: [
    { label: "Support", value: "Airport" },
    { label: "Planning", value: "Time" },
    { label: "Handling", value: "Cargo" },
    { label: "Updates", value: "Direct" },
  ],
  Road: [
    { label: "Support", value: "Pickup" },
    { label: "Planning", value: "Lanes" },
    { label: "Handling", value: "Freight" },
    { label: "Updates", value: "Direct" },
  ],
  Rail: [
    { label: "Support", value: "Station" },
    { label: "Planning", value: "Links" },
    { label: "Handling", value: "Freight" },
    { label: "Updates", value: "Direct" },
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
    map.flyTo(point.position, 10, {
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
          zoom={9}
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
        <div className="flex min-h-[640px] items-center justify-center py-8 sm:min-h-[700px] sm:justify-end lg:pr-4">
          <div className="w-full max-w-[380px] rounded-2xl border border-white/15 bg-slate-950/90 p-5 text-white shadow-2xl backdrop-blur-md sm:p-6 lg:w-[400px] lg:max-w-none">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">Coverage</p>
            <h2 id="coverage-title" className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
              Regional service coverage
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
                className="h-11 w-full rounded-lg border border-white/25 bg-slate-900 px-3 text-sm font-medium text-white outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-300/30"
              >
                {coveragePoints.map((point, index) => (
                  <option key={point.region} value={index} className="bg-slate-900 text-white">
                    {point.region}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_120px]">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-100/70">
                  Active Location
                </p>
                <h3 className="mt-1 text-lg font-semibold">{activePoint.region}</h3>
                <p className="mt-2 text-sm leading-6 text-white/80">{activePoint.summary}</p>
                <p className="mt-3 text-xs leading-5 text-white/60">{activePoint.partnerNote}</p>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:grid-cols-1 sm:grid-rows-3">
                {modeStats[activeMode].slice(0, 3).map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-white/15 bg-white/10 px-3 py-2">
                    <p className="text-base font-semibold tracking-tight text-white">{stat.value}</p>
                    <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.14em] text-white/75">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-white/15 pt-4">
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
                className="ml-auto inline-flex h-9 shrink-0 items-center justify-center rounded-lg border border-white/25 bg-white/10 px-4 text-xs font-semibold text-white transition hover:bg-white/20"
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
