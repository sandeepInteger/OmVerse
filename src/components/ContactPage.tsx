"use client";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence, type Variants, type Transition } from "framer-motion";

import { SERVICES } from "@/data/services";
import { OFFICES, SITE } from "@/data/site";
import { labSummary } from "@/data/labScope";
import { usePageMeta } from "@/lib/usePageMeta";

// ── EmailJS credentials ───────────────────────────────────────────
const EMAILJS_SERVICE_ID  = "service_v1b6lls";   // e.g. "service_abc123"
const EMAILJS_TEMPLATE_ID = "template_2rfzhdg";  // e.g. "template_xyz789"
const EMAILJS_PUBLIC_KEY  = "MCZ8NnHol75wlrdG2";   // e.g. "pk_xxxxxxxxxxxxxxx"

const spring: Transition = { duration: 0.6, ease: "easeOut" };
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: spring },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const services = [...SERVICES.map((s) => s.label), "Other / General Inquiry"];

// ── Field ─────────────────────────────────────────────────────────
const Field = ({
  label, name, type = "text", placeholder, required = true,
  as = "input", options, defaultValue,
}: {
  label: string; name: string; type?: string; placeholder?: string;
  required?: boolean; as?: "input" | "textarea" | "select"; options?: string[]; defaultValue?: string;
}) => {
  const id = `contact-${name}`;
  const [focused, setFocused] = useState(false);
  const base = "w-full bg-white border rounded-xl px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200";
  const ring = focused ? "border-blue-400 ring-2 ring-blue-100 shadow-sm" : "border-slate-200";

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
        {label}{required && <span className="text-blue-500 ml-0.5">*</span>}
      </label>
      {as === "textarea" ? (
        <textarea id={id} name={name} placeholder={placeholder} rows={4} required={required}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          className={`${base} ${ring} py-3 resize-none`} />
      ) : as === "select" ? (
        <select id={id} name={name} required={required} defaultValue={defaultValue ?? ""}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          className={`${base} ${ring} h-11 cursor-pointer`}>
          <option value="">Select a service…</option>
          {options?.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input id={id} type={type} name={name} placeholder={placeholder} required={required}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          className={`${base} ${ring} h-11`} />
      )}
    </div>
  );
};

// ── Page ──────────────────────────────────────────────────────────
const ContactPage = () => {
  usePageMeta("Contact Us", "Request a quote for soil, material, construction material, ground & water or bitumen testing from OmVerse.");
  const location = useLocation();
  const preselectedService = (location.state as { service?: string } | null)?.service;
  const formRef = useRef<HTMLFormElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setSubmitting(true);
    setErrorMsg(null);

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY,
      );
      setSucceeded(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      setErrorMsg("Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f8faff] relative overflow-hidden">

      {/* bg decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#1e40af 1px, transparent 1px), linear-gradient(90deg, #1e40af 1px, transparent 1px)`,
            backgroundSize: "56px 56px",
          }} />
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.08),transparent_65%)]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-[radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.06),transparent_65%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-20">

        {/* ── HEADER ── */}
        <motion.div
          className="flex flex-col items-center text-center gap-4 mb-16"
          variants={stagger} initial="hidden" animate="visible"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              Get In Touch
            </span>
          </motion.div>
          <motion.h1 variants={fadeUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.05]">
            Let's talk about{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              your project
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-slate-500 text-lg max-w-xl leading-relaxed">
            Whether you need a quote, have a project in mind, or want to know which tests
            your site needs — our engineers are ready to help.
          </motion.p>

          {/* Quick contact pills */}
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3 mt-2">
            {[
              { icon: "📞", label: SITE.phone.display, href: SITE.phone.href },
              { icon: "✉️", label: SITE.email.display, href: SITE.email.href },
            ].map(({ icon, label, href }) => (
              <a key={label} href={href}
                className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-600 text-sm font-medium px-5 py-2.5 rounded-full shadow-sm hover:border-blue-300 hover:text-blue-600 hover:shadow-md transition-all duration-200">
                <span aria-hidden>{icon}</span>{label}
              </a>
            ))}
            <span className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-600 text-sm font-medium px-5 py-2.5 rounded-full shadow-sm">
              <span aria-hidden>⏱️</span>{SITE.responseTime}
            </span>
          </motion.div>
        </motion.div>

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* ── LEFT: Map card (light) ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm relative"
          >
            <div className="absolute top-0 right-0 w-64 h-48 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-[80px] pointer-events-none" />

            <div className="relative z-10 p-8 flex flex-col gap-7">

              <div>
                <span className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3">
                  <span className="w-1 h-1 rounded-full bg-blue-500" />
                  Our Offices
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 leading-snug">
                  {OFFICES.length} locations, one team
                </h2>
                <p className="text-slate-400 text-sm mt-1.5 leading-relaxed">
                  Wherever your project is, our field and laboratory teams deliver
                  consistent, standards-based testing and reporting.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {OFFICES.map(({ city, country, address }) => (
                  <div key={city}
                    className="flex items-start gap-3 bg-slate-50 border border-slate-100 rounded-2xl p-4 hover:border-blue-200 hover:bg-blue-50/40 transition-all duration-200 group">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mt-0.5 text-blue-500 shrink-0" aria-hidden>
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>
                    <div>
                      <p className="text-slate-900 text-sm font-bold leading-none mb-0.5 group-hover:text-blue-600 transition-colors">
                        {city}
                      </p>
                      <p className="text-blue-500 text-xs font-semibold">{country}</p>
                      <p className="text-slate-500 text-xs mt-1 leading-relaxed">{address[0]}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 pt-5 border-t border-slate-100">
                {[
                  { v: String(labSummary.tests), l: "Tests in scope" },
                  { v: String(labSummary.standards), l: "IS / DIN standards" },
                  { v: String(labSummary.siteTests), l: "On-site tests" },
                ].map(({ v, l }) => (
                  <div key={l} className="flex flex-col gap-0.5">
                    <span className="text-2xl font-extrabold text-slate-900 leading-none">{v}</span>
                    <span className="text-slate-400 text-xs">{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: Form card (light) ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-[80px] pointer-events-none" />

              <div className="relative z-10">
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-1">
                  Send us a message
                </h2>
                <p className="text-slate-400 text-sm mb-8">
                  Fill out the form and our team will get back to you shortly.
                </p>

                <AnimatePresence mode="wait">
                  {succeeded ? (
                    <motion.div key="success"
                      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                      className="flex flex-col items-center text-center gap-5 py-14">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-xl shadow-blue-200">
                        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Message Sent!</h3>
                        <p className="text-slate-500 text-sm max-w-xs">
                          Thank you for reaching out. A member of our team will contact you shortly.
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      ref={formRef}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="First Name" name="firstName" placeholder="John" />
                        <Field label="Last Name"  name="lastName"  placeholder="Smith" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Email" name="email" type="email" placeholder="john@company.com" />
                        <Field label="Phone" name="phone" type="tel"   placeholder="Your phone number" required={false} />
                      </div>
                      <Field label="Company" name="company" placeholder="Your company name" required={false} />
                      <Field label="Service of Interest" name="service" as="select" options={services}
                        defaultValue={services.includes(preselectedService ?? "") ? preselectedService : undefined} />
                      <Field label="Project Details" name="message" as="textarea"
                        placeholder="Tell us about your project, timeline, location, and any specific requirements…" />

                      {/* Error message */}
                      {errorMsg && (
                        <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                          {errorMsg}
                        </p>
                      )}

                      <button type="submit" disabled={submitting}
                        className="mt-1 w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-300 text-white font-bold text-sm py-4 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-400/40 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2">
                        {submitting ? (
                          <>
                            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Sending…
                          </>
                        ) : (
                          <>
                            Send Message
                            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                            </svg>
                          </>
                        )}
                      </button>

                      <p className="text-center text-xs text-slate-400">
                        We respect your privacy. Your information is never shared.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Response time badge */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-5 flex items-center gap-4 shadow-lg shadow-blue-500/20">
              <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <p className="text-white font-extrabold text-sm">Average Response Time</p>
                <p className="text-blue-100 text-xs mt-0.5">
                  Our team typically replies within{" "}
                  <span className="text-white font-bold">2–4 business hours</span>
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;