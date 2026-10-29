/** Faint blue grid used behind hero sections. */
export const gridOverlay = (alpha = 0.05) => ({
  backgroundImage:
    `linear-gradient(rgba(59,130,246,${alpha}) 1px, transparent 1px),` +
    `linear-gradient(90deg, rgba(59,130,246,${alpha}) 1px, transparent 1px)`,
  backgroundSize: "56px 56px",
});

export const primaryButton =
  "inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-7 py-3.5 rounded-xl shadow-md shadow-blue-500/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200";

export const ghostButton =
  "inline-flex items-center gap-1.5 text-slate-800 hover:text-blue-600 font-semibold text-sm py-3 transition-colors";
