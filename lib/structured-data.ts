import type { WithContext, Organization, LocalBusiness, Event as SchemaEvent } from 'schema-dts'

const SITE_URL = 'https://www.pinkysup.social'

export function getOrganizationSchema(): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PINKYS UP',
    alternateName: "Pinky's Up",
    url: SITE_URL,
    logo: `${SITE_URL}/disco-mocktail.svg`,
    description: 'Zero-proof mocktails and community wellness in Washington, DC and Minneapolis.',
    areaServed: ['Washington, DC', 'Minneapolis, MN'],
    sameAs: [
      'https://www.instagram.com/pinkysup.social',
    ]
  }
}

export function getLocalBusinessSchema(): WithContext<LocalBusiness> {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'PINKYS UP',
    alternateName: "Pinky's Up",
    url: SITE_URL,
    logo: `${SITE_URL}/disco-mocktail.svg`,
    description: 'Mobile mocktail bar and community wellness experiences serving Washington, DC and Minneapolis.',
    image: `${SITE_URL}/opengraph-image`,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Washington',
      addressRegion: 'DC',
      addressCountry: 'US'
    },
    areaServed: ['Washington, DC', 'Minneapolis, MN']
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
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description,
    location: {
      '@type': 'Place',
      name: event.location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: event.location.includes('Minneapolis') ? 'Minneapolis' : 'Washington',
        addressRegion: event.location.includes('Minneapolis') ? 'MN' : 'DC',
        addressCountry: 'US'
      }
    },
    organizer: {
      '@type': 'Organization',
      name: 'PINKYS UP',
      url: SITE_URL
    },
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    isAccessibleForFree: true
  }

  if (event.startsAt) {
    schema.startDate = event.startsAt.toISOString()
  }

  if (event.endsAt) {
    schema.endDate = event.endsAt.toISOString()
  }

  if (event.registrationUrl) {
    schema.url = event.registrationUrl
  }

  return schema
}

