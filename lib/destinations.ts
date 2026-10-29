import type { MetadataRoute } from "next"
import type { AllowedService } from "@/lib/quote"
import { SITE_URL } from "@/lib/site"

type TabPlace = { readonly kind: "tab"; readonly index: 0 | 1 | 2 }
type ActionPlace = { readonly kind: "action" }
type PagePlace = { readonly kind: "page" }
type Place = TabPlace | ActionPlace | PagePlace

type DestinationRecord = {
  readonly path: `/${string}` | "/"
  readonly label: string
  readonly place: Place
  readonly directoryOrder?: number
  readonly sitemap?: {
    readonly priority: number
    readonly changeFrequency: "weekly" | "monthly"
  }
}

const destinations = {
  home: {
    path: "/",
    label: "Home",
    place: { kind: "tab", index: 0 },
    sitemap: { priority: 1, changeFrequency: "weekly" },
  },
  events: {
    path: "/events",
    label: "Community Events",
    place: { kind: "tab", index: 1 },
    directoryOrder: 4,
    sitemap: { priority: 0.9, changeFrequency: "weekly" },
  },
  mocktails: {
    path: "/mocktails",
    label: "Mobile Mocktails",
    place: { kind: "tab", index: 2 },
    directoryOrder: 3,
    sitemap: { priority: 0.8, changeFrequency: "monthly" },
  },
  contact: {
    path: "/quote",
    label: "Contact",
    place: { kind: "action" },
    directoryOrder: 5,
    sitemap: { priority: 0.8, changeFrequency: "monthly" },
  },
  faq: {
    path: "/faq",
    label: "FAQ",
    place: { kind: "page" },
    directoryOrder: 0,
    sitemap: { priority: 0.8, changeFrequency: "monthly" },
  },
  washingtonDc: {
    path: "/washington-dc",
    label: "Washington, DC",
    place: { kind: "page" },
    directoryOrder: 1,
    sitemap: { priority: 0.8, changeFrequency: "monthly" },
  },
  minneapolis: {
    path: "/minneapolis",
    label: "Minneapolis",
    place: { kind: "page" },
    directoryOrder: 2,
    sitemap: { priority: 0.8, changeFrequency: "monthly" },
  },
  oneOnOne: {
    path: "/1-1",
    label: "1:1",
    place: { kind: "page" },
    sitemap: { priority: 0.6, changeFrequency: "monthly" },
  },
  gathering: {
    path: "/gathering",
    label: "Plan your gathering",
    place: { kind: "page" },
    sitemap: { priority: 0.8, changeFrequency: "monthly" },
  },
} as const satisfies Record<string, DestinationRecord>

type Destinations = typeof destinations

export type DestinationId = keyof Destinations

type PlaceOf<Id extends DestinationId> = Destinations[Id]["place"]

type TabIdForIndex<I extends 0 | 1 | 2> = {
  [Id in DestinationId]: PlaceOf<Id> extends { kind: "tab"; index: I } ? Id : never
}[DestinationId]

type ActionId = {
  [Id in DestinationId]: PlaceOf<Id> extends { kind: "action" } ? Id : never
}[DestinationId]

type IsUnion<T, U = T> = T extends unknown ? ([U] extends [T] ? false : true) : never

type ExactlyOne<T> = [T] extends [never] ? false : IsUnion<T> extends true ? false : true

type ActualPath = Destinations[DestinationId]["path"]

const registryShape = {
  tab0: true,
  tab1: true,
  tab2: true,
  oneAction: true,
  formStaysOnQuote: true,
  aboutAndContactAreNotDestinations: true,
} satisfies {
  tab0: ExactlyOne<TabIdForIndex<0>>
  tab1: ExactlyOne<TabIdForIndex<1>>
  tab2: ExactlyOne<TabIdForIndex<2>>
  oneAction: ExactlyOne<ActionId>
  formStaysOnQuote: Destinations["contact"]["path"] extends "/quote" ? true : false
  aboutAndContactAreNotDestinations: Extract<ActualPath, "/about" | "/contact"> extends never
    ? true
    : false
}

void registryShape

export type PublicLink<Id extends DestinationId = DestinationId> = {
  readonly id: Id
  readonly path: Destinations[Id]["path"]
  readonly label: Destinations[Id]["label"]
}

type HeaderTabs = readonly [
  PublicLink<TabIdForIndex<0>>,
  PublicLink<TabIdForIndex<1>>,
  PublicLink<TabIdForIndex<2>>,
]

type WithDirectory = {
  [Id in DestinationId]: "directoryOrder" extends keyof Destinations[Id] ? Id : never
}[DestinationId]

export type QuoteInterest = Extract<AllowedService, "mocktails" | "events">

type ContactPath = Destinations["contact"]["path"]

export type ContactHref = `${ContactPath}?for=${QuoteInterest}`

function assertRegistry(): void {
  const paths = new Set<string>()
  const orders = new Set<number>()

  for (const id of Object.keys(destinations) as DestinationId[]) {
    const record = destinations[id]
    if (paths.has(record.path)) {
      throw new Error(`Duplicate destination path: ${record.path}`)
    }
    paths.add(record.path)
    if ("directoryOrder" in record) {
      if (orders.has(record.directoryOrder)) {
        throw new Error(`Duplicate directory order: ${record.directoryOrder}`)
      }
      orders.add(record.directoryOrder)
    }
  }
}

assertRegistry()

export function link<Id extends DestinationId>(id: Id): PublicLink<Id> {
  const record = destinations[id]
  return { id, path: record.path, label: record.label }
}

export function contactHref(interest: QuoteInterest): ContactHref {
  return `/quote?for=${interest}`
}

function tabLink<I extends 0 | 1 | 2>(index: I): PublicLink<TabIdForIndex<I>> {
  for (const id of Object.keys(destinations) as DestinationId[]) {
    const record = destinations[id]
    if (record.place.kind === "tab" && record.place.index === index) {
      return { id, path: record.path, label: record.label } as PublicLink<TabIdForIndex<I>>
    }
  }
  throw new Error(`Missing header tab ${index}`)
}

export const headerTabs: HeaderTabs = [tabLink(0), tabLink(1), tabLink(2)]

function contactLink(): PublicLink<ActionId> {
  for (const id of Object.keys(destinations) as DestinationId[]) {
    const record = destinations[id]
    if (record.place.kind === "action") {
      return { id, path: record.path, label: record.label } as PublicLink<ActionId>
    }
  }
  throw new Error("Missing contact action")
}

export const headerContact: PublicLink<ActionId> = contactLink()

export const directoryLinks: readonly PublicLink<WithDirectory>[] = (
  Object.keys(destinations) as DestinationId[]
)
  .filter((id): id is WithDirectory => "directoryOrder" in destinations[id])
  .sort(
    (a, b) => destinations[a].directoryOrder - destinations[b].directoryOrder,
  )
  .map((id) => ({
    id,
    path: destinations[id].path,
    label: destinations[id].label,
  }))

export function sitemapEntries(): MetadataRoute.Sitemap {
  return (Object.keys(destinations) as DestinationId[])
    .filter((id) => "sitemap" in destinations[id])
    .map((id) => {
      const record = destinations[id]
      if (!("sitemap" in record)) {
        throw new Error(`Missing sitemap metadata for ${id}`)
      }
      return {
        url: id === "home" ? SITE_URL : `${SITE_URL}${record.path}`,
        lastModified: new Date(),
        changeFrequency: record.sitemap.changeFrequency,
        priority: record.sitemap.priority,
      }
    })
}
