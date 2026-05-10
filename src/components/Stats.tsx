"use client"

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion"
import { useEffect, useRef } from "react"

/* ── Data ────────────────────────────────────────────────────────────────── */
const STATS = [
  { value: 900,    suffix: "+",  label: "Projects Completed",    decimals: 0 },
  { value: 400,   suffix: "+",  label: "Clients Served",  decimals: 0 },
  { value: 4,  suffix: "+",  label: "Years of Experience",     decimals: 0 },
]

/* ── Animated counter ────────────────────────────────────────────────────── */
function Counter({
  target, suffix, decimals, delay, inView,
}: {
  target: number; suffix: string; decimals: number; delay: number; inView: boolean
}) {
  const count   = useMotionValue(0)
  const rounded = useTransform(count, v =>
    decimals > 0 ? v.toFixed(decimals) : Math.floor(v).toString()
  )
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!inView) return
    const controls = animate(count, target, {
      duration: 1.8,
      delay,
      ease: [0.22, 1, 0.36, 1],
    })
    return controls.stop
  }, [inView, count, target, delay])

  return (
    <span
      ref={ref}
      className="text-[2rem] font-extrabold leading-none tabular-nums"
      style={{
        background: "linear-gradient(135deg, #2563eb, #6366f1)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      <motion.span>{rounded}</motion.span>{suffix}
    </span>
  )
}

/* ── Component ───────────────────────────────────────────────────────────── */
const Stats = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView     = useInView(sectionRef, { once: true, margin: "-60px" })

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ background: "linear-gradient(180deg, #eff6ff 0%, #f8faff 100%)" }}
    >
      {/* Grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 sm:px-10 py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {STATS.map(({ value, suffix, label, decimals }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
              className="flex flex-col gap-1.5 px-6 py-5 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.88)",
                border: "1px solid rgba(59,130,246,0.10)",
                boxShadow: "0 2px 16px rgba(15,23,42,0.05)",
              }}
            >
              <Counter
                target={value}
                suffix={suffix}
                decimals={decimals}
                delay={i * 0.12}
                inView={inView}
              />
              <span
                className="text-[13px] text-slate-500 font-medium leading-snug"
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
              >
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats