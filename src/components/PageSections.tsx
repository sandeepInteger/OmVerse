import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { SITE } from "@/data/site";
import { gridOverlay } from "@/lib/styles";

const ease = [0.22, 1, 0.36, 1] as const;
const heroFade = (delay = 0, y = 24) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
});

export const ArrowIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2} aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

export const CheckIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <path d="M3 8l3.5 3.5L13 4" />
  </svg>
);

/** Small uppercase label above section headings. */
export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.2em] uppercase ${
        dark ? "bg-blue-500/15 border border-blue-500/25 text-blue-300" : "bg-blue-50 border border-blue-100 text-blue-700"
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dark ? "bg-blue-400" : "bg-blue-500"}`} />
      {children}
    </span>
  );
}

type Crumb = { label: string; to?: string };

/** Light hero used at the top of inner pages. */
export function PageHero({
  crumbs, badge, title, highlight, description, actions, aside,
}: {
  crumbs?: Crumb[];
  badge?: ReactNode;
  title: string;
  highlight?: string;
  description: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "linear-gradient(150deg, #ffffff 0%, #eff6ff 45%, #f0fdf4 100%)" }}
    >
      <div aria-hidden className="pointer-events-none absolute top-0 right-0 w-[600px] max-w-full h-[500px]"
        style={{ background: "radial-gradient(ellipse at 90% 10%, rgba(59,130,246,0.10) 0%, transparent 65%)" }} />
      <div aria-hidden className="pointer-events-none absolute inset-0" style={gridOverlay()} />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 py-14 sm:py-20 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="flex flex-col gap-6 flex-1 max-w-[600px] w-full">
          {crumbs && (
            <motion.nav {...heroFade(0)} aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-slate-400">
              {crumbs.map((c, i) => (
                <span key={c.label} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden>/</span>}
                  {c.to ? (
                    <Link to={c.to} className="hover:text-blue-600 transition-colors">{c.label}</Link>
                  ) : (
                    <span className="text-slate-600" aria-current="page">{c.label}</span>
                  )}
                </span>
              ))}
            </motion.nav>
          )}

          {badge && <motion.div {...heroFade(0.05)}>{badge}</motion.div>}

          <motion.h1 {...heroFade(0.12)}
            className="font-display text-[2.5rem] sm:text-6xl lg:text-[3.6rem] text-[#0f172a] leading-[1.06] tracking-tight m-0">
            {title}
            {highlight && (
              <>
                {" "}
                <span className="bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  {highlight}
                </span>
              </>
            )}
          </motion.h1>

          <motion.p {...heroFade(0.22)} className="text-[15.5px] leading-[1.75] text-slate-500 max-w-[520px] m-0">
            {description}
          </motion.p>

          {actions && (
            <motion.div {...heroFade(0.3)} className="flex items-center gap-5 flex-wrap">
              {actions}
            </motion.div>
          )}
        </div>

        {aside && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="flex-1 w-full max-w-[480px]"
          >
            {aside}
          </motion.div>
        )}
      </div>
    </section>
  );
}

/** Dark call-to-action banner shown near the bottom of inner pages. */
export function CtaBanner({
  eyebrow = "Get Started",
  title = "Need accurate results for",
  highlight = "your project?",
  description = "Tell us the material, quantity and required standard — we’ll get back with a quote and turnaround time.",
}: { eyebrow?: string; title?: string; highlight?: string; description?: string }) {
  return (
    <section className="w-full px-4 sm:px-6 py-16 sm:py-20 bg-gradient-to-b from-slate-50 via-blue-50/40 to-slate-50">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="relative bg-slate-900 rounded-3xl overflow-hidden px-7 sm:px-12 py-12 sm:py-14 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div aria-hidden className="absolute top-0 left-0 w-[400px] h-[300px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
          <div aria-hidden className="absolute bottom-0 right-1/3 w-[300px] h-[200px] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col gap-5 max-w-xl">
            <span className="self-start"><Eyebrow dark>{eyebrow}</Eyebrow></span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-[1.1] tracking-tight">
              {title}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">{highlight}</span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">{description}</p>
          </div>

          <div className="relative flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <Link
              to="/contact"
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-7 py-3.5 rounded-full text-center shadow-lg shadow-blue-900/40 active:scale-95 transition-all duration-200"
            >
              Request a Quote
            </Link>
            <a
              href={SITE.phone.href}
              className="border border-slate-600 text-white font-semibold text-sm px-7 py-3.5 rounded-full hover:border-slate-400 hover:bg-white/5 transition-all duration-200 text-center"
            >
              Call {SITE.phone.display}
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
