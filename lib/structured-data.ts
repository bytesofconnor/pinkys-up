import type {
  WithContext,
  Organization,
  LocalBusiness,
  Event as SchemaEvent,
  FAQPage,
  Menu,
  Person,
  WebSite,
  BreadcrumbList,
} from "schema-dts"
import { faqs } from "@/lib/faq"
import { mocktails } from "@/lib/mocktails"
import { CONTACT, SITE_NAME, SITE_URL } from "@/lib/site"

const logo = `${SITE_URL}/disco-mocktail.svg`
const image = `${SITE_URL}/opengraph-image`

const sameAs = [CONTACT.instagram, CONTACT.tiktok]

function cityBusiness(
  name: string,
  locality: string,
  region: string,
  url: string
): LocalBusiness {
  return {
    "@type": "LocalBusiness",
    name,
    url,
    image,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: locality,
      addressRegion: region,
      addressCountry: "US",
    },
    areaServed: `${locality}, ${region}`,
  }
}

export function getSiteGraph() {
  const organization: Organization = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: ["Pinky's Up", "Pinkys Up"],
    url: SITE_URL,
    logo,
    image,
    email: CONTACT.email,
    telephone: CONTACT.phone,
    description:
      "Zero-proof mocktail cart and free community wellness gatherings in Washington, DC and Minneapolis.",
    founder: { "@id": `${SITE_URL}/#brenda` },
    sameAs,
    areaServed: ["Washington, DC", "Minneapolis, MN"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: CONTACT.phone,
        email: CONTACT.email,
        areaServed: ["US"],
        availableLanguage: ["English"],
      },
    ],
    knowsAbout: [
      "mocktail bar",
      "zero-proof cocktails",
      "mobile bar service",
      "community wellness events",
      "non-alcoholic wedding bar",
    ],
  }

  const person: Person = {
    "@type": "Person",
    "@id": `${SITE_URL}/#brenda`,
    name: "Brenda Pereira Vargas",
    jobTitle: "Founder",
    worksFor: { "@id": `${SITE_URL}/#organization` },
    url: `${SITE_URL}/1-1`,
    image: `${SITE_URL}/brendap.jpg`,
    sameAs: ["https://www.instagram.com/pinkysup_dc"],
  }

  const website: WebSite = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-US",
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      person,
      website,
      cityBusiness("PINKYS UP Washington, DC", "Washington", "DC", `${SITE_URL}/washington-dc`),
      cityBusiness("PINKYS UP Minneapolis", "Minneapolis", "MN", `${SITE_URL}/minneapolis`),
    ],
  }
}

export function getFaqSchema(): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}

export function getMenuSchema(): WithContext<Menu> {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: "PINKYS UP zero-proof mocktail menu",
    hasMenuSection: {
      "@type": "MenuSection",
      name: "Signature mocktails",
      hasMenuItem: mocktails.map((drink) => ({
        "@type": "MenuItem",
        name: drink.name,
        description: drink.description,
      })),
    },
  }
}

export function getBreadcrumbSchema(
  items: { name: string; path: string }[]
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}

export function getEventSchema(event: {
  name: string
  description: string
  startsAt: Date | null
  endsAt: Date | null
  location: string
  registrationUrl?: string
}): WithContext<SchemaEvent> {
  const schema: WithContext<SchemaEvent> = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    description: event.description,
    location: {
      "@type": "Place",
      name: event.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: event.location.toLowerCase().includes("minneapolis")
          ? "Minneapolis"
          : "Washington",
        addressRegion: event.location.toLowerCase().includes("minneapolis") ? "MN" : "DC",
        addressCountry: "US",
      },
    },
    organizer: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    isAccessibleForFree: true,
  }

  if (event.startsAt) {
    schema.startDate = event.startsAt.toISOString()
  }

  if (event.endsAt) {
    schema.endDate = event.endsAt.toISOString()
  }

  if (event.registrationUrl) {
    schema.url = event.registrationUrl
  } else {
    schema.url = `${SITE_URL}/events`
  }

  return schema
}
