import { motion, type Variants, type Transition } from "framer-motion";
import { BackgroundRippleEffect } from "./ui/background-ripple-effect";

import CarouselSection from "./CorouselSection";

const spring: Transition = { duration: 0.6, ease: "easeOut" };

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: spring },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// ── Icons ─────────────────────────────────────────────────────────
const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-blue-500">
    <path
      d="M12 2L4 6v5c0 4.97 3.47 9.63 8 10.93C16.53 20.63 20 15.97 20 11V6l-8-4z"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
    />
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-blue-500">
    <rect x="3" y="12" width="4" height="9" rx="1" stroke="currentColor" strokeWidth="1.8" />
    <rect x="10" y="7" width="4" height="14" rx="1" stroke="currentColor" strokeWidth="1.8" />
    <rect x="17" y="3" width="4" height="18" rx="1" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const PersonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-blue-500">
    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
    <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const BrainIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-blue-500">
    <path d="M9 3C6 3 4 5 4 8c0 1.5.5 2.8 1.4 3.8C4.5 12.8 4 14 4 15.5C4 18 6 20 8.5 20c.5 0 1-.1 1.5-.2V4.2C9.7 3.4 9.4 3 9 3z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M15 3c3 0 5 2 5 5 0 1.5-.5 2.8-1.4 3.8.9 1 1.4 2.2 1.4 3.7C20 18 18 20 15.5 20c-.5 0-1-.1-1.5-.2V4.2c.3-.8.6-1.2 1-1.2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M9 12h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);



// ── Card data ─────────────────────────────────────────────────────
const cards = [
  {
    icon: <ShieldIcon />,
    title: "Expert Testing Services",
    subtitle: "Accurate analysis for construction and infrastructure projects.",
    description:
      "Qualified engineers and technicians run every test to the specified IS method and check results before they are reported.",
  },
  {
    icon: <ChartIcon />,
    title: "Fast Report Delivery",
    subtitle: "Quick testing and reporting for ongoing projects.",
    description:
      "Clear, well-structured reports delivered on agreed timelines so your project decisions are never held up.",
  },
  {
    icon: <PersonIcon />,
    title: "Advanced Testing Equipment",
    subtitle: "Modern tools ensuring precise and reliable results.",
    description:
      "Calibrated laboratory and field equipment, with measurement uncertainty stated for each test in our scope.",
  },
  {
    icon: <BrainIcon />,
    title: "Field & Lab Support",
    subtitle: "Complete on-site inspection and laboratory solutions.",
    description:
      "One partner for sample collection, in-situ tests such as SPT and plate load, and complete laboratory analysis.",
  },
  
];



// ── Main component ────────────────────────────────────────────────
const ChooseInteger = () => {
  

  return (
    <section className="relative w-full flex flex-col items-center justify-start overflow-hidden bg-gradient-to-b from-blue-200 via-white to-white">

      {/* Ripple background */}
      <BackgroundRippleEffect />

      {/* Content — above ripple */}
      <div className="relative z-10 w-full flex flex-col items-center pt-20 pb-16 px-6">

        {/* Header */}
        <motion.div
          className="flex flex-col items-center text-center gap-5 max-w-3xl"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            variants={fadeUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.05]"
          >
            Why choose OmVerse?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-slate-500 text-base sm:text-lg max-w-xl leading-relaxed"
          >
            Precision Testing Backed by Engineering Expertise
          </motion.p>
        </motion.div>

        {/* Cards carousel */}
        <CarouselSection cards={cards}/>
      </div>
    </section>
  );
};

export default ChooseInteger;