import { useEffect, useState } from "react";
import { CircleMarker, MapContainer, Popup, TileLayer, useMap } from "react-leaflet";
import Container from "./Container";

type CoverageMarker = {
  name: string;
  position: [number, number];
  detail: string;
};

const markers: CoverageMarker[] = [
  {
    name: "Chicago, US",
    position: [41.8781, -87.6298],
    detail: "Road + rail consolidation lane",
  },
  {
    name: "Rotterdam, EU",
    position: [51.9244, 4.4777],
    detail: "Ocean hub with customs partner",
  },
  {
    name: "Mumbai, India",
    position: [19.076, 72.8777],
    detail: "Domestic + export operations",
  },
  {
    name: "Singapore",
    position: [1.3521, 103.8198],
    detail: "APAC transshipment gateway",
  },
];

const statPills = ["100+ Countries", "250+ Ports", "12K+ Carriers"];
const proofChips = ["Multimodal", "Predictive ETAs", "API + EDI"];

function ScrollWheelController({ enabled }: { enabled: boolean }) {
  const map = useMap();

  useEffect(() => {
    if (enabled) {
      map.scrollWheelZoom.enable();
      return;
    }

    map.scrollWheelZoom.disable();
  }, [enabled, map]);

  return null;
}

export default function MapHero() {
  const [scrollZoomEnabled, setScrollZoomEnabled] = useState(false);

  return (
    <section className="relative min-h-screen overflow-hidden" aria-label="Map Hero">
      <div className="absolute inset-0 z-0">
        <MapContainer
          center={[20, 0]}
          zoom={2}
          zoomControl
          scrollWheelZoom={false}
          className="h-full w-full"
          style={{ filter: "brightness(0.85) saturate(0.85) contrast(1.05)" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ScrollWheelController enabled={scrollZoomEnabled} />

          {markers.map((marker) => (
            <CircleMarker
              key={marker.name}
              center={marker.position}
              radius={7}
              pathOptions={{
                color: "#0f172a",
                fillColor: "#2563eb",
                fillOpacity: 0.95,
                weight: 2,
              }}
            >
              <Popup>
                <div className="min-w-[180px]">
                  <p className="font-semibold text-slate-900">{marker.name}</p>
                  <p className="mt-1 text-sm text-slate-700">{marker.detail}</p>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0.75),rgba(2,6,23,0.45),rgba(2,6,23,0.85))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(148,163,184,0.09),transparent_42%),radial-gradient(circle_at_70%_30%,rgba(30,41,59,0.18),transparent_45%)]" />
      </div>

      <div className="pointer-events-none relative z-20 flex min-h-screen items-center py-28">
        <Container>
          <div className="pointer-events-none relative flex items-start justify-between gap-8">
            <div className="pointer-events-auto max-w-[640px] rounded-2xl border border-white/10 bg-white/5 p-6 text-white shadow-2xl backdrop-blur-xl sm:p-8">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Global coverage across modes and regions
              </h1>
              <p className="mt-4 text-base leading-7 text-white/85 sm:text-lg">
                Track lanes, partners, and supply chain events in real time.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <a
                  href="/request-demo"
                  className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-white px-6 text-sm font-semibold text-slate-900 transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 sm:w-auto"
                >
                  Request Demo
                </a>
                <a
                  href="#coverage"
                  className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-white/40 bg-white/10 px-6 text-sm font-semibold text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 sm:w-auto"
                >
                  Check Coverage
                </a>
              </div>

              <button
                type="button"
                onClick={() => setScrollZoomEnabled((prev) => !prev)}
                className="mt-4 inline-flex h-10 items-center justify-center rounded-lg border border-white/30 bg-slate-950/35 px-4 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-slate-900/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                {scrollZoomEnabled ? "Disable scroll zoom" : "Enable scroll zoom"}
              </button>

              <div className="mt-5 flex flex-wrap gap-2">
                {proofChips.map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex h-8 items-center rounded-md border border-white/25 bg-white/10 px-3 text-xs font-medium text-white/95"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <div className="hidden pointer-events-none flex-col gap-3 lg:flex">
              {statPills.map((pill) => (
                <div
                  key={pill}
                  className="rounded-xl border border-white/20 bg-slate-950/45 px-4 py-3 text-sm font-semibold text-white/95 backdrop-blur-md"
                >
                  {pill}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
