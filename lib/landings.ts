import type { Metadata } from "next"
import type { FaqItem } from "@/lib/faq"
import type { DestinationId } from "@/lib/destinations"
import { link, sitemapEntries } from "@/lib/destinations"
import { mocktails } from "@/lib/mocktails"
import { DJ_SERVICE_DESCRIPTION } from "@/lib/quote"
import { SITE_URL } from "@/lib/site"
import {
  getBreadcrumbSchema,
  getFaqSchema,
  getLocalBusinessSchema,
  getServiceSchema,
} from "@/lib/structured-data"

export const BRAND_LINE =
  "Pinkies Up is Brenda Pereira Vargas's zero-proof mocktail cart in Washington, DC and Minneapolis."

type Run =
  | { readonly type: "text"; readonly text: string }
  | { readonly type: "link"; readonly to: DestinationId; readonly text: string }

type AreaGroup = {
  readonly title: string
  readonly body: string
  readonly places: readonly string[]
}

type Business = {
  readonly name: string
  readonly locality: string
  readonly region: string
  readonly path: string
}

export type LandingId =
  | "washington-dc"
  | "minneapolis"
  | "washington-dc-weddings"
  | "minneapolis-weddings"
  | "sober-wedding-bar"

export type Landing = {
  readonly id: LandingId
  readonly destination: DestinationId
  readonly eyebrow: string
  readonly title: string
  readonly lede: string
  readonly metaDescription: string
  readonly serviceName: string
  readonly areaServed: readonly string[]
  readonly breadcrumb: readonly { name: string; path: string }[]
  readonly businesses: readonly Business[]
  readonly paragraphs: readonly (readonly Run[])[]
  readonly eventsLine?: readonly Run[]
  readonly areas: readonly AreaGroup[]
  readonly eventTypes: readonly string[]
  readonly faqs: readonly FaqItem[]
  readonly related: readonly DestinationId[]
}

const dcAreas: AreaGroup = {
  title: "Washington, DC and nearby",
  body: "The cart serves private events in Washington, DC and nearby areas. Put the neighborhood in the location field on the quote form.",
  places: [
    "Georgetown",
    "Dupont Circle",
    "Adams Morgan",
    "Shaw",
    "U Street",
    "Logan Circle",
    "Capitol Hill",
    "Navy Yard",
    "Columbia Heights",
    "Arlington",
    "Alexandria",
  ],
}

const minneapolisAreas: AreaGroup = {
  title: "Minneapolis and the Twin Cities",
  body: "The cart serves Minneapolis and the Twin Cities. Put the neighborhood in the location field on the quote form.",
  places: [
    "North Loop",
    "Northeast",
    "Downtown",
    "Uptown",
    "Whittier",
    "Loring Park",
    "Linden Hills",
    "St. Paul",
  ],
}

const dcBusiness: Business = {
  name: "PINKYS UP Washington, DC",
  locality: "Washington",
  region: "DC",
  path: link("washingtonDc").path,
}

const minneapolisBusiness: Business = {
  name: "PINKYS UP Minneapolis",
  locality: "Minneapolis",
  region: "MN",
  path: link("minneapolis").path,
}

function text(value: string): readonly Run[] {
  return [{ type: "text", text: value }]
}

function signatureMenuNames(): string {
  const names = mocktails.map((drink) => drink.name)
  if (names.length < 2) return names[0] ?? "the signature menu"
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`
}

export function includedItems(): readonly { title: string; body: string }[] {
  return [
    {
      title: "The cart",
      body: "A mobile zero-proof bar for the event. There is no alcohol.",
    },
    {
      title: "A custom zero-proof menu",
      body: `The signature drinks are ${signatureMenuNames()}. A booked event can use those or a custom menu.`,
    },
    {
      title: "Glassware and service",
      body: "Glassware and service staff come with the cart.",
    },
    {
      title: "DJ service",
      body: DJ_SERVICE_DESCRIPTION,
    },
  ]
}

export const bookingSteps = [
  {
    title: "Send a quote",
    body: "Use the quote form. It asks for the date, the guest count, and the location.",
  },
  {
    title: "Brenda follows up by email",
    body: "Brenda Pereira Vargas replies by email to the address on the form.",
  },
  {
    title: "Menu and details",
    body: "You confirm the menu, glassware, service, and whether you want DJ service.",
  },
  {
    title: "Event day",
    body: "The cart and the service are there for the event.",
  },
] as const

const howToBook =
  "Send a quote with the date, guest count, and location. Brenda follows up by email. You confirm the menu and the details. The cart is there on event day."

const landings = {
  "washington-dc": {
    id: "washington-dc",
    destination: "washingtonDc",
    eyebrow: "Washington, DC",
    title: "Mocktail bar rental in Washington, DC",
    lede: "PINKYS UP is a zero-proof mocktail cart for DC weddings, parties, and brand events, plus free community wellness gatherings.",
    metaDescription:
      "Pinkies Up is Brenda Pereira Vargas's zero-proof mocktail cart for Washington, DC weddings, parties, and brand events.",
    serviceName: "Zero-proof mocktail cart in Washington, DC",
    areaServed: ["Washington, DC"],
    breadcrumb: [
      { name: "Home", path: link("home").path },
      { name: "Washington, DC", path: link("washingtonDc").path },
    ],
    businesses: [dcBusiness],
    paragraphs: [
      text(
        "If you are looking for a non-alcoholic bar in Washington, DC that still feels like hospitality, that is the cart. We bring the drinks, glassware, and service so guests who are not drinking are part of the night."
      ),
      [
        {
          type: "text",
          text: "Bookings are for private events: weddings, birthday parties, office gatherings, and activations. There is no alcohol on the menu. The signature menu is on the ",
        },
        { type: "link", to: "mocktails", text: "mocktails page" },
        { type: "text", text: ", and a booked event can use a custom menu." },
      ],
      text(
        "PINKYS UP also hosts free wellness events in DC. Those dates live on the Events page when a date is booked. They are community gatherings."
      ),
      text(BRAND_LINE),
    ],
    eventsLine: [
      { type: "text", text: "See free DC-area gatherings on " },
      { type: "link", to: "events", text: "Events" },
      { type: "text", text: ", read about " },
      { type: "link", to: "washingtonDcWeddings", text: "DC weddings" },
      { type: "text", text: ", or request a cart quote for your date." },
    ],
    areas: [dcAreas],
    eventTypes: [
      "Weddings",
      "Rehearsal dinners",
      "Birthday parties",
      "Office gatherings",
      "Brand activations",
      "Private gatherings",
    ],
    faqs: [
      {
        question: "Can I book a mocktail bar rental in Washington, DC?",
        answer:
          "Yes. PINKYS UP serves Washington, DC and nearby areas for weddings, parties, brand activations, and private gatherings. Request a quote and name the neighborhood in the location field.",
      },
      {
        question: "Which DC neighborhoods can the cart come to?",
        answer: `${dcAreas.body} ${dcAreas.places.join(", ")}.`,
      },
      {
        question: "What comes with the cart?",
        answer: "The cart, a custom zero-proof menu, glassware, service staff, and DJ service.",
      },
      {
        question: "How does booking work?",
        answer: howToBook,
      },
    ],
    related: ["washingtonDcWeddings", "soberWeddingBar", "minneapolis", "mocktails", "faq", "events"],
  },
  minneapolis: {
    id: "minneapolis",
    destination: "minneapolis",
    eyebrow: "Minneapolis · Twin Cities",
    title: "Mobile mocktail bar in Minneapolis",
    lede: "PINKYS UP brings a zero-proof mocktail bar to Minneapolis events and hosts free community wellness gatherings in the Twin Cities.",
    metaDescription:
      "Pinkies Up brings a zero-proof mocktail cart to Minneapolis and the Twin Cities for weddings, parties, and brand events.",
    serviceName: "Zero-proof mocktail cart in Minneapolis",
    areaServed: ["Minneapolis, MN"],
    breadcrumb: [
      { name: "Home", path: link("home").path },
      { name: "Minneapolis", path: link("minneapolis").path },
    ],
    businesses: [minneapolisBusiness],
    paragraphs: [
      text(
        "Minneapolis and the Twin Cities get the same cart as DC: vintage-inspired service, fully non-alcoholic drinks, and a menu built for people who want a real pour without alcohol."
      ),
      [
        {
          type: "text",
          text: "Hire PINKYS UP for weddings, private parties, wellness pop-ups, and branded events. Tell us the neighborhood, guest count, and date on the ",
        },
        { type: "link", to: "contact", text: "quote form" },
        { type: "text", text: " and Brenda will follow up." },
      ],
      text(
        "Community events in Minneapolis are free. When a date is on the calendar it appears on the Events page. We do not invent listings."
      ),
      text(BRAND_LINE),
    ],
    eventsLine: [
      { type: "text", text: "See Twin Cities gatherings on " },
      { type: "link", to: "events", text: "Events" },
      { type: "text", text: ", read about " },
      { type: "link", to: "minneapolisWeddings", text: "Minneapolis weddings" },
      { type: "text", text: ", or book the cart for a private event." },
    ],
    areas: [minneapolisAreas],
    eventTypes: [
      "Weddings",
      "Rehearsal dinners",
      "Private parties",
      "Wellness pop-ups",
      "Branded events",
    ],
    faqs: [
      {
        question: "Do you bring a mobile mocktail bar to Minneapolis?",
        answer:
          "Yes. We serve Minneapolis and the Twin Cities with the same cart as Washington, DC. The booking is the cart, the menu, and hospitality at your event.",
      },
      {
        question: "Which Twin Cities areas can the cart come to?",
        answer: `${minneapolisAreas.body} ${minneapolisAreas.places.join(", ")}.`,
      },
      {
        question: "What comes with a Minneapolis booking?",
        answer: "The cart, a custom zero-proof menu, glassware, service staff, and DJ service.",
      },
      {
        question: "How does booking work in Minneapolis?",
        answer: howToBook,
      },
    ],
    related: ["minneapolisWeddings", "soberWeddingBar", "washingtonDc", "mocktails", "faq", "events"],
  },
  "washington-dc-weddings": {
    id: "washington-dc-weddings",
    destination: "washingtonDcWeddings",
    eyebrow: "Washington, DC weddings",
    title: "Mocktail bar rental for Washington, DC weddings",
    lede: "A zero-proof cart for the wedding and the rehearsal dinner, with glassware, service, and a custom menu.",
    metaDescription:
      "Pinkies Up is a zero-proof mocktail cart for Washington, DC weddings. The cart, a custom menu, glassware, service, and DJ playlists.",
    serviceName: "Zero-proof wedding bar in Washington, DC",
    areaServed: ["Washington, DC"],
    breadcrumb: [
      { name: "Home", path: link("home").path },
      { name: "Washington, DC", path: link("washingtonDc").path },
      { name: "Weddings", path: link("washingtonDcWeddings").path },
    ],
    businesses: [dcBusiness],
    paragraphs: [
      text(BRAND_LINE),
      text(
        "Guests who are not drinking still get a bar. PINKYS UP brings the cart to Washington, DC weddings and rehearsal dinners. There is no alcohol on the menu."
      ),
      [
        {
          type: "text",
          text: "The same cart covers other private gatherings in the city. This page is for the wedding. For the rest of DC, start with the ",
        },
        { type: "link", to: "washingtonDc", text: "Washington, DC" },
        { type: "text", text: " page." },
      ],
    ],
    areas: [dcAreas],
    eventTypes: ["Weddings", "Rehearsal dinners"],
    faqs: [
      {
        question: "Do you bring a mocktail bar to DC weddings?",
        answer:
          "Yes. The cart is zero-proof. It is for weddings and rehearsal dinners in Washington, DC and nearby areas.",
      },
      {
        question: "Is the wedding bar alcohol-free?",
        answer:
          "Yes. The cart is fully zero-proof. Drinks are non-alcoholic mocktails for a dry celebration or for guests who are not drinking.",
      },
      {
        question: "Can the wedding menu be custom?",
        answer: "Yes. A wedding can use the signature menu or a custom menu.",
      },
      {
        question: "How do we book a DC wedding bar?",
        answer: howToBook,
      },
    ],
    related: ["washingtonDc", "soberWeddingBar", "minneapolisWeddings", "mocktails", "faq"],
  },
  "minneapolis-weddings": {
    id: "minneapolis-weddings",
    destination: "minneapolisWeddings",
    eyebrow: "Minneapolis weddings",
    title: "A mobile mocktail bar for Minneapolis weddings",
    lede: "The same zero-proof cart as Washington, DC, set up for a Twin Cities wedding or rehearsal dinner.",
    metaDescription:
      "Pinkies Up brings a mobile mocktail bar to Minneapolis weddings. Zero-proof cart, custom menu, glassware, service, and DJ playlists.",
    serviceName: "Zero-proof wedding bar in Minneapolis",
    areaServed: ["Minneapolis, MN"],
    breadcrumb: [
      { name: "Home", path: link("home").path },
      { name: "Minneapolis", path: link("minneapolis").path },
      { name: "Weddings", path: link("minneapolisWeddings").path },
    ],
    businesses: [minneapolisBusiness],
    paragraphs: [
      text(BRAND_LINE),
      text(
        "Minneapolis and the Twin Cities get the cart for weddings and rehearsal dinners. The drinks are zero-proof. Guests who are not drinking are part of the night."
      ),
      [
        {
          type: "text",
          text: "Other private events in the Twin Cities are on the ",
        },
        { type: "link", to: "minneapolis", text: "Minneapolis" },
        { type: "text", text: " page. This page is for the wedding." },
      ],
    ],
    areas: [minneapolisAreas],
    eventTypes: ["Weddings", "Rehearsal dinners"],
    faqs: [
      {
        question: "Do you bring a mobile mocktail bar to Minneapolis weddings?",
        answer:
          "Yes. Weddings and rehearsal dinners in Minneapolis and the Twin Cities can book the same zero-proof cart as Washington, DC.",
      },
      {
        question: "Is there alcohol on the wedding menu?",
        answer: "No. The cart is fully zero-proof.",
      },
      {
        question: "Can we choose the drinks?",
        answer: "Yes. A wedding can use the signature menu or a custom menu.",
      },
      {
        question: "How do we book a Minneapolis wedding bar?",
        answer: howToBook,
      },
    ],
    related: ["minneapolis", "soberWeddingBar", "washingtonDcWeddings", "mocktails", "faq"],
  },
  "sober-wedding-bar": {
    id: "sober-wedding-bar",
    destination: "soberWeddingBar",
    eyebrow: "Sober wedding bar",
    title: "A sober wedding bar and non-alcoholic bar",
    lede: "A zero-proof cart for couples who want a real bar and no alcohol, in Washington, DC and Minneapolis.",
    metaDescription:
      "Pinkies Up is a sober wedding bar and non-alcoholic bar cart in Washington, DC and Minneapolis. Zero-proof drinks, glassware, and service.",
    serviceName: "Sober wedding bar",
    areaServed: ["Washington, DC", "Minneapolis, MN"],
    breadcrumb: [
      { name: "Home", path: link("home").path },
      { name: "Sober wedding bar", path: link("soberWeddingBar").path },
    ],
    businesses: [dcBusiness, minneapolisBusiness],
    paragraphs: [
      text(BRAND_LINE),
      text(
        "A sober wedding bar is the cart with no alcohol. PINKYS UP brings the drinks, the glassware, and the service so the people who are not drinking still have a pour."
      ),
      text(
        "Non-alcoholic bar catering is the cart, a zero-proof menu, glassware, and service."
      ),
      [
        { type: "text", text: "Book it for a wedding in " },
        { type: "link", to: "washingtonDcWeddings", text: "Washington, DC" },
        { type: "text", text: " or " },
        { type: "link", to: "minneapolisWeddings", text: "Minneapolis" },
        { type: "text", text: "." },
      ],
    ],
    areas: [dcAreas, minneapolisAreas],
    eventTypes: ["Weddings", "Rehearsal dinners", "Private celebrations that need a non-alcoholic bar"],
    faqs: [
      {
        question: "What is a sober wedding bar?",
        answer:
          "A bar with no alcohol. PINKYS UP brings a zero-proof mocktail cart, glassware, and service so guests who are not drinking have a real pour.",
      },
      {
        question: "Where do you serve sober weddings?",
        answer:
          "Washington, DC and nearby areas, and Minneapolis and the Twin Cities. Name the neighborhood in the location field on the quote form.",
      },
      {
        question: "Is this non-alcoholic bar catering?",
        answer:
          "The service is the cart, a zero-proof menu, glassware, service staff, and DJ service.",
      },
      {
        question: "How do we book?",
        answer: howToBook,
      },
    ],
    related: ["washingtonDcWeddings", "minneapolisWeddings", "washingtonDc", "minneapolis", "mocktails", "faq"],
  },
} as const satisfies Record<LandingId, Landing>

export const landingIds = Object.keys(landings) as LandingId[]

export function getLanding(id: LandingId): Landing {
  return landings[id]
}

export function landingPath(id: LandingId): string {
  return link(landings[id].destination).path
}

export function landingMetadata(id: LandingId): Metadata {
  const page = landings[id]
  const path = landingPath(id)
  const url = `${SITE_URL}${path}`
  return {
    title: page.title,
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `${page.title} | PINKYS UP`,
      description: page.metaDescription,
      url,
      type: "website",
    },
  }
}

export function landingSchemas(id: LandingId) {
  const page = landings[id]
  const path = landingPath(id)
  const url = `${SITE_URL}${path}`
  return [
    getBreadcrumbSchema([...page.breadcrumb]),
    getFaqSchema(page.faqs),
    getServiceSchema({
      name: page.serviceName,
      description: page.metaDescription,
      url,
      areaServed: page.areaServed,
    }),
    ...page.businesses.map((business) =>
      getLocalBusinessSchema(business.name, business.locality, business.region, `${SITE_URL}${business.path}`)
    ),
  ]
}

export function landingSitemapUrls(): string[] {
  return sitemapEntries().map((entry) => entry.url)
}
