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
        caption: "HX620 Day Cab"
      },
      {
        id: "1b",
        url: "/assets/images/47913_hx620_ko_crane_rgb.png[1024_-1xoxar].png",
        isPrimary: false,
        caption: "HX620 Crane"
      },
      {
        id: "1c",
        url: "/assets/images/47913_hx620_ko_mixer_rgb.png[1024_-1xoxar].png",
        isPrimary: false,
        caption: "HX620 Mixer"
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
      "Air Conditioning",
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
        url: "/assets/images/48458_skyrise_ko_baseline_rgb_gray.png[1024_-1xoxar].png",
        isPrimary: true,
        caption: "Skyrise Front View"
      },
      {
        id: "2b",
        url: "/assets/images/48458_daycab_ko_baseline_rgb_gray.png[1024_-1xoxar].png",
        isPrimary: false,
        caption: "Day Cab Front View"
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
        url: "/assets/images/ko_hv515_crane_v011.0001.png[1024_-1xoxar].png",
        isPrimary: true,
        caption: "HV515 Crane"
      },
      {
        id: "3b",
        url: "/assets/images/ko_hv515_snow_plow_v006.1001.png[1024_-1xoxar].png",
        isPrimary: false,
        caption: "HV515 Snow Plow"
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
    price: 65000,
    stockNumber: "HTR001",
    vin: "2HWYAZHR5MH901234",
    description: "New 2024 Hyundai 53' Dry Van Trailer",
    images: [
      {
        id: "4a",
        url: "/assets/images/ko_hv615_mixer_v003.1001.png[1024_-1xoxar].png",
        isPrimary: true,
        caption: "HV615 Mixer"
      },
      {
        id: "4b",
        url: "/assets/images/ko_mv_minimixer_truck_v001_srgb.png[1024_-1xoxar].png",
        isPrimary: false,
        caption: "MV Mini Mixer"
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
        url: "/assets/images/45846_mv_box_truck_ko_2021_cmyk.png[1024_-1xoxar].png",
        isPrimary: true,
        caption: "MV Box Truck"
      },
      {
        id: "5b",
        url: "/assets/images/45846_mv_service_ko_2021_cmyk.png[1024_-1xoxar].png",
        isPrimary: false,
        caption: "MV Service Truck"
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
  }
];

// Add more vehicles following the same pattern...
// You can copy and modify these templates to create more variations
// Remember to update IDs, stock numbers, and VINs to be unique