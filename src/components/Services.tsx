"use client"

import { useEffect, useState, useCallback } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence, type Variants } from "framer-motion"

// ── Types ─────────────────────────────────────────────────────────────────────
interface ServiceItem {
  title: string
  points: string[]
  label: string
  gradient: string
  accentFrom: string
  accentTo: string
  href: string
  image: string
}

// ── Data ──────────────────────────────────────────────────────────────────────
const SERVICES: ServiceItem[] = [
  {
    title: "Soil Testing Services",
    points: [
      "Soil Investigation & Bearing Capacity Analysis",
      "Foundation Soil Testing & Site Assessment",
      "Ground Stability & Soil Resistance Evaluation",
    ],
    label: "Soil Testing",
    gradient: "from-cyan-500 to-blue-600",
    accentFrom: "#06b6d4",
    accentTo: "#2563eb",
    href: "/services/wireless",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-C1pEcNINttyDXMT4WKWhhkJUjasZuFqp67hXcxrBAvbAY8i9aReztLccLQha1-56_gJcvMmBcpfvh7bEx84nx2fjEbIMIw6nJH1p_ha_0M2mR8eDPRK07mmz_QWrzfWXPfLkH8DWqRk0NDlBzaEmj-mAdq7yvTmcyKCcfZI6rTPso7mwGZ8LWenAZq0IgbPx6WeugSnekfMxvldmxR5rpe9yhvmdxxAUUs5xNdlmhapSUavSk2ld6ydBrRk4z1s4f9ZqGMP2zgOA",
  },
  {
    title: "Material Testing Services",
    points: [
      "Cement, Steel & Aggregate Quality Testing",
      "Concrete Strength & Durability Analysis",
      "Industry Standard Compliance Testing",
    ],
    label: "Material Testing",
    gradient: "from-violet-500 to-purple-700",
    accentFrom: "#8b5cf6",
    accentTo: "#7e22ce",
    href: "/services/fiber",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8oGrutpL9zl5vIPvEdOGLJt4Rb6vHxNfrb8wgDnMbWf2GhHRgL1CoUHy28FHJRwYacg2waT9CQ0g_W5JR7WLeev7n6Nz9r1JxNKZvLWQs5Ytw0r4-xqoC-c2uWZK4x2KbkEBCRGNRPEq572dN0rWgsEmkmZ7Qf-Cd6Nd_xotm_Qkunq58TuaLVYe9iRYQuwwVER9VxirSJF6JMoOVEVkg4dCuFlk-1dz3h9XE40duCSkyj4y1AsFZHT_rI8kNxJiBX7TtwZU9xMR3",
  },
  {
    title: "Construction Material Testing",
    points: [
      "Construction Quality & Structural Material Evaluation",
      "Core Cutting & Material Performance Testing",
      "Reliable Analysis for Safe Construction",
    ],
    label: "Construction Material",
    gradient: "from-orange-400 to-rose-500",
    accentFrom: "#fb923c",
    accentTo: "#f43f5e",
    href: "/services/data-center",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqhh8lYO6Lb9GrXFTq5O4lQgOKW3FKV0gjPTPDlWv_OPz1lYJicKAKHXLOTWFu0sexbjRHwST3Y4BA8P-QxMVc8gzHLGmZHDFNBt85plo5xLL6ccp5Z1wADDCsueUsM1CJyucrna29Q4i_KujC7D-xcq7nAuUNEgzf1vgc5hPiAa41TUiy2QOdiC9kO1-Q0W8WTG7c4_T4u8NpKTUDskAm4keYocPoOFJTK0DnLmkqAl4a55H4-IK5U_GyGdG5jmZ8g1a_n2ZJBCVp",
  },
  {
    title: "Ground & Water Detection Services",
    points: [
      "Underground Water Level Assessment",
      "Leakage Detection & Thermal Scanning",
      "Advanced Ground Engineering Solutions",
    ],
    label: "Ground & Water Detection",
    gradient: "from-emerald-400 to-teal-600",
    accentFrom: "#34d399",
    accentTo: "#0d9488",
    href: "/services/tower",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCtF6nvu1MTFXL2spDrv9WuU9nT3KHpgFyz0yF9GvzaUtNaSTHV2z-N6f9rmDg7_A9uteLBpqEMa9fKNR0IsCs88mQFJF5vMbwQDE_Q8OVdSorcUCH2-Oep1WJGoyfUsPokaq815rVYfQ-JR9Wht5RJiLowytsNXUmStOaTcfLerDsHWDkl0HOXXvY4vqawIbcb89r-OuXE9RbY-Pnr81B2UoJ4_blTlv-osv3mFI1ugLwN24Pt-WOAqEsmRDCCcAm-x3Lngk__G8r",
  },
  {
    title: "Bitumen Testing Services",
    points: [
      "Bitumen Quality & Performance Testing)",
      "Road Construction Material Evaluation",
      "Accurate Laboratory Analysis & Reporting",
    ],
    label: "Bitumen Testing",
    gradient: "from-sky-400 to-indigo-600",
    accentFrom: "#38bdf8",
    accentTo: "#4f46e5",
    href: "/services/chipset",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKzdZGhK4EAXJcf6ef7UraELzIye6Mc-TNzJ8Bk-bJ-CDReydgNjJK8uzXRcHZQYzlSGoqEFC0l43KGcFKERr08T1Ti8spimLvqsDB03wkky2XvItBg1x6vA7mS3oyg7uLLLHMFIZj9mpDHChhK2oR4w7VfQEE0thjuZpbKc9YnrtTNMvYCno7F3hD17YSk6TxzGaP2AsRZUai2GhtWgxAVuzcT2UtwCVLTNHJ33R97C7-4hNVdipWpErKpmgJfBQxJilDj-p8h6VG",
  },
]

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
    /*
     * bg matches site theme: light blue-tinted grid background same as
     * the "Why choose Integer?" section — white with subtle blue-50 tint
     * and a dot/grid pattern via background-image.
     */
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
      <div className="relative max-w-6xl mx-auto px-20 pb-24">

        {/* Left edge arrow — same circular ghost style as site screenshot */}
        <button
          onClick={() => { prev(); setPaused(true) }}
          aria-label="Previous service"
          className="group absolute -left-14 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full focus:outline-none transition-all duration-200"
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
          className="group absolute -right-14 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full focus:outline-none transition-all duration-200"
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
                  {svc.points.map((pt, pi) => (
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
                  to={svc.href}
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
                {/* Image */}
                <img
                  src={svc.image}
                  alt={svc.label}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                

                {/* Label badge — bottom left */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span
                    className="text-white text-base font-bold tracking-tight drop-shadow-sm"
                  >
                    {svc.label}
                  </span>
                  {/* small accent dot */}
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: svc.accentFrom }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Services