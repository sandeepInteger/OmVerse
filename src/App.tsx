import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Footer from "./components/Footer";
import Navbar, { NAVBAR_OFFSET_TOP_CLASS } from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import LandingPage from "./components/LandingPage";

// Inner pages are split into their own chunks so the home page loads faster.
const AboutPage = lazy(() => import("./components/Aboutpage"));
const ContactPage = lazy(() => import("./components/ContactPage"));
const LabScopePage = lazy(() => import("./components/LabScopePage"));
const NotFoundPage = lazy(() => import("./components/NotFoundPage"));
const ServiceDetailPage = lazy(() => import("./components/ServiceDetailPage"));
const ServicesPage = lazy(() => import("./components/ServicesPage"));

// Old URLs from the previous site → closest current page.
const LEGACY_REDIRECTS = [
  "/products",
  "/wirelessPage",
  "/fiberPage",
  "/dataCenterPage",
  "/droneTowerPage",
  "/chipsetPage",
  "/services/wireless",
  "/services/fiber",
  "/services/data-center",
  "/services/tower",
  "/services/chipset",
  "/services/ground-water-detection",
  "/services/bitumen-testing",
];

const PageFallback = () => <div className="min-h-[70vh]" aria-busy="true" />;

export function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <main className={NAVBAR_OFFSET_TOP_CLASS}>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/lab-scope" element={<LabScopePage />} />
            <Route path="/contact" element={<ContactPage />} />
            {LEGACY_REDIRECTS.map((path) => (
              <Route key={path} path={path} element={<Navigate to="/services" replace />} />
            ))}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
