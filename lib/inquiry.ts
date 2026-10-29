import { z } from "zod"
import { ALLOWED_SERVICES, serviceLabel, type AllowedService } from "@/lib/quote"
import { venueKindLabel, venueKinds, type VenueKind } from "@/lib/partners"

export type QuoteInput = {
  kind: "quote"
  firstName: string
  lastName: string
  phone: string
  email: string
  services: AllowedService[]
  eventType: string
  eventDate: string
  location: string
  guestCount: string
  referralSource?: string
  additionalDetails?: string
  website?: string
}

export type GatheringWhen =
  | { flexible: false; date: string }
  | { flexible: true }

export type GatheringInput = {
  kind: "gathering"
  name: string
  email: string
  phone: string
  when: GatheringWhen
  area: string
  guestCount: string
  gatheringType: string
  notes: string
  website?: string
}

export type PartnerInput = {
  kind: "partner"
  contactName: string
  email: string
  phone: string
  venueName: string
  venueKind: string
  area: string
  note: string
  website?: string
}

export type InquiryInput = QuoteInput | GatheringInput | PartnerInput

export type QuoteInquiry = {
  kind: "quote"
  firstName: string
  lastName: string
  email: string
  phone: string
  services: AllowedService[]
  eventType: string
  eventDate: string
  location: string
  guestCount: string
  referralSource: string
  additionalDetails?: string
  website?: string
}

export type GatheringInquiry = {
  kind: "gathering"
  firstName: string
  lastName: string
  email: string
  phone: string | null
  when: GatheringWhen
  area: string
  guestCount: string
  gatheringType: string
  notes: string
  website?: string
}

export type PartnerInquiry = {
  kind: "partner"
  firstName: string
  lastName: string
  email: string
  phone: string | null
  venueName: string
  venueKind: VenueKind
  area: string
  note: string
  website?: string
}

declare const acceptedBrand: unique symbol

export type AcceptedInquiry = (QuoteInquiry | GatheringInquiry | PartnerInquiry) & {
  readonly [acceptedBrand]: true
}

export type GatheringField =
  | "name"
  | "email"
  | "phone"
  | "date"
  | "area"
  | "guestCount"
  | "gatheringType"
  | "notes"

export type GatheringFieldErrors = Partial<
  Record<GatheringField | "submit", string>
>

export type PartnerField =
  | "contactName"
  | "email"
  | "phone"
  | "venueName"
  | "venueKind"
  | "area"
  | "note"

export type PartnerFieldErrors = Partial<Record<PartnerField | "submit", string>>

export type StoredQuoteInput = {
  firstName: string
  lastName: string
  email: string
  phone: string
  services: AllowedService[]
  eventType: string
  eventDate: string
  location: string
  guestCount: string
  referralSource: string
  additionalDetails?: string
}

export type NotificationCopy = {
  subject: string
  heading: string
  showReferral: boolean
  confirmationSubject: string
  email: {
    firstName: string
    lastName: string
    email: string
    phone: string
    eventDate: string
    eventType: string
    guestCount: string
    location: string
    services: AllowedService[]
    referralSource: string
    additionalDetails?: string
  }
  confirmation: {
    firstName: string
    lastName: string
    eventDate: string
    eventType: string
    services: AllowedService[]
  }
}

export type InquiryFields = {
  record: StoredQuoteInput
  notification: NotificationCopy
}

export type InquiryFormState = {
  error?: string | null
  success?: boolean
}

export type ParseResult =
  | { ok: true; inquiry: AcceptedInquiry }
  | { ok: false }

export type StoredPhoneDisplay =
  | { kind: "link"; href: string; text: string }
  | { kind: "absent"; text: "Not given" }

const FLEXIBLE_EVENT_DATE = "flexible"
const FLEXIBLE_DATE_LABEL = "Flexible"
const ABSENT_PHONE_LABEL = "Not given"
const NO_GUEST_COUNT = "Not a guest count"

const quoteInputSchema = z.object({
  kind: z.literal("quote"),
  firstName: z.string().trim().min(1, "First name is required").max(80),
  lastName: z.string().trim().min(1, "Last name is required").max(80),
  phone: z.string().trim().min(7, "Phone number is required").max(30),
  email: z.string().trim().email("Invalid email address").max(254),
  services: z
    .array(z.enum(ALLOWED_SERVICES))
    .min(1, "Please select at least one service")
    .max(ALLOWED_SERVICES.length)
    .refine(
      (services) => services.includes("mocktails") || services.includes("events"),
      "Choose mocktail cart, community events, or both"
    ),
  eventType: z.string().trim().min(1, "Event type is required").max(120),
  eventDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid event date"),
  location: z.string().trim().min(1, "Location is required").max(200),
  guestCount: z.string().regex(/^[1-9]\d{0,4}$/, "Guest count must be between 1 and 99999"),
  referralSource: z.string().trim().max(200).optional().default(""),
  additionalDetails: z.string().trim().max(2000).optional(),
  website: z.string().optional(),
})

const datedWhenSchema = z.object({
  flexible: z.literal(false),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date is required"),
}).strict()

const flexibleWhenSchema = z.object({
  flexible: z.literal(true),
}).strict()

const gatheringInputSchema = z.object({
  kind: z.literal("gathering"),
  name: z.string().trim().min(1, "Name is required").max(80),
  email: z.string().trim().min(1, "Email is required").email("Please enter a valid email").max(254),
  phone: z.string().trim().max(30).refine(
    (value) => value.length === 0 || value.length >= 7,
    "Enter a phone number, or leave it blank"
  ),
  when: z.discriminatedUnion("flexible", [datedWhenSchema, flexibleWhenSchema]),
  area: z.string().trim().min(1, "City or area is required").max(200),
  guestCount: z.string().trim().regex(/^[1-9]\d{0,4}$/, "Enter a guest count from 1 to 99999"),
  gatheringType: z.string().trim().min(1, "Type of gathering is required").max(120),
  notes: z.string().trim().max(2000),
  website: z.string().optional(),
}).strict()

function isVenueKind(value: string): value is VenueKind {
  return venueKinds.some((kind) => kind.id === value)
}

const partnerInputSchema = z.object({
  kind: z.literal("partner"),
  contactName: z.string().trim().min(1, "Name is required").max(80),
  email: z.string().trim().min(1, "Email is required").email("Please enter a valid email").max(254),
  phone: z.string().trim().max(30).refine(
    (value) => value.length === 0 || value.length >= 7,
    "Enter a phone number, or leave it blank",
  ),
  venueName: z.string().trim().min(1, "Venue name is required").max(120),
  venueKind: z.string().refine(isVenueKind, "Choose the kind of venue"),
  area: z.string().trim().min(1, "City or area is required").max(200),
  note: z.string().trim().max(2000),
  website: z.string().optional(),
}).strict()

const GATHERING_FIELDS = [
  "name",
  "email",
  "phone",
  "area",
  "guestCount",
  "gatheringType",
  "notes",
] as const satisfies readonly GatheringField[]

const PARTNER_FIELDS = [
  "contactName",
  "email",
  "phone",
  "venueName",
  "venueKind",
  "area",
  "note",
] as const satisfies readonly PartnerField[]

function stamp(inquiry: QuoteInquiry | GatheringInquiry | PartnerInquiry): AcceptedInquiry {
  return inquiry as AcceptedInquiry
}

function splitName(name: string): { firstName: string; lastName: string } {
  const words = name.trim().split(/\s+/)
  return {
    firstName: words[0] ?? "",
    lastName: words.slice(1).join(" "),
  }
}

function normalizeGathering(input: z.output<typeof gatheringInputSchema>): GatheringInquiry {
  const { firstName, lastName } = splitName(input.name)
  return {
    kind: "gathering",
    firstName,
    lastName,
    email: input.email,
    phone: input.phone.length === 0 ? null : input.phone,
    when: input.when,
    area: input.area,
    guestCount: input.guestCount,
    gatheringType: input.gatheringType,
    notes: input.notes,
    website: input.website,
  }
}

function normalizePartner(input: z.output<typeof partnerInputSchema>): PartnerInquiry {
  const { firstName, lastName } = splitName(input.contactName)
  return {
    kind: "partner",
    firstName,
    lastName,
    email: input.email,
    phone: input.phone.length === 0 ? null : input.phone,
    venueName: input.venueName,
    venueKind: input.venueKind,
    area: input.area,
    note: input.note,
    website: input.website,
  }
}

function personLabel(firstName: string, lastName: string): string {
  if (!lastName) return firstName
  return `${firstName} ${lastName}`
}

function gatheringErrorKey(path: PropertyKey[]): GatheringField | "submit" {
  const head = path[0]
  if (head === "when" || head === "date") return "date"
  if (typeof head === "string" && GATHERING_FIELDS.includes(head as (typeof GATHERING_FIELDS)[number])) {
    return head as GatheringField
  }
  return "submit"
}

export function parseInquiry(raw: unknown): ParseResult {
  if (typeof raw !== "object" || raw === null || !("kind" in raw)) return { ok: false }
  if (raw.kind === "quote") {
    const parsed = quoteInputSchema.safeParse(raw)
    if (!parsed.success) return { ok: false }
    return { ok: true, inquiry: stamp(parsed.data) }
  }
  if (raw.kind === "gathering") {
    const parsed = gatheringInputSchema.safeParse(raw)
    if (!parsed.success) return { ok: false }
    return { ok: true, inquiry: stamp(normalizeGathering(parsed.data)) }
  }
  if (raw.kind === "partner") {
    const parsed = partnerInputSchema.safeParse(raw)
    if (!parsed.success) return { ok: false }
    return { ok: true, inquiry: stamp(normalizePartner(parsed.data)) }
  }
  return { ok: false }
}

export function gatheringFieldErrors(input: GatheringInput): GatheringFieldErrors {
  const parsed = gatheringInputSchema.safeParse(input)
  if (parsed.success) return {}
  const errors: GatheringFieldErrors = {}
  for (const issue of parsed.error.issues) {
    const key = gatheringErrorKey(issue.path)
    if (errors[key]) continue
    errors[key] = key === "submit"
      ? "Please fill out all required fields correctly."
      : issue.message
  }
  return errors
}

function partnerErrorKey(path: PropertyKey[]): PartnerField | "submit" {
  const head = path[0]
  if (typeof head === "string" && PARTNER_FIELDS.includes(head as (typeof PARTNER_FIELDS)[number])) {
    return head as PartnerField
  }
  return "submit"
}

export function partnerFieldErrors(input: PartnerInput): PartnerFieldErrors {
  const parsed = partnerInputSchema.safeParse(input)
  if (parsed.success) return {}
  const errors: PartnerFieldErrors = {}
  for (const issue of parsed.error.issues) {
    const key = partnerErrorKey(issue.path)
    if (errors[key]) continue
    errors[key] = key === "submit"
      ? "Please fill out all required fields correctly."
      : issue.message
  }
  return errors
}

function quoteFields(inquiry: QuoteInquiry): InquiryFields {
  const record: StoredQuoteInput = {
    firstName: inquiry.firstName,
    lastName: inquiry.lastName,
    email: inquiry.email,
    phone: inquiry.phone,
    services: inquiry.services,
    eventType: inquiry.eventType,
    eventDate: inquiry.eventDate,
    location: inquiry.location,
    guestCount: inquiry.guestCount,
    referralSource: inquiry.referralSource,
  }
  if (inquiry.additionalDetails !== undefined) {
    record.additionalDetails = inquiry.additionalDetails
  }

  return {
    record,
    notification: {
      subject: `New request from ${inquiry.firstName} ${inquiry.lastName} — ${inquiry.services.map(serviceLabel).join(" + ")}`,
      heading: "New Quote Request from PINKYS UP",
      showReferral: true,
      confirmationSubject: "Thank you for your quote request - PINKYS UP",
      email: {
        firstName: inquiry.firstName,
        lastName: inquiry.lastName,
        email: inquiry.email,
        phone: inquiry.phone,
        eventDate: inquiry.eventDate,
        eventType: inquiry.eventType,
        guestCount: inquiry.guestCount,
        location: inquiry.location,
        services: inquiry.services,
        referralSource: inquiry.referralSource,
        additionalDetails: inquiry.additionalDetails,
      },
      confirmation: {
        firstName: inquiry.firstName,
        lastName: inquiry.lastName,
        eventDate: inquiry.eventDate,
        eventType: inquiry.eventType,
        services: inquiry.services,
      },
    },
  }
}

function gatheringFields(inquiry: GatheringInquiry): InquiryFields {
  const eventDate = inquiry.when.flexible ? FLEXIBLE_DATE_LABEL : inquiry.when.date
  const record: StoredQuoteInput = {
    firstName: inquiry.firstName,
    lastName: inquiry.lastName,
    email: inquiry.email,
    phone: inquiry.phone ?? "",
    services: ["mocktails"],
    eventType: inquiry.gatheringType,
    eventDate: inquiry.when.flexible ? FLEXIBLE_EVENT_DATE : inquiry.when.date,
    location: inquiry.area,
    guestCount: inquiry.guestCount,
    referralSource: "",
  }
  if (inquiry.notes) record.additionalDetails = inquiry.notes

  const name = personLabel(inquiry.firstName, inquiry.lastName)
  return {
    record,
    notification: {
      subject: `New gathering from ${name} — ${inquiry.gatheringType}`,
      heading: "New gathering request",
      showReferral: false,
      confirmationSubject: "Thank you for your gathering request - PINKYS UP",
      email: {
        firstName: inquiry.firstName,
        lastName: inquiry.lastName,
        email: inquiry.email,
        phone: inquiry.phone ?? ABSENT_PHONE_LABEL,
        eventDate,
        eventType: inquiry.gatheringType,
        guestCount: inquiry.guestCount,
        location: inquiry.area,
        services: ["mocktails"],
        referralSource: "",
        additionalDetails: inquiry.notes ? inquiry.notes : undefined,
      },
      confirmation: {
        firstName: inquiry.firstName,
        lastName: inquiry.lastName,
        eventDate,
        eventType: inquiry.gatheringType,
        services: ["mocktails"],
      },
    },
  }
}

function partnerFields(inquiry: PartnerInquiry): InquiryFields {
  const services: AllowedService[] = ["mocktails", "events"]
  const eventType = `Venue partnership — ${venueKindLabel(inquiry.venueKind)}`
  const additionalDetails = inquiry.note
    ? `Venue: ${inquiry.venueName}\n${inquiry.note}`
    : `Venue: ${inquiry.venueName}`
  const person = personLabel(inquiry.firstName, inquiry.lastName)
  const record: StoredQuoteInput = {
    firstName: inquiry.firstName,
    lastName: inquiry.lastName,
    email: inquiry.email,
    phone: inquiry.phone ?? "",
    services,
    eventType,
    eventDate: FLEXIBLE_EVENT_DATE,
    location: inquiry.area,
    guestCount: "0",
    referralSource: "",
    additionalDetails,
  }

  return {
    record,
    notification: {
      subject: `New venue partner from ${person} — ${inquiry.venueName}`,
      heading: "New venue partnership request",
      showReferral: false,
      confirmationSubject: "Thank you for your partnership request - PINKYS UP",
      email: {
        firstName: inquiry.firstName,
        lastName: inquiry.lastName,
        email: inquiry.email,
        phone: inquiry.phone ?? ABSENT_PHONE_LABEL,
        eventDate: FLEXIBLE_DATE_LABEL,
        eventType,
        guestCount: storedGuestCountDisplay(0),
        location: inquiry.area,
        services,
        referralSource: "",
        additionalDetails,
      },
      confirmation: {
        firstName: inquiry.firstName,
        lastName: inquiry.lastName,
        eventDate: FLEXIBLE_DATE_LABEL,
        eventType,
        services,
      },
    },
  }
}

export function fieldsForInquiry(inquiry: AcceptedInquiry): InquiryFields {
  switch (inquiry.kind) {
    case "quote":
      return quoteFields(inquiry)
    case "gathering":
      return gatheringFields(inquiry)
    case "partner":
      return partnerFields(inquiry)
    default: {
      const unreachable: never = inquiry
      throw new Error(`Unexpected inquiry: ${JSON.stringify(unreachable)}`)
    }
  }
}

export function storedGuestCountDisplay(count: number): string {
  if (count === 0) return NO_GUEST_COUNT
  return `${count} guests`
}

export function formatStoredEventDate(eventDate: string): string {
  if (eventDate === FLEXIBLE_EVENT_DATE) return FLEXIBLE_DATE_LABEL
  return new Date(eventDate).toLocaleDateString("en-US", { dateStyle: "long" })
}

export function storedPhoneDisplay(phone: string): StoredPhoneDisplay {
  const text = phone.trim()
  if (!text) return { kind: "absent", text: ABSENT_PHONE_LABEL }
  return { kind: "link", href: `tel:${text}`, text }
}
