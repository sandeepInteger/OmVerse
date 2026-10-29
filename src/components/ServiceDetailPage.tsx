import { Link, useParams } from "react-router-dom";
import { motion, type Variants } from "framer-motion";

import NotFoundPage from "./NotFoundPage";
import ServiceIcon from "./ServiceIcon";
import ServiceVisual from "./ServiceVisual";
import { ArrowIcon, CheckIcon, CtaBanner, Eyebrow, PageHero } from "./PageSections";
import { SERVICES, getService, testsForService } from "@/data/services";
import { ghostButton, primaryButton } from "@/lib/styles";
import { usePageMeta } from "@/lib/usePageMeta";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const service = getService(slug);
  usePageMeta(service?.title ?? "Page not found", service?.summary);

  if (!service) return <NotFoundPage />;

  const tests = testsForService(service);
  const others = SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <div className="w-full bg-[#f8faff]">
      <PageHero
        crumbs={[{ label: "Home", to: "/" }, { label: "Services", to: "/services" }, { label: service.label }]}
        badge={<Eyebrow>{service.label}</Eyebrow>}
        title={service.title}
        description={service.summary}
        actions={
          <>
            <Link to="/contact" state={{ service: service.label }} className={primaryButton}>Request a Quote</Link>
            {tests.length > 0 && (
              <a href="#scope" className={ghostButton}>View {tests.length} scoped tests <ArrowIcon /></a>
            )}
          </>
        }
        aside={<ServiceVisual service={service} className="aspect-[4/3] shadow-2xl" />}
      />

      {/* ── Overview + capabilities ───────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 py-20 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16">
        <div className="flex flex-col gap-6">
          <Eyebrow>Overview</Eyebrow>
          <h2 className="font-display text-4xl text-slate-900 tracking-tight leading-tight">What we deliver</h2>
          <p className="text-slate-600 leading-relaxed">{service.intro}</p>
          <ul className="flex flex-col gap-3">
            {service.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 text-slate-700 font-medium">
                <span
                  className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-white shrink-0"
                  style={{ background: `linear-gradient(135deg, ${service.accentFrom}, ${service.accentTo})` }}
                >
                  <CheckIcon className="w-3 h-3" />
                </span>
                {h}
              </li>
            ))}
          </ul>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {service.capabilities.map((c) => (
            <motion.div key={c.title} variants={fadeUp} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
              <span
                aria-hidden
                className="block w-10 h-1 rounded-full mb-5"
                style={{ background: `linear-gradient(90deg, ${service.accentFrom}, ${service.accentTo})` }}
              />
              <h3 className="text-lg font-bold text-slate-900 mb-2">{c.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{c.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Scoped tests ──────────────────────────────────────────────── */}
      {tests.length > 0 && (
        <section id="scope" className="bg-white border-y border-slate-100 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 py-20 flex flex-col gap-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="flex flex-col gap-4">
                <Eyebrow>Scope of the Laboratory</Eyebrow>
                <h2 className="font-display text-4xl text-slate-900 tracking-tight">Tests in our scope</h2>
              </div>
              <Link to="/lab-scope" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700">
                Full lab scope with ranges &amp; uncertainty <ArrowIcon />
              </Link>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full min-w-[640px] text-sm text-left">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th scope="col" className="px-5 py-3.5 font-semibold">Material</th>
                    <th scope="col" className="px-5 py-3.5 font-semibold">Parameter</th>
                    <th scope="col" className="px-5 py-3.5 font-semibold">Test method</th>
                    <th scope="col" className="px-5 py-3.5 font-semibold">Where</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tests.map((t) => (
                    <tr key={t.id} className="hover:bg-blue-50/40 transition-colors">
                      <td className="px-5 py-3 text-slate-500">{t.material}</td>
                      <td className="px-5 py-3 font-medium text-slate-800">{t.parameter}</td>
                      <td className="px-5 py-3 text-slate-600 whitespace-nowrap">{t.method}</td>
                      <td className="px-5 py-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          t.location === "Site" ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"
                        }`}>
                          {t.location === "Site" ? "On site" : "In lab"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ── Applications ──────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 py-20 flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <Eyebrow>Where It’s Used</Eyebrow>
          <h2 className="font-display text-4xl text-slate-900 tracking-tight">Typical applications</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {service.applications.map((a) => (
            <span key={a} className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-medium text-slate-700 shadow-sm">
              {a}
            </span>
          ))}
        </div>
      </section>

      {/* ── Other services ────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 pb-12 flex flex-col gap-8">
        <h2 className="text-xl font-bold text-slate-900">Other services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {others.map((o) => (
            <Link
              key={o.slug}
              to={`/services/${o.slug}`}
              className="group flex items-center gap-3 bg-white border border-slate-200/80 rounded-xl p-4 hover:border-blue-200 hover:shadow-md transition-all"
            >
              <span
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white shrink-0"
                style={{ background: `linear-gradient(135deg, ${o.accentFrom}, ${o.accentTo})` }}
              >
                <ServiceIcon icon={o.icon} />
              </span>
              <span className="flex-1 text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{o.label}</span>
              <span className="text-slate-300 group-hover:text-blue-500 transition-colors"><ArrowIcon /></span>
            </Link>
          ))}
        </div>
      </section>

      <CtaBanner />
    </div>
  );
};

export default ServiceDetailPage;
