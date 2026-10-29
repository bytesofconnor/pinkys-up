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

const { directoryLinks, headerTabs, sitemapEntries } = await import("./destinations")
const {
  FOLLOW_UP_PATH,
  followUpFieldErrors,
  followUpPageMetadata,
  prepareFollowUp,
} = await import("./follow-up")
const {
  formatStoredEventDate,
  storedGuestCountDisplay,
  storedPhoneDisplay,
} = await import("./inquiry")
const { SITE_URL } = await import("./site")
const { default: robots } = await import("../app/robots")

function disallowedPaths(value: unknown): string[] {
  if (Array.isArray(value)) return value.flatMap((item) => disallowedPaths(item))
  if (!value || typeof value !== "object" || !("disallow" in value)) return []
  const disallow = value.disallow
  if (typeof disallow === "string") return [disallow]
  if (!Array.isArray(disallow)) return []
  return disallow.filter((item) => typeof item === "string")
}

function draft(overrides: Partial<{
  hostName: string
  email: string
  rating: "" | "1" | "2" | "3" | "4" | "5"
  testimonial: string
  publish: boolean
  rebook: boolean
  events: boolean
  website: string
}> = {}) {
  return {
    hostName: "Mary Jane Watson",
    email: "mary@example.com",
    rating: "5" as const,
    testimonial: "Short note.",
    publish: true,
    rebook: false,
    events: true,
    website: "",
    ...overrides,
  }
}

const factLines = [
  "Rating: 5 of 5",
  "Publish testimonial: yes",
  "Rebook or new quote: no",
  "Future events: yes",
] as const

describe("prepareFollowUp", () => {
  it("accepts a valid draft and builds the letter and archive", () => {
    const prepared = prepareFollowUp(draft())
    assert.equal(prepared.status, "ready")
    if (prepared.status !== "ready") return

    assert.equal(prepared.replyTo, "mary@example.com")
    assert.equal(prepared.subject, "Note from Mary Jane Watson - 5 of 5")
    assert.deepEqual(prepared.letter, {
      hostName: "Mary Jane Watson",
      email: "mary@example.com",
      lines: factLines,
      testimonial: "Short note.",
    })
    assert.deepEqual(prepared.archive, {
      firstName: "Mary",
      lastName: "Jane Watson",
      email: "mary@example.com",
      phone: "",
      services: [],
      eventType: "Follow-up",
      eventDate: "flexible",
      location: "",
      guestCount: "0",
      referralSource: "",
      additionalDetails: `${factLines.join("\n")}\n\nShort note.`,
    })
    assert.equal(prepared.archive.guestCount, "0")
    assert.equal(formatStoredEventDate(prepared.archive.eventDate), "Flexible")
    assert.equal(storedGuestCountDisplay(Number(prepared.archive.guestCount)), "Not a guest count")
    assert.equal(storedPhoneDisplay(prepared.archive.phone).kind, "absent")
  })

  it("splits a one-word name and trims the note", () => {
    const prepared = prepareFollowUp(draft({
      hostName: "  Cher  ",
      testimonial: "  Short note.  ",
      publish: false,
      rebook: false,
      events: false,
      rating: "1",
    }))
    assert.equal(prepared.status, "ready")
    if (prepared.status !== "ready") return

    assert.equal(prepared.archive.firstName, "Cher")
    assert.equal(prepared.archive.lastName, "")
    assert.equal(prepared.subject, "Note from Cher - 1 of 5")
    assert.deepEqual(prepared.letter.lines, [
      "Rating: 1 of 5",
      "Publish testimonial: no",
      "Rebook or new quote: no",
      "Future events: no",
    ])
    assert.equal(prepared.letter.testimonial, "Short note.")
    assert.equal(prepared.archive.guestCount, "0")
  })

  it("rejects an extra key", () => {
    const extra = { ...draft(), phone: "5551234" }
    assert.deepEqual(prepareFollowUp(extra), { status: "invalid" })
    assert.equal(
      followUpFieldErrors(extra).submit,
      "Please fill out all required fields correctly.",
    )
  })

  it("treats a trimmed honeypot as a drop and a blank honeypot as a note", () => {
    assert.deepEqual(
      prepareFollowUp(draft({ website: "  https://spam.example  " })),
      { status: "honeypot" },
    )
    assert.equal(prepareFollowUp(draft({ website: "   " })).status, "ready")
    assert.equal(prepareFollowUp(draft()).status, "ready")
    const { website, ...withoutWebsite } = draft()
    assert.equal(website, "")
    assert.equal(prepareFollowUp(withoutWebsite).status, "ready")
  })

  it("does not let a honeypot skip an invalid draft", () => {
    assert.deepEqual(
      prepareFollowUp(draft({ email: "nope", website: "https://spam.example" })),
      { status: "invalid" },
    )
  })

  it("rejects ratings outside 1 through 5", () => {
    for (const rating of ["", "0", "6", "05", 5, 1]) {
      assert.equal(prepareFollowUp({ ...draft(), rating }).status, "invalid")
    }
    for (const rating of ["1", "2", "3", "4", "5"] as const) {
      const prepared = prepareFollowUp(draft({ rating }))
      assert.equal(prepared.status, "ready")
      if (prepared.status !== "ready") continue
      assert.equal(prepared.letter.lines[0], `Rating: ${Number(rating)} of 5`)
      assert.equal(prepared.archive.guestCount, "0")
    }
  })

  it("shares field errors with the draft schema", () => {
    const empty = draft({
      hostName: " ",
      email: "",
      rating: "",
      testimonial: "   ",
    })
    assert.equal(prepareFollowUp(empty).status, "invalid")
    const errors = followUpFieldErrors(empty)
    assert.equal(errors.hostName, "Name is required")
    assert.equal(errors.email, "Email is required")
    assert.equal(errors.rating, "Choose a rating from 1 to 5.")
    assert.equal(errors.testimonial, "A short note is required.")
    assert.equal(errors.submit, undefined)

    const tooLong = draft({ testimonial: "a".repeat(501) })
    assert.equal(prepareFollowUp(tooLong).status, "invalid")
    assert.equal(followUpFieldErrors(tooLong).testimonial, "Keep the note to 500 characters.")
    assert.equal(prepareFollowUp(draft({ testimonial: "a".repeat(500) })).status, "ready")
    assert.equal(
      followUpFieldErrors(draft({ email: "not-an-email" })).email,
      "Please enter a valid email",
    )
  })

  it("requires the three flags to be booleans", () => {
    const { events, ...missingEvents } = draft()
    assert.equal(events, true)
    assert.equal(prepareFollowUp(missingEvents).status, "invalid")
    assert.equal(prepareFollowUp({ ...draft(), rebook: "yes" }).status, "invalid")
  })
})

describe("follow-up page metadata", () => {
  it("stays noindex and canonicalizes this path", () => {
    const metadata = followUpPageMetadata()
    assert.equal(metadata.title, "Leave a note")
    assert.equal(
      metadata.description,
      "Leave a rating and a short note after a Pinkys Up cart or community event.",
    )
    assert.deepEqual(metadata.robots, { index: false, follow: false })
    assert.equal(metadata.alternates.canonical, `${SITE_URL}${FOLLOW_UP_PATH}`)
    assert.equal(metadata.alternates.canonical.endsWith("/follow-up"), true)
    assert.equal(metadata.openGraph.title, "Leave a note | PINKYS UP")
    assert.equal(metadata.openGraph.url, metadata.alternates.canonical)
  })

  it("leaves the path off the header, directory, sitemap, and robots disallow list", () => {
    const headerPaths: readonly string[] = headerTabs.map((tab) => tab.path)
    const directoryPaths: readonly string[] = directoryLinks.map((item) => item.path)
    const sitemapPaths = sitemapEntries().map((entry) => new URL(entry.url).pathname)
    assert.equal(headerPaths.includes(FOLLOW_UP_PATH), false)
    assert.equal(directoryPaths.includes(FOLLOW_UP_PATH), false)
    assert.equal(sitemapPaths.includes(FOLLOW_UP_PATH), false)

    const paths = disallowedPaths(robots().rules)
    assert.equal(paths.includes("/follow-up"), false)
    assert.equal(paths.includes("/admin"), true)
  })
})
