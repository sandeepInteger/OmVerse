import ServiceIcon from "./ServiceIcon";
import { testsForService, type Service } from "@/data/services";

/**
 * Illustrated panel for a service: accent gradient, oversized icon and a few
 * real parameters from the lab scope (or the service highlights when the
 * service has no scoped tests).
 */
export default function ServiceVisual({ service, className = "" }: { service: Service; className?: string }) {
  const tests = testsForService(service);
  const chips = (tests.length
    ? [...new Set(tests.map((t) => t.parameter.replace(/\s*\(.*$/, "")))]
    : service.capabilities.map((c) => c.title)
  ).slice(0, 4);

  return (
    <div
      className={`relative overflow-hidden rounded-3xl text-white ${className}`}
      style={{ background: `linear-gradient(135deg, ${service.accentFrom} 0%, ${service.accentTo} 100%)` }}
    >
      {/* Grid texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse at 70% 30%, black 20%, transparent 75%)",
        }}
      />
      {/* Oversized watermark icon */}
      <ServiceIcon icon={service.icon} className="absolute -right-8 -top-8 w-56 h-56 text-white/15" />

      <div className="relative h-full flex flex-col justify-between gap-8 p-7 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
            <ServiceIcon icon={service.icon} className="w-6 h-6" />
          </span>
          {tests.length > 0 && (
            <span className="text-xs font-semibold uppercase tracking-widest text-white/85">
              {tests.length} tests in lab scope
            </span>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {chips.map((c) => (
              <span key={c} className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/15 border border-white/25 backdrop-blur-sm">
                {c}
              </span>
            ))}
          </div>
          <p className="text-2xl font-bold tracking-tight">{service.label}</p>
        </div>
      </div>
    </div>
  );
}
