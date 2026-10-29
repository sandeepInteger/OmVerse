"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import DottedMap from "dotted-map"

/* ── Office data ─────────────────────────────────────────────────────────── */
const OFFICES = [
  {
    id:      "plano",
    city:    "Plano",
    country: "United States",
    flag:    "🇺🇸",
    lat:     33.0198,
    lng:     -96.6989,
    address: "Plano, TX 75024",
    type:    "Headquarters",
    accent:  "#2563eb",
  },
  {
    id:      "noida",
    city:    "Noida",
    country: "India",
    flag:    "🇮🇳",
    lat:     28.5355,
    lng:     77.3910,
    address: "Noida, Uttar Pradesh",
    type:    "Engineering Hub",
    accent:  "#6366f1",
  },
  {
    id:      "hyderabad",
    city:    "Hyderabad",
    country: "India",
    flag:    "🇮🇳",
    lat:     17.3850,
    lng:     78.4867,
    address: "Hyderabad, Telangana",
    type:    "Delivery Center",
    accent:  "#06b6d4",
  },
  {
    id:      "tirupati",
    city:    "Tirupati",
    country: "India",
    flag:    "🇮🇳",
    lat:     13.6288,
    lng:     79.4192,
    address: "Tirupati, Andhra Pradesh",
    type:    "Field Office",
    accent:  "#10b981",
  },
]

/* ── Map component ───────────────────────────────────────────────────────── */
function WorldMapSVG({
  hoveredId,
  onHover,
}: {
  hoveredId: string | null
  onHover: (id: string | null) => void
}) {
  const svgRef = useRef<SVGSVGElement>(null)
  const map    = new DottedMap({ height: 100, grid: "diagonal" })

  const svgMap = map.getSVG({
    radius:          0.22,
    color:           "#00000028",
    shape:           "circle",
    backgroundColor: "transparent",
  })

  const project = (lat: number, lng: number) => ({
    x: (lng + 180) * (800 / 360),
    y: (90 - lat) * (400 / 180),
  })

  return (
    <div className="relative w-full aspect-[2/1]">
      {/* Dotted base map */}
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full pointer-events-none select-none"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, white 10%, white 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, white 10%, white 90%, transparent)",
        }}
        alt="world map"
        draggable={false}
      />

      {/* SVG overlay — connection arcs + dots */}
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
      >
        <defs>
          <linearGradient id="arc-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="white"   stopOpacity="0" />
            <stop offset="5%"   stopColor="#3b82f6" stopOpacity="0.5" />
            <stop offset="95%"  stopColor="#3b82f6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="white"   stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Arcs between all offices */}
        {OFFICES.map((from, fi) =>
          OFFICES.slice(fi + 1).map((to) => {
            const s = project(from.lat, from.lng)
            const e = project(to.lat, to.lng)
            const mx = (s.x + e.x) / 2
            const my = Math.min(s.y, e.y) - 40
            const isActive = hoveredId === from.id || hoveredId === to.id
            return (
              <motion.path
                key={`${from.id}-${to.id}`}
                d={`M ${s.x} ${s.y} Q ${mx} ${my} ${e.x} ${e.y}`}
                fill="none"
                stroke="url(#arc-grad)"
                strokeWidth={isActive ? 1.5 : 0.8}
                opacity={isActive ? 0.9 : 0.3}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, opacity: isActive ? 0.9 : 0.3 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            )
          })
        )}
      </svg>

      {/* Clickable/hoverable dots — rendered as HTML for crisp interaction */}
      {OFFICES.map((office) => {
        const { x, y } = project(office.lat, office.lng)
        const pctX = (x / 800) * 100
        const pctY = (y / 400) * 100
        const isActive = hoveredId === office.id

        return (
          <button
            key={office.id}
            onMouseEnter={() => onHover(office.id)}
            onMouseLeave={() => onHover(null)}
            onClick={() => onHover(isActive ? null : office.id)}
            className="absolute focus:outline-none group"
            style={{
              left:      `${pctX}%`,
              top:       `${pctY}%`,
              transform: "translate(-50%, -50%)",
              zIndex:    10,
            }}
            aria-label={office.city}
          >
            {/* Ping ring */}
            <span
              className="absolute inset-0 rounded-full animate-ping"
              style={{
                background: office.accent,
                opacity:    isActive ? 0.5 : 0.25,
                scale:      isActive ? "1.5" : "1",
              }}
            />
            {/* Outer ring */}
            <span
              className="absolute -inset-1.5 rounded-full transition-all duration-200"
              style={{
                background: `${office.accent}22`,
                border:     `1px solid ${office.accent}55`,
                opacity:    isActive ? 1 : 0,
              }}
            />
            {/* Core dot */}
            <span
              className="relative block rounded-full transition-all duration-200"
              style={{
                width:      isActive ? 10 : 8,
                height:     isActive ? 10 : 8,
                background: office.accent,
                boxShadow:  isActive ? `0 0 12px ${office.accent}` : "none",
              }}
            />
            {/* Tooltip */}
            <span
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none
                         whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-semibold text-white
                         transition-all duration-200"
              style={{
                background: office.accent,
                opacity:    isActive ? 1 : 0,
                transform:  `translateX(-50%) translateY(${isActive ? 0 : 4}px)`,
                boxShadow:  `0 4px 14px ${office.accent}55`,
              }}
            >
              {office.flag} {office.city}
            </span>
          </button>
        )
      })}
    </div>
  )
}

/* ── Office card ─────────────────────────────────────────────────────────── */
function OfficeCard({
  office,
  isActive,
  onHover,
}: {
  office: (typeof OFFICES)[0]
  isActive: boolean
  onHover: (id: string | null) => void
}) {
  return (
    <motion.div
      onMouseEnter={() => onHover(office.id)}
      onMouseLeave={() => onHover(null)}
      animate={{
        scale:     isActive ? 1.02 : 1,
        y:         isActive ? -3 : 0,
      }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="relative flex items-start gap-4 rounded-2xl p-5 cursor-default overflow-hidden transition-shadow duration-200"
      style={{
        background:     isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.70)",
        border:         `1px solid ${isActive ? office.accent + "44" : "rgba(15,23,42,0.08)"}`,
        boxShadow:      isActive
          ? `0 12px 36px ${office.accent}22, 0 2px 0 rgba(255,255,255,0.9) inset`
          : "0 2px 12px rgba(15,23,42,0.05)",
        backdropFilter: "blur(14px)",
      }}
    >
      {/* Left accent bar */}
      <span
        className="absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full transition-opacity duration-200"
        style={{
          background: `linear-gradient(to bottom, ${office.accent}, #6366f1)`,
          opacity:    isActive ? 1 : 0,
        }}
      />

      {/* Flag bubble */}
      <div
        className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all duration-200"
        style={{
          background: isActive ? `${office.accent}15` : "rgba(15,23,42,0.05)",
          border:     `1px solid ${isActive ? office.accent + "30" : "rgba(15,23,42,0.08)"}`,
        }}
      >
        {office.flag}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-0.5 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="font-bold text-sm leading-tight transition-colors duration-200"
            style={{
              color:     isActive ? office.accent : "#0f172a",
              fontFamily: "'DM Sans', system-ui, sans-serif",
            }}
          >
            {office.city}
          </span>
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
            style={{
              background: `${office.accent}12`,
              color:      office.accent,
            }}
          >
            {office.type}
          </span>
        </div>
        <span
          className="text-xs leading-snug"
          style={{ color: "rgba(15,23,42,0.45)", fontFamily: "'DM Sans', system-ui, sans-serif" }}
        >
          {office.address}
        </span>
        <span
          className="text-xs"
          style={{ color: "rgba(15,23,42,0.35)", fontFamily: "'DM Sans', system-ui, sans-serif" }}
        >
          {office.country}
        </span>
      </div>

      {/* Pulse indicator */}
      <div className="ml-auto shrink-0 flex items-center">
        <span
          className="block w-2 h-2 rounded-full transition-all duration-200"
          style={{
            background: office.accent,
            opacity:    isActive ? 1 : 0.3,
            boxShadow:  isActive ? `0 0 8px ${office.accent}` : "none",
          }}
        />
      </div>
    </motion.div>
  )
}

/* ── Main export ─────────────────────────────────────────────────────────── */
export default function WorldMapSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <section className="relative w-full overflow-hidden bg-[#f7f9fc]">

      <style>{`
        .wm-serif { font-family: 'DM Serif Display', Georgia, serif; }
        .wm-sans  { font-family: 'DM Sans', system-ui, sans-serif; }
      `}</style>

      {/* Grid bg */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{
        backgroundImage:
          "linear-gradient(rgba(59,130,246,0.055) 1px, transparent 1px)," +
          "linear-gradient(90deg, rgba(59,130,246,0.055) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
      }}/>

      {/* Radial wash */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59,130,246,0.08) 0%, transparent 60%)",
      }}/>

      <div className="relative max-w-6xl mx-auto px-6 sm:px-12 py-28 flex flex-col gap-14">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <motion.div
          className="flex flex-col items-center text-center gap-5"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="wm-sans inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.22em] uppercase"
            style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.18)", color: "#1d4ed8" }}>
            <span style={{ color: "#3b82f6", fontSize: 9 }}>●</span>
            Our Presence
          </span>

          <h2 className="wm-serif text-5xl sm:text-6xl text-[#0f172a] leading-[1.06] tracking-tight">
            Offices{" "}
            <em className="not-italic" style={{
              background: "linear-gradient(135deg, #2563eb 0%, #6366f1 55%, #06b6d4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Across the Globe
            </em>
          </h2>

          <p className="wm-sans text-slate-500 text-base sm:text-lg max-w-lg leading-relaxed">
            Hover over a pin on the map or a card below to highlight our office locations.
          </p>
        </motion.div>

        {/* ── Map ─────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl overflow-hidden"
          style={{
            background:   "rgba(255,255,255,0.75)",
            border:       "1px solid rgba(15,23,42,0.08)",
            boxShadow:    "0 8px 40px rgba(15,23,42,0.07)",
            backdropFilter: "blur(12px)",
            padding:      "24px",
          }}
        >
          <WorldMapSVG hoveredId={hoveredId} onHover={setHoveredId} />
        </motion.div>

        {/* ── Office cards ────────────────────────────────────────────────── */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden:  {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {OFFICES.map((office) => (
            <motion.div
              key={office.id}
              variants={{
                hidden:  { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              <OfficeCard
                office={office}
                isActive={hoveredId === office.id}
                onHover={setHoveredId}
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}