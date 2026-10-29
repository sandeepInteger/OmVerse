import { Link } from "react-router-dom";

import ChooseInteger from "./ChooseInteger";
import ServiceIcon from "./ServiceIcon";
import VisionMission from "./VisionMission";
import { ArrowIcon, CtaBanner, Eyebrow, PageHero } from "./PageSections";
import { SERVICES } from "@/data/services";
import { labSummary } from "@/data/labScope";
import { ghostButton, primaryButton } from "@/lib/styles";
import { usePageMeta } from "@/lib/usePageMeta";

const AboutPage = () => {
  usePageMeta("About Us", "Learn about OmVerse — a soil, material and construction testing partner focused on accurate results and reliable reports.");

  return (
    <div className="w-full bg-[#f8faff]">
      <PageHero
        crumbs={[{ label: "Home", to: "/" }, { label: "About" }]}
        badge={<Eyebrow>About OmVerse</Eyebrow>}
        title="Precision testing for"
        highlight="safer construction"
        description="OmVerse combines field expertise, a well-equipped laboratory and IS-standard test methods to give engineers, contractors and developers results they can build on."
        actions={
          <>
            <Link to="/contact" className={primaryButton}>Talk to Our Team</Link>
            <Link to="/lab-scope" className={ghostButton}>Explore Lab Scope <ArrowIcon /></Link>
          </>
        }
        aside={
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: labSummary.tests, label: "Tests in our lab scope" },
              { value: labSummary.standards, label: "IS / DIN standards followed" },
              { value: labSummary.subCategories, label: "Material sub-categories" },
              { value: labSummary.siteTests, label: "In-situ field tests" },
            ].map((s) => (
              <div key={s.label} className="bg-white/90 border border-slate-200/80 rounded-2xl px-5 py-5 shadow-sm">
                <p className="text-3xl font-extrabold text-blue-600 tabular-nums">{s.value}</p>
                <p className="text-sm text-slate-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        }
      />

      {/* ── Who we are ────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div className="flex flex-col gap-6">
          <Eyebrow>Who We Are</Eyebrow>
          <h2 className="font-display text-4xl sm:text-5xl text-slate-900 tracking-tight leading-tight">
            Your testing &amp; engineering partner
          </h2>
          <p className="text-slate-600 leading-relaxed">
            We bridge the gap between engineering precision and on-site execution. Our team collects samples and performs
            in-situ tests on site, then analyses them in our laboratory using calibrated equipment and the relevant Indian
            Standard methods.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Our goal is not just to deliver test results — it is to provide accurate engineering information that leads to
            safer construction, stronger foundations and long-term project reliability.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {SERVICES.map((svc) => (
            <Link
              key={svc.slug}
              to={`/services/${svc.slug}`}
              className="group flex items-center gap-4 bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-blue-200 hover:shadow-md transition-all"
            >
              <span
                className="w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0"
                style={{ background: `linear-gradient(135deg, ${svc.accentFrom}, ${svc.accentTo})` }}
              >
                <ServiceIcon icon={svc.icon} />
              </span>
              <span className="flex-1 min-w-0">
                <span className="block font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{svc.title}</span>
                <span className="block text-sm text-slate-500 mt-0.5 line-clamp-1">{svc.summary}</span>
              </span>
              <span className="text-slate-300 group-hover:text-blue-500 transition-colors"><ArrowIcon /></span>
            </Link>
          ))}
        </div>
      </section>

      <VisionMission />
      <ChooseInteger />
      <CtaBanner eyebrow="Work With Us" title="Let’s build something" highlight="that lasts." />
    </div>
  );
};

export default AboutPage;
