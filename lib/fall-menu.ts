export const FALL_MENU = [
  {
    id: "north-shore-cedar",
    name: "North Shore Cedar",
    description:
      "Cedar, cranberry, and a clean bitter finish. For a cold afternoon on the North Shore.",
  },
  {
    id: "cranberry-bog",
    name: "Cranberry Bog",
    description: "Cranberry, orange peel, and ginger. Tart, and bright enough for a gray day.",
  },
  {
    id: "orchard-fizz",
    name: "Orchard Fizz",
    description: "Pressed apple, cinnamon, and sparkling water. Like cider, with no alcohol.",
  },
  {
    id: "tamarack",
    name: "Tamarack",
    description:
      "Maple, lemon, and black tea. Named for the tamarack, the Minnesota conifer that goes gold in fall.",
  },
] as const

export type FallDrink = (typeof FALL_MENU)[number]

export type FallDrinkId = FallDrink["id"]

const DRINK_PARAM = "drink"

export function fallQuoteHref(
  drink: FallDrink,
): `/quote?for=mocktails&${typeof DRINK_PARAM}=${FallDrinkId}` {
  return `/quote?for=mocktails&${DRINK_PARAM}=${drink.id}`
}

export function fallDrinkNoteFromSearch(
  searchParams: Readonly<Record<string, string | string[] | undefined>>,
): string {
  const drink = resolveFallDrink(searchParams[DRINK_PARAM])
  if (!drink) return ""
  return `Include the fall draft ${drink.name}.`
}

function resolveFallDrink(value: string | string[] | undefined): FallDrink | undefined {
  if (typeof value !== "string") return undefined
  const id = value.trim().toLowerCase()
  if (id === "") return undefined
  return FALL_MENU.find((drink) => drink.id === id)
}
