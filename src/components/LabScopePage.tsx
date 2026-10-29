import { useMemo, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useInView, type Variants, type Transition } from "framer-motion";

import { Counter } from "./Stats";
import { usePageMeta } from "@/lib/usePageMeta";
import { labSummary, labTests, type LabTest, type TestLocation } from "@/data/labScope";

/* ── Animation helpers ───────────────────────────────────────────────────── */
const ease = [0.22, 1, 0.36, 1] as const;
const spring: Transition = { duration: 0.6, ease: "easeOut" };
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: spring },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const heroFade = (delay = 0, y = 28) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.72, delay, ease },
});

const gridOverlay = (alpha = 0.05) => ({
  backgroundImage:
    `linear-gradient(rgba(59,130,246,${alpha}) 1px, transparent 1px),` +
    `linear-gradient(90deg, rgba(59,130,246,${alpha}) 1px, transparent 1px)`,
  backgroundSize: "56px 56px",
});

/* ── Icons ───────────────────────────────────────────────────────────────── */
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </svg>
);

const FlaskIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
    <path d="M9 3h6M10 3v6L4.5 18.5A1.7 1.7 0 006 21h12a1.7 1.7 0 001.5-2.5L14 9V3" />
  </svg>
);

const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

const ChevronIcon = ({ open }: { open: boolean }) => (
  <motion.svg
    animate={{ rotate: open ? 180 : 0 }}
    transition={{ duration: 0.2 }}
    viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-slate-400 shrink-0"
  >
    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
  </motion.svg>
);

const ArrowIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

const BricksIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="3" y="4" width="18" height="16" rx="1.5" />
    <path d="M3 9.3h18M3 14.7h18M9 4v5.3M15 9.3v5.4M9 14.7V20" />
  </svg>
);

const LayersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M12 3l9 5-9 5-9-5 9-5z" />
    <path d="M3 13l9 5 9-5" />
  </svg>
);

const PulseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M3 12h4l3-8 4 16 3-8h4" />
  </svg>
);

/* ── Category theming ────────────────────────────────────────────────────── */
type CategoryTheme = { short: string; blurb: string; from: string; to: string; icon: ReactNode };

const CATEGORY_THEME: Record<string, CategoryTheme> = {
  "Building, Infrastructure & Construction Materials": {
    short: "Construction Materials",
    blurb: "Concrete, cement, bricks, paver blocks, aggregates, GSB and WMM tested to IS standards.",
    from: "#2563eb",
    to: "#06b6d4",
    icon: <BricksIcon />,
  },
  "Soil and Rocks": {
    short: "Soil & Rocks",
    blurb: "Laboratory soil classification, compaction, shear strength, plus in-situ field tests.",
    from: "#10b981",
    to: "#0d9488",
    icon: <LayersIcon />,
  },
  "Building Materials - Reinforced Concrete Structures": {
    short: "Non-Destructive Testing",
    blurb: "On-site integrity, rebound hammer and ultrasonic pulse velocity checks of RCC structures.",
    from: "#6366f1",
    to: "#8b5cf6",
    icon: <PulseIcon />,
  },
};

const themeOf = (group: string) => CATEGORY_THEME[group] ?? CATEGORY_THEME["Building, Infrastructure & Construction Materials"];

/* ── Helpers ─────────────────────────────────────────────────────────────── */
const ALL = "All";

const unique = (values: string[]) => [...new Set(values)];

/** Group tests by category → sub-category → material, keeping document order. */
function buildTree(tests: LabTest[]) {
  const tree = new Map<string, Map<string, Map<string, LabTest[]>>>();
  for (const t of tests) {
    if (!tree.has(t.group)) tree.set(t.group, new Map());
    const subs = tree.get(t.group)!;
    if (!subs.has(t.subGroup)) subs.set(t.subGroup, new Map());
    const materials = subs.get(t.subGroup)!;
    if (!materials.has(t.material)) materials.set(t.material, []);
    materials.get(t.material)!.push(t);
  }
  return tree;
}

const categories = unique(labTests.map((t) => t.group));
const disciplines = unique(labTests.map((t) => t.discipline));
const locations: TestLocation[] = ["Laboratory", "Site"];
const subGroupsOf = (group: string) => unique(labTests.filter((t) => t.group === group).map((t) => t.subGroup));

const STATS = [
  { value: labSummary.tests, label: "Tests in Scope" },
  { value: categories.length, label: "Testing Categories" },
  { value: labSummary.subCategories, label: "Sub-categories" },
  { value: labSummary.standards, label: "IS / DIN Standards" },
];

/* ── Small UI pieces ─────────────────────────────────────────────────────── */
function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 ${
        active
          ? "text-white border-transparent shadow-md shadow-blue-500/25"
          : "bg-white/90 border-blue-100 text-slate-600 hover:border-blue-300 hover:text-blue-600"
      }`}
      style={active ? { background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)" } : undefined}
    >
      {children}
    </button>
  );
}

function LocationBadge({ location }: { location: TestLocation }) {
  const site = location === "Site";
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap border ${
        site ? "bg-amber-50 text-amber-700 border-amber-200/70" : "bg-emerald-50 text-emerald-700 border-emerald-200/70"
      }`}
    >
      {site ? <PinIcon /> : <FlaskIcon />}
      {site ? "On-site" : "In lab"}
    </span>
  );
}

const ROW_GRID = "md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.9fr)_84px]";

function TestRow({ test }: { test: LabTest }) {
  return (
    <div className={`grid gap-2 md:gap-4 ${ROW_GRID} md:items-center px-5 py-3.5 border-t border-slate-100 first:border-t-0 hover:bg-blue-50/40 transition-colors`}>
      <p className="text-sm font-semibold text-slate-800">{test.parameter}</p>
      <p className="text-xs text-slate-600">
        <span className="md:hidden font-semibold text-slate-400 uppercase tracking-wider mr-1.5">Method</span>
        <span className="px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">{test.method}</span>
      </p>
      <p className="text-xs text-slate-600">
        <span className="md:hidden font-semibold text-slate-400 uppercase tracking-wider mr-1.5">Range</span>
        {test.range}
      </p>
      <p className="text-xs text-slate-500">
        <span className="md:hidden font-semibold text-slate-400 uppercase tracking-wider mr-1.5">MU (±)</span>
        {test.mu || "—"}
      </p>
      <div>
        <LocationBadge location={test.location} />
      </div>
    </div>
  );
}

function MaterialCard({ group, material, tests, defaultOpen }: { group: string; material: string; tests: LabTest[]; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const theme = themeOf(group);
  return (
    <div
      className="lab-card rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.92)",
        border: "1px solid rgba(59,130,246,0.10)",
        boxShadow: "0 2px 16px rgba(15,23,42,0.05)",
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span
            className="w-1.5 self-stretch rounded-full shrink-0"
            style={{ background: `linear-gradient(180deg, ${theme.from}, ${theme.to})` }}
          />
          <div className="min-w-0">
            <p className="text-[15px] font-bold text-[#0f172a]">{material}</p>
            <p className="text-xs text-slate-500 mt-0.5">
              {tests.length} {tests.length === 1 ? "test" : "tests"} · {unique(tests.map((t) => t.location === "Site" ? "On-site" : "In lab")).join(" & ")}
            </p>
          </div>
        </div>
        <ChevronIcon open={open} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-slate-100"
          >
            <div className={`hidden md:grid ${ROW_GRID} gap-4 px-5 py-2.5 bg-blue-50/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider`}>
              <span>Test parameter</span>
              <span>Test method</span>
              <span>Range / limit</span>
              <span>MU (±) @ value</span>
              <span>Where</span>
            </div>
            {tests.map((t) => (
              <TestRow key={t.id} test={t} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
const LabScopePage = () => {
  usePageMeta("Lab Scope", "Search every test in the OmVerse laboratory scope by material, parameter or IS code, with testing range and measurement uncertainty.");
  const [query, setQuery] = useState("");
  const [discipline, setDiscipline] = useState(ALL);
  const [location, setLocation] = useState(ALL);
  const [category, setCategory] = useState(ALL);
  const [subCategory, setSubCategory] = useState(ALL);

  const explorerRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });

  // Everything except the category/sub-category selection, so the sidebar counts stay meaningful.
  const baseFiltered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return labTests.filter(
      (t) =>
        (discipline === ALL || t.discipline === discipline) &&
        (location === ALL || t.location === location) &&
        (!q ||
          [t.parameter, t.material, t.method, t.subGroup, t.group].some((v) => v.toLowerCase().includes(q)))
    );
  }, [query, discipline, location]);

  const filtered = useMemo(
    () =>
      baseFiltered.filter(
        (t) => (category === ALL || t.group === category) && (subCategory === ALL || t.subGroup === subCategory)
      ),
    [baseFiltered, category, subCategory]
  );

  const sidebarTree = useMemo(() => buildTree(baseFiltered), [baseFiltered]);
  const resultTree = useMemo(() => buildTree(filtered), [filtered]);

  const subCategoryOptions = useMemo(
    () => (category === ALL ? unique(labTests.map((t) => t.subGroup)) : subGroupsOf(category)),
    [category]
  );

  const hasFilters =
    query !== "" || discipline !== ALL || location !== ALL || category !== ALL || subCategory !== ALL;

  const resetFilters = () => {
    setQuery("");
    setDiscipline(ALL);
    setLocation(ALL);
    setCategory(ALL);
    setSubCategory(ALL);
  };

  const selectCategory = (cat: string, sub = ALL) => {
    setCategory(cat);
    setSubCategory(sub);
  };

  const scrollToExplorer = () => explorerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const jumpTo = (cat: string, sub = ALL) => {
    resetFilters();
    selectCategory(cat, sub);
    scrollToExplorer();
  };

  const countIn = (subs: Map<string, Map<string, LabTest[]>> | undefined, sub?: string) => {
    if (!subs) return 0;
    const lists = sub ? [subs.get(sub)] : [...subs.values()];
    return lists.reduce((n, m) => n + (m ? [...m.values()].flat().length : 0), 0);
  };

  // Material cards start collapsed only on the full, unfiltered list.
  const expandCards = hasFilters;

  return (
    <div className="lab-sans">
      <style>{`
        .lab-serif { font-family: 'DM Serif Display', Georgia, serif; }
        .lab-sans  { font-family: 'DM Sans', system-ui, sans-serif; }

        @keyframes lab-badge-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37,99,235,0.35); }
          50%       { box-shadow: 0 0 0 6px rgba(37,99,235,0); }
        }
        .lab-badge-dot { animation: lab-badge-pulse 2.2s ease-in-out infinite; }

        @keyframes lab-float-y {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        .lab-float { animation: lab-float-y 5s ease-in-out infinite; }

        @keyframes lab-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .lab-shimmer-word {
          background: linear-gradient(90deg, #1d4ed8 0%, #3b82f6 30%, #60a5fa 50%, #3b82f6 70%, #1d4ed8 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: lab-shimmer 5s linear infinite;
        }

        .lab-cta-primary {
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          box-shadow: 0 4px 16px rgba(37,99,235,0.25);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        .lab-cta-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(37,99,235,0.35); }
        .lab-cta-primary:active { transform: translateY(0); }

        .lab-card { transition: transform 0.22s ease, box-shadow 0.22s ease; }
        .lab-card:hover { box-shadow: 0 12px 32px rgba(37,99,235,0.10) !important; }
      `}</style>

      {/* ══ HERO ═══════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full overflow-hidden"
        style={{ background: "linear-gradient(150deg, #ffffff 0%, #eff6ff 45%, #f0fdf4 100%)" }}
      >
        <div aria-hidden className="pointer-events-none absolute top-0 right-0 w-[600px] h-[500px]"
          style={{ background: "radial-gradient(ellipse at 90% 10%, rgba(59,130,246,0.10) 0%, transparent 65%)" }} />
        <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-16 w-[480px] h-[380px]"
          style={{ background: "radial-gradient(ellipse at 10% 90%, rgba(16,185,129,0.09) 0%, transparent 65%)" }} />
        <div aria-hidden className="pointer-events-none absolute inset-0" style={gridOverlay()} />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 py-16 sm:py-24 flex flex-col lg:flex-row items-center justify-between gap-14 lg:gap-10">
          {/* Left */}
          <div className="flex flex-col gap-7 flex-1 max-w-[580px]">
            <motion.div {...heroFade(0.05)}>
              <span
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-[12px] font-semibold tracking-wide"
                style={{ background: "rgba(37,99,235,0.07)", border: "1px solid rgba(37,99,235,0.20)", color: "#1d4ed8" }}
              >
                <span className="lab-badge-dot w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                Scope of the Laboratory
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white">2025</span>
              </span>
            </motion.div>

            <div className="flex flex-col gap-1">
              <motion.h1 {...heroFade(0.12)}
                className="lab-serif text-[2.6rem] sm:text-6xl lg:text-[3.8rem] text-[#0f172a] leading-[1.06] tracking-tight m-0">
                Explore Our
              </motion.h1>
              <motion.div {...heroFade(0.22)}>
                <span className="lab-serif lab-shimmer-word text-[2.6rem] sm:text-6xl lg:text-[3.8rem] leading-[1.06] tracking-tight">
                  Testing Scope
                </span>
              </motion.div>
            </div>

            <motion.p {...heroFade(0.3)} className="text-[15.5px] leading-[1.75] text-slate-500 max-w-[470px] m-0">
              Every test our laboratory performs — for construction materials, soil and rock, and non-destructive
              testing of concrete structures — with its IS test method, testing range and measurement uncertainty.
            </motion.p>

            <motion.div {...heroFade(0.38)} className="flex items-center gap-5 flex-wrap">
              <Link to="/contact" className="lab-cta-primary text-white font-semibold text-sm px-7 py-3.5 rounded-xl">
                Get a Free Quote
              </Link>
              <button
                onClick={scrollToExplorer}
                className="bg-transparent border-none text-slate-800 hover:text-blue-600 font-semibold text-sm flex items-center gap-1.5 py-3 cursor-pointer transition-colors"
              >
                Browse All Tests <ArrowIcon />
              </button>
            </motion.div>
          </div>

          {/* Right — category stack */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lab-float relative flex-1 w-full max-w-[460px]"
          >
            <div aria-hidden className="absolute inset-0 m-auto w-[85%] h-[85%] rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(37,99,235,0.14) 0%, transparent 70%)", filter: "blur(32px)" }} />
            <div className="relative flex flex-col gap-3.5">
              {categories.map((cat, i) => {
                const theme = themeOf(cat);
                const count = labTests.filter((t) => t.group === cat).length;
                return (
                  <motion.button
                    key={cat}
                    onClick={() => jumpTo(cat)}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.55, delay: 0.5 + i * 0.15, ease }}
                    className={`lab-card flex items-center gap-4 px-5 py-4 rounded-2xl text-left ${i === 1 ? "lg:ml-10" : ""}`}
                    style={{
                      background: "rgba(255,255,255,0.93)",
                      border: `1px solid ${theme.from}35`,
                      boxShadow: `0 4px 16px ${theme.from}20, 0 1px 0 rgba(255,255,255,0.9) inset`,
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <span
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0"
                      style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}
                    >
                      {theme.icon}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm font-bold text-[#0f172a]">{theme.short}</span>
                      <span className="block text-xs text-slate-500 mt-0.5">{subGroupsOf(cat).length} sub-categories</span>
                    </span>
                    <span className="text-xl font-extrabold tabular-nums" style={{ color: theme.from }}>{count}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ STATS ══════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full overflow-hidden"
        style={{ background: "linear-gradient(180deg, #eff6ff 0%, #f8faff 100%)" }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0" style={gridOverlay()} />
        <div ref={statsRef} className="relative max-w-5xl mx-auto px-6 sm:px-10 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map(({ value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 18 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.1, ease }}
                className="flex flex-col gap-1.5 px-6 py-5 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.88)",
                  border: "1px solid rgba(59,130,246,0.10)",
                  boxShadow: "0 2px 16px rgba(15,23,42,0.05)",
                }}
              >
                <Counter target={value} suffix="" decimals={0} delay={i * 0.12} inView={statsInView} />
                <span className="text-[13px] text-slate-500 font-medium leading-snug">{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CATEGORIES (dark) ══════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden" style={{ background: "linear-gradient(180deg, #0a1628 0%, #0d1f3c 100%)" }}>
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }} />
        <div className="absolute top-0 left-1/4 w-[420px] h-[300px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 py-20">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="max-w-3xl mx-auto flex flex-col items-center text-center gap-4"
          >
            <motion.p variants={fadeUp} className="text-blue-400 text-sm font-semibold tracking-widest uppercase">
              Testing Categories
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-extrabold text-white leading-[1.1] tracking-tight">
              Pick a category to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">get started</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-400 text-base sm:text-lg max-w-xl">
              Choose a category or sub-category to jump straight to its tests.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-14 grid md:grid-cols-3 gap-5"
          >
            {categories.map((cat) => {
              const theme = themeOf(cat);
              const count = labTests.filter((t) => t.group === cat).length;
              return (
                <motion.div
                  key={cat}
                  variants={fadeUp}
                  className="group relative rounded-3xl p-6 sm:p-7 flex flex-col gap-5 overflow-hidden transition-colors duration-200"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <div aria-hidden className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"
                    style={{ background: theme.from }} />
                  <div className="relative flex items-start justify-between gap-4">
                    <span
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg"
                      style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}
                    >
                      {theme.icon}
                    </span>
                    <span className="text-right">
                      <span className="block text-3xl font-extrabold text-white leading-none tabular-nums">{count}</span>
                      <span className="block text-[11px] text-slate-400 mt-1">tests</span>
                    </span>
                  </div>
                  <div className="relative">
                    <h3 className="text-xl font-bold text-white">{theme.short}</h3>
                    <p className="text-sm text-slate-400 mt-2 leading-relaxed">{theme.blurb}</p>
                  </div>
                  <div className="relative flex flex-wrap gap-2">
                    {subGroupsOf(cat).map((sub) => (
                      <button
                        key={sub}
                        onClick={() => jumpTo(cat, sub)}
                        className="px-3 py-1.5 rounded-full text-xs font-medium text-slate-200 border border-white/15 bg-white/5 hover:bg-white/15 hover:border-white/30 transition-all"
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => jumpTo(cat)}
                    className="relative mt-auto inline-flex items-center gap-1.5 text-sm font-semibold transition-all hover:gap-2.5"
                    style={{ color: theme.to }}
                  >
                    View all {count} tests <ArrowIcon />
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ══ EXPLORER ═══════════════════════════════════════════════════════ */}
      <section
        ref={explorerRef}
        className="relative w-full scroll-mt-16 sm:scroll-mt-[70px]"
        style={{ background: "linear-gradient(180deg, #f8faff 0%, #eff6ff 50%, #f8faff 100%)" }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0" style={gridOverlay(0.04)} />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 py-16 sm:py-20">
          <div className="flex flex-col gap-3 mb-10">
            <p className="text-blue-600 text-sm font-semibold tracking-widest uppercase">Test Explorer</p>
            <h2 className="lab-serif text-4xl sm:text-5xl text-[#0f172a] leading-[1.1] tracking-tight">
              Find the <span className="lab-shimmer-word">right test</span>
            </h2>
          </div>

          {/* Toolbar */}
          <div
            className="rounded-2xl p-4 sm:p-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between"
            style={{
              background: "rgba(255,255,255,0.88)",
              border: "1px solid rgba(59,130,246,0.10)",
              boxShadow: "0 2px 16px rgba(15,23,42,0.05)",
            }}
          >
            <div className="relative w-full xl:max-w-md">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <SearchIcon />
              </span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search a test, material or IS code…"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-blue-100 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-500/10 transition"
              />
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Type</span>
                {[ALL, ...disciplines].map((d) => (
                  <Pill key={d} active={discipline === d} onClick={() => setDiscipline(d)}>{d}</Pill>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Where</span>
                {[ALL, ...locations].map((l) => (
                  <Pill key={l} active={location === l} onClick={() => setLocation(l)}>
                    {l === "Site" ? "On-site" : l === "Laboratory" ? "In lab" : l}
                  </Pill>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile category selects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 lg:hidden">
            <select
              value={category}
              onChange={(e) => selectCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-blue-100 text-sm text-slate-700 focus:outline-none focus:border-blue-300"
            >
              <option value={ALL}>All categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>{themeOf(c).short}</option>
              ))}
            </select>
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-blue-100 text-sm text-slate-700 focus:outline-none focus:border-blue-300"
            >
              <option value={ALL}>All sub-categories</option>
              {subCategoryOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="mt-6 lg:mt-8 grid lg:grid-cols-[290px_minmax(0,1fr)] gap-8">
            {/* Desktop category sidebar */}
            <aside className="hidden lg:block">
              <div
                className="sticky top-24 rounded-2xl py-3 max-h-[calc(100vh-8rem)] overflow-y-auto"
                style={{
                  background: "rgba(255,255,255,0.92)",
                  border: "1px solid rgba(59,130,246,0.10)",
                  boxShadow: "0 2px 16px rgba(15,23,42,0.05)",
                }}
              >
                <button
                  onClick={() => selectCategory(ALL)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-bold transition-colors ${
                    category === ALL ? "text-blue-600 bg-blue-50" : "text-slate-700 hover:text-blue-600 hover:bg-blue-50/60"
                  }`}
                >
                  All categories
                  <span className="text-xs font-semibold text-slate-400">{baseFiltered.length}</span>
                </button>

                {categories.map((cat) => {
                  const theme = themeOf(cat);
                  const subs = sidebarTree.get(cat);
                  const catCount = countIn(subs);
                  const catActive = category === cat;
                  return (
                    <div key={cat} className="mt-2 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => selectCategory(cat)}
                        disabled={catCount === 0}
                        className={`w-full flex items-center justify-between gap-3 px-4 py-2 text-left text-[13px] font-bold transition-colors disabled:opacity-40 ${
                          catActive && subCategory === ALL ? "bg-blue-50 text-blue-600" : "text-[#0f172a] hover:text-blue-600"
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }} />
                          {theme.short}
                        </span>
                        <span className="text-xs font-semibold text-slate-400">{catCount}</span>
                      </button>
                      <div className="ml-5 border-l-2" style={{ borderColor: `${theme.from}30` }}>
                        {subGroupsOf(cat).map((sub) => {
                          const count = countIn(subs, sub);
                          const active = catActive && subCategory === sub;
                          return (
                            <button
                              key={sub}
                              onClick={() => selectCategory(cat, sub)}
                              disabled={count === 0}
                              className={`w-full flex items-start justify-between gap-3 pl-3 pr-4 py-1.5 text-left text-[13px] rounded-r-lg transition-colors disabled:opacity-40 ${
                                active ? "text-blue-600 bg-blue-50 font-semibold" : "text-slate-500 hover:text-blue-600 hover:bg-blue-50/60"
                              }`}
                            >
                              <span>{sub}</span>
                              <span className="text-[11px] text-slate-400 mt-0.5">{count}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </aside>

            {/* Results */}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <p className="text-sm text-slate-500">
                  Showing <span className="font-bold text-[#0f172a]">{filtered.length}</span> of {labTests.length} tests
                </p>
                {hasFilters && (
                  <button onClick={resetFilters} className="text-sm font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                    Clear all filters
                  </button>
                )}
              </div>

              {filtered.length === 0 ? (
                <div className="bg-white/80 rounded-2xl border border-dashed border-blue-200 px-6 py-16 text-center">
                  <p className="text-[#0f172a] font-bold">No tests match these filters</p>
                  <p className="text-sm text-slate-500 mt-1.5">Try a different search term, or clear the filters.</p>
                  <button onClick={resetFilters} className="lab-cta-primary mt-5 text-white text-sm font-semibold px-6 py-3 rounded-xl">
                    Clear filters
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-12">
                  {[...resultTree.entries()].map(([cat, subs]) => {
                    const theme = themeOf(cat);
                    return (
                      <div key={cat}>
                        <div className="flex items-center gap-3 mb-5">
                          <span
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0"
                            style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}
                          >
                            {theme.icon}
                          </span>
                          <div>
                            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0f172a] leading-tight">{cat}</h3>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
                              {labTests.find((t) => t.group === cat)?.discipline} testing
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-8">
                          {[...subs.entries()].map(([sub, materials]) => (
                            <div key={sub}>
                              <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3" style={{ color: theme.from }}>
                                <span className="w-5 h-[2px] rounded-full" style={{ background: `linear-gradient(90deg, ${theme.from}, ${theme.to})` }} />
                                {sub}
                              </h4>
                              <div className="flex flex-col gap-3">
                                {[...materials.entries()].map(([material, tests]) => (
                                  <MaterialCard
                                    key={`${material}-${expandCards}`}
                                    group={cat}
                                    material={material}
                                    tests={tests}
                                    defaultOpen={expandCards}
                                  />
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <p className="mt-8 text-xs text-slate-400">
                MU = measurement uncertainty (±) at the stated value. “On-site” tests are performed at your project
                location; all others are carried out in our permanent laboratory.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER ═════════════════════════════════════════════════════ */}
      <section className="w-full px-4 sm:px-6 py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-blue-50/40 to-slate-50 pointer-events-none" />
        <motion.div
          className="max-w-6xl mx-auto relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="relative bg-slate-900 rounded-3xl overflow-hidden px-8 sm:px-12 py-14 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="absolute top-0 left-0 w-[400px] h-[300px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/3 w-[300px] h-[200px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }} />

            <div className="relative z-10 flex flex-col gap-5 max-w-xl">
              <span className="self-start inline-flex items-center gap-2 bg-blue-500/15 border border-blue-500/25 text-blue-400 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                Need a Test?
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-[1.1] tracking-tight">
                Get accurate results for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">your project</span>
              </h2>
              <p className="text-slate-400 text-base leading-relaxed">
                Share your material and the required standard — we’ll get back with a quote and turnaround time.
              </p>
            </div>

            <div className="relative z-10 flex items-center gap-4 flex-wrap">
              <Link
                to="/contact"
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-7 py-3.5 rounded-full shadow-lg shadow-blue-900/40 active:scale-95 transition-all duration-200"
              >
                Request a Quote
              </Link>
              <Link
                to="/contact"
                className="border border-slate-600 text-white font-semibold text-sm px-7 py-3.5 rounded-full hover:border-slate-400 hover:bg-white/5 active:scale-95 transition-all duration-200 flex items-center gap-2"
              >
                Contact Us <ArrowIcon />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default LabScopePage;
