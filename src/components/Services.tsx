"use client"

import { useEffect, useState, useCallback } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence, type Variants } from "framer-motion"

import ServiceVisual from "./ServiceVisual"
import { SERVICES } from "@/data/services"

const AUTO_MS  = 4500
const ANIM_DUR = 0.45

// ── Variants ──────────────────────────────────────────────────────────────────
const slideVariants: Variants = {
  enter:  { opacity: 0, y: 24 },
  center: { opacity: 1, y: 0,   transition: { duration: ANIM_DUR, ease: "easeOut" as const } },
  exit:   { opacity: 0, y: -20, transition: { duration: 0.25,     ease: "easeIn"  as const } },
}

const cardVariants: Variants = {
  enter:  { opacity: 0, scale: 0.93, rotate: -2 },
  center: { opacity: 1, scale: 1,    rotate: 0,  transition: { duration: ANIM_DUR + 0.05, ease: "easeOut" as const } },
  exit:   { opacity: 0, scale: 0.96, rotate: 2,  transition: { duration: 0.22,             ease: "easeIn"  as const } },
}

// ── Component ─────────────────────────────────────────────────────────────────
const Services = () => {
  const [idx, setIdx]       = useState(0)
  const [paused, setPaused] = useState(false)
  const total = SERVICES.length
  const svc   = SERVICES[idx]

  const next = useCallback(() => setIdx(i => (i + 1) % total), [total])
  const prev = useCallback(() => setIdx(i => (i - 1 + total) % total), [total])
  const goto = (i: number) => { setIdx(i); setPaused(true) }

  // Auto-advance
  useEffect(() => {
    if (paused) return
    const id = setTimeout(next, AUTO_MS)
    return () => clearTimeout(id)
  }, [idx, paused, next])

  // Resume after manual interaction
  useEffect(() => {
    if (!paused) return
    const id = setTimeout(() => setPaused(false), AUTO_MS * 1.5)
    return () => clearTimeout(id)
  }, [paused])

  const pad = (n: number) => String(n).padStart(2, "0")

  return (
    <section
      className="w-full relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0a1628 0%, #0d1f3c 100%)",
      }}
    >
    

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="relative max-w-4xl mx-auto px-6 flex flex-col items-center text-center gap-4 py-20">
        <motion.p
          className="text-blue-400 text-sm font-semibold tracking-widest uppercase"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Our Services
        </motion.p>

        <motion.h2
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
           Testing & Engineering Solutions
        </motion.h2>

        <motion.p
          className="text-slate-400 text-base sm:text-lg max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.16 }}
        >
          Reliable soil, material, and construction testing services delivered with precision, advanced equipment, and expert technical support.
        </motion.p>
      </div>

      {/* ── Slider ──────────────────────────────────────────────────────────── */}
      <div className="relative max-w-6xl mx-auto px-6 sm:px-20 pb-24">

        {/* Left edge arrow — same circular ghost style as site screenshot */}
        <button
          onClick={() => { prev(); setPaused(true) }}
          aria-label="Previous service"
          className="group absolute left-0 lg:-left-14 hidden sm:flex top-1/2 -translate-y-1/2 z-10 items-center justify-center w-10 h-10 rounded-full focus:outline-none transition-all duration-200"
          style={{
            background:   "rgba(255,255,255,0.07)",
            border:       "1px solid rgba(255,255,255,0.14)",
            backdropFilter: "blur(8px)",
            boxShadow:    "0 2px 8px rgba(0,0,0,0.3)",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.13)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
        >
          <svg className="w-4 h-4 text-white transition-transform duration-150 group-hover:-translate-x-0.5"
            fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 4L6 8l4 4" />
          </svg>
        </button>

        {/* Right edge arrow */}
        <button
          onClick={() => { next(); setPaused(true) }}
          aria-label="Next service"
          className="group absolute right-0 lg:-right-14 hidden sm:flex top-1/2 -translate-y-1/2 z-10 items-center justify-center w-10 h-10 rounded-full focus:outline-none transition-all duration-200"
          style={{
            background:   "rgba(255,255,255,0.07)",
            border:       "1px solid rgba(255,255,255,0.14)",
            backdropFilter: "blur(8px)",
            boxShadow:    "0 2px 8px rgba(0,0,0,0.3)",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.13)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
        >
          <svg className="w-4 h-4 text-white transition-transform duration-150 group-hover:translate-x-0.5"
            fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 4l4 4-4 4" />
          </svg>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[420px]">

          {/* LEFT — text side */}
          <div className="flex flex-col gap-8">

            {/* Dash indicators + counter */}
            <div className="flex items-center gap-3">
              {SERVICES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goto(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="relative h-[3px] rounded-full overflow-hidden transition-all duration-300 focus:outline-none"
                  style={{
                    width:      i === idx ? 36 : 20,
                    background: i === idx ? "transparent" : "rgba(255,255,255,0.18)",
                  }}
                >
                  {i === idx && (
                    <>
                      <span
                        className="absolute inset-0 rounded-full"
                        style={{ background: "rgba(255,255,255,0.15)" }}
                      />
                      <motion.span
                        key={`fill-${idx}`}
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${svc.accentFrom}, ${svc.accentTo})`,
                        }}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: AUTO_MS / 1000, ease: "linear" as const }}
                      />
                    </>
                  )}
                </button>
              ))}
              <span className="ml-2 text-slate-500 text-sm font-mono tabular-nums select-none">
                {pad(idx + 1)} / {pad(total)}
              </span>
            </div>

            {/* Title + bullet points */}
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col gap-6"
              >
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight">
                  {svc.title}
                </h3>

                <ul className="flex flex-col gap-4">
                  {svc.highlights.map((pt, pi) => (
                    <motion.li
                      key={pi}
                      className="flex items-start gap-3 text-slate-300 text-base sm:text-lg"
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + pi * 0.08, duration: 0.35, ease: "easeOut" }}
                    >
                      {/* Coloured bullet */}
                      <span
                        className="mt-[9px] shrink-0 w-2 h-2 rounded-full"
                        style={{
                          background: `linear-gradient(135deg, ${svc.accentFrom}, ${svc.accentTo})`,
                          boxShadow: `0 0 6px ${svc.accentFrom}88`,
                        }}
                      />
                      {pt}
                    </motion.li>
                  ))}
                </ul>

                {/* Read More — client-side route to service detail */}
                <Link
                  to={`/services/${svc.slug}`}
                  className="group inline-flex items-center gap-2 mt-2 text-sm font-semibold transition-all duration-200 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1f3c]"
                  style={{ color: svc.accentFrom }}
                >
                  <span className="border-b border-transparent group-hover:border-current transition-colors duration-200">
                    Read More
                  </span>
                  <svg
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                    fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </Link>

              </motion.div>
            </AnimatePresence>

            {/* intentionally empty — nav arrows rendered at section edges below */}
          </div>

          {/* RIGHT — service image */}
          <div className="flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="relative w-full max-w-[480px] aspect-[4/3] rounded-3xl overflow-hidden"
                style={{
                  boxShadow: `0 24px 60px -8px ${svc.accentFrom}44, 0 8px 24px -4px ${svc.accentFrom}22`,
                }}
              >
                <ServiceVisual service={svc} className="absolute inset-0" />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Services