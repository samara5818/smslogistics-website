import { lazy, Suspense } from "react";
import Footer from "../components/Footer";
import FinalCTA from "../components/FinalCTA";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Outcomes from "../components/Outcomes";
import Testimonials from "../components/Testimonials";
import TrustStrip from "../components/TrustStrip";
import HowItWorks from "../components/HowItWorks";

const CoverageMap = lazy(() => import("../components/CoverageMap"));

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <Hero />
        <TrustStrip />
        <Outcomes />
        <HowItWorks />
        <Suspense fallback={<section className="min-h-[640px] bg-slate-950" aria-label="Loading coverage map" />}>
          <CoverageMap />
        </Suspense>
        <Testimonials />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}
