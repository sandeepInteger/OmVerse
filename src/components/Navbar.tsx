import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/** Top padding for page content: matches the fixed nav row (`h-16 sm:h-[70px]`). */
export const NAVBAR_OFFSET_TOP_CLASS = "pt-16 sm:pt-[70px]";

// ── Route map ────────────────────────────────────────────────────
const serviceItems = [
  {
    label: "Soil Testing ",
    href: "/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01" />
      </svg>
    ),
  },
  {
    label: "Soil Testing ",
    href: "/contact",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M3 12h4l3-9 4 18 3-9h4" />
      </svg>
    ),
  },
  {
    label: "Construction Material ",
    href: "/contact",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <rect x="2" y="3" width="20" height="4" rx="1" />
        <rect x="2" y="10" width="20" height="4" rx="1" />
        <rect x="2" y="17" width="20" height="4" rx="1" />
        <circle cx="18" cy="5" r="0.8" fill="currentColor" />
        <circle cx="18" cy="12" r="0.8" fill="currentColor" />
        <circle cx="18" cy="19" r="0.8" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Ground & Water Detection",
    href: "/contact",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <circle cx="12" cy="12" r="3" />
        <path d="M5 5l2.5 2.5M19 5l-2.5 2.5M5 19l2.5-2.5M19 19l-2.5-2.5" />
        <circle cx="4" cy="4" r="1.5" /><circle cx="20" cy="4" r="1.5" />
        <circle cx="4" cy="20" r="1.5" /><circle cx="20" cy="20" r="1.5" />
      </svg>
    ),
  },
  {
    label: "Bitumen Testing",
    href: "/contact",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <rect x="7" y="7" width="10" height="10" rx="1.5" />
        <path d="M9 7V4M12 7V4M15 7V4M9 17v3M12 17v3M15 17v3M7 9H4M7 12H4M7 15H4M17 9h3M17 12h3M17 15h3" />
      </svg>
    ),
  },
];

const mainLinks = [
  { label: "Products", to: "/contact" },
  { label: "Contact", to: "/contact" },
];

function ServicesDropdown() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isServicesActive =
    location.pathname === "/services" ||
    serviceItems.some((s) => location.pathname === s.href);

  const handleServiceNav = (href: string) => {
    setDropdownOpen(false);
    navigate(href);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setDropdownOpen(true)}
      onMouseLeave={() => setDropdownOpen(false)}
    >
      <button
        onClick={() => navigate("/services")}
        className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150 ${
          isServicesActive
            ? "text-blue-600 bg-blue-50"
            : "text-slate-600 hover:text-blue-600 hover:bg-blue-50"
        }`}
      >
        Services
        <motion.svg
          animate={{ rotate: dropdownOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          viewBox="0 0 20 20" fill="currentColor"
          className={`w-3.5 h-3.5 ${dropdownOpen || isServicesActive ? "text-blue-500" : "text-slate-400"}`}
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute top-full left-0 mt-2 w-60 bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden py-2"
          >
            <button
              onClick={() => handleServiceNav("/services")}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-blue-500 transition-colors border-b border-slate-50 mb-1"
            >
              All Services →
            </button>

            {serviceItems.map((item) => {
              const active = location.pathname === item.href;
              return (
                <button
                  key={item.label}
                  onClick={() => handleServiceNav(item.href)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-150 ${
                    active
                      ? "text-blue-600 bg-blue-50 font-semibold"
                      : "text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <span className={active ? "text-blue-500" : "text-slate-400"}>
                    {item.icon}
                  </span>
                  {item.label}
                  {active && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileNavBlock() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();

  const isServicesActive =
    location.pathname === "/services" ||
    serviceItems.some((s) => location.pathname === s.href);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <button
        onClick={() => setMobileOpen((o) => !o)}
        className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-slate-100 transition-colors duration-150"
        aria-label="Toggle menu"
      >
        <motion.span animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          className="block w-5 h-[1.5px] bg-slate-700 rounded-full origin-center" />
        <motion.span animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
          className="block w-5 h-[1.5px] bg-slate-700 rounded-full" />
        <motion.span animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          className="block w-5 h-[1.5px] bg-slate-700 rounded-full origin-center" />
      </button>

      {createPortal(
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm lg:hidden"
                onClick={() => setMobileOpen(false)}
              />

              <motion.div
                initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 320, damping: 32 }}
                className="fixed top-0 right-0 bottom-0 z-50 w-[290px] bg-white shadow-2xl shadow-slate-900/20 flex flex-col lg:hidden"
              >
              <div className="flex items-center justify-between px-5 h-16 border-b border-slate-100">
                <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white">
                      <path d="M12 2L4 6v5c0 4.97 3.47 9.63 8 10.93C16.53 20.63 20 15.97 20 11V6l-8-4z"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-slate-900 font-extrabold text-sm">OmVerse</span>
                </Link>
                <button onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-3 px-3">

                <Link to="/"  onClick={() => setMobileOpen(false)}
                  className={`flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${
                    location.pathname === "/" ? "text-blue-600 bg-blue-50" : "text-slate-700 hover:text-blue-600 hover:bg-blue-50"
                  }`}>
                  Home
                </Link>

                <div className="mt-0.5">
                  <button
                    onClick={() => setMobileServicesOpen((o) => !o)}
                    className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${
                      isServicesActive ? "text-blue-600 bg-blue-50" : "text-slate-700 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    <span>Services</span>
                    <motion.svg
                      animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-slate-400"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </motion.svg>
                  </button>

                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="overflow-hidden ml-3"
                      >
                        <Link to="/services" onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2 px-3 py-2.5 mt-1 text-xs font-bold text-blue-500 border-l-2 border-blue-300 hover:text-blue-600 transition-colors">
                          All Services →
                        </Link>
                        <div className="border-l-2 border-blue-100 flex flex-col gap-0.5 pb-2 mt-0.5">
                          {serviceItems.map((item) => {
                            const active = location.pathname === item.href;
                            return (
                              <Link
                                key={item.label}
                                to={item.href}
                                onClick={() => setMobileOpen(false)}
                                className={`flex items-center gap-2.5 px-3 py-2.5 text-sm rounded-r-xl transition-colors duration-150 ${
                                  active
                                    ? "text-blue-600 bg-blue-50 font-semibold"
                                    : "text-slate-500 hover:text-blue-600 hover:bg-blue-50/60"
                                }`}
                              >
                                <span className={active ? "text-blue-500" : "text-slate-400"}>
                                  {item.icon}
                                </span>
                                {item.label}
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {mainLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center px-3 py-3 mt-0.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                      location.pathname === link.to
                        ? "text-blue-600 bg-blue-50"
                        : "text-slate-700 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="px-5 py-5 border-t border-slate-100 flex flex-col gap-3">
                <a href="tel:+19725394100"
                  className="flex items-center justify-center gap-2 text-sm text-slate-500 font-medium py-2.5 rounded-xl border border-slate-200 hover:border-blue-200 hover:text-blue-600 transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
                  </svg>
                  +1 (972) 539-4100
                </a>
                <Link to="/contact" onClick={() => setMobileOpen(false)}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-3 rounded-full text-center shadow-md shadow-blue-500/20 active:scale-95 transition-all duration-200">
                  Get a Quote
                </Link>
              </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

// ── Component ────────────────────────────────────────────────────
const Navbar = () => {
  const [scrolled, setScrolled]               = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm shadow-slate-200/60 border-b border-slate-100"
            : "bg-transparent"
        }`}
      >
        {/* Accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-60" />

        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-[70px]">

            {/* ── Logo ── */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0">
              <div className="w-10 h-10 rounded-xl  flex items-center justify-center shadow-lg shadow-blue-500/20">
                <img src="/logo.png" alt="Logo" className="w-5 h-5" />
              </div>
              <div className="leading-none">
                <span className="text-slate-900 font-extrabold text-[15px] tracking-tight block">
                  OmVerse
                </span>
                <span className="text-blue-500 text-[10px] font-semibold tracking-widest uppercase">
                  Services Inc.
                </span>
              </div>
            </Link>

            {/* ── Desktop nav ── */}
            <div className="hidden lg:flex items-center gap-0.5">

              {/* Home */}
              <NavLink to="/"
                end
                className={({ isActive }) =>
                  `px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150 ${
                    isActive ? "text-blue-600 bg-blue-50" : "text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                  }`
                }
              >
                Home
              </NavLink>

              <ServicesDropdown key={location.pathname} />

              {/* Remaining links */}
              {mainLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150 ${
                      isActive ? "text-blue-600 bg-blue-50" : "text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* ── Desktop CTA ── */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:+19725394100"
                className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors duration-150 font-medium"
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
                </svg>
                +1 (972) 539-4100
              </a>
              <Link
                to="/contact"
                className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-md shadow-blue-500/20 hover:shadow-blue-400/30 active:scale-95 transition-all duration-200"
              >
                Get a Quote
              </Link>
            </div>

            <MobileNavBlock key={location.pathname} />

          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;