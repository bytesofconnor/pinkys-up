'use client'

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { submitQuoteForm } from '@/app/actions'
import { gatheringFieldErrors, type GatheringFieldErrors, type GatheringInput, type GatheringWhen } from '@/lib/inquiry'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { SubmitButton } from '@/components/submit-button'

type GatheringDraft = {
  name: string
  email: string
  phone: string
  flexible: boolean
  date: string
  area: string
  guestCount: string
  gatheringType: string
  notes: string
  website: string
}

const emptyDraft: GatheringDraft = {
  name: '',
  email: '',
  phone: '',
  flexible: false,
  date: '',
  area: '',
  guestCount: '',
  gatheringType: '',
  notes: '',
  website: '',
}

const fieldOrder = [
  "name",
  "email",
  "phone",
  "date",
  "area",
  "guestCount",
  "gatheringType",
  "notes",
] as const

function toGatheringInput(draft: GatheringDraft): GatheringInput {
  const when: GatheringWhen = draft.flexible
    ? { flexible: true }
    : { flexible: false, date: draft.date }
  return {
    kind: "gathering",
    name: draft.name,
    email: draft.email,
    phone: draft.phone.trim(),
    when,
    area: draft.area,
    guestCount: draft.guestCount.trim(),
    gatheringType: draft.gatheringType,
    notes: draft.notes,
    website: draft.website,
  }
}

export function GatheringForm() {
  const [formState, setFormState] = useState<{ status: 'idle' | 'pending' | 'error' }>({ status: 'idle' });
  const [submitted, setSubmitted] = useState(false);
  const [draft, setDraft] = useState<GatheringDraft>(emptyDraft);
  const [errors, setErrors] = useState<GatheringFieldErrors>({});
  const bannerRef = useRef<HTMLDivElement>(null);

  function focusFirstInvalid(fieldErrors: GatheringFieldErrors) {
    const field = fieldOrder.find((key) => fieldErrors[key])
    if (field) {
      document.getElementById(field)?.focus()
      return
    }
    if (fieldErrors.submit) bannerRef.current?.focus()
  }

  // The banner mounts with the error, so focus waits for that paint.
  useEffect(() => {
    if (!errors.submit) return
    if (fieldOrder.some((key) => errors[key])) return
    bannerRef.current?.focus()
  }, [errors])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const input = toGatheringInput(draft)
    const fieldErrors = gatheringFieldErrors(input)
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      focusFirstInvalid(fieldErrors)
      return
    }

    setFormState({ status: 'pending' });
    setErrors({});

    try {
      const result = await submitQuoteForm({ error: null, success: false }, input)

      if (result.success) {
        setDraft(emptyDraft);
        setErrors({});
        setSubmitted(true);
        setFormState({ status: 'idle' });
      } else if (result.error) {
        setFormState({ status: 'idle' });
        setErrors({ submit: result.error });
      }
    } catch (error) {
      setFormState({ status: 'idle' });
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.';
      setErrors({ submit: errorMessage });
    }
  };

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-5 sm:space-y-8 bg-white p-4 sm:p-8 rounded-lg shadow-lg border border-gray-100"
      >
        {errors.submit && (
          <div
            ref={bannerRef}
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
        <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={draft.website}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDraft({ ...draft, website: event.target.value })}
          />
        </div>
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
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
        <div className="mt-5 sm:mt-8">
          <Label htmlFor="name" className="mb-1.5 block">Name</Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            value={draft.name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDraft({ ...draft, name: event.target.value })}
            maxLength={80}
            className="h-11 sm:h-10"
            required
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && <p id="name-error" className="text-red-500 text-sm mt-1">{errors.name}</p>}
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
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDraft({ ...draft, email: event.target.value })}
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
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDraft({ ...draft, phone: event.target.value })}
              maxLength={30}
              className="h-11 sm:h-10"
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
            {errors.phone && <p id="phone-error" className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
        </div>

        <fieldset className="min-w-0 border-0 p-0">
          <legend id="date-legend" className="mb-1.5 block text-sm font-medium leading-none">Date</legend>
          <Input
            id="date"
            name="date"
            type="date"
            value={draft.date}
            aria-labelledby="date-legend"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDraft({ ...draft, date: event.target.value })}
            className="h-11 sm:h-10"
            required={!draft.flexible}
            disabled={draft.flexible}
            aria-invalid={errors.date ? true : undefined}
            aria-describedby={errors.date ? "date-error" : undefined}
          />
          {errors.date && <p id="date-error" className="text-red-500 text-sm mt-1">{errors.date}</p>}
          <div className="mt-3 flex min-h-[44px] items-center space-x-2">
            <input
              id="date-flexible"
              name="date-flexible"
              type="checkbox"
              checked={draft.flexible}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const flexible = event.target.checked
                setDraft({ ...draft, flexible })
                if (flexible) {
                  setErrors((current) => {
                    if (!current.date) return current
                    const next = { ...current }
                    delete next.date
                    return next
                  })
                }
              }}
              aria-describedby={draft.flexible ? "date-flexible-hint" : undefined}
              className="h-5 w-5 shrink-0 accent-[#9d174d]"
            />
            <Label htmlFor="date-flexible" className="flex min-h-[44px] cursor-pointer items-center text-sm text-gray-600 sm:text-base">
              My date is flexible
            </Label>
          </div>
          {draft.flexible ? (
            <p id="date-flexible-hint" className="text-sm text-gray-500">
              We&apos;ll pick a date with you.
            </p>
          ) : null}
        </fieldset>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <Label htmlFor="area" className="mb-1.5 block">City or area</Label>
            <Input
              id="area"
              name="area"
              autoComplete="address-level2"
              value={draft.area}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDraft({ ...draft, area: event.target.value })}
              maxLength={200}
              placeholder="Washington, DC or Minneapolis"
              className="h-11 sm:h-10"
              required
              aria-invalid={errors.area ? true : undefined}
              aria-describedby={errors.area ? "area-error" : undefined}
            />
            {errors.area && <p id="area-error" className="text-red-500 text-sm mt-1">{errors.area}</p>}
          </div>

          <div>
            <Label htmlFor="guestCount" className="mb-1.5 block">Approximate guest count</Label>
            <Input
              id="guestCount"
              name="guestCount"
              type="number"
              inputMode="numeric"
              value={draft.guestCount}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDraft({ ...draft, guestCount: event.target.value })}
              min={1}
              max={99999}
              className="h-11 sm:h-10"
              required
              aria-invalid={errors.guestCount ? true : undefined}
              aria-describedby={errors.guestCount ? "guestCount-hint guestCount-error" : "guestCount-hint"}
            />
            <p id="guestCount-hint" className="text-sm text-gray-500 mt-1">A rough number is fine.</p>
            {errors.guestCount && <p id="guestCount-error" className="text-red-500 text-sm mt-1">{errors.guestCount}</p>}
          </div>
        </div>

        <div>
          <Label htmlFor="gatheringType" className="mb-1.5 block">Type of gathering</Label>
          <Input
            id="gatheringType"
            name="gatheringType"
            value={draft.gatheringType}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDraft({ ...draft, gatheringType: event.target.value })}
            maxLength={120}
            placeholder="House party, shower, office event"
            className="h-11 sm:h-10"
            required
            aria-invalid={errors.gatheringType ? true : undefined}
            aria-describedby={errors.gatheringType ? "gatheringType-error" : undefined}
          />
          {errors.gatheringType && <p id="gatheringType-error" className="text-red-500 text-sm mt-1">{errors.gatheringType}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes" className="mb-1.5 block">Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            value={draft.notes}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setDraft({ ...draft, notes: event.target.value })}
            maxLength={2000}
            className="min-h-[100px] sm:min-h-[120px]"
            aria-invalid={errors.notes ? true : undefined}
            aria-describedby={errors.notes ? "notes-error" : undefined}
          />
          {errors.notes && <p id="notes-error" className="text-red-500 text-sm mt-1">{errors.notes}</p>}
        </div>

        <div className="sm:static sm:p-0 -mx-4 -mb-4 sm:mx-0 sm:mb-0 sticky bottom-0 bg-white p-4 border-t sm:border-t-0 border-gray-200 safe-bottom">
          <SubmitButton pending={formState.status === 'pending'} />
        </div>
        </>
        )}
      </form>
    </div>
  )
}
