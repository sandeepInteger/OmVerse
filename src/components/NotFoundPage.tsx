import { Link } from "react-router-dom";

import { ArrowIcon } from "./PageSections";
import { gridOverlay, ghostButton, primaryButton } from "@/lib/styles";
import { usePageMeta } from "@/lib/usePageMeta";

const NotFoundPage = () => {
  usePageMeta("Page not found");

  return (
    <section
      className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden px-6 py-24"
      style={{ background: "linear-gradient(150deg, #ffffff 0%, #eff6ff 50%, #f0fdf4 100%)" }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0" style={gridOverlay()} />
      <div className="relative flex flex-col items-center text-center gap-6 max-w-lg">
        <span className="font-display text-[7rem] sm:text-[9rem] leading-none bg-gradient-to-br from-blue-600 to-cyan-500 bg-clip-text text-transparent">
          404
        </span>
        <h1 className="font-display text-3xl sm:text-4xl text-slate-900 tracking-tight">This page couldn’t be found</h1>
        <p className="text-slate-500 leading-relaxed">
          The link may be broken or the page may have moved. Try one of these instead.
        </p>
        <div className="flex items-center gap-5 flex-wrap justify-center">
          <Link to="/" className={primaryButton}>Back to Home</Link>
          <Link to="/services" className={ghostButton}>Browse Services <ArrowIcon /></Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
