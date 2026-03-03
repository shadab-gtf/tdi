// ============================================================
// Our Projects — Types, Mock Data & Filter Logic (API-Ready)
// ============================================================

// ── Types ────────────────────────────────────────────────────

export interface Project {
  id: number;
  title: string;
  image: string;
  category: "residential" | "commercial" | "educational" | "healthcare";
  price: number;        // in Crore
  areaSqFt: number;
  apartmentType?: "2 BHK" | "3 BHK" | "4 BHK";
  buildingType?: "High-Rise" | "Low-Rise";
  status: "Ready to Move" | "Under Development";
  block: string;        // A–L
  propertyType?: "Plot" | "Built up";
  commercialType?: string;
  institutionType?: string;
  educationLevel?: string;
  specialisation?: string;
}

export interface FilterState {
  category: string;
  propertyType: "Plot" | "Built up";
  priceRange: [number, number];   // [min, max] in Crore
  areaRange: [number, number];    // [min, max] in sq.ft
  apartmentTypes: string[];
  buildingTypes: string[];
  statuses: string[];
  blocks: string[];
  commercialTypes: string[];
  institutionTypes: string[];
  educationLevels: string[];
  specialisations: string[];
}

export const defaultFilters: FilterState = {
  category: "residential",
  propertyType: "Built up",
  priceRange: [2, 8],
  areaRange: [1200, 25000],
  apartmentTypes: [],
  buildingTypes: [],
  statuses: [],
  blocks: [],
  commercialTypes: [],
  institutionTypes: [],
  educationLevels: [],
  specialisations: [],
};

export const categories = [
  { label: "Residential", value: "residential", hasDropdown: true },
  { label: "Commercial", value: "commercial", hasDropdown: true },
  { label: "Educational", value: "educational", hasDropdown: true },
  { label: "Healthcare", value: "healthcare", hasDropdown: true },
];

export const apartmentOptions = ["2 BHK", "3 BHK", "4 BHK"];
export const buildingOptions = ["High-Rise", "Low-Rise"];
export const statusOptions = ["Ready to Move", "Under Development"];
export const blockOptions = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

export const commercialTypeOptions = ["Retail", "Office", "High Street", "SCO (Shop-Cum-Office)"];
export const institutionTypeOptions = ["School", "College", "University"];
export const educationLevelOptions = ["Primary", "Secondary", "Senior Secondary"];
export const specialisationOptions = [
  "General Healthcare",
  "Orthopaedics",
  "Maternity & Child Care",
  "Cardiac Care",
  "Diagnostics & Imaging",
];

// ── Mock Data ────────────────────────────────────────────────

export const mockProjects: Project[] = [
  {
    id: 1,
    title: "Tuscan City",
    image: "/assets/projects/tuscan.png",
    category: "residential",
    price: 3.5,
    areaSqFt: 1800,
    apartmentType: "2 BHK",
    buildingType: "High-Rise",
    status: "Ready to Move",
    block: "A",
    propertyType: "Built up",
  },
  {
    id: 2,
    title: "Espania",
    image: "/assets/projects/espania.png",
    category: "residential",
    price: 4.2,
    areaSqFt: 2200,
    apartmentType: "3 BHK",
    buildingType: "High-Rise",
    status: "Under Development",
    block: "B",
    propertyType: "Built up",
  },
  {
    id: 3,
    title: "Espania Royale",
    image: "/assets/projects/espania-royale.png",
    category: "residential",
    price: 6.5,
    areaSqFt: 3500,
    apartmentType: "4 BHK",
    buildingType: "High-Rise",
    status: "Ready to Move",
    block: "C",
    propertyType: "Built up",
  },
  {
    id: 4,
    title: "Tuscan City",
    image: "/assets/projects/tuscan.png",
    category: "residential",
    price: 2.8,
    areaSqFt: 1500,
    apartmentType: "2 BHK",
    buildingType: "Low-Rise",
    status: "Ready to Move",
    block: "A",
    propertyType: "Built up",
  },
  {
    id: 5,
    title: "Espania",
    image: "/assets/projects/espania.png",
    category: "residential",
    price: 5.0,
    areaSqFt: 2800,
    apartmentType: "3 BHK",
    buildingType: "High-Rise",
    status: "Under Development",
    block: "D",
    propertyType: "Built up",
  },
  {
    id: 6,
    title: "Espania Royale",
    image: "/assets/projects/espania-royale.png",
    category: "residential",
    price: 7.2,
    areaSqFt: 4200,
    apartmentType: "4 BHK",
    buildingType: "Low-Rise",
    status: "Ready to Move",
    block: "E",
    propertyType: "Built up",
  },
  {
    id: 7,
    title: "Kingsbury",
    image: "/assets/projects/tuscan.png",
    category: "commercial",
    price: 5.5,
    areaSqFt: 5000,
    status: "Under Development",
    block: "F",
    propertyType: "Built up",
    commercialType: "Office",
  },
  {
    id: 8,
    title: "Tuscan City",
    image: "/assets/projects/espania.png",
    category: "commercial",
    price: 3.0,
    areaSqFt: 2000,
    status: "Ready to Move",
    block: "G",
    propertyType: "Plot",
    commercialType: "Retail",
  },
  {
    id: 9,
    title: "TDI International School",
    image: "/assets/projects/school.png",
    category: "educational",
    price: 0,
    areaSqFt: 0,
    status: "Ready to Move",
    block: "L",
    institutionType: "School",
    educationLevel: "Senior Secondary",
  },
  {
    id: 10,
    title: "Samarpan Cancer Hospital",
    image: "/assets/projects/samarpan.png",
    category: "healthcare",
    price: 0,
    areaSqFt: 0,
    status: "Under Development",
    block: "B",
    specialisation: "Maternity & Child Care",
  },
  {
    id: 11,
    title: "Noble Multispecialty Hospital",
    image: "/assets/projects/noble2.png",
    category: "healthcare",
    price: 0,
    areaSqFt: 0,
    status: "Under Development",
    block: "A",
    specialisation: "Maternity & Child Care",
  },
  {
    id: 12,
    title: "Nulife Super Specialty Hospital",
    image: "/assets/projects/nulife.png",
    category: "healthcare",
    price: 0,
    areaSqFt: 0,
    status: "Under Development",
    block: "C",
    specialisation: "Maternity & Child Care",
  }
];

// ── Filter Logic ──

export function filterProjects(projects: Project[], filters: FilterState): Project[] {
  return projects.filter((project) => {
    // Category
    if (filters.category && project.category !== filters.category) return false;

    // Property type (only for Res/Comm)
    if ((filters.category === "residential" || filters.category === "commercial") && filters.propertyType && project.propertyType !== filters.propertyType) return false;

    // Price range
    if (filters.category === "residential" || filters.category === "commercial") {
      if (project.price < filters.priceRange[0] || project.price > filters.priceRange[1]) return false;
    }

    // Area range
    if (filters.category === "residential" || filters.category === "commercial") {
      if (project.areaSqFt < filters.areaRange[0] || project.areaSqFt > filters.areaRange[1]) return false;
    }

    // Apartment type (Res only)
    if (filters.category === "residential") {
      if (filters.apartmentTypes.length > 0 && (!project.apartmentType || !filters.apartmentTypes.includes(project.apartmentType))) return false;
    }

    // Building type (Res only)
    if (filters.category === "residential") {
      if (filters.buildingTypes.length > 0 && (!project.buildingType || !filters.buildingTypes.includes(project.buildingType))) return false;
    }

    // Commercial Type
    if (filters.category === "commercial") {
      if (filters.commercialTypes.length > 0 && (!project.commercialType || !filters.commercialTypes.includes(project.commercialType))) return false;
    }

    // Educational Filters
    if (filters.category === "educational") {
      if (filters.institutionTypes.length > 0 && (!project.institutionType || !filters.institutionTypes.includes(project.institutionType))) return false;
      if (filters.educationLevels.length > 0 && (!project.educationLevel || !filters.educationLevels.includes(project.educationLevel))) return false;
    }

    // Healthcare Filters
    if (filters.category === "healthcare") {
      if (filters.specialisations.length > 0 && (!project.specialisation || !filters.specialisations.includes(project.specialisation))) return false;
    }

    // Status
    if (filters.statuses.length > 0 && !filters.statuses.includes(project.status)) return false;

    // Block
    if (filters.blocks.length > 0 && !filters.blocks.includes(project.block)) return false;

    return true;
  });
}

