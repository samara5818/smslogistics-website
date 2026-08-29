import { lazy, Suspense, useEffect, useState } from "react";
import Home from "./pages/Home";

const Login = lazy(() => import("./pages/Login"));
const PricingCalculator = lazy(() => import("./pages/PricingCalculator"));
const Operations = lazy(() => import("./pages/Operations"));
const Careers = lazy(() => import("./pages/Careers"));
const Technology = lazy(() => import("./pages/Technology"));

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

  let page = <Home />;
  if (path === "/login") page = <Login />;
  if (path === "/pricing-calculator") page = <PricingCalculator />;
  if (path === "/operations") page = <Operations />;
  if (path === "/careers") page = <Careers />;
  if (path === "/technology") page = <Technology />;

  return <Suspense fallback={<div className="min-h-screen bg-white" aria-label="Loading page" />}>{page}</Suspense>;
}
