import { z } from "zod"
import { directoryLinks, headerTabs, sitemapEntries } from "@/lib/destinations"
import {
  formatStoredEventDate,
  storedGuestCountDisplay,
  storedPhoneDisplay,
} from "@/lib/inquiry"
import { SITE_URL } from "@/lib/site"

export const FOLLOW_UP_PATH = "/follow-up" as const

export const FOLLOW_UP_DESCRIPTION =
  "Leave a rating and a short note after a Pinkys Up cart or community event."

export const followUpFieldOrder = [
  "hostName",
  "email",
  "rating",
  "testimonial",
] as const

export type FollowUpField = (typeof followUpFieldOrder)[number]

export type FollowUpFieldErrors = Partial<Record<FollowUpField | "submit", string>>

export type RatingChoice = "" | "1" | "2" | "3" | "4" | "5"

type Rating = 1 | 2 | 3 | 4 | 5

type YesNo = "yes" | "no"

export type FollowUpDraft = {
  hostName: string
  email: string
  rating: RatingChoice
  testimonial: string
  publish: boolean
  rebook: boolean
  events: boolean
  website: string
}

export const emptyFollowUpDraft: FollowUpDraft = {
  hostName: "",
  email: "",
  rating: "",
  testimonial: "",
  publish: false,
  rebook: false,
  events: false,
  website: "",
}

declare const followUpBrand: unique symbol

type AcceptedFollowUp = {
  readonly [followUpBrand]: true
  readonly hostName: string
  readonly email: string
  readonly rating: Rating
  readonly testimonial: string
  readonly publish: boolean
  readonly rebook: boolean
  readonly events: boolean
}

export type FollowUpFactLines = readonly [
  `Rating: ${Rating} of 5`,
  `Publish testimonial: ${YesNo}`,
  `Rebook or new quote: ${YesNo}`,
  `Future events: ${YesNo}`,
]

export type FollowUpLetter = {
  readonly hostName: string
  readonly email: string
  readonly lines: FollowUpFactLines
  readonly testimonial: string
}

export type FollowUpArchive = {
  readonly firstName: string
  readonly lastName: string
  readonly email: string
  readonly phone: ""
  readonly services: []
  readonly eventType: "Follow-up"
  readonly eventDate: "flexible"
  readonly location: ""
  readonly guestCount: "0"
  readonly referralSource: ""
  readonly additionalDetails: string
}

export type ReadyFollowUp = {
  readonly status: "ready"
  readonly replyTo: string
  readonly subject: string
  readonly letter: FollowUpLetter
  readonly archive: FollowUpArchive
}

export type PrepareFollowUpResult =
  | { readonly status: "invalid" }
  | { readonly status: "honeypot" }
  | ReadyFollowUp

export type FollowUpAck = {
  error?: string | null
  success?: boolean
}

export const followUpRatingChoices = ["1", "2", "3", "4", "5"] as const

const ratingByChoice = {
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
} as const satisfies Record<(typeof followUpRatingChoices)[number], Rating>

const followUpDraftSchema = z.object({
  hostName: z.string().trim().min(1, "Name is required").max(80),
  email: z.string().trim().min(1, "Email is required").email("Please enter a valid email").max(254),
  rating: z.enum(followUpRatingChoices, "Choose a rating from 1 to 5."),
  testimonial: z.string().trim().min(1, "A short note is required.").max(500, "Keep the note to 500 characters."),
  publish: z.boolean(),
  rebook: z.boolean(),
  events: z.boolean(),
  website: z.string().optional(),
}).strict()

const FOLLOW_UP_FIELDS = followUpFieldOrder

function followUpErrorKey(path: PropertyKey[]): FollowUpField | "submit" {
  const head = path[0]
  if (typeof head === "string" && (FOLLOW_UP_FIELDS as readonly string[]).includes(head)) {
    return head as FollowUpField
  }
  return "submit"
}

export function followUpFieldErrors(input: FollowUpDraft): FollowUpFieldErrors {
  const parsed = followUpDraftSchema.safeParse(input)
  if (parsed.success) return {}
  const errors: FollowUpFieldErrors = {}
  for (const issue of parsed.error.issues) {
    const key = followUpErrorKey(issue.path)
    if (errors[key]) continue
    errors[key] = key === "submit"
      ? "Please fill out all required fields correctly."
      : issue.message
  }
  return errors
}

function stamp(note: Omit<AcceptedFollowUp, typeof followUpBrand>): AcceptedFollowUp {
  return note as AcceptedFollowUp
}

function splitName(name: string): { firstName: string; lastName: string } {
  const words = name.trim().split(/\s+/)
  return {
    firstName: words[0] ?? "",
    lastName: words.slice(1).join(" "),
  }
}

function yesNo(flag: boolean): YesNo {
  return flag ? "yes" : "no"
}

function followUpFacts(note: AcceptedFollowUp): FollowUpFactLines {
  return [
    `Rating: ${note.rating} of 5`,
    `Publish testimonial: ${yesNo(note.publish)}`,
    `Rebook or new quote: ${yesNo(note.rebook)}`,
    `Future events: ${yesNo(note.events)}`,
  ]
}

function archiveFollowUp(note: AcceptedFollowUp, lines: FollowUpFactLines): FollowUpArchive {
  const { firstName, lastName } = splitName(note.hostName)
  return {
    firstName,
    lastName,
    email: note.email,
    phone: "",
    services: [],
    eventType: "Follow-up",
    eventDate: "flexible",
    location: "",
    guestCount: "0",
    referralSource: "",
    additionalDetails: `${lines.join("\n")}\n\n${note.testimonial}`,
  }
}

export function prepareFollowUp(raw: unknown): PrepareFollowUpResult {
  const parsed = followUpDraftSchema.safeParse(raw)
  if (!parsed.success) return { status: "invalid" }
  if (parsed.data.website?.trim()) return { status: "honeypot" }

  const note = stamp({
    hostName: parsed.data.hostName,
    email: parsed.data.email,
    rating: ratingByChoice[parsed.data.rating],
    testimonial: parsed.data.testimonial,
    publish: parsed.data.publish,
    rebook: parsed.data.rebook,
    events: parsed.data.events,
  })
  const lines = followUpFacts(note)

  return {
    status: "ready",
    replyTo: note.email,
    subject: `Note from ${note.hostName} - ${note.rating} of 5`,
    letter: {
      hostName: note.hostName,
      email: note.email,
      lines,
      testimonial: note.testimonial,
    },
    archive: archiveFollowUp(note, lines),
  }
}

export function followUpPageMetadata() {
  const canonical = `${SITE_URL}${FOLLOW_UP_PATH}`
  return {
    title: "Leave a note",
    description: FOLLOW_UP_DESCRIPTION,
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical,
    },
    openGraph: {
      title: "Leave a note | PINKYS UP",
      description: FOLLOW_UP_DESCRIPTION,
      url: canonical,
      type: "website" as const,
    },
  }
}

function assertFollowUpLoads(): void {
  if (formatStoredEventDate("flexible") !== "Flexible") {
    throw new Error('formatStoredEventDate("flexible") must stay Flexible')
  }
  if (storedGuestCountDisplay(0) !== "Not a guest count") {
    throw new Error("storedGuestCountDisplay(0) must stay Not a guest count")
  }
  if (storedPhoneDisplay("").kind !== "absent") {
    throw new Error('storedPhoneDisplay("") must stay absent')
  }

  const listed: string[] = [
    ...headerTabs.map((tab) => tab.path),
    ...directoryLinks.map((item) => item.path),
    ...sitemapEntries().map((entry) => new URL(entry.url).pathname),
  ]
  if (listed.includes(FOLLOW_UP_PATH)) {
    throw new Error(`${FOLLOW_UP_PATH} must stay off the header, directory, and sitemap`)
  }
}

assertFollowUpLoads()
