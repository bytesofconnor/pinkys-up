export const venueKinds = [
  { id: "brewery", label: "Brewery" },
  { id: "coffee-shop", label: "Coffee shop" },
  { id: "studio", label: "Studio" },
  { id: "event-space", label: "Event space" },
  { id: "lake-or-cabin", label: "Lake or cabin" },
  { id: "other", label: "Other" },
] as const

export type VenueKind = (typeof venueKinds)[number]["id"]

const venueKindLabels: Record<VenueKind, string> = (() => {
  const labels = {} as Record<VenueKind, string>
  for (const kind of venueKinds) {
    labels[kind.id] = kind.label
  }
  return labels
})()

export function venueKindLabel(id: VenueKind): string {
  return venueKindLabels[id]
}

export const partnerReasons = [
  {
    id: "popup-bar",
    title: "An alcohol-free pop-up bar",
    body: "The cart sets up in your space. Every pour is zero-proof.",
  },
  {
    id: "community-events",
    title: "Community events that bring a crowd",
    body: "We host gatherings people come to. Your venue is the room they come to.",
  },
  {
    id: "co-promotion",
    title: "Co-promotion",
    body: "We tell our community about the night, and you tell yours.",
  },
] as const

export type PartnerReason = (typeof partnerReasons)[number]

const _threeReasons = partnerReasons satisfies readonly [
  PartnerReason,
  PartnerReason,
  PartnerReason,
]
void _threeReasons

export type Partner = {
  readonly id: string
  readonly name: string
  readonly kind: VenueKind
  readonly area: string
}

export const partners: readonly Partner[] = []

export const PARTNER_ROSTER_EMPTY = "Founding partner spots open"

function joinVenueKindLabels(
  kinds: readonly { readonly id: string; readonly label: string }[],
): string {
  const labels = kinds
    .filter((kind) => kind.id !== "other")
    .map((kind) => kind.label.charAt(0).toLowerCase() + kind.label.slice(1))
  if (labels.length <= 1) return labels[0] ?? ""
  const last = labels[labels.length - 1] ?? ""
  return `${labels.slice(0, -1).join(", ")}, or ${last}`
}

export const partnersPageDescription = `Ask PINKYS UP to partner with your ${joinVenueKindLabels(venueKinds)}.`

function assertDistinct(ids: readonly string[], label: string): void {
  const seen = new Set<string>()
  for (const id of ids) {
    if (seen.has(id)) {
      throw new Error(`Duplicate ${label} id: ${id}`)
    }
    seen.add(id)
  }
}

assertDistinct(
  partnerReasons.map((reason) => reason.id),
  "partner reason",
)
assertDistinct(
  partners.map((partner) => partner.id),
  "partner",
)
