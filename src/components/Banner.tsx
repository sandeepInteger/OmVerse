import { motion, type Variants, type Transition } from "framer-motion";
import WorldMap from "./ui/world-map";

const spring: Transition = { duration: 0.6, ease: "easeOut" };
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: spring },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// Stats row
const stats = [
  { value: "900+",  label: "Projects Completed" },
  { value: "400+", label: "Satisfied Clients" },
  { value: "4+ Years",    label: "Industry Experience" },
  { value: "24/7", label: "Technical Support" },
];

const CTABanner = () => {
  return (
    <section className="w-full px-4 sm:px-6 py-16 relative">

      {/* ── Section bg differentiator — light blue-gray tinted band ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-blue-50/40 to-slate-50 pointer-events-none" />

      {/* ── Decorative grid pattern behind card ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(#1e40af 1px, transparent 1px), linear-gradient(90deg, #1e40af 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <motion.div
        className="max-w-6xl mx-auto relative"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* ── Dark card ── */}
        <div className="relative bg-slate-900 rounded-3xl overflow-hidden px-8 sm:px-12 py-14 flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* Inner glow blobs */}
          <div className="absolute top-0 left-0 w-[400px] h-[300px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/3 w-[300px] h-[200px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Subtle inner grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />

          {/* ── LEFT: Text ── */}
          <motion.div
            className="flex flex-col gap-7 flex-1 max-w-xl relative z-10"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Eyebrow badge */}
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-500/25 text-blue-400 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                Get Started Today
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] tracking-tight"
            >
              Ready to Build Stronger & {" "} 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Safer Projects?
              </span>
            </motion.h2>

            {/* Single paragraph */}
            <motion.p
              variants={fadeUp}
              className="text-slate-400 text-base leading-relaxed max-w-md"
            >
             OmVerse provides accurate soil testing, material testing, and construction quality analysis with expert technical support and reliable reporting for every stage of your project.
            </motion.p>

            {/* Buttons */}
            <motion.div variants={fadeUp} className="flex items-center gap-4 flex-wrap">
              <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-7 py-3.5 rounded-full shadow-lg shadow-blue-900/40 hover:shadow-blue-700/40 active:scale-95 transition-all duration-200">
                Request a Proposal
              </button>
              <button className="border border-slate-600 text-white font-semibold text-sm px-7 py-3.5 rounded-full hover:border-slate-400 hover:bg-white/5 active:scale-95 transition-all duration-200 flex items-center gap-2">
                Contact Us Today
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-4 gap-4 pt-4 border-t border-slate-700/60"
            >
              {stats.map(({ value, label }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span className="text-white font-extrabold text-xl leading-none">{value}</span>
                  <span className="text-slate-500 text-xs">{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Visual ── */}
           <div className="relative flex-shrink-0 w-64 h-64 hidden lg:flex ...">
                <div className="relative flex-shrink-0 w-[620px] hidden lg:block self-center">
                 {/* Edge fade mask — blends map into card bg on all 4 sides */}
                    <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: `radial-gradient(ellipse at center, transparent 40%, #0f172a 80%)`}}/>
                       <WorldMap
                            dots={[
      { start: { lat: 64.2008, lng: -149.4937 }, end: { lat: 34.0522,  lng: -118.2437 } },
      { start: { lat: 64.2008, lng: -149.4937 }, end: { lat: -15.7975, lng: -47.8919  } },
      { start: { lat: -15.7975, lng: -47.8919  }, end: { lat: 38.7223,  lng: -9.1393   } },
      { start: { lat: 51.5074,  lng: -0.1278   }, end: { lat: 28.6139,  lng: 77.209    } },
      { start: { lat: 28.6139,  lng: 77.209    }, end: { lat: 43.1332,  lng: 131.9113  } },
      { start: { lat: 28.6139,  lng: 77.209    }, end: { lat: -1.2921,  lng: 36.8219   } },
    ]}
    
                        />
                    </div>
                </div>
            </div>
      </motion.div>
    </section>
  );
};

export default CTABanner;