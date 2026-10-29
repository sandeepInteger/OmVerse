import { labTests, type LabTest } from "./labScope";

export type ServiceIconKey = "soil" | "material" | "construction" | "water" | "bitumen";

export type Service = {
  slug: string;
  title: string;
  /** Short name for menus, chips and footers. */
  label: string;
  icon: ServiceIconKey;
  accentFrom: string;
  accentTo: string;
  summary: string;
  intro: string;
  /** Three headline points used on cards and the home slider. */
  highlights: string[];
  capabilities: { title: string; body: string }[];
  applications: string[];
  /** Lab-scope sub-groups whose tests are listed on the service page. */
  scopeSubGroups: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "soil-testing",
    title: "Soil Testing Services",
    label: "Soil Testing",
    icon: "soil",
    accentFrom: "#06b6d4",
    accentTo: "#2563eb",
    summary: "Laboratory and in-situ soil investigation to establish bearing capacity and foundation design parameters.",
    intro:
      "Every safe structure starts with understanding the ground beneath it. Our geotechnical team collects samples on site and tests them in our laboratory to give your designers the classification, strength and compaction data they need — reported against the relevant IS codes.",
    highlights: [
      "Soil Investigation & Bearing Capacity Analysis",
      "Foundation Soil Testing & Site Assessment",
      "Ground Stability & Soil Resistance Evaluation",
    ],
    capabilities: [
      { title: "Soil classification", body: "Grain size analysis, liquid and plastic limits, specific gravity, water content and free swell index." },
      { title: "Compaction & strength", body: "Heavy compaction (MDD/OMC), soaked CBR, and direct and triaxial shear tests for pavement and foundation design." },
      { title: "In-situ field testing", body: "Standard Penetration Test (SPT), plate load and EV2 tests carried out at your project location." },
      { title: "Rock testing", body: "Compressive strength, density and water content of rock cores for deep foundations and cuttings." },
    ],
    applications: ["Building foundations", "Road & highway subgrades", "Bridges and retaining walls", "Industrial plant sites"],
    scopeSubGroups: ["Clays & Soils", "In-situ tests", "Others", "Stones / Rock"],
  },
  {
    slug: "material-testing",
    title: "Material Testing Services",
    label: "Material Testing",
    icon: "material",
    accentFrom: "#8b5cf6",
    accentTo: "#7e22ce",
    summary: "Quality testing of cement and aggregates to confirm compliance before they go into your structure.",
    intro:
      "Raw material quality decides the strength and durability of everything built with it. We test cement and fine and coarse aggregates against Indian Standards so you can accept, reject or adjust supply with confidence.",
    highlights: [
      "Cement & Aggregate Quality Testing",
      "Concrete Strength & Durability Analysis",
      "Industry Standard Compliance Testing",
    ],
    capabilities: [
      { title: "Cement testing", body: "Consistency, density, setting times, soundness (Le-Chatelier and autoclave) and compressive strength of OPC and PPC." },
      { title: "Fine aggregate", body: "Sieve analysis, deleterious materials, organic impurities, specific gravity, bulking and soundness of sand." },
      { title: "Coarse aggregate", body: "Gradation, flakiness and elongation indices, crushing, impact and ten percent fines values." },
      { title: "Compliance reporting", body: "Clear reports that state the test method, result and the IS requirement it is checked against." },
    ],
    applications: ["Ready-mix and site-batched concrete", "Supplier qualification", "Incoming material checks", "Mix design inputs"],
    scopeSubGroups: ["Fine Aggregate", "Coarse Aggregate", "Cement, Cementitious Materials & Cement Additives"],
  },
  {
    slug: "construction-material-testing",
    title: "Construction Material Testing",
    label: "Construction Material",
    icon: "construction",
    accentFrom: "#fb923c",
    accentTo: "#f43f5e",
    summary: "Testing of concrete, masonry, paving and road layers, plus non-destructive checks of existing structures.",
    intro:
      "From concrete cubes and cores to bricks, paver blocks and road sub-base layers, we verify that what was built matches what was specified. Our non-destructive tests let you assess existing RCC structures without damaging them.",
    highlights: [
      "Construction Quality & Structural Material Evaluation",
      "Core Cutting & Material Performance Testing",
      "Reliable Analysis for Safe Construction",
    ],
    capabilities: [
      { title: "Concrete", body: "Compressive strength of cubes and equivalent cube strength from extracted concrete cores." },
      { title: "Masonry & paving", body: "Dimensions, compressive strength, water absorption and efflorescence of clay bricks, fly ash bricks and paver blocks." },
      { title: "Road layers", body: "Gradation, MDD/OMC, liquid and plastic limits, CBR and impact value for GSB and WMM layers." },
      { title: "Non-destructive testing", body: "Rebound hammer, ultrasonic pulse velocity and pile integrity tests on site." },
    ],
    applications: ["Quality assurance during construction", "Structural audits", "Road and pavement works", "Pile foundation acceptance"],
    scopeSubGroups: [
      "Concrete Admixtures Cement and Concrete",
      "Burnt Clay Building Bricks",
      "Pulverised Fuel Ash Lime Bricks",
      "Concrete Paving Blocks",
      "Granular Subbase",
      "Wet Mix Macadam",
      "Pile Integrity test",
      "Rebound Hammer Test",
      "Ultrasonic Pulse Velocity Tests",
    ],
  },
  {
    slug: "ground-water-detection",
    title: "Ground & Water Detection Services",
    label: "Ground & Water Detection",
    icon: "water",
    accentFrom: "#34d399",
    accentTo: "#0d9488",
    summary: "Groundwater assessment and leakage detection to protect foundations and plan drainage.",
    intro:
      "Water is the most common cause of foundation and structural distress. We help you find it before it becomes a problem — establishing groundwater conditions for design and tracing leaks in existing buildings.",
    highlights: [
      "Underground Water Level Assessment",
      "Leakage Detection & Thermal Scanning",
      "Advanced Ground Engineering Solutions",
    ],
    capabilities: [
      { title: "Groundwater assessment", body: "Water table observation during site investigation to inform foundation and basement design." },
      { title: "Leakage detection", body: "Locating seepage paths in roofs, basements, tanks and wet areas of existing structures." },
      { title: "Thermal scanning", body: "Non-invasive thermal imaging to reveal hidden moisture behind finishes." },
      { title: "Engineering advice", body: "Practical recommendations for dewatering, drainage and waterproofing." },
    ],
    applications: ["Basements and underground structures", "Water tanks and reservoirs", "Building maintenance", "Site feasibility studies"],
    scopeSubGroups: [],
  },
  {
    slug: "bitumen-testing",
    title: "Bitumen Testing Services",
    label: "Bitumen Testing",
    icon: "bitumen",
    accentFrom: "#38bdf8",
    accentTo: "#4f46e5",
    summary: "Bitumen and bituminous mix testing for durable, specification-compliant road construction.",
    intro:
      "Road performance depends on the binder. We test bitumen and bituminous materials so contractors and authorities can confirm grade, quality and mix performance before and during paving.",
    highlights: [
      "Bitumen Quality & Performance Testing",
      "Road Construction Material Evaluation",
      "Accurate Laboratory Analysis & Reporting",
    ],
    capabilities: [
      { title: "Binder properties", body: "Penetration, softening point, ductility and specific gravity to verify bitumen grade." },
      { title: "Mix evaluation", body: "Binder content and gradation of bituminous mixes sampled from plant or site." },
      { title: "Road material checks", body: "Aggregate and layer tests that complement binder testing for complete pavement QA." },
      { title: "Clear reporting", body: "Results reported against the applicable specification for quick acceptance decisions." },
    ],
    applications: ["Highway and urban roads", "Airport and industrial pavements", "Contractor QA/QC", "Authority acceptance testing"],
    scopeSubGroups: [],
  },
];

export const getService = (slug: string | undefined) => SERVICES.find((s) => s.slug === slug);

export const testsForService = (service: Service): LabTest[] =>
  labTests.filter((t) => service.scopeSubGroups.includes(t.subGroup));
