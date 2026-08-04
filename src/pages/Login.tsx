import { motion } from "framer-motion";
import Header from "../components/Header";

const socialButtons = [
  { label: "Google", short: "G" },
  { label: "Microsoft", short: "M" },
  { label: "Warehouse SSO", short: "W" },
];

const featureStats = ["24/7 Lane Visibility", "Partner Workflows", "Exception Control"];

export default function Login() {
  return (
    <main className="h-screen overflow-hidden bg-[#eef1f5]">
      <Header forceSolid />
      <div className="grid h-full w-full overflow-hidden bg-white lg:grid-cols-[0.96fr_1.04fr]">
          <section
            className="relative z-10 flex items-center bg-[#fbfbfc] px-6 py-8 pt-24 sm:px-10 md:pt-28 lg:h-screen lg:px-14 lg:py-10 lg:pt-24"
            style={{ clipPath: "polygon(0 0, 88% 0, 100% 100%, 0 100%)" }}
          >
            <div className="mx-auto w-full max-w-[400px]">
              <div className="mt-8 lg:mt-10">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-600">
                  Control Tower Access
                </p>
                <h1 className="mt-3 text-[38px] font-semibold tracking-tight text-slate-950 lg:text-[44px]">
                  LOGIN
                </h1>
                <p className="mt-2.5 text-base leading-6 text-slate-400 lg:text-[18px] lg:leading-7">
                  Enter your details to access your operations workspace.
                </p>
              </div>

              <div className="mt-6 flex gap-3 lg:mt-8">
                {socialButtons.map((button) => (
                  <button
                    key={button.label}
                    type="button"
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-500 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-900 lg:h-14 lg:w-14"
                    aria-label={`Continue with ${button.label}`}
                  >
                    {button.short}
                  </button>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-4 lg:mt-7">
                <span className="h-px flex-1 bg-slate-200" />
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Or continue with email
                </p>
                <span className="h-px flex-1 bg-slate-200" />
              </div>

              <form className="mt-6 space-y-3.5 lg:mt-7 lg:space-y-4">
                <label className="block">
                  <span className="sr-only">Email address</span>
                  <div className="flex h-14 items-center gap-3 rounded-2xl bg-[#f2f5f8] px-4 lg:h-16 lg:px-5">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M4 6h16v12H4z" />
                      <path d="m4 7 8 6 8-6" />
                    </svg>
                    <input
                      type="email"
                      placeholder="Email address"
                      className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 lg:text-base"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="sr-only">Password</span>
                  <div className="flex h-14 items-center gap-3 rounded-2xl bg-[#f2f5f8] px-4 lg:h-16 lg:px-5">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M7 10V7a5 5 0 0 1 10 0v3" />
                      <rect x="5" y="10" width="14" height="10" rx="2" />
                    </svg>
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 lg:text-base"
                    />
                  </div>
                </label>

                <div className="flex flex-col gap-2.5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                  <label className="inline-flex items-center gap-3">
                    <input type="checkbox" className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className="font-semibold text-blue-600 transition hover:text-blue-700">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-[#1155f5] text-sm font-semibold uppercase tracking-[0.22em] text-white shadow-[0_16px_28px_rgba(17,85,245,0.32)] transition hover:bg-[#0d48d0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 lg:h-14 lg:text-base"
                >
                  Login
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-500 lg:mt-8 lg:text-base">
                Don&apos;t have an account yet?{" "}
                <a href="#" className="font-semibold text-blue-600 transition hover:text-blue-700">
                  Create account
                </a>
              </p>
            </div>
          </section>

          <section className="relative hidden overflow-hidden bg-[#0a1328] lg:flex lg:h-screen">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(25,63,157,0.88),rgba(98,66,91,0.82),rgba(7,10,23,0.95))]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(59,130,246,0.35),transparent_28%),radial-gradient(circle_at_78%_22%,rgba(249,115,22,0.2),transparent_24%),radial-gradient(circle_at_58%_78%,rgba(236,72,153,0.18),transparent_30%)]" />

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="relative z-10 flex w-full flex-col justify-between px-10 py-10 text-white xl:px-14 xl:py-14"
            >
              <div className="ml-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/85">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
                  <path d="M20.742 13.045A8.088 8.088 0 0 1 10.955 3.258a.75.75 0 0 0-.82-.957A9.5 9.5 0 1 0 21.699 13.865a.75.75 0 0 0-.957-.82Z" />
                </svg>
              </div>

              <div className="mx-auto max-w-[500px] pl-14 xl:max-w-[540px]">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/65">
                  SMS Logistics Access
                </p>
                <h2 className="mt-6 text-[46px] font-semibold leading-[1.02] tracking-tight text-white xl:text-[58px]">
                  The smartest way to manage freight operations today
                </h2>
                <p className="mt-5 max-w-[460px] text-[19px] leading-[1.5] text-white/78 xl:mt-6 xl:max-w-[500px] xl:text-[24px]">
                  Experience a connected logistics workspace designed for faster decisions, better ETA
                  control, and reliable partner execution.
                </p>

                <div className="mt-7 flex flex-wrap gap-3 xl:mt-8">
                  {featureStats.map((stat) => (
                    <span
                      key={stat}
                      className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90"
                    >
                      {stat}
                    </span>
                  ))}
                </div>

                <a
                  href="#"
                  className="mt-8 inline-flex h-14 min-w-[260px] items-center justify-center rounded-full bg-[#ff0b88] px-7 text-lg font-semibold text-white shadow-[0_18px_50px_rgba(255,11,136,0.38)] transition hover:bg-[#ec0b80] xl:mt-10 xl:h-16 xl:min-w-[300px] xl:px-8 xl:text-xl"
                >
                  Get started, it&apos;s free
                </a>
              </div>

              <p className="text-right text-sm font-semibold uppercase tracking-[0.32em] text-white/45">
                SMS Logistics Systems 2026
              </p>
            </motion.div>
          </section>
      </div>
    </main>
  );
}
