export interface ProductGroup {
  id: string;
  name: string;
  specs: string[];
  grades: string;
  group: number;
  detail: string;
  applications: string;
}

export const PRODUCT_GROUPS: ProductGroup[] = [
  {
    id: "GR I",
    name: "Solvent Refined",
    specs: ["SAT <90%", "S >0.03%", "VI 80–120"],
    grades: "SN 70 · SN 150 · SN 500 · BS 150",
    group: 1,
    detail:
      "Produced by solvent extraction and dewaxing of vacuum distillates. Workhorse grades for industrial lubricants, process oils and transformer fluids. Widely available from major refineries across the Middle East, Southeast Asia and Europe.",
    applications: "INDUSTRIAL LUBES · PROCESS OILS · TRANSFORMER FLUIDS · RUBBER OILS",
  },
  {
    id: "GR II",
    name: "Hydrotreated",
    specs: ["SAT ≥90%", "S ≤0.03%", "VI 80–120"],
    grades: "N 70 · N 150 · N 500 · N 600",
    group: 2,
    detail:
      "Severe hydrotreatment delivers improved oxidation stability and lower sulphur versus Group I. The standard base for automotive engine oils, hydraulic fluids and gear oils in modern formulations.",
    applications: "AUTOMOTIVE ENGINE OILS · HYDRAULIC FLUIDS · GEAR OILS · METALWORKING",
  },
  {
    id: "GR III",
    name: "Hydrocracked",
    specs: ["SAT ≥90%", "S ≤0.03%", "VI ≥120"],
    grades: "4 cSt · 6 cSt · 8 cSt",
    group: 3,
    detail:
      "High-pressure hydrocracking and isodewaxing produces near-synthetic performance at mineral pricing. Used extensively in PCMO, ATF and premium industrial lubricants where long drain intervals are required.",
    applications: "PCMO · ATF · PREMIUM INDUSTRIAL LUBES · COMPRESSOR OILS",
  },
  {
    id: "GR IV",
    name: "Polyalphaolefins",
    specs: ["FULL SYNTHETIC", "VI ~140", "POUR <−50°C"],
    grades: "PAO 4 · PAO 6 · PAO 8 · PAO 40",
    group: 4,
    detail:
      "Fully synthetic PAO delivers superior thermal stability, extreme low-temperature fluidity and consistent viscometrics across the widest temperature ranges. The base of choice for aviation, motorsport and arctic applications.",
    applications: "AVIATION · MOTORSPORT · COMPRESSOR OILS · ARCTIC APPLICATIONS",
  },
  {
    id: "GR V",
    name: "Esters, Naphthenics & Others",
    specs: ["POLARITY TUNED", "SOLVENCY HIGH", "SPEC BY APPLICATION"],
    grades: "ESTERS · PAG · PALE OILS · WHITE OILS",
    group: 5,
    detail:
      "Application-specific fluids including TOFA esters, RPO, naphthenic pale oils and food-grade white oils. Sourced per specification from specialist producers. Priced and delivered against your exact technical brief.",
    applications: "SPECIALTY ESTERS · FOOD-GRADE · REFRIGERATION · NICHE FORMULATIONS",
  },
];
