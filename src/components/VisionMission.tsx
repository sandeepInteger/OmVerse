"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

/* ─── Tiny animation helper ─────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
})

/* ─── Core values data ───────────────────────────────────────────────────── */
const VALUES = [
  { label: "Accuracy", icon: "◈" },
  { label: "Quality", icon: "◎" },
  { label: "Integrity",      icon: "◆" },
  { label: "Reliability",       icon: "◇" },
  { label: "Innovation",      icon: "◉" },
]

/* ══════════════════════════════════════════════════════════════════════════ */
export default function VisionMission() {
  const quoteRef    = useRef<HTMLDivElement>(null)
  const quoteInView = useInView(quoteRef, { once: true, margin: "-80px" })

  return (
    <section className="relative w-full overflow-hidden bg-[#f7f9fc]">

      {/* ── Fonts + utility CSS ───────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');

        .vm-serif { font-family: 'DM Serif Display', Georgia, serif; }
        .vm-sans  { font-family: 'DM Sans', system-ui, sans-serif; }

        /* Glass card pseudo-layer */
        .vm-card { position: relative; }
        .vm-card::before {
          content: '';
          position: absolute; inset: 0;
          border-radius: inherit;
          background: linear-gradient(145deg, rgba(255,255,255,0.92) 0%, rgba(245,248,255,0.7) 100%);
          z-index: 0;
        }
        .vm-card > * { position: relative; z-index: 1; }

        /* Headline shimmer */
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .vm-shimmer {
          background: linear-gradient(90deg,
            #1e3a8a 0%, #3b82f6 25%, #818cf8 50%, #3b82f6 75%, #1e3a8a 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 6s linear infinite;
        }

        /* Needle grow-in */
        @keyframes grow-y { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        .vm-needle { transform-origin: top; animation: grow-y 1.2s cubic-bezier(0.22,1,0.36,1) 0.5s both; }

        /* Value card hover */
        .vm-val:hover { transform: translateY(-5px); }
        .vm-val { transition: transform 0.22s ease, box-shadow 0.22s ease; }
        .vm-val:hover { box-shadow: 0 16px 40px rgba(37,99,235,0.12) !important; }
      `}</style>

      {/* ── Background wash ───────────────────────────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{
        background:
          "radial-gradient(ellipse 90% 55% at 50% -5%, rgba(59,130,246,0.09) 0%, transparent 65%)," +
          "radial-gradient(ellipse 45% 40% at 2%  90%, rgba(99,102,241,0.07) 0%, transparent 60%)," +
          "radial-gradient(ellipse 40% 35% at 98% 85%, rgba(6,182,212,0.06)  0%, transparent 55%)",
      }} />

      

      {/* ══════════════════════════════════════════════════════════════════
          HEADLINE
      ══════════════════════════════════════════════════════════════════ */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-12 pt-28 pb-20 flex flex-col items-center gap-7 text-center">

        {/* Pill label */}
        <motion.div {...fadeUp(0)}>
          <span className="vm-sans inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.22em] uppercase"
            style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.18)", color: "#1d4ed8" }}>
            <span style={{ color: "#3b82f6", fontSize: 9 }}>●</span>
            Our Vision &amp; Mission
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2 {...fadeUp(0.08)}
          className="vm-serif text-5xl sm:text-6xl lg:text-[5rem] text-[#0f172a] leading-[1.05] tracking-tight max-w-3xl">
          Built on{" "}  
          <em className="vm-shimmer not-italic">Accuracy.</em>
          <br />Driven by Quality.
        </motion.h2>

        {/* Subline */}
        <motion.p {...fadeUp(0.16)}
          className="vm-sans text-slate-500 text-lg max-w-xl leading-relaxed">
          Delivering trusted soil testing, material testing, and engineering solutions that support safer construction and stronger infrastructure projects.
        </motion.p>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          CARDS + NEEDLE
      ══════════════════════════════════════════════════════════════════ */}
      <div className="relative max-w-6xl mx-auto px-6 sm:px-12 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_64px_1fr] gap-0 items-stretch">

          {/* ── Vision ─────────────────────────────────────────────────── */}
          <motion.div {...fadeUp(0.1)}
            className="vm-card rounded-3xl p-10 overflow-hidden"
            style={{
              border: "1px solid rgba(37,99,235,0.11)",
              boxShadow: "0 2px 0 rgba(255,255,255,0.9) inset, 0 16px 56px rgba(37,99,235,0.07)",
              backdropFilter: "blur(20px)",
            }}>

            {/* Corner tint */}
            <div className="absolute top-0 right-0 w-36 h-36 rounded-bl-[90px] rounded-tr-3xl"
              style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.10), rgba(99,102,241,0.05))" }} />

            {/* Ghost number */}
            <span className="vm-serif absolute top-5 right-7 text-[6rem] font-bold leading-none select-none"
              style={{ color: "rgba(37,99,235,0.055)" }}>01</span>

            {/* Icon */}
            <div className="mb-7 w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #dbeafe, #eff6ff)",
                border: "1px solid rgba(37,99,235,0.14)",
                boxShadow: "0 4px 16px rgba(37,99,235,0.11)",
              }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="#2563eb" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </div>

            {/* Label rule */}
            <div className="flex items-center gap-3 mb-5">
              <span className="vm-sans text-blue-600 text-[11px] font-semibold tracking-[0.22em] uppercase">Vision</span>
              <span className="flex-1 h-px bg-blue-100" />
            </div>

            <p className="vm-sans text-slate-600 text-base sm:text-[1.07rem] leading-[1.75]">
            To become one of the most trusted and respected testing and engineering service providers by delivering accurate analysis, reliable reports, and quality-driven solutions.
            </p>

            {/* Bottom accent */}
            <div className="absolute bottom-0 left-10 w-20 h-[3px] rounded-t-full"
              style={{ background: "linear-gradient(90deg, #2563eb, #6366f1)" }} />
          </motion.div>

          {/* ── Needle (desktop) ─────────────────────────────────────────── */}
          <div className="hidden md:flex flex-col items-center justify-center py-6">
            <div className="vm-needle w-px flex-1"
              style={{ background: "linear-gradient(to bottom, transparent, #c7d2fe 25%, #c7d2fe 75%, transparent)" }} />
            <div className="my-4 w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{
                background: "linear-gradient(135deg, #2563eb, #6366f1)",
                boxShadow: "0 0 0 5px rgba(37,99,235,0.12), 0 0 0 10px rgba(37,99,235,0.05)",
              }}>
              <span className="text-white text-xs select-none">✦</span>
            </div>
            <div className="vm-needle w-px flex-1"
              style={{ background: "linear-gradient(to bottom, #c7d2fe 25%, transparent)" }} />
          </div>

          {/* ── Mission ────────────────────────────────────────────────── */}
          <motion.div {...fadeUp(0.2)}
            className="vm-card rounded-3xl p-10 overflow-hidden mt-6 md:mt-0"
            style={{
              border: "1px solid rgba(99,102,241,0.11)",
              boxShadow: "0 2px 0 rgba(255,255,255,0.9) inset, 0 16px 56px rgba(99,102,241,0.07)",
              backdropFilter: "blur(20px)",
            }}>

            {/* Corner tint */}
            <div className="absolute top-0 right-0 w-36 h-36 rounded-bl-[90px] rounded-tr-3xl"
              style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.10), rgba(6,182,212,0.05))" }} />

            {/* Ghost number */}
            <span className="vm-serif absolute top-5 right-7 text-[6rem] font-bold leading-none select-none"
              style={{ color: "rgba(99,102,241,0.055)" }}>02</span>

            {/* Icon */}
            <div className="mb-7 w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #ede9fe, #f5f3ff)",
                border: "1px solid rgba(99,102,241,0.14)",
                boxShadow: "0 4px 16px rgba(99,102,241,0.11)",
              }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="#6366f1" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="6"/>
                <circle cx="12" cy="12" r="2"/>
              </svg>
            </div>

            {/* Label rule */}
            <div className="flex items-center gap-3 mb-5">
              <span className="vm-sans text-indigo-500 text-[11px] font-semibold tracking-[0.22em] uppercase">Mission</span>
              <span className="flex-1 h-px bg-indigo-100" />
            </div>

            <p className="vm-sans text-slate-600 text-base sm:text-[1.07rem] leading-[1.75]">
              
              To provide precise soil and material testing services with <strong className="font-semibold text-[#0f172a]">professionalism</strong>, technical excellence, and a commitment to supporting safe and sustainable construction projects.
            </p>

            {/* Bottom accent */}
            <div className="absolute bottom-0 left-10 w-20 h-[3px] rounded-t-full"
              style={{ background: "linear-gradient(90deg, #6366f1, #06b6d4)" }} />
          </motion.div>

        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          QUOTE ISLAND — dark breakout
      ══════════════════════════════════════════════════════════════════ */}
      <div ref={quoteRef} className="relative max-w-6xl mx-auto px-6 sm:px-12 py-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 28 }}
          animate={quoteInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[2.5rem] overflow-hidden px-10 sm:px-16 py-16 flex flex-col items-center gap-7 text-center"
          style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 55%, #0c1a3a 100%)",
            boxShadow: "0 36px 96px rgba(15,23,42,0.20), 0 0 0 1px rgba(255,255,255,0.05) inset",
          }}>

          {/* Mesh glow */}
          <div aria-hidden className="pointer-events-none absolute inset-0" style={{
            background:
              "radial-gradient(ellipse 65% 50% at 20% 40%, rgba(37,99,235,0.25) 0%, transparent 60%)," +
              "radial-gradient(ellipse 50% 45% at 85% 65%, rgba(99,102,241,0.20) 0%, transparent 55%)",
          }} />

          {/* Floating dots */}
          {[
            { x: "7%",  y: "18%", s: 3, o: 0.35 },
            { x: "93%", y: "14%", s: 2, o: 0.28 },
            { x: "14%", y: "78%", s: 2, o: 0.22 },
            { x: "87%", y: "72%", s: 3, o: 0.30 },
          ].map((d, i) => (
            <div key={i} aria-hidden className="pointer-events-none absolute rounded-full"
              style={{ left: d.x, top: d.y, width: d.s, height: d.s, background: "#fff", opacity: d.o }} />
          ))}

          {/* Quote marks */}
          <div className="relative flex gap-1.5" aria-hidden>
            {[0, 1].map(i => (
              <svg key={i} width="26" height="20" viewBox="0 0 26 20">
                <path d="M0 20C0 9 5.5 2 13 0L15 4C9.5 6 7.5 10 7.5 13L13 13L13 20Z"
                  fill="url(#qgrad)" opacity="0.9"/>
                <defs>
                  <linearGradient id="qgrad" x1="0" y1="0" x2="13" y2="20" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#3b82f6"/>
                    <stop offset="1" stopColor="#818cf8"/>
                  </linearGradient>
                </defs>
              </svg>
            ))}
          </div>

          {/* Quote text */}
          <p className="vm-serif relative text-2xl sm:text-3xl lg:text-[2.15rem] text-white leading-snug tracking-tight max-w-2xl"
            style={{ textShadow: "0 2px 40px rgba(99,102,241,0.35)" }}>
            To work hard every day to make OmVerse the most respected
            products, solutions and services brand in the industry.
          </p>

          {/* Attribution */}
          <div className="relative flex items-center gap-4">
            <span className="block h-px w-14"
              style={{ background: "linear-gradient(90deg, transparent, rgba(129,140,248,0.7))" }} />
            <span className="vm-sans text-indigo-300 text-[11px] font-semibold tracking-[0.26em] uppercase">
              OmVerse Testing and Engineering Services
            </span>
            <span className="block h-px w-14"
              style={{ background: "linear-gradient(90deg, rgba(129,140,248,0.7), transparent)" }} />
          </div>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          VALUES GRID
      ══════════════════════════════════════════════════════════════════ */}
      <div className="relative max-w-6xl mx-auto px-6 sm:px-12 pb-28 pt-4">
        <motion.div {...fadeUp(0.05)} className="flex flex-col items-center gap-8">

          {/* Label */}
          <div className="flex items-center gap-4">
            <span className="block h-px w-16"
              style={{ background: "linear-gradient(90deg, transparent, #cbd5e1)" }} />
            <span className="vm-sans text-slate-400 text-[11px] tracking-[0.26em] uppercase font-semibold">
              Core Values
            </span>
            <span className="block h-px w-16"
              style={{ background: "linear-gradient(90deg, #cbd5e1, transparent)" }} />
          </div>

          {/* Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 w-full">
            {VALUES.map(({ label, icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 + 0.05 }}
                className="vm-val group relative flex flex-col items-center gap-3 py-6 px-4 rounded-2xl cursor-default"
                style={{
                  background: "rgba(255,255,255,0.78)",
                  border: "1px solid rgba(15,23,42,0.08)",
                  boxShadow: "0 2px 12px rgba(15,23,42,0.05)",
                  backdropFilter: "blur(12px)",
                }}>

                {/* Hover glow layer */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.05), rgba(99,102,241,0.05))" }} />

                {/* Icon */}
                <span className="relative text-xl select-none" style={{
                  background: "linear-gradient(135deg, #2563eb, #6366f1)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>{icon}</span>

                {/* Label */}
                <span className="vm-sans relative text-sm font-semibold text-slate-700 text-center leading-tight">
                  {label}
                </span>

                {/* Bottom micro-rule */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-8 rounded-t-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(90deg, #2563eb, #6366f1)" }} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

    </section>
  )
}