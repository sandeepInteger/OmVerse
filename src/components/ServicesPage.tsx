import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";

import ServiceIcon from "./ServiceIcon";
import { ArrowIcon, CheckIcon, CtaBanner, Eyebrow, PageHero } from "./PageSections";
import { SERVICES, testsForService } from "@/data/services";
import { labSummary } from "@/data/labScope";
import { ghostButton, primaryButton } from "@/lib/styles";
import { usePageMeta } from "@/lib/usePageMeta";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

const PROCESS = [
  { title: "Enquiry & scope", body: "Tell us the material, quantity, location and the standard you need to comply with." },
  { title: "Sampling", body: "Our field team collects samples or carries out in-situ tests at your site." },
  { title: "Laboratory testing", body: "Tests are performed to the specified IS method using calibrated equipment." },
  { title: "Report", body: "You receive a clear report with results, method and the applicable requirement." },
];

const ServicesPage = () => {
  usePageMeta("Services", "Soil, material and construction material testing services from OmVerse.");

  return (
    <div className="w-full bg-[#f8faff]">
      <PageHero
        crumbs={[{ label: "Home", to: "/" }, { label: "Services" }]}
        badge={<Eyebrow>Our Services</Eyebrow>}
        title="Testing & Engineering"
        highlight="Solutions"
        description="From the soil under your foundation to the concrete in your structure — accurate field and laboratory testing that helps you build safely and to specification."
        actions={
          <>
            <Link to="/contact" className={primaryButton}>Get a Free Quote</Link>
            <Link to="/lab-scope" className={ghostButton}>View Lab Scope <ArrowIcon /></Link>
          </>
        }
        aside={
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: SERVICES.length, label: "Service lines" },
              { value: labSummary.tests, label: "Tests in lab scope" },
              { value: labSummary.standards, label: "IS / DIN standards" },
              { value: labSummary.siteTests, label: "On-site field tests" },
            ].map((s) => (
              <div key={s.label} className="bg-white/90 border border-slate-200/80 rounded-2xl px-5 py-5 shadow-sm">
                <p className="text-3xl font-extrabold text-blue-600 tabular-nums">{s.value}</p>
                <p className="text-sm text-slate-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        }
      />

      {/* ── Service cards ─────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 py-20">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {SERVICES.map((svc) => {
            const tests = testsForService(svc).length;
            return (
              <motion.div key={svc.slug} variants={fadeUp}>
                <Link
                  to={`/services/${svc.slug}`}
                  className="group relative h-full flex flex-col gap-5 bg-white border border-slate-200/80 rounded-2xl p-7 shadow-sm hover:shadow-xl hover:shadow-blue-100/60 hover:-translate-y-1 hover:border-blue-200 transition-all duration-300 overflow-hidden"
                >
                  <span
                    aria-hidden
                    className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: `linear-gradient(90deg, ${svc.accentFrom}, ${svc.accentTo})` }}
                  />
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md"
                      style={{ background: `linear-gradient(135deg, ${svc.accentFrom}, ${svc.accentTo})` }}
                    >
                      <ServiceIcon icon={svc.icon} className="w-6 h-6" />
                    </span>
                    {tests > 0 && (
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 rounded-full px-2.5 py-1">
                        {tests} scoped tests
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">{svc.title}</h2>
                    <p className="text-sm text-slate-500 leading-relaxed">{svc.summary}</p>
                  </div>
                  <ul className="flex flex-col gap-2 mt-auto">
                    {svc.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="mt-0.5 text-blue-500"><CheckIcon /></span>
                        {h}
                      </li>
                    ))}
                  </ul>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 pt-2 border-t border-slate-100">
                    Learn more
                    <span className="transition-transform group-hover:translate-x-1"><ArrowIcon /></span>
                  </span>
                </Link>
              </motion.div>
            );
          })}

          {/* Lab scope card fills the last grid slot */}
          <motion.div variants={fadeUp}>
            <Link
              to="/lab-scope"
              className="group h-full flex flex-col justify-between gap-6 rounded-2xl p-7 bg-gradient-to-br from-slate-900 to-blue-950 text-white hover:-translate-y-1 transition-all duration-300 shadow-lg"
            >
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-blue-300">Scope of the Laboratory</span>
                <h2 className="text-2xl font-bold tracking-tight">Looking for a specific test?</h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Search all {labSummary.tests} tests by material, parameter or IS code — with testing range and measurement uncertainty.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-300">
                Browse the test explorer
                <span className="transition-transform group-hover:translate-x-1"><ArrowIcon /></span>
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Process ───────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-20 flex flex-col gap-12">
          <div className="flex flex-col items-center text-center gap-4">
            <Eyebrow>How We Work</Eyebrow>
            <h2 className="font-display text-4xl sm:text-5xl text-slate-900 tracking-tight">From sample to signed report</h2>
          </div>
          <motion.ol
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {PROCESS.map((step, i) => (
              <motion.li key={step.title} variants={fadeUp} className="relative flex flex-col gap-3 rounded-2xl bg-slate-50 border border-slate-100 p-6">
                <span className="text-sm font-bold text-blue-600 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.body}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
};

export default ServicesPage;
