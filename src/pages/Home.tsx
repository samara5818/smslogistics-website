import CoverageMap from "../components/CoverageMap";
import Footer from "../components/Footer";
import FinalCTA from "../components/FinalCTA";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Outcomes from "../components/Outcomes";
import Testimonials from "../components/Testimonials";
import TrustStrip from "../components/TrustStrip";
import HowItWorks from "../components/HowItWorks";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <Hero />
        <TrustStrip />
        <Outcomes />
        <HowItWorks />
        <CoverageMap />
        <Testimonials />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}
