import { useRef, useEffect, useState, useCallback, type ReactNode } from "react";
import { motion } from "framer-motion";

const getVisibleCount = () => {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth < 640)  return 1; // mobile
  if (window.innerWidth < 1024) return 2; // tablet
  return 3;                               // desktop
};

export type CarouselCard = { icon: ReactNode; title: string; subtitle: string; description: string };

const CarouselSection = ({ cards }: { cards: CarouselCard[] }) => {
  const trackRef    = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth]    = useState(360);
  const [visibleCount, setVisible]   = useState(3);
  const [rawIndex, setIndex]         = useState(0);
  const gap = 20;

  const maxIndex = Math.max(0, cards.length - visibleCount);
  // Clamp if the visible count grows on resize
  const index = Math.min(rawIndex, maxIndex);

  const measure = useCallback(() => {
    const v = getVisibleCount();
    setVisible(v);
    if (trackRef.current) {
      const containerWidth = trackRef.current.offsetWidth;
      const computed = (containerWidth - gap * (v - 1)) / v;
      setCardWidth(computed);
    }
  }, []);

  // ResizeObserver fires once on observe, so this also handles the initial measurement
  useEffect(() => {
    if (!trackRef.current) return;
    const observer = new ResizeObserver(measure);
    observer.observe(trackRef.current);
    return () => observer.disconnect();
  }, [measure]);

  const prev = () => setIndex(Math.max(0, index - 1));
  const next = () => setIndex(Math.min(maxIndex, index + 1));

  const translateX = index * (cardWidth + gap);

  // ── Touch swipe support ──────────────────────────────────────────
  const touchStart = useRef(0);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStart.current - e.changedTouches[0].clientX;
    if (delta > 40)  next();
    if (delta < -40) prev();
  };

  return (
    <div className="relative w-full max-w-6xl mt-16 px-10">

      {/* Left arrow */}
      <button
        onClick={prev}
        disabled={index === 0}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Track */}
      <div
        ref={trackRef}
        className="overflow-hidden w-full"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <motion.div
          className="flex"
          style={{ gap: `${gap}px` }}
          animate={{ x: -translateX }}
          transition={{ type: "spring", stiffness: 300, damping: 32 }}
        >
          {cards.map((card) => (
            <div
              key={card.title}
              style={{ minWidth: cardWidth, maxWidth: cardWidth }}
              className="bg-white/70 backdrop-blur-sm border border-blue-100 rounded-3xl p-8 flex flex-col gap-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                {card.icon}
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 leading-tight tracking-tight">
                {card.title}
              </h3>
              <p className="text-blue-500 text-sm font-semibold">{card.subtitle}</p>
              <p className="text-slate-500 text-sm leading-relaxed">{card.description}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right arrow */}
      <button
        onClick={next}
        disabled={index >= maxIndex}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-blue-500" : "w-1.5 bg-slate-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselSection;