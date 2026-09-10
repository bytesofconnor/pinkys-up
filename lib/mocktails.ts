export const mocktails = [
  {
    name: "Blush Hour",
    description: "Blood orange, rosemary, and a zero-proof sparkle. The first pour when the sky goes pink.",
    image: "/mocktails/blush-hour.svg",
    season: "Signature",
    ingredients: ["Blood orange", "Rosemary", "Zero-proof spritz"],
    glow: "linear-gradient(135deg, #fce7f3 0%, #f9a8d4 40%, #fdba74 100%)",
    titleClass: "from-[#be185d] to-[#ea580c]",
  },
  {
    name: "Plus One",
    description: "Berry, lemon, and basil — the drink you hand someone you just met.",
    image: "/mocktails/plus-one.svg",
    season: "Signature",
    ingredients: ["Mixed berry", "Lemon", "Basil"],
    glow: "linear-gradient(135deg, #e0f2fe 0%, #7dd3fc 45%, #38bdf8 100%)",
    titleClass: "from-[#9d174d] to-[#db2777]",
  },
  {
    name: "Mirrorball",
    description: "Vanilla, coconut, and a little shimmer. For the people who stay on the floor.",
    image: "/mocktails/mirrorball.svg",
    season: "After dark",
    ingredients: ["Coconut cream", "Vanilla", "Edible shimmer"],
    glow: "rgba(244, 114, 182, 0.95)",
    titleClass: "from-[#9d174d] to-[#d97706]",
  },
] as const
