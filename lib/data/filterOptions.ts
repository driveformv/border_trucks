export const filterOptions = {
  condition: [
    { label: "New", value: "new", count: 4 },
    { label: "Used", value: "used", count: 17 }
  ],
  class: [
    { label: "Heavy Duty", value: "heavy-duty", count: 21 }
  ],
  make: [
    { label: "Freightliner", value: "freightliner", count: 7 },
    { label: "Kenworth", value: "kenworth", count: 12 },
    { label: "Navistar", value: "navistar", count: 1 },
    { label: "Peterbilt", value: "peterbilt", count: 1 }
  ],
  model: [
    { label: "579", value: "579", count: 1 },
    { label: "LT625", value: "lt625", count: 1 },
    { label: "T680", value: "t680", count: 8 },
    { label: "T880", value: "t880", count: 3 },
    { label: "W900L", value: "w900l", count: 1 }
  ],
  year: [
    { label: "2025", value: "2025", count: 5 },
    { label: "2024", value: "2024", count: 8 },
    { label: "2023", value: "2023", count: 4 }
  ],
  price: [
    { label: "Under $150,000", value: "0-150000", count: 3 },
    { label: "$150,000 - $200,000", value: "150000-200000", count: 7 },
    { label: "Over $200,000", value: "200000-999999", count: 11 }
  ]
} as const;