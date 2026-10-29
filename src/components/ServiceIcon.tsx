import type { ServiceIconKey } from "@/data/services";

const PATHS: Record<ServiceIconKey, React.ReactNode> = {
  soil: (
    <>
      <path d="M3 8h18M3 13h18M3 18h18" />
      <path d="M7 8v-3M12 8V4M17 8V5" />
      <circle cx="7" cy="15.5" r=".6" fill="currentColor" />
      <circle cx="14" cy="10.5" r=".6" fill="currentColor" />
      <circle cx="17" cy="15.5" r=".6" fill="currentColor" />
    </>
  ),
  material: (
    <>
      <path d="M9 3h6M10 3v6L4.5 18.5A1.7 1.7 0 006 21h12a1.7 1.7 0 001.5-2.5L14 9V3" />
      <path d="M7 15h10" />
    </>
  ),
  construction: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="1.5" />
      <path d="M3 9.3h18M3 14.7h18M9 4v5.3M15 9.3v5.4M9 14.7V20" />
    </>
  ),
  water: (
    <>
      <path d="M12 3s6 6.5 6 11a6 6 0 01-12 0c0-4.5 6-11 6-11z" />
      <path d="M9 14.5a3 3 0 003 3" />
    </>
  ),
  bitumen: (
    <>
      <path d="M8 21L11 3M16 21L13 3" />
      <path d="M12 7v2M12 12v2M12 17v2" />
    </>
  ),
};

export default function ServiceIcon({ icon, className = "w-5 h-5" }: { icon: ServiceIconKey; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden
    >
      {PATHS[icon]}
    </svg>
  );
}
