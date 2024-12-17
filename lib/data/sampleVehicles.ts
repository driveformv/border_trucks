import type { Vehicle } from "@/types/vehicle";

export const sampleVehicles: Vehicle[] = [
  // New Class 8 Trucks
  {
    id: "NT001",
    type: "truck",
    condition: "New",
    make: "International",
    model: "LT625",
    year: 2025,
    price: 185000,
    stockNumber: "INT001",
    vin: "1HWYAZHR5MH123456",
    description: "New 2025 International LT625 with Cummins X15 engine",
    images: [
      {
        id: "1a",
        url: "/assets/images/47913_hx620_ko_daycab_rgb.png[1024_-1xoxar].png",
        isPrimary: true,
        caption: "Front View"
      },
      {
        id: "1b",
        url: "/assets/images/48458_daycab_ko_baseline_cmyk_gray.tif[1024_-1xoxar].png",
        isPrimary: false,
        caption: "Side View"
      },
      {
        id: "1c",
        url: "/assets/images/48458_thumbnails_gray_daycab.png[1024_-1xoxar].png",
        isPrimary: false,
        caption: "Rear View"
      }
    ],
    engineMake: "Cummins",
    engineModel: "X15",
    horsepower: 500,
    torque: 1850,
    transmission: "Eaton Fuller",
    transmissionType: "Manual",
    wheelBase: "265 Inch",
    status: "Available",
    specs: {
      gvwr: "80,000 lbs",
      suspension: "Air Ride",
      frontAxle: "14,600 lbs",
      rearAxle: "46,000 lbs"
    },
    features: [
      "LED Headlights",
      "Power Windows",
      "Bluetooth",
      "GPS Navigation"
    ],
    category: ["day-cab"],
    location: "El Paso, TX"
  },
  {
    id: "NT002",
    type: "truck",
    condition: "New",
    make: "International",
    model: "RH613",
    year: 2024,
    price: 175000,
    stockNumber: "INT002",
    vin: "1HWYAZHR5MH789012",
    description: "New 2024 International RH613 Regional Haul Tractor",
    images: [
      {
        id: "2a",
        url: "/assets/images/48458_skyrise_ko_baseline_cmyk_gray.tif[1024_-1xoxar].png",
        isPrimary: true,
        caption: "Front View"
      },
      {
        id: "2b",
        url: "/assets/images/48458_thumbnails_gray_skyrise.png[1024_-1xoxar].png",
        isPrimary: false,
        caption: "Side View"
      },
      {
        id: "2c",
        url: "/assets/images/47033skyriseko_base.png[1024_-1xoxar].png",
        isPrimary: false,
        caption: "Rear View"
      }
    ],
    engineMake: "Cummins",
    engineModel: "X15",
    horsepower: 450,
    torque: 1750,
    transmission: "Eaton Fuller",
    transmissionType: "Automated",
    wheelBase: "228 Inch",
    status: "Available",
    specs: {
      gvwr: "80,000 lbs",
      suspension: "Air Ride",
      frontAxle: "12,000 lbs",
      rearAxle: "40,000 lbs"
    },
    features: [
      "Sleeper Cab",
      "Premium Interior",
      "Advanced Safety Systems",
      "Fuel Efficiency Package"
    ],
    category: ["sleeper"],
    location: "El Paso, TX"
  },

  // Used Class 8 Trucks
  {
    id: "UT001",
    type: "truck",
    condition: "Used",
    make: "International",
    model: "LT625",
    year: 2022,
    price: 125000,
    mileage: 250000,
    stockNumber: "UIT001",
    vin: "1HWYAZHR5MH345678",
    description: "Well-maintained 2022 International LT625",
    images: [
      {
        id: "3a",
        url: "/assets/images/48458_daycab_ko_baseline_cmyk_gray.tif[1024_-1xoxar].png",
        isPrimary: true,
        caption: "Front View"
      },
      {
        id: "3b",
        url: "/assets/images/48458_thumbnails_gray_daycab.png[1024_-1xoxar].png",
        isPrimary: false,
        caption: "Side View"
      }
    ],
    engineMake: "Cummins",
    engineModel: "X15",
    horsepower: 500,
    torque: 1850,
    transmission: "Eaton Fuller",
    transmissionType: "Manual",
    wheelBase: "265 Inch",
    status: "Available",
    specs: {
      gvwr: "80,000 lbs",
      suspension: "Air Ride",
      frontAxle: "14,600 lbs",
      rearAxle: "46,000 lbs"
    },
    features: [
      "Jake Brake",
      "Double Bunk",
      "Refrigerator",
      "APU"
    ],
    category: ["sleeper"],
    location: "El Paso, TX"
  },

  // New Trailers
  {
    id: "NTR001",
    type: "trailer",
    condition: "New",
    make: "Hyundai",
    model: "Dry Van",
    year: 2024,
    price: 55000,
    stockNumber: "HTR001",
    vin: "2HWYAZHR5MH123456",
    description: "New 2024 Hyundai 53' Dry Van Trailer",
    images: [
      {
        id: "4a",
        url: "/assets/images/Original1.png",
        isPrimary: true,
        caption: "Front View"
      },
      {
        id: "4b",
        url: "/assets/images/Original2.png",
        isPrimary: false,
        caption: "Side View"
      },
      {
        id: "4c",
        url: "/assets/images/Original3.png",
        isPrimary: false,
        caption: "Interior View"
      }
    ],
    status: "Available",
    specs: {
      length: "53 ft",
      width: "102 inches",
      height: "13'6\"",
      capacity: "55,000 lbs"
    },
    features: [
      "Air Ride Suspension",
      "Aluminum Roof",
      "LED Lights",
      "Anti-Lock Brakes"
    ],
    category: ["dry-van"],
    location: "El Paso, TX",
    trailerType: "Dry Van",
    axles: 2
  },
  {
    id: "NTR002",
    type: "trailer",
    condition: "New",
    make: "Hyundai",
    model: "Reefer",
    year: 2024,
    price: 85000,
    stockNumber: "HTR002",
    vin: "2HWYAZHR5MH567890",
    description: "New 2024 Hyundai 53' Refrigerated Trailer",
    images: [
      {
        id: "5a",
        url: "/assets/images/ThermoTech1.png",
        isPrimary: true,
        caption: "Front View"
      },
      {
        id: "5b",
        url: "/assets/images/ThermoTech2.png",
        isPrimary: false,
        caption: "Side View"
      },
      {
        id: "5c",
        url: "/assets/images/ThermoTech3.png",
        isPrimary: false,
        caption: "Interior View"
      }
    ],
    status: "Available",
    specs: {
      length: "53 ft",
      width: "102 inches",
      height: "13'6\"",
      capacity: "52,000 lbs"
    },
    features: [
      "Carrier Refrigeration Unit",
      "Aluminum Roof",
      "LED Lights",
      "Air Ride Suspension"
    ],
    category: ["reefer"],
    location: "El Paso, TX",
    trailerType: "Reefer",
    axles: 2
  },
  {
    id: "NTR003",
    type: "trailer",
    condition: "New",
    make: "Hyundai",
    model: "HyCube",
    year: 2024,
    price: 45000,
    stockNumber: "TRL003",
    vin: "5HYCU2824RB123456",
    description: "New 2024 Hyundai HyCube Dry Van Trailer with premium features",
    images: [
      {
        id: "tr3a",
        url: "/assets/images/HyCube1.png",
        isPrimary: true,
        caption: "Front View"
      },
      {
        id: "tr3b",
        url: "/assets/images/HyCube2.png",
        isPrimary: false,
        caption: "Side View"
      },
      {
        id: "tr3c",
        url: "/assets/images/HyCube3.png",
        isPrimary: false,
        caption: "Rear View"
      }
    ],
    status: "Available",
    specs: {
      length: "53 ft",
      width: "102 inches",
      height: "13'6\"",
      capacity: "55,000 lbs"
    },
    features: [
      "Premium LED Lighting",
      "Anti-Lock Braking System",
      "Air Ride Suspension",
      "Aluminum Roof"
    ],
    category: ["dry-van"],
    location: "El Paso, TX"
  },
  {
    id: "NTR004",
    type: "trailer",
    condition: "New",
    make: "Hyundai",
    model: "ThermoTech",
    year: 2024,
    price: 65000,
    stockNumber: "TRL004",
    vin: "5HYRF2824RB789012",
    description: "New 2024 Hyundai ThermoTech Refrigerated Trailer with advanced cooling system",
    images: [
      {
        id: "tr4a",
        url: "/assets/images/ThermoTech1.png",
        isPrimary: true,
        caption: "Front View"
      },
      {
        id: "tr4b",
        url: "/assets/images/ThermoTech2.png",
        isPrimary: false,
        caption: "Side View"
      },
      {
        id: "tr4c",
        url: "/assets/images/ThermoTech3.png",
        isPrimary: false,
        caption: "Interior View"
      }
    ],
    status: "Available",
    specs: {
      length: "53 ft",
      width: "102 inches",
      height: "13'6\"",
      capacity: "52,000 lbs"
    },
    features: [
      "Thermo King Refrigeration Unit",
      "Temperature Monitoring System",
      "Air Ride Suspension",
      "Stainless Steel Rear Frame"
    ],
    category: ["reefer"],
    location: "Las Cruces, NM"
  },
  {
    id: "NTR005",
    type: "trailer",
    condition: "New",
    make: "Hyundai",
    model: "Composite XT",
    year: 2024,
    price: 48000,
    stockNumber: "TRL005",
    vin: "5HYXT2824RB345678",
    description: "New 2024 Hyundai Composite XT Dry Van Trailer with lightweight design",
    images: [
      {
        id: "tr5a",
        url: "/assets/images/Composite1.png",
        isPrimary: true,
        caption: "Front View"
      },
      {
        id: "tr5b",
        url: "/assets/images/Composite2.png",
        isPrimary: false,
        caption: "Side View"
      },
      {
        id: "tr5c",
        url: "/assets/images/Composite3.png",
        isPrimary: false,
        caption: "Interior View"
      }
    ],
    status: "Available",
    specs: {
      length: "53 ft",
      width: "102 inches",
      height: "13'6\"",
      capacity: "55,000 lbs"
    },
    features: [
      "Composite Panel Technology",
      "Weight Optimized Design",
      "Enhanced Durability",
      "Premium Scuff Liner"
    ],
    category: ["dry-van"],
    location: "El Paso, TX"
  },
  {
    id: "NTR006",
    type: "trailer",
    condition: "New",
    make: "Hyundai",
    model: "Original",
    year: 2024,
    price: 42000,
    stockNumber: "TRL006",
    vin: "5HYOG2824RB901234",
    description: "New 2024 Hyundai Original Dry Van Trailer with standard features",
    images: [
      {
        id: "tr6a",
        url: "/assets/images/Original1.png",
        isPrimary: true,
        caption: "Front View"
      },
      {
        id: "tr6b",
        url: "/assets/images/Original2.png",
        isPrimary: false,
        caption: "Side View"
      },
      {
        id: "tr6c",
        url: "/assets/images/Original3.png",
        isPrimary: false,
        caption: "Interior View"
      }
    ],
    status: "Available",
    specs: {
      length: "53 ft",
      width: "102 inches",
      height: "13'6\"",
      capacity: "55,000 lbs"
    },
    features: [
      "Standard LED Lighting",
      "Spring Suspension",
      "Galvanized Steel Rear Frame",
      "Wood Floor"
    ],
    category: ["dry-van"],
    location: "Las Cruces, NM"
  }
];

// Add more vehicles following the same pattern...
// You can copy and modify these templates to create more variations
// Remember to update IDs, stock numbers, and VINs to be unique