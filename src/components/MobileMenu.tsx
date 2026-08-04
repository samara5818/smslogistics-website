import type { MouseEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { navigate } from "../utils/navigation";

type NavItem = {
  label: string;
  href: string;
};

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  navItems: NavItem[];
};

export default function MobileMenu({ open, onClose, navItems }: MobileMenuProps) {
  const prefersReducedMotion = useReducedMotion();
  const isHomePage = window.location.pathname === "/";

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    onClose();

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
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            className="fixed inset-0 z-[1190] bg-black/45 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            className="fixed inset-y-0 right-0 z-[1200] flex w-full max-w-sm flex-col bg-white p-5 md:hidden"
            initial={prefersReducedMotion ? { opacity: 0 } : { x: "100%" }}
            animate={prefersReducedMotion ? { opacity: 1 } : { x: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
          >
            <div className="flex items-center justify-between">
              <img
                src="/images/sms-logistics-black.png"
                alt="sms LOGISTICS"
                className="h-9 w-auto"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 text-slate-900 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M6 6l12 12M18 6 6 18"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-8">
              <a
                href="#quote"
                onClick={(event) => handleNavClick(event, "#quote")}
                className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
              >
                Get a Demo
              </a>
            </div>

            <nav aria-label="Mobile" className="mt-10 flex flex-1 flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(event) => handleNavClick(event, item.href)}
                  className="group inline-flex w-fit text-2xl font-medium text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
                >
                  <span className="border-b border-transparent transition group-hover:border-slate-900">
                    {item.label}
                  </span>
                </a>
              ))}
            </nav>

          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
