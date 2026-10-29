import assert from "node:assert/strict"
import { register } from "node:module"
import { describe, it } from "node:test"

// Node's type stripper does not read tsconfig paths. Register the alias before loading the module.
const workspace = new URL("../", import.meta.url).href
const resolver = `
export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) {
    const url = new URL(specifier.slice(2) + ".ts", ${JSON.stringify(workspace)})
    return nextResolve(url.href, context)
  }
  if (
    (specifier.startsWith("./") || specifier.startsWith("../")) &&
    !specifier.endsWith(".ts") &&
    !specifier.endsWith(".js")
  ) {
    return nextResolve(specifier + ".ts", context)
  }
  return nextResolve(specifier, context)
}
`
register(`data:text/javascript,${encodeURIComponent(resolver)}`, import.meta.url)

const {
  fieldsForInquiry,
  formatStoredEventDate,
  parseInquiry,
  partnerFieldErrors,
  storedGuestCountDisplay,
  storedPhoneDisplay,
} = await import("./inquiry")

type PartnerFixture = {
  kind: "partner"
  contactName: string
  email: string
  phone: string
  venueName: string
  venueKind: string
  area: string
  note: string
}

const quote = {
  kind: "quote",
  firstName: "Ada",
  lastName: "Lovelace",
  phone: "5551234",
  email: "ada@example.com",
  services: ["mocktails"],
  eventType: "Wedding",
  eventDate: "2026-06-15",
  location: "Washington, DC",
  guestCount: "40",
}

function partner(overrides: Partial<PartnerFixture> = {}): PartnerFixture {
  return {
    kind: "partner",
    contactName: "Mary Jane Watson",
    email: "mary@example.com",
    phone: "5551234",
    venueName: "North Room",
    venueKind: "brewery",
    area: "Minneapolis",
    note: "Backyard",
    ...overrides,
  }
}

function gathering(overrides: Record<string, unknown> = {}) {
  return {
    kind: "gathering",
    name: "Mary Jane Watson",
    email: "mary@example.com",
    phone: "",
    when: { flexible: true },
    area: "Minneapolis",
    guestCount: "12",
    gatheringType: "House party",
    notes: "Backyard",
    ...overrides,
  }
}

describe("parseInquiry quote", () => {
  it("parses a quote and keeps the phone, date, and services", () => {
    const parsed = parseInquiry(quote)
    assert.equal(parsed.ok, true)
    if (!parsed.ok || parsed.inquiry.kind !== "quote") return

    assert.equal(parsed.inquiry.phone, "5551234")
    assert.equal(parsed.inquiry.eventDate, "2026-06-15")
    assert.deepEqual(parsed.inquiry.services, ["mocktails"])
    assert.equal(parsed.inquiry.referralSource, "")

    const fields = fieldsForInquiry(parsed.inquiry)
    assert.equal(fields.record.phone, "5551234")
    assert.equal(fields.record.eventDate, "2026-06-15")
    assert.deepEqual(fields.record.services, ["mocktails"])
    assert.equal(fields.record.referralSource, "")
    assert.equal(fields.notification.email.eventDate, "2026-06-15")
    assert.equal(fields.notification.heading, "New Quote Request from PINKYS UP")
    assert.equal(fields.notification.showReferral, true)
    assert.equal(
      fields.notification.subject,
      "New request from Ada Lovelace — Mocktail cart",
    )
    assert.equal(
      fields.notification.confirmationSubject,
      "Thank you for your quote request - PINKYS UP",
    )
  })

  it("rejects a quote phone of 3 characters", () => {
    assert.deepEqual(parseInquiry({ ...quote, phone: "123" }), { ok: false })
  })

  it("rejects a quote date that is not YYYY-MM-DD", () => {
    assert.deepEqual(parseInquiry({ ...quote, eventDate: "June 15, 2026" }), { ok: false })
  })
})

describe("parseInquiry gathering", () => {
  it("accepts a blank phone and a flexible date", () => {
    const parsed = parseInquiry(gathering())
    assert.equal(parsed.ok, true)
    if (!parsed.ok || parsed.inquiry.kind !== "gathering") return

    assert.equal(parsed.inquiry.phone, null)
    assert.equal(parsed.inquiry.firstName, "Mary")
    assert.equal(parsed.inquiry.lastName, "Jane Watson")
    assert.deepEqual(parsed.inquiry.when, { flexible: true })

    const fields = fieldsForInquiry(parsed.inquiry)
    assert.equal(fields.record.phone, "")
    assert.equal(fields.record.eventDate, "flexible")
    assert.equal(fields.record.firstName, "Mary")
    assert.equal(fields.record.lastName, "Jane Watson")
    assert.deepEqual(fields.record.services, ["mocktails"])
    assert.equal(fields.record.eventType, "House party")
    assert.equal(fields.record.location, "Minneapolis")
    assert.equal(fields.notification.email.phone, "Not given")
    assert.equal(fields.notification.email.eventDate, "Flexible")
    assert.equal(fields.notification.confirmation.eventDate, "Flexible")
    assert.deepEqual(fields.notification.email.services, ["mocktails"])
    assert.deepEqual(fields.notification.confirmation.services, ["mocktails"])
    assert.equal(fields.notification.showReferral, false)
    assert.equal(fields.notification.heading, "New gathering request")
    assert.equal(
      fields.notification.subject,
      "New gathering from Mary Jane Watson — House party",
    )
  })

  it("rejects a gathering phone of length 3", () => {
    assert.deepEqual(parseInquiry(gathering({ phone: "123" })), { ok: false })
  })

  it("rejects a flexible date that also includes a date", () => {
    assert.deepEqual(
      parseInquiry(gathering({ when: { flexible: true, date: "2026-06-15" } })),
      { ok: false },
    )
  })

  it("rejects a dated gathering with an empty date", () => {
    assert.deepEqual(parseInquiry(gathering({ when: { flexible: false, date: "" } })), { ok: false })
  })

  it("stores a mononym with an empty last name", () => {
    const parsed = parseInquiry(
      gathering({
        name: "Cher",
        phone: "5551234",
        when: { flexible: false, date: "2026-07-04" },
      }),
    )
    assert.equal(parsed.ok, true)
    if (!parsed.ok || parsed.inquiry.kind !== "gathering") return

    assert.equal(parsed.inquiry.firstName, "Cher")
    assert.equal(parsed.inquiry.lastName, "")
    const fields = fieldsForInquiry(parsed.inquiry)
    assert.equal(fields.record.firstName, "Cher")
    assert.equal(fields.record.lastName, "")
    assert.equal(fields.record.phone, "5551234")
    assert.equal(fields.record.eventDate, "2026-07-04")
    assert.equal(fields.notification.email.phone, "5551234")
    assert.equal(fields.notification.email.eventDate, "2026-07-04")
    assert.equal(fields.notification.confirmation.eventDate, "2026-07-04")
    assert.equal(fields.notification.subject, "New gathering from Cher — House party")
  })
})

describe("parseInquiry partner", () => {
  it("accepts a full venue row and stamps the mailbox", () => {
    const input = partner()
    const parsed = parseInquiry(input)
    assert.equal(parsed.ok, true)
    if (!parsed.ok || parsed.inquiry.kind !== "partner") {
      assert.fail("expected a partner inquiry")
    }

    assert.equal(parsed.inquiry.firstName, "Mary")
    assert.equal(parsed.inquiry.lastName, "Jane Watson")
    assert.equal(parsed.inquiry.phone, "5551234")
    assert.equal(parsed.inquiry.venueKind, "brewery")

    const fields = fieldsForInquiry(parsed.inquiry)
    assert.deepEqual(fields.record.services, ["mocktails", "events"])
    assert.deepEqual(fields.notification.email.services, ["mocktails", "events"])
    assert.deepEqual(fields.notification.confirmation.services, ["mocktails", "events"])
    assert.equal(fields.record.eventType, "Venue partnership — Brewery")
    assert.equal(fields.record.eventDate, "flexible")
    assert.equal(fields.notification.email.eventDate, "Flexible")
    assert.equal(fields.notification.confirmation.eventDate, "Flexible")
    assert.equal(fields.record.guestCount, "0")
    assert.equal(fields.notification.email.guestCount, "Not a guest count")
    assert.equal(fields.record.additionalDetails, "Venue: North Room\nBackyard")
    assert.equal(fields.notification.email.additionalDetails, "Venue: North Room\nBackyard")
    assert.equal(fields.notification.subject, "New venue partner from Mary Jane Watson — North Room")
    assert.equal(fields.notification.heading, "New venue partnership request")
    assert.equal(fields.notification.showReferral, false)
    assert.equal(
      fields.notification.confirmationSubject,
      "Thank you for your partnership request - PINKYS UP",
    )
    assert.deepEqual(partnerFieldErrors(input), {})
  })

  it("accepts a blank phone, a blank note, and a mononym", () => {
    const parsed = parseInquiry(partner({ contactName: "Cher", phone: "", note: "" }))
    assert.equal(parsed.ok, true)
    if (!parsed.ok || parsed.inquiry.kind !== "partner") {
      assert.fail("expected a partner inquiry")
    }

    assert.equal(parsed.inquiry.phone, null)
    assert.equal(parsed.inquiry.firstName, "Cher")
    assert.equal(parsed.inquiry.lastName, "")

    const fields = fieldsForInquiry(parsed.inquiry)
    assert.equal(fields.record.phone, "")
    assert.equal(fields.notification.email.phone, "Not given")
    assert.equal(fields.record.lastName, "")
    assert.equal(fields.record.additionalDetails, "Venue: North Room")
    assert.equal(fields.notification.email.additionalDetails, "Venue: North Room")
    assert.equal(fields.notification.subject, "New venue partner from Cher — North Room")
  })

  it("rejects a phone of length 3", () => {
    const input = partner({ phone: "123" })
    assert.deepEqual(parseInquiry(input), { ok: false })
    assert.ok(partnerFieldErrors(input).phone)
  })

  it("rejects an unknown venue kind and a blank venue name", () => {
    const input = partner({ venueKind: "restaurant", venueName: "" })
    assert.deepEqual(parseInquiry(input), { ok: false })
    const errors = partnerFieldErrors(input)
    assert.ok(errors.venueKind)
    assert.ok(errors.venueName)
  })

  it("rejects a strict extra guestCount", () => {
    assert.deepEqual(parseInquiry({ ...partner(), guestCount: "40" }), { ok: false })
  })

  it("accepts kind other", () => {
    const parsed = parseInquiry(partner({ venueKind: "other" }))
    assert.equal(parsed.ok, true)
    if (!parsed.ok || parsed.inquiry.kind !== "partner") {
      assert.fail("expected a partner inquiry")
    }
    assert.equal(parsed.inquiry.venueKind, "other")
    const fields = fieldsForInquiry(parsed.inquiry)
    assert.equal(fields.record.eventType, "Venue partnership — Other")
  })
})

describe("stored quote values", () => {
  it("prints a real guest count and the partner sentinel", () => {
    assert.equal(storedGuestCountDisplay(40), "40 guests")
    assert.equal(storedGuestCountDisplay(0), "Not a guest count")
  })

  it("labels the flexible token and formats a real date", () => {
    assert.equal(formatStoredEventDate("flexible"), "Flexible")
    const iso = "2026-06-15"
    assert.equal(
      formatStoredEventDate(iso),
      new Date(iso).toLocaleDateString("en-US", { dateStyle: "long" }),
    )
  })

  it("renders a blank phone as text and a real phone as a tel link", () => {
    assert.deepEqual(storedPhoneDisplay(""), { kind: "absent", text: "Not given" })
    assert.deepEqual(storedPhoneDisplay("555-0100"), {
      kind: "link",
      href: "tel:555-0100",
      text: "555-0100",
    })
  })
})
