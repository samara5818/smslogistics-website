import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PricingCalculator from "./pages/PricingCalculator";
import Operations from "./pages/Operations";
import Careers from "./pages/Careers";
import Technology from "./pages/Technology";

export default function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const navigationEntry = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;

    if (
      window.location.pathname === "/" &&
      window.location.hash &&
      navigationEntry?.type === "reload"
    ) {
      window.history.replaceState({}, "", `${window.location.pathname}${window.location.search}`);
      window.scrollTo({ top: 0, behavior: "auto" });
      setPath(window.location.pathname);
    }

    const syncPath = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener("popstate", syncPath);
    window.addEventListener("app:navigate", syncPath);

    return () => {
      window.removeEventListener("popstate", syncPath);
      window.removeEventListener("app:navigate", syncPath);
    };
  }, []);

  if (path === "/login") {
    return <Login />;
  }

  if (path === "/pricing-calculator") {
    return <PricingCalculator />;
  }

  if (path === "/operations") {
    return <Operations />;
  }

  if (path === "/careers") {
    return <Careers />;
  }

  if (path === "/technology") {
    return <Technology />;
  }

  return <Home />;
}
