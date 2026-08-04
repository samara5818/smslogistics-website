import { motion } from "framer-motion";
import Container from "./Container";

const clients = [
  "Retail Partner",
  "Pharma Distributor",
  "FMCG Supplier",
  "Manufacturing Unit",
  "E-commerce Seller",
  "Cold Chain Partner",
];

const trustStats = [
  { label: "On-Time Deliveries", value: "98%" },
  { label: "AP Coverage Window", value: "24-48 hrs" },
  { label: "Cities Served", value: "3+" },
];

export default function OurClients() {
  return (
    <motion.section
      id="our-clients"
      className="bg-white py-20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      aria-labelledby="our-clients-title"
    >
      <Container>
        <div className="max-w-3xl">
          <h2
            id="our-clients-title"
            className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
          >
            Our Clients
          </h2>
          <p className="mt-3 text-base leading-7 text-slate-600">
            Trusted by manufacturers, distributors, retailers, and e-commerce teams for
            reliable logistics execution across Andhra Pradesh.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {clients.map((client) => (
            <div
              key={client}
              className="flex min-h-20 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-5 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="text-sm font-semibold tracking-wide text-slate-500">
                {client}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {trustStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm"
            >
              <p className="text-lg font-semibold text-slate-900">{stat.value}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </motion.section>
  );
}
