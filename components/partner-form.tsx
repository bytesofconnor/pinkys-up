'use client'

import { motion, useReducedMotion } from "framer-motion"
import { useCallback, useState } from "react"
import { submitQuoteForm } from "@/app/actions"
import { partnerFieldErrors, type PartnerFieldErrors, type PartnerInput } from "@/lib/inquiry"
import { venueKinds } from "@/lib/partners"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { SubmitButton } from "@/components/submit-button"

type PartnerDraft = {
  contactName: string
  email: string
  phone: string
  venueName: string
  venueKind: string
  area: string
  note: string
  website: string
}

type PartnerFormPhase =
  | { status: "editing"; draft: PartnerDraft; errors: PartnerFieldErrors }
  | { status: "pending"; draft: PartnerDraft }
  | { status: "thank-you" }

const emptyDraft: PartnerDraft = {
  contactName: "",
  email: "",
  phone: "",
  venueName: "",
  venueKind: "",
  area: "",
  note: "",
  website: "",
}

const emptyErrors: PartnerFieldErrors = {}

const fieldOrder = [
  "contactName",
  "email",
  "phone",
  "venueName",
  "venueKind",
  "area",
  "note",
] as const

function toPartnerInput(draft: PartnerDraft): PartnerInput {
  return {
    kind: "partner",
    contactName: draft.contactName,
    email: draft.email,
    phone: draft.phone.trim(),
    venueName: draft.venueName,
    venueKind: draft.venueKind,
    area: draft.area,
    note: draft.note,
    website: draft.website,
  }
}

export function PartnerForm() {
  const reduceMotion = useReducedMotion()
  const [phase, setPhase] = useState<PartnerFormPhase>({
    status: "editing",
    draft: emptyDraft,
    errors: emptyErrors,
  })
  const errors = phase.status === "editing" ? phase.errors : emptyErrors

  const focusBanner = useCallback((node: HTMLDivElement | null) => {
    if (!node) return
    if (fieldOrder.some((key) => errors[key])) return
    node.focus()
  }, [errors])

  function focusFirstInvalid(fieldErrors: PartnerFieldErrors) {
    const field = fieldOrder.find((key) => fieldErrors[key])
    if (field) document.getElementById(field)?.focus()
  }

  function changeDraft(patch: Partial<PartnerDraft>) {
    setPhase((current) => {
      if (current.status === "thank-you") return current
      return { ...current, draft: { ...current.draft, ...patch } }
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (phase.status !== "editing") return

    const draft = phase.draft
    const input = toPartnerInput(draft)
    const fieldErrors = partnerFieldErrors(input)
    if (Object.keys(fieldErrors).length > 0) {
      setPhase({ status: "editing", draft, errors: fieldErrors })
      focusFirstInvalid(fieldErrors)
      return
    }

    setPhase({ status: "pending", draft })

    try {
      const result = await submitQuoteForm({ error: null, success: false }, input)
      if (result.success) {
        setPhase({ status: "thank-you" })
        return
      }
      const message = result.error
      setPhase((current) => {
        if (current.status === "thank-you") return current
        return {
          status: "editing",
          draft: current.draft,
          errors: message ? { submit: message } : emptyErrors,
        }
      })
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : "An unexpected error occurred. Please try again."
      setPhase((current) => {
        if (current.status === "thank-you") return current
        return { status: "editing", draft: current.draft, errors: { submit: message } }
      })
    }
  }

  const draft = phase.status === "thank-you" ? emptyDraft : phase.draft

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-5 sm:space-y-8 bg-white p-4 sm:p-8 rounded-lg shadow-lg border border-gray-100"
      >
        {errors.submit && (
          <div
            ref={focusBanner}
            role="alert"
            tabIndex={-1}
            className="p-4 bg-red-50 border border-red-300 rounded-lg focus:outline-solid focus:outline-2 focus:outline-offset-2 focus:outline-[#9d174d]"
          >
            <div className="flex items-start">
              <svg className="w-5 h-5 text-red-500 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-red-800 mb-1">Unable to submit your request</h3>
                <p className="text-sm text-red-700">{errors.submit}</p>
              </div>
            </div>
          </div>
        )}
        {phase.status === "thank-you" ? (
          <motion.div
            initial={{ opacity: reduceMotion ? 1 : 0, scale: reduceMotion ? 1 : 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
            className="py-10 px-6 text-center"
          >
            <svg
              className="w-16 h-16 mx-auto mb-4 text-pink-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mb-2 font-display text-2xl text-[#be185d]">
              Thank you — we got it.
            </h3>
            <p className="text-gray-600 text-lg">
              We&apos;ll get back to you within 24–48 hours.
            </p>
            <p className="mt-4 text-sm text-gray-500">
              Keep an eye on your email for our response.
            </p>
          </motion.div>
        ) : (
        <>
        <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={draft.website}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => changeDraft({ website: event.target.value })}
          />
        </div>
        <div className="mt-5 sm:mt-8">
          <Label htmlFor="contactName" className="mb-1.5 block">Your name</Label>
          <Input
            id="contactName"
            name="contactName"
            autoComplete="name"
            value={draft.contactName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => changeDraft({ contactName: event.target.value })}
            maxLength={80}
            className="h-11 sm:h-10"
            required
            aria-invalid={errors.contactName ? true : undefined}
            aria-describedby={errors.contactName ? "contactName-error" : undefined}
          />
          {errors.contactName && <p id="contactName-error" className="text-red-500 text-sm mt-1">{errors.contactName}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <Label htmlFor="email" className="mb-1.5 block">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={draft.email}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => changeDraft({ email: event.target.value })}
              maxLength={254}
              className="h-11 sm:h-10"
              required
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && <p id="email-error" className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <Label htmlFor="phone" className="mb-1.5 block">
              Phone <span className="font-normal text-gray-500">optional</span>
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={draft.phone}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => changeDraft({ phone: event.target.value })}
              maxLength={30}
              className="h-11 sm:h-10"
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
            {errors.phone && <p id="phone-error" className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
        </div>

        <div>
          <Label htmlFor="venueName" className="mb-1.5 block">Venue name</Label>
          <Input
            id="venueName"
            name="venueName"
            autoComplete="organization"
            value={draft.venueName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => changeDraft({ venueName: event.target.value })}
            maxLength={120}
            className="h-11 sm:h-10"
            required
            aria-invalid={errors.venueName ? true : undefined}
            aria-describedby={errors.venueName ? "venueName-error" : undefined}
          />
          {errors.venueName && <p id="venueName-error" className="text-red-500 text-sm mt-1">{errors.venueName}</p>}
        </div>

        <div>
          <Label htmlFor="venueKind" className="mb-1.5 block">Kind of venue</Label>
          <select
            id="venueKind"
            name="venueKind"
            value={draft.venueKind}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => changeDraft({ venueKind: event.target.value })}
            required
            aria-invalid={errors.venueKind ? true : undefined}
            aria-describedby={errors.venueKind ? "venueKind-error" : undefined}
            className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:h-10"
          >
            <option value="">Choose a venue</option>
            {venueKinds.map((kind) => (
              <option key={kind.id} value={kind.id}>
                {kind.label}
              </option>
            ))}
          </select>
          {errors.venueKind && <p id="venueKind-error" className="text-red-500 text-sm mt-1">{errors.venueKind}</p>}
        </div>

        <div>
          <Label htmlFor="area" className="mb-1.5 block">City or area</Label>
          <Input
            id="area"
            name="area"
            autoComplete="address-level2"
            value={draft.area}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => changeDraft({ area: event.target.value })}
            maxLength={200}
            placeholder="Washington, DC or Minneapolis"
            className="h-11 sm:h-10"
            required
            aria-invalid={errors.area ? true : undefined}
            aria-describedby={errors.area ? "area-error" : undefined}
          />
          {errors.area && <p id="area-error" className="text-red-500 text-sm mt-1">{errors.area}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="note" className="mb-1.5 block">Note</Label>
          <Textarea
            id="note"
            name="note"
            value={draft.note}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => changeDraft({ note: event.target.value })}
            maxLength={2000}
            placeholder="The room, the neighborhood, what you want to do together."
            className="min-h-[100px] sm:min-h-[120px]"
            aria-invalid={errors.note ? true : undefined}
            aria-describedby={errors.note ? "note-error" : undefined}
          />
          {errors.note && <p id="note-error" className="text-red-500 text-sm mt-1">{errors.note}</p>}
        </div>

        <div className="sm:static sm:p-0 -mx-4 -mb-4 sm:mx-0 sm:mb-0 sticky bottom-0 bg-white p-4 border-t sm:border-t-0 border-gray-200 safe-bottom">
          <SubmitButton pending={phase.status === "pending"} />
        </div>
        </>
        )}
      </form>
    </div>
  )
}
