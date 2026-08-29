import Container from "./Container";
import { useState } from "react";

const proofChips = ["Freight Transport", "Warehouse Support", "Last-mile Delivery"];

export default function Hero() {
  const [videoFailed, setVideoFailed] = useState(false);
  return (
    <section
      id="top"
      className="relative flex min-h-[720px] items-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black lg:min-h-screen"
      aria-label="Hero"
    >
      {!videoFailed && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setVideoFailed(true)}
          aria-hidden="true"
        >
          <source src="/videos/hero_footage.mp4" type="video/mp4" />
        </video>
      )}

      <div
        className="absolute inset-0 bg-gradient-to-r from-[#071a35]/95 via-[#071a35]/65 to-transparent"
        aria-hidden="true"
      />

      <Container className="relative z-10 pb-20 pt-32 lg:pt-36">
        <div className="grid items-center gap-12">
          <div className="max-w-[760px]">
            <div className="mb-6 inline-flex items-center rounded border border-blue-300/30 bg-blue-500/15 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-blue-100 backdrop-blur-md">
              Logistics support across Andhra Pradesh
            </div>
            <h1 className="text-balance font-display text-4xl font-bold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[64px]">
              Reliable logistics, from pickup to final delivery.
            </h1>

            <p className="mt-6 max-w-[620px] text-base leading-8 text-slate-200 sm:text-xl">
              Freight movement, warehouse coordination, route planning, and last-mile delivery from
              a team focused on clear communication and dependable execution.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <a
                href="#quote"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-brand-600 px-8 text-sm font-bold text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Request a Quote
                <span aria-hidden="true">→</span>
              </a>
              <a href="#coverage" className="inline-flex h-14 items-center justify-center rounded-lg border border-white/30 bg-white/10 px-8 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20">
                Explore Coverage
              </a>
            </div>

            <div className="mt-8 flex gap-2 overflow-x-auto pb-1">
              {proofChips.map((chip) => (
                <span
                  key={chip}
                  className="inline-flex h-8 shrink-0 items-center rounded-md border border-white/35 bg-white/10 px-3 text-xs font-medium text-white/90"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
