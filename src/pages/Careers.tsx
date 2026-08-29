import { FormEvent, useState } from "react";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";

type JobCategory = "All Roles" | "Operations" | "Technology" | "On-field";

const images = {
  hero: "/images/pages/careers/hero.png",
  technology: "/images/pages/careers/technology-team.png",
  team: "/images/pages/careers/team.png",
};

const jobs: Array<{ title: string; location: string; type: string; category: Exclude<JobCategory, "All Roles"> }> = [
  { title: "Regional Operations Coordinator", location: "Guntur, Andhra Pradesh", type: "Full-time", category: "Operations" },
  { title: "Logistics Platform Engineer", location: "Hybrid / Andhra Pradesh", type: "Full-time", category: "Technology" },
  { title: "Lead Delivery Associate", location: "Vijayawada, Andhra Pradesh", type: "Full-time / Shift", category: "On-field" },
];

const categories: JobCategory[] = ["All Roles", "Operations", "Technology", "On-field"];

export default function Careers() {
  const [category, setCategory] = useState<JobCategory>("All Roles");
  const [submitted, setSubmitted] = useState(false);

  const visibleJobs = category === "All Roles" ? jobs : jobs.filter((job) => job.category === category);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb]">
      <Header forceSolid />

      <main className="pt-16 lg:pt-[76px]">
        <section className="relative flex min-h-[680px] items-center overflow-hidden">
          <img src={images.hero} alt="Logistics professionals collaborating at a distribution center" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f7f9fb] via-[#f7f9fb]/95 to-[#f7f9fb]/10" />
          <Container className="relative py-20">
            <div className="max-w-2xl">
              <span className="inline-flex rounded bg-brand-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-brand-700">Build with SMS Logistics</span>
              <h1 className="mt-6 text-balance font-display text-4xl font-bold leading-tight tracking-tight text-brand-950 sm:text-5xl lg:text-[58px]">Build the future of logistics with us</h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">Join a team improving how freight is planned, monitored, and delivered. Grow your craft while solving practical supply-chain problems.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="#open-roles" className="inline-flex h-14 items-center justify-center rounded-lg bg-brand-700 px-8 text-sm font-bold text-white shadow-enterprise transition hover:-translate-y-0.5 hover:bg-brand-600">Explore open roles</a>
                <a href="#why-us" className="inline-flex h-14 items-center justify-center rounded-lg border border-slate-300 bg-white px-8 text-sm font-bold text-brand-700 transition hover:bg-slate-50">Why SMS Logistics?</a>
              </div>
            </div>
          </Container>
        </section>

        <section id="why-us" className="py-20 lg:py-24">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-700">A place to do meaningful work</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-brand-950 sm:text-4xl">Why join SMS Logistics?</h2>
              <p className="mt-4 leading-7 text-slate-600">We combine connected technology with operational discipline and a culture built around learning, ownership, and safety.</p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-12">
              <article className="enterprise-card overflow-hidden rounded-xl md:col-span-8 md:grid md:grid-cols-2">
                <div className="p-8 lg:p-10">
                  <span className="text-4xl text-brand-700">↗</span>
                  <h3 className="mt-5 font-display text-2xl font-bold">Tech-enabled growth</h3>
                  <p className="mt-4 leading-7 text-slate-600">Work with shipment visibility, route planning, exception workflows, and operational analytics that solve real customer problems.</p>
                  <ul className="mt-6 space-y-3 text-sm font-medium text-slate-700"><li className="flex gap-3"><span className="text-brand-600">✓</span>Connected logistics workflows</li><li className="flex gap-3"><span className="text-brand-600">✓</span>Practical data and automation challenges</li></ul>
                </div>
                <img src={images.technology} alt="Operations team using shipment technology" loading="lazy" decoding="async" className="h-full min-h-64 w-full object-cover" />
              </article>

              <article className="enterprise-card rounded-xl p-8 md:col-span-4 lg:p-10">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-2xl text-brand-700">◇</span>
                <h3 className="mt-6 font-display text-2xl font-bold">Safety-first culture</h3>
                <p className="mt-4 leading-7 text-slate-600">Clear procedures, responsible decisions, and continuous improvement shape how our teams work in the field and in the office.</p>
              </article>

              <article className="enterprise-card rounded-xl p-8 md:col-span-4 lg:p-10">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-2xl text-brand-700">↑</span>
                <h3 className="mt-6 font-display text-2xl font-bold">Visible career paths</h3>
                <p className="mt-4 leading-7 text-slate-600">Build deeper expertise, take ownership of larger problems, and grow across operational and technical disciplines.</p>
              </article>

              <article className="enterprise-card overflow-hidden rounded-xl md:col-span-8 md:grid md:grid-cols-2">
                <img src={images.team} alt="A collaborative logistics team" loading="lazy" decoding="async" className="h-full min-h-64 w-full object-cover" />
                <div className="p-8 lg:p-10">
                  <h3 className="font-display text-2xl font-bold">Work that supports people</h3>
                  <p className="mt-4 leading-7 text-slate-600">We aim to create a stable, respectful environment where good work is recognized and teams can build for the long term.</p>
                  <div className="mt-6 grid grid-cols-2 gap-3"><div className="rounded-lg bg-slate-100 p-4"><span className="text-xs font-bold uppercase tracking-wider text-brand-700">Growth</span><p className="mt-1 font-semibold">Continuous learning</p></div><div className="rounded-lg bg-slate-100 p-4"><span className="text-xs font-bold uppercase tracking-wider text-brand-700">Culture</span><p className="mt-1 font-semibold">Team ownership</p></div></div>
                </div>
              </article>
            </div>
          </Container>
        </section>

        <section id="open-roles" className="bg-[#eef1f4] py-20 lg:py-24">
          <Container>
            <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
              <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-700">Open opportunities</p><h2 className="mt-3 font-display text-3xl font-bold text-brand-950 sm:text-4xl">Find your next role</h2><p className="mt-4 text-slate-600">Explore current opportunities by team and working style.</p></div>
              <div className="flex max-w-full gap-1 overflow-x-auto rounded-lg bg-slate-200 p-1">
                {categories.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className={`shrink-0 rounded-md px-4 py-2 text-sm font-semibold transition ${category === item ? "bg-white text-brand-700 shadow-sm" : "text-slate-600 hover:bg-white/50"}`}>{item}</button>)}
              </div>
            </div>

            <div className="mt-10 space-y-4">
              {visibleJobs.map((job) => (
                <article key={job.title} className="enterprise-card flex flex-col justify-between gap-5 rounded-xl p-6 md:flex-row md:items-center">
                  <div className="flex items-start gap-4"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-50 font-bold text-brand-700">SMS</span><div><h3 className="font-display text-xl font-bold text-slate-950">{job.title}</h3><p className="mt-2 text-sm text-slate-500">{job.location} <span className="mx-2">•</span> {job.type}</p></div></div>
                  <div className="flex items-center gap-4"><span className="rounded bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-700">{job.category}</span><a href="#quick-application" className="font-bold text-brand-700" aria-label={`Apply for ${job.title}`}>Apply →</a></div>
                </article>
              ))}
            </div>
            <p className="mt-10 text-center text-sm text-slate-600">Don&apos;t see the right role? <a href="#quick-application" className="font-bold text-brand-700 hover:underline">Join our talent community</a></p>
          </Container>
        </section>

        <section id="quick-application" className="bg-white py-20 lg:py-24">
          <Container>
            <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-700">Start a conversation</p>
                <h2 className="mt-3 font-display text-3xl font-bold text-brand-950 sm:text-4xl">Quick application</h2>
                <p className="mt-5 text-lg leading-8 text-slate-600">Tell us what kind of work interests you. This form prepares your details locally; backend delivery can be connected when the recruitment workflow is ready.</p>
                <ol className="mt-8 space-y-5">{["Share your details and interest area.", "Talent-team review and initial conversation.", "Role-specific interview and assessment."].map((step, index) => <li key={step} className="flex items-center gap-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-700">{index + 1}</span><span>{step}</span></li>)}</ol>
                <div className="mt-10 rounded-xl border border-slate-200 bg-slate-100 p-5"><p className="font-bold">Application questions?</p><p className="mt-1 text-sm text-slate-600">Contact the SMS Logistics team through the company&apos;s verified recruitment channel.</p></div>
              </div>

              <form onSubmit={handleSubmit} className="enterprise-card rounded-2xl p-7 sm:p-10">
                {submitted ? (
                  <div className="py-16 text-center"><span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl text-green-700">✓</span><h3 className="mt-5 font-display text-2xl font-bold">Application prepared</h3><p className="mt-3 text-slate-600">Thanks for your interest. Connect this form to a recruitment backend before using it for live submissions.</p><button type="button" onClick={() => setSubmitted(false)} className="mt-6 text-sm font-bold text-brand-700 hover:underline">Submit another response</button></div>
                ) : (
                  <div className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-semibold text-slate-700">Full name<input required type="text" placeholder="Your name" className="mt-2 h-12 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 outline-none focus:border-brand-600 focus:ring-2 focus:ring-blue-100" /></label><label className="text-sm font-semibold text-slate-700">Phone number<input required type="tel" placeholder="+91 00000 00000" className="mt-2 h-12 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 outline-none focus:border-brand-600 focus:ring-2 focus:ring-blue-100" /></label></div>
                    <label className="block text-sm font-semibold text-slate-700">Email address<input required type="email" placeholder="you@example.com" className="mt-2 h-12 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 outline-none focus:border-brand-600 focus:ring-2 focus:ring-blue-100" /></label>
                    <label className="block text-sm font-semibold text-slate-700">Preferred role category<select required defaultValue="" className="mt-2 h-12 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 outline-none focus:border-brand-600"><option value="" disabled>Select a category</option><option>Operations</option><option>Technology</option><option>On-field Delivery</option><option>Corporate</option></select></label>
                    <label className="block rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-7 text-center text-sm text-slate-500 transition hover:bg-slate-100"><span className="block font-bold text-brand-700">Upload resume</span><span className="mt-1 block text-xs">PDF or DOC, up to 5MB</span><input type="file" accept=".pdf,.doc,.docx" className="mt-4 block w-full text-xs" /></label>
                    <button type="submit" className="h-14 w-full rounded-lg bg-brand-700 text-sm font-bold text-white shadow-enterprise transition hover:bg-brand-600">Prepare application</button>
                    <p className="text-center text-xs leading-5 text-slate-500">Your details are not transmitted until a recruitment backend is connected.</p>
                  </div>
                )}
              </form>
            </div>
          </Container>
        </section>

        <section className="relative overflow-hidden bg-brand-700 py-16 text-center text-white">
          <Container className="relative">
            <h2 className="font-display text-4xl font-bold sm:text-5xl">Build what moves business forward</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-100">Bring your operational experience, technical curiosity, and customer focus to SMS Logistics.</p>
            <a href="#open-roles" className="mt-9 inline-flex h-14 items-center justify-center rounded-lg bg-white px-9 text-sm font-bold text-brand-800 transition hover:-translate-y-0.5 hover:bg-blue-50">View all jobs</a>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
