import Container from "./Container";

type FooterLink = {
  label: string;
  href: string;
};

type FooterColumnProps = {
  title: string;
  links: FooterLink[];
};

const footerGroups: Array<{ title: string; links: FooterLink[] }> = [
  {
    title: "Services",
    links: [
      { label: "Freight Coordination", href: "/#outcomes" },
      { label: "Warehouse Support", href: "/#outcomes" },
      { label: "Route Planning", href: "/#outcomes" },
      { label: "Last-mile Delivery", href: "/#outcomes" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Operations", href: "/operations" },
      { label: "Technology", href: "/technology" },
      { label: "Coverage", href: "/#coverage" },
      { label: "Pricing", href: "/pricing-calculator" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Request a Quote", href: "/#quote" },
      { label: "Email Operations", href: "mailto:team@smslogisticsin.com" },
      { label: "Careers", href: "/careers" },
    ],
  },
];

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-brand-800">{title}</h3>
      <ul className="mt-4 space-y-3">
        {links.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className="text-sm text-slate-600 transition hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer
      className="border-t border-slate-200 bg-slate-100 text-slate-900"
      aria-labelledby="footer-title"
    >
      <Container>
        <div className="grid gap-12 py-14 md:grid-cols-3 md:py-16 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex justify-center lg:justify-start">
              <img src="/images/sms-logistics-black.png" alt="SMS Logistics" className="h-20 w-auto sm:h-24" />
            </div>
            <h3
              id="footer-title"
              className="mt-6 text-center font-display text-4xl font-bold tracking-tight text-brand-950 lg:text-left"
            >
              Logistics support that keeps business moving
            </h3>
            <p className="mt-4 max-w-xl text-center text-lg leading-8 text-slate-600 lg:text-left">
              Freight transport, warehouse coordination, route planning, and last-mile delivery
              support across Guntur and key Andhra Pradesh corridors.
            </p>

          </div>

          <div className="md:col-span-2 lg:col-span-3">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
              {footerGroups.map((group) => (
                <FooterColumn key={group.title} title={group.title} links={group.links} />
              ))}
            </div>
          </div>
        </div>
      </Container>

      <div className="border-t border-slate-200 bg-white/60">
        <Container>
          <div className="py-6 text-center">
            <p className="text-sm font-semibold text-slate-700">
              Connected operations <span className="mx-2 text-slate-300">|</span> Multimodal visibility
              <span className="mx-2 text-slate-300">|</span> Partner workflows
            </p>
          </div>
        </Container>
      </div>

      <div className="border-t border-slate-200 bg-brand-950 text-white">
        <Container>
          <div className="flex min-h-[56px] flex-col items-center justify-center gap-2 py-3 text-center text-sm text-white/70 sm:flex-row sm:justify-between sm:text-left">
            <p>© 2026 SMS Logistics. All rights reserved.</p>
            <a href="mailto:team@smslogisticsin.com" className="transition hover:text-white">team@smslogisticsin.com</a>
          </div>
        </Container>
      </div>
    </footer>
  );
}
