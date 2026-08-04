import clsx from "clsx";
import type { MouseEvent } from "react";
import { useEffect, useState } from "react";
import { navigate } from "../utils/navigation";
import Container from "./Container";
import MobileMenu from "./MobileMenu";

const navItems = [
  { label: "Solutions", href: "#outcomes" },
  { label: "Operations", href: "/operations" },
  { label: "Technology", href: "/technology" },
  { label: "Coverage", href: "#coverage" },
  { label: "Pricing", href: "/pricing-calculator" },
  { label: "Careers", href: "/careers" },
];

type HeaderProps = {
  forceSolid?: boolean;
};

export default function Header({ forceSolid = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHomePage = window.location.pathname === "/";

  useEffect(() => {
    if (forceSolid) {
      setScrolled(true);
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [forceSolid]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const headerClasses = clsx(
    "fixed inset-x-0 top-0 z-[1100] transition-all duration-300",
    scrolled || forceSolid
      ? "border-b border-slate-200 bg-white/90 shadow-header backdrop-blur-xl"
      : "border-b border-white/20 bg-white/10 backdrop-blur-md",
  );

  const textColor = scrolled || forceSolid ? "text-slate-900" : "text-white";
  const focusClasses = scrolled || forceSolid
    ? "focus-visible:ring-slate-900 focus-visible:ring-offset-white"
    : "focus-visible:ring-white focus-visible:ring-offset-transparent";

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/")) {
      event.preventDefault();
      navigate(href);
      return;
    }

    if (href.startsWith("#")) {
      event.preventDefault();

      if (!isHomePage) {
        navigate(`/${href}`);
        return;
      }

      const target = document.querySelector(href);
      if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState({}, "", `/${href}`);
      }
    }
  };

  return (
    <>
      <header className={headerClasses}>
        <Container>
          <div className="grid h-16 grid-cols-[auto_1fr_auto] items-center gap-4 lg:h-[76px]">
            <a
              href="/"
              onClick={(event) => {
                event.preventDefault();
                navigate("/");
              }}
              className={clsx(
                "inline-flex items-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                focusClasses,
              )}
              aria-label="sms LOGISTICS"
            >
              <img
                src={scrolled || forceSolid ? "/images/sms-logistics-black.png" : "/images/sms-logistics-white.png"}
                alt="sms LOGISTICS"
                className="h-9 w-auto lg:h-10"
              />
            </a>

            <nav aria-label="Primary" className="hidden items-center justify-center gap-8 lg:flex">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(event) => handleNavClick(event, item.href)}
                  className={clsx(
                    "group text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                    textColor,
                    focusClasses,
                  )}
                >
                  <span className="border-b border-transparent pb-1 transition group-hover:border-current">
                    {item.label}
                  </span>
                </a>
              ))}
            </nav>

            <div className="flex items-center justify-end gap-2">
              <a
                href="#quote"
                aria-label="Request a Quote"
                onClick={(event) => handleNavClick(event, "#quote")}
                className={clsx(
                  "hidden h-11 min-w-[150px] items-center justify-center rounded-lg px-5 text-sm font-bold transition md:inline-flex",
                  scrolled || forceSolid
                    ? "bg-brand-700 text-white hover:bg-brand-600"
                    : "bg-white text-brand-800 hover:bg-blue-50",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                  focusClasses,
                )}
              >
                Request a Quote
              </a>

              <button
                type="button"
                aria-label="Open menu"
                onClick={() => setMobileOpen(true)}
                className={clsx(
                  "inline-flex h-10 w-10 items-center justify-center rounded-xl border transition md:hidden",
                  scrolled
                    ? "border-slate-300 text-slate-900 hover:bg-slate-100"
                    : "border-white/70 text-white hover:bg-white/10",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                  focusClasses,
                )}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </Container>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} navItems={navItems} />
    </>
  );
}
