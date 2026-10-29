import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { SERVICES } from "@/data/services";
import { OFFICES, SITE } from "@/data/site";

const footerLinks = {
  "Company": [
    { label: "Home",      to: "/" },
    { label: "About",     to: "/about" },
    { label: "Services",  to: "/services" },
    { label: "Lab Scope", to: "/lab-scope" },
    { label: "Contact",   to: "/contact" },
  ],
  "Services": SERVICES.map((s) => ({ label: s.label, to: `/services/${s.slug}` })),
};

// ── Icons ────────────────────────────────────────────────────────
const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const socials = [
  { Icon: LinkedInIcon, href: SITE.socials.linkedin, label: "LinkedIn" },
  { Icon: XIcon,        href: SITE.socials.x,        label: "X (Twitter)" },
  { Icon: FacebookIcon, href: SITE.socials.facebook, label: "Facebook" },
];

// ── Footer ───────────────────────────────────────────────────────
const Footer = () => {
  return (
    <footer className="w-full relative overflow-hidden bg-[#f8faff]">

      {/* ── Decorative background blobs ── */}
      <div aria-hidden className="absolute top-0 left-0 w-[500px] max-w-full h-[300px] bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.07),transparent_65%)] pointer-events-none" />
      <div aria-hidden className="absolute bottom-0 right-0 w-[400px] max-w-full h-[250px] bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.06),transparent_65%)] pointer-events-none" />

      {/* ── Top accent line ── */}
      <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10 relative z-10">

        {/* ── BRAND + LINKS GRID ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-slate-200/60">

          {/* Brand — spans 3 cols */}
          <div className="sm:col-span-2 lg:col-span-3 flex flex-col gap-6">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 w-fit">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 bg-white">
                <img src="/logo.png" alt="" className="w-5 h-5" />
              </div>
              <div>
                <span className="text-slate-900 font-extrabold text-xl tracking-tight block leading-none">
                  {SITE.name}
                </span>
                <span className="text-blue-500 text-xs font-semibold tracking-widest uppercase">
                  Services Inc.
                </span>
              </div>
            </Link>

            {/* Tagline */}
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              Our goal is not just to deliver testing services — it is to provide accurate engineering solutions that ensure safer construction, stronger foundations, and long-term project reliability.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="group w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-600 hover:shadow-blue-200 hover:shadow-md transition-all duration-200"
                >
                  <Icon />
                </a>
              ))}
            </div>

            {/* Contact pills */}
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={SITE.email.href}
                className="inline-flex items-center gap-2 text-xs text-blue-600 font-semibold bg-blue-50 border border-blue-100 rounded-full px-4 py-2 hover:bg-blue-100 transition-colors duration-200"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5" aria-hidden>
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                {SITE.email.display}
              </a>
              <a
                href={SITE.phone.href}
                className="inline-flex items-center gap-2 text-xs text-slate-600 font-semibold bg-white border border-slate-200 rounded-full px-4 py-2 hover:border-blue-200 hover:text-blue-600 transition-colors duration-200"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" aria-hidden>
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
                </svg>
                {SITE.phone.display}
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading} className={`flex flex-col gap-4 ${heading === "Services" ? "lg:col-span-2" : ""}`}>
              <h4 className="text-slate-900 font-extrabold text-sm tracking-tight flex items-center gap-2">
                <span className="w-4 h-[2px] bg-blue-500 rounded-full inline-block" />
                {heading}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-slate-500 text-sm hover:text-blue-600 hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1 group"
                    >
                      <span className="w-0 group-hover:w-2 h-[1.5px] bg-blue-400 rounded-full transition-all duration-200 overflow-hidden" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── OFFICES ── */}
        <div className="pt-10 pb-10 border-b border-slate-200/60">
          <div className="flex items-center gap-3 mb-7">
            <h4 className="text-slate-900 font-extrabold text-sm tracking-tight">
              Our Offices
            </h4>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-slate-200 to-transparent" />
            <span className="text-xs text-slate-400 font-medium">{OFFICES.length} locations</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {OFFICES.map(({ city, country, address }, i) => (
              <motion.div
                key={city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
                className="group relative bg-white border border-slate-200/80 rounded-2xl p-5 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-slate-800 font-bold text-sm">{city}, {country}</span>
                </div>

                <div className="flex items-start gap-2">
                  <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                  <address className="not-italic text-slate-500 text-xs leading-relaxed">
                    {address.map((line) => <span key={line} className="block">{line}</span>)}
                  </address>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-400 text-xs tracking-wider">
            © {new Date().getFullYear()} {SITE.legalName} · All rights reserved.
          </p>
          <p className="text-slate-400 text-xs">{SITE.tagline}</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
