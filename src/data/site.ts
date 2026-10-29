// Single source of truth for company contact details shown across the site.

export const SITE = {
  name: "OmVerse",
  legalName: "OmVerse Services Inc.",
  tagline: "Soil, Material & Construction Testing",
  phone: { display: "+1 (972) 539-4100", href: "tel:+19725394100" },
  email: { display: "info@omverse.com", href: "mailto:info@omverse.com" },
  responseTime: "Reply within 2–4 business hours",
  socials: {
    linkedin: "https://www.linkedin.com/",
    x: "https://twitter.com/",
    facebook: "https://www.facebook.com/",
  },
};

export type Office = {
  city: string;
  region: string;
  country: string;
  address: string[];
};

export const OFFICES: Office[] = [
  { city: "Plano", region: "TX", country: "USA", address: ["4200 Mapleshade Ln, Ste 100", "Plano, TX 75093"] },
  { city: "Noida", region: "UP", country: "India", address: ["Corporate Park, 3rd Floor", "Noida, UP, India"] },
  { city: "Tirupati", region: "AP", country: "India", address: ["IIDT Building, Airport Road", "Renigunta, Tirupati (A.P.)"] },
  { city: "Hyderabad", region: "TS", country: "India", address: ["1st Floor, Gachibowli", "Hyderabad, India"] },
];
