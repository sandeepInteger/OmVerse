import { useEffect } from "react";

import { SITE } from "@/data/site";

const DEFAULT_DESCRIPTION =
  "OmVerse delivers soil testing, material testing, construction material testing and NDT with accurate, IS-standard laboratory reports.";

/** Sets the document title and meta description for the current page. */
export function usePageMeta(title: string | null, description = DEFAULT_DESCRIPTION) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  }, [title, description]);
}
