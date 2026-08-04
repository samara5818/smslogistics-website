import type { ReactNode } from "react";
import Container from "./Container";

type FooterLink = {
  label: string;
  href: string;
};

type FooterColumnProps = {
  title: string;
  links: FooterLink[];
};

type SocialLinkProps = {
  href: string;
  label: string;
  children: ReactNode;
};

const footerGroups: Array<{ title: string; links: FooterLink[] }> = [
  {
    title: "Solutions",
    links: [
      { label: "Visibility", href: "/solutions/visibility" },
      { label: "Exceptions", href: "/solutions/exceptions" },
      { label: "Cost Optimization", href: "/solutions/cost-optimization" },
      { label: "Partner Network", href: "/solutions/partner-network" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Retail", href: "/industries/retail" },
      { label: "Manufacturing", href: "/industries/manufacturing" },
      { label: "Pharma", href: "/industries/pharma" },
      { label: "E-commerce", href: "/industries/e-commerce" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "API Platform", href: "/platform/api" },
      { label: "Integrations", href: "/platform/integrations" },
      { label: "Developer Docs", href: "/platform/developer-docs" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/company/about" },
      { label: "Careers", href: "/company/careers" },
      { label: "Security", href: "/company/security" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Case Studies", href: "/resources/case-studies" },
      { label: "Pricing", href: "/resources/pricing" },
      { label: "Blog", href: "/resources/blog" },
      { label: "Status", href: "/resources/status" },
      { label: "Support", href: "/resources/support" },
      { label: "Documentation", href: "/resources/documentation" },
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

function SocialLink({ href, label, children }: SocialLinkProps) {
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-blue-200 bg-white text-brand-700 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-600 hover:bg-brand-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100"
    >
      {children}
    </a>
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
              Enterprise logistics command center
            </h3>
            <p className="mt-4 max-w-xl text-center text-lg leading-8 text-slate-600 lg:text-left">
              Enterprise logistics command center that connects shipments, partners, and supply chain
              events into one platform.
            </p>

            <div className="mt-6 flex items-center justify-center gap-3 lg:justify-start">
              <span className="text-sm font-bold text-brand-950">Follow:</span>
              <SocialLink href="https://www.linkedin.com" label="LinkedIn">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm7 0h3.84v1.71h.05c.54-1.02 1.86-2.1 3.83-2.1 4.1 0 4.86 2.7 4.86 6.2V21h-4v-5.55c0-1.32-.02-3.02-1.84-3.02-1.84 0-2.13 1.44-2.13 2.92V21h-4V9Z" />
                </svg>
              </SocialLink>
              <SocialLink href="https://x.com" label="X">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2H21l-6.01 6.87L22 22h-5.48l-4.29-5.62L7.2 22H4.44l6.43-7.34L2 2h5.62l3.88 5.13L18.244 2Zm-.96 18h1.52L6.8 3.9H5.2L17.284 20Z" />
                </svg>
              </SocialLink>
              <SocialLink href="https://github.com" label="GitHub">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.36-1.19-3.36-1.19-.46-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.88 1.52 2.31 1.08 2.88.82.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.12-4.56-4.97 0-1.1.4-2 1.03-2.7-.1-.25-.45-1.27.1-2.65 0 0 .85-.27 2.78 1.03a9.7 9.7 0 0 1 5.06 0c1.93-1.3 2.78-1.03 2.78-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.7 0 3.86-2.34 4.72-4.57 4.97.36.31.67.92.67 1.87v2.77c0 .27.18.59.69.48A10 10 0 0 0 12 2Z" />
                </svg>
              </SocialLink>
            </div>

          </div>

          <div className="md:col-span-2 lg:col-span-3">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
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
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:justify-end">
              <a href="/terms" className="transition hover:text-white">
                Terms
              </a>
              <span className="text-white/25">|</span>
              <a href="/privacy" className="transition hover:text-white">
                Privacy
              </a>
              <span className="text-white/25">|</span>
              <a href="/security" className="transition hover:text-white">
                Security
              </a>
              <span className="text-white/25">|</span>
              <a href="/compliance" className="transition hover:text-white">
                Compliance
              </a>
              <span className="text-white/25">|</span>
              <a href="/sustainability" className="transition hover:text-white">
                Sustainability
              </a>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
