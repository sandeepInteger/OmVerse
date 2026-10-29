import { motion, type Variants, type Transition } from "framer-motion";

const spring: Transition = { duration: 0.6, ease: "easeOut" };

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: spring },
};

const popIn: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: "easeOut" } },
};

const stagger = (s = 0.1): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: s } },
});

// ── Data ──────────────────────────────────────────────────────────
const metrics = [
  {
    label: "Construction Companies",
    description: "Soil investigation, foundation analysis, and material testing for residential and commercial projects.",
    bg: "bg-[#f0f5c8]",
    iconBg: "bg-[#e2ee9a] text-[#5a7300]",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M2 20 L5.5 6 M22 20 L18.5 6 M5.5 6 Q12 14 18.5 6 M8 13 Q12 18 16 13" />
      </svg>
    ),
  },
  {
    label: "Infrastructure Projects",
    description: "Quality testing solutions for roads, bridges, and large-scale infrastructure development..",
    bg: "bg-white border border-slate-200",
    iconBg: "bg-slate-100 text-slate-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="7" y="7" width="10" height="10" rx="1.5" />
        <path d="M9 7V4M12 7V4M15 7V4M9 17v3M12 17v3M15 17v3M7 9H4M7 12H4M7 15H4M17 9h3M17 12h3M17 15h3" />
      </svg>
    ),
  },
  {
    label: "Real Estate Developers",
    description: "Construction material and soil testing support for safe and reliable building projects.",
    bg: "bg-[#dbeafe]",
    iconBg: "bg-blue-100 text-blue-600",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01" />
      </svg>
    ),
  },
  {
    label: "Government Projects",
    description: "Testing and engineering services for public infrastructure and development works.",
    bg: "bg-[#f1f5f9]",
    iconBg: "bg-slate-200 text-slate-600",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M3 12h4l3-9 4 18 3-9h4" />
      </svg>
    ),
  },
  {
    label: "Contractors & Builders",
    description: "On-site inspection, quality analysis, and construction material evaluation services.",
    bg: "bg-[#fce7f3]",
    iconBg: "bg-pink-100 text-pink-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M3 21h18M9 21V7l7-4v18M9 7H5v14M13 11h2M13 15h2" />
      </svg>
    ),
  },
  {
    label: "Industrial Projects",
    description: "Material testing and engineering assessment for factories, industrial plants, and heavy construction projects.",
    bg: "bg-[#dcfce7]",
    iconBg: "bg-emerald-100 text-emerald-600",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
];

// ── Single card ───────────────────────────────────────────────────
const MetricCard = ({ label, description, bg, iconBg, icon }: (typeof metrics)[0]) => (
  <motion.div
    variants={popIn}
    className={`${bg} rounded-2xl p-6 flex flex-col gap-4 group hover:-translate-y-1 transition-transform duration-200`}
  >
    {/* Icon */}
    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
      {icon}
    </div>

    {/* Text */}
    <div className="flex flex-col gap-1.5">
      <p className="text-sm font-extrabold text-slate-900 leading-snug">{label}</p>
      <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
    </div>

  </motion.div>
);

// ── Section ───────────────────────────────────────────────────────
const EfficiencyMetrics = () => (
  <section className="w-full bg-white py-20 px-6 overflow-hidden">
    <div className="max-w-6xl mx-auto">

      {/* Header */}
      <motion.div
        className="flex flex-col items-center text-center gap-4 mb-14"
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.span
          variants={fadeUp}
          className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          Our Clients
        </motion.span>

        <motion.h2
          variants={fadeUp}
          className="text-5xl sm:text-6xl font-extrabold text-slate-900 tracking-tight"
        >
          Who We Serve
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="text-gray-400 text-base sm:text-lg max-w-lg"
        >
         Delivering trusted soil testing, Material testing & Engineering solutions for construction and infrastructure projects.
        </motion.p>
      </motion.div>

      {/* Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {metrics.map((m) => (
          <MetricCard key={m.label} {...m} />
        ))}
      </motion.div>

    </div>
  </section>
);

export default EfficiencyMetrics;