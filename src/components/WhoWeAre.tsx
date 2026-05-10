"use client"

import { motion, type Variants } from "framer-motion"

/* ── Variants ────────────────────────────────────────────────────────────── */
const fadeUp: Variants = {
  hidden:   { opacity: 0, y: 32 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] } },
}
const popIn: Variants = {
  hidden:   { opacity: 0, y: 28, scale: 0.95 },
  visible:  { opacity: 1, y: 0, scale: 1, transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = (t = 0.11): Variants => ({
  hidden:  {},
  visible: { transition: { staggerChildren: t } },
})

/* ── Data ────────────────────────────────────────────────────────────────── */
const HIGHLIGHTS = [
  {
    value:  "30+",
    label:  "US States",
    accent: "#2563eb",
    bg:     "rgba(37,99,235,0.07)",
    border: "rgba(37,99,235,0.14)",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
        <path d="M20 4L6 10v10c0 8.4 5.9 16.3 14 18 8.1-1.7 14-9.6 14-18V10L20 4z" fill="#2563eb" opacity="0.15"/>
        <path d="M20 4L6 10v10c0 8.4 5.9 16.3 14 18 8.1-1.7 14-9.6 14-18V10L20 4z" stroke="#2563eb" strokeWidth="1.6" fill="none"/>
        <path d="M15 20l3.5 3.5L25 16" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    value:  "3",
    label:  "Global Hubs",
    accent: "#6366f1",
    bg:     "rgba(99,102,241,0.07)",
    border: "rgba(99,102,241,0.14)",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
        <rect x="6" y="8" width="28" height="24" rx="3" fill="#6366f1" opacity="0.12"/>
        <rect x="6" y="8" width="28" height="24" rx="3" stroke="#6366f1" strokeWidth="1.6"/>
        <path d="M13 20h14M13 14h8M13 26h10" stroke="#6366f1" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    value:  "600+",
    label:  "Field Experts",
    accent: "#06b6d4",
    bg:     "rgba(6,182,212,0.07)",
    border: "rgba(6,182,212,0.14)",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
        <circle cx="20" cy="20" r="13" fill="#06b6d4" opacity="0.12"/>
        <circle cx="20" cy="20" r="13" stroke="#06b6d4" strokeWidth="1.6"/>
        <path d="M14 20l4 4 8-8" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

const FEATURES = [
  {
    accent:      "#2563eb",
    iconBg:      "rgba(37,99,235,0.08)",
    iconBorder:  "rgba(37,99,235,0.18)",
    title:       "Experienced Technical Team",
    description: "Experienced engineers and field professionals delivering accurate testing services.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    accent:      "#6366f1",
    iconBg:      "rgba(99,102,241,0.08)",
    iconBorder:  "rgba(99,102,241,0.18)",
    title:       "On-Site Support",
    description: "Quick sample collection and site inspection for construction projects.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
  {
    accent:      "#06b6d4",
    iconBg:      "rgba(6,182,212,0.08)",
    iconBorder:  "rgba(6,182,212,0.18)",
    title:       "Advanced Testing Solutions",
    description: "Modern equipment and precise analysis for reliable engineering reports.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
]

/* ══════════════════════════════════════════════════════════════════════════ */
const SecurityCompliance = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#f7f9fc]">

      {/* ── Fonts ──────────────────────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
        .sc-serif { font-family: 'DM Serif Display', Georgia, serif; }
        .sc-sans  { font-family: 'DM Sans', system-ui, sans-serif; }

        .sc-hl-card {
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }
        .sc-hl-card:hover {
          transform: translateY(-4px);
        }

        .sc-feat-card {
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }
        .sc-feat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 48px rgba(15,23,42,0.09) !important;
        }
      `}</style>

      

      {/* ── Radial washes ──────────────────────────────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{
        background:
          "radial-gradient(ellipse 75% 50% at 50% -5%, rgba(59,130,246,0.08) 0%, transparent 65%)," +
          "radial-gradient(ellipse 40% 35% at 0% 100%, rgba(99,102,241,0.06) 0%, transparent 55%)",
      }}/>

      <div className="relative max-w-6xl mx-auto px-6 sm:px-12 py-28 flex flex-col items-center gap-20">

        {/* ══ HEADER ════════════════════════════════════════════════════════ */}
        <div className="flex flex-col items-center text-center gap-6 max-w-3xl">

          {/* Eyebrow */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className="sc-sans inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.22em] uppercase"
              style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.18)", color: "#1d4ed8" }}>
              <span style={{ color: "#3b82f6", fontSize: 9 }}>●</span>
              Who We Are
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            variants={fadeUp} initial="hidden" whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
            className="sc-serif text-5xl sm:text-6xl text-[#0f172a] leading-[1.06] tracking-tight"
          >
            Trusted Testing & 
            <em
              className="not-italic"
              style={{
                background: "linear-gradient(135deg, #2563eb 0%, #6366f1 55%, #06b6d4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
             Engineering Solutions Partner
            </em>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            variants={fadeUp} initial="hidden" whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.16, duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
            className="sc-sans text-slate-500 text-base sm:text-lg max-w-xl leading-relaxed"
          >
            At OmVerse, we combine technical expertise, advanced testing methods, and field experience to deliver reliable soil testing, material testing, and construction quality solutions across Country. We bridge the gap between engineering precision and on-site execution to support safe and successful infrastructure development.
          </motion.p>
        </div>

        {/* ══ HIGHLIGHT CARDS ═══════════════════════════════════════════════ */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {HIGHLIGHTS.map(({ value, label, accent, bg, border, icon }) => (
            <motion.div
              key={label}
              variants={popIn}
              className="sc-hl-card relative flex items-center gap-5 rounded-2xl px-7 py-7 overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.85)",
                border: `1px solid ${border}`,
                boxShadow: "0 4px 20px rgba(15,23,42,0.06)",
                backdropFilter: "blur(14px)",
              }}
            >
              {/* Ghost number watermark */}
              <span
                className="sc-serif pointer-events-none absolute -right-2 -bottom-3 text-[5.5rem] font-bold leading-none select-none"
                style={{ color: `${accent}09` }}
              >
                {value}
              </span>

              {/* Icon bubble */}
              <div
                className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: bg, border: `1px solid ${border}` }}
              >
                {icon}
              </div>

              {/* Text */}
              <div className="flex flex-col gap-0.5">
                <span
                  className="sc-serif text-3xl font-bold leading-none"
                  style={{
                    background: `linear-gradient(135deg, ${accent}, #6366f1)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {value}
                </span>
                <span className="sc-sans text-sm font-semibold text-slate-600 mt-1">{label}</span>
              </div>

              {/* Bottom micro-bar */}
              <div
                className="absolute bottom-0 left-7 w-12 h-[3px] rounded-t-full"
                style={{ background: `linear-gradient(90deg, ${accent}, #6366f1)` }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* ══ DIVIDER ═══════════════════════════════════════════════════════ */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="w-full h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(15,23,42,0.10) 30%, rgba(15,23,42,0.10) 70%, transparent)" }}
        />

        {/* ══ FEATURE CARDS ═════════════════════════════════════════════════ */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full"
          variants={stagger(0.13)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {FEATURES.map(({ accent, iconBg, iconBorder, title, description, icon }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="sc-feat-card relative flex flex-col gap-5 rounded-2xl p-8 overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.82)",
                border: "1px solid rgba(15,23,42,0.08)",
                boxShadow: "0 4px 24px rgba(15,23,42,0.05)",
                backdropFilter: "blur(14px)",
              }}
            >
              {/* Top accent bar */}
              <span
                className="absolute top-0 left-8 w-16 h-[2px] rounded-b-full"
                style={{ background: `linear-gradient(90deg, ${accent}, #6366f1)` }}
              />

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: iconBg, border: `1px solid ${iconBorder}` }}
              >
                {icon}
              </div>

              {/* Text */}
              <div className="flex flex-col gap-2">
                <h3 className="sc-serif text-xl text-[#0f172a] leading-snug tracking-tight">
                  {title}
                </h3>
                <p className="sc-sans text-slate-500 text-sm leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Corner watermark */}
              <div
                className="pointer-events-none absolute -bottom-8 -right-8 w-28 h-28 rounded-full"
                style={{ background: `radial-gradient(circle, ${accent}12 0%, transparent 70%)` }}
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

export default SecurityCompliance