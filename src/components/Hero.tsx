"use client"

import { motion } from "framer-motion"
import { Globe } from "./ui/globe"

/* ── Animation helpers ───────────────────────────────────────────────────── */
const fadeUp = (delay = 0, y = 28) => ({
  initial:    { opacity: 0, y },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] as const },
})

const fadeIn = (delay = 0) => ({
  initial:    { opacity: 0 },
  animate:    { opacity: 1 },
  transition: { duration: 0.6, delay },
})



/* ═══════════════════════════════════════════════════════════════════════════ */
const Hero = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center"
      style={{ background: "linear-gradient(150deg, #ffffff 0%, #eff6ff 45%, #f0fdf4 100%)" }}>

      {/* ── Fonts ──────────────────────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
        .hero-serif { font-family: 'DM Serif Display', Georgia, serif; }
        .hero-sans  { font-family: 'DM Sans', system-ui, sans-serif; }

        @keyframes badge-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37,99,235,0.35); }
          50%       { box-shadow: 0 0 0 6px rgba(37,99,235,0); }
        }
        .hero-badge-dot { animation: badge-pulse 2.2s ease-in-out infinite; }

        @keyframes float-y {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        .hero-float { animation: float-y 5s ease-in-out infinite; }

        @keyframes shimmer-line {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .hero-shimmer-word {
          background: linear-gradient(90deg,
            #1d4ed8 0%, #3b82f6 30%, #60a5fa 50%, #3b82f6 70%, #1d4ed8 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer-line 5s linear infinite;
        }

        .hero-cta-primary {
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        .hero-cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(37,99,235,0.35);
        }
        .hero-cta-primary:active { transform: translateY(0); }

        .hero-cta-ghost {
          transition: color 0.18s ease, gap 0.18s ease;
        }
        .hero-cta-ghost:hover { color: #2563eb; }

        .stat-card {
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }
        .stat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(37,99,235,0.10) !important;
        }
      `}</style>

      {/* ── Background blobs ───────────────────────────────────────────────── */}
      {/* Top-right blue wash */}
      <div aria-hidden className="pointer-events-none absolute top-0 right-0 w-[600px] h-[500px]"
        style={{ background: "radial-gradient(ellipse at 90% 10%, rgba(59,130,246,0.10) 0%, transparent 65%)" }} />
      {/* Bottom-left green-teal */}
      <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-16 w-[480px] h-[380px]"
        style={{ background: "radial-gradient(ellipse at 10% 90%, rgba(16,185,129,0.09) 0%, transparent 65%)" }} />
      {/* Centre subtle glow */}
      <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px]"
        style={{ background: "radial-gradient(ellipse at center, rgba(59,130,246,0.04) 0%, transparent 70%)" }} />

      {/* ── Grid overlay ────────────────────────────────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }} />

      {/* ════════════════════════════════════════════════════════════════════
          MAIN GRID
      ════════════════════════════════════════════════════════════════════ */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 py-20 w-full
                      flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-6">

        {/* ══ LEFT ══════════════════════════════════════════════════════════ */}
        <div className="flex flex-col gap-8 flex-1 max-w-[560px]">

          {/* Badge */}
          <motion.div {...fadeUp(0.05)}>
            <span
              className="hero-sans inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-[12px] font-semibold tracking-wide"
              style={{
                background: "rgba(37,99,235,0.07)",
                border: "1px solid rgba(37,99,235,0.20)",
                color: "#1d4ed8",
              }}
            >
              <span
                className="hero-badge-dot w-2 h-2 rounded-full bg-blue-500 shrink-0"
              />
              Now Scaling in 30+ States
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white"
              >
                NEW
              </span>
            </span>
          </motion.div>

          {/* Headline */}
          <div className="flex flex-col gap-2">
            <motion.h1 {...fadeUp(0.12)}
              className="hero-serif text-5xl sm:text-6xl lg:text-[3.8rem] text-[#0f172a] leading-[1.06] tracking-tight m-0">
              Building TrustThrough
            </motion.h1>
            <motion.div {...fadeUp(0.22)}>
              <span className="hero-serif hero-shimmer-word text-5xl sm:text-6xl lg:text-[3.8rem] leading-[1.06] tracking-tight">
              Accurate Testing
              </span>
              {" "}
              <span className="hero-serif text-5xl sm:text-6xl lg:text-[3.8rem] text-[#0f172a] leading-[1.06] tracking-tight">
              & Engineering Solutions
              </span>
            </motion.div>
          </div>
             

          {/* Subtext */}
          <motion.p {...fadeUp(0.3)}
            className="hero-sans text-[15.5px] leading-[1.75] text-slate-500 max-w-[440px] m-0">
            OmVerse delivers reliable soil testing, material testing, and construction quality assessment services in Guwahati, Assam. With advanced technology, expert engineers, and precise analysis, we help ensure safer foundations, stronger structures, and successful infrastructure projects.
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.38)} className="flex items-center gap-5 flex-wrap">
            <button
              className="hero-cta-primary hero-sans text-white font-semibold text-sm px-7 py-3.5 rounded-xl border-none cursor-pointer"
              style={{ boxShadow: "0 4px 16px rgba(37,99,235,0.25)" }}
            >
              Get a Free Quote
            </button>
            <button
              className="hero-cta-ghost hero-sans bg-transparent border-none text-slate-800 font-semibold text-sm flex items-center gap-1.5 py-3 cursor-pointer"
            >
              Explore Our Services
              <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M9 4l4 4-4 4"/>
              </svg>
            </button>
          </motion.div>

          

        </div>

        {/* ══ RIGHT — Globe ═════════════════════════════════════════════════ */}
        <motion.div
          {...fadeIn(0.2)}
          className="hero-float flex-1 flex justify-center items-center relative min-h-[340px] w-full max-w-[500px]"
        >
          {/* Glow ring behind globe */}
          <div
            aria-hidden
            className="absolute inset-0 m-auto w-[75%] h-[75%] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)",
              filter: "blur(32px)",
            }}
          />

          {/* Globe */}
          <div className="relative w-full aspect-square max-w-[480px]">
            <Globe />
          </div>

          {/* Domain service chips — telecom verticals */}
          {([
            {
              label: "Soil Testing",
              accent: "#2563eb",
              pos: "top-[6%] left-[-2%]",
              delay: 0.7,
              icon: (
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 shrink-0">
                  <path d="M3 13 L5 4 M13 13 L11 4 M5 4 Q8 9 11 4 M6 8 Q8 11 10 8"
                    stroke="#2563eb" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              ),
            },
            {
              label: "Construction Material Testing",
              accent: "#6366f1",
              pos: "top-[38%] right-[-4%]",
              delay: 0.85,
              icon: (
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 shrink-0">
                  <path d="M2 8h3l2-5 3 10 2-5h2" stroke="#6366f1" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
            },
            {
              label: "Water Quality Testing",
              accent: "#06b6d4",
              pos: "bottom-[24%] right-[-6%]",
              delay: 1.0,
              icon: (
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 shrink-0">
                  <rect x="3" y="3" width="10" height="10" rx="1" stroke="#06b6d4" strokeWidth="1.3"/>
                  <circle cx="8" cy="8" r="2" stroke="#06b6d4" strokeWidth="1.2"/>
                  <path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2" stroke="#06b6d4" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              ),
            },
            {
              label: "Core Cutting Testing",
              accent: "#10b981",
              pos: "bottom-[8%] left-[-2%]",
              delay: 1.15,
              icon: (
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 shrink-0">
                  <path d="M8 2v9M5 5l3-3 3 3" stroke="#10b981" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="3" y="11" width="10" height="3" rx="0.8" stroke="#10b981" strokeWidth="1.2"/>
                </svg>
              ),
            },
            {
              label: "Soil Resistance Testing",
              accent: "#f59e0b",
              pos: "top-[70%] left-[-5%]",
              delay: 1.3,
              icon: (
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 shrink-0">
                  <rect x="2" y="3" width="12" height="4" rx="0.8" stroke="#f59e0b" strokeWidth="1.3"/>
                  <rect x="2" y="9" width="12" height="4" rx="0.8" stroke="#f59e0b" strokeWidth="1.3"/>
                  <circle cx="12" cy="5" r="0.8" fill="#f59e0b"/>
                  <circle cx="12" cy="11" r="0.8" fill="#f59e0b"/>
                </svg>
              ),
            },
          ] as const).map(({ label, accent, pos, delay, icon }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.82, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay, ease: "easeOut" }}
              className={`absolute ${pos} hidden lg:flex items-center gap-2 z-10
                          px-3 py-1.5 rounded-full text-[11.5px] font-semibold whitespace-nowrap`}
              style={{
                background:     "rgba(255,255,255,0.93)",
                border:         `1px solid ${accent}35`,
                boxShadow:      `0 4px 16px ${accent}20, 0 1px 0 rgba(255,255,255,0.9) inset`,
                backdropFilter: "blur(10px)",
                color:          "#0f172a",
                fontFamily:     "'DM Sans', system-ui, sans-serif",
              }}
            >
              {icon}
              {label}
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: accent }} />
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* ── Bottom fade edge ────────────────────────────────────────────────── */}
      <div aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-16"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(240,249,255,0.5))" }}
      />

    </section>
  )
}

export default Hero