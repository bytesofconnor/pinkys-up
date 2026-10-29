"use client"

import { motion, useReducedMotion } from "framer-motion"
import Link from "next/link"
import { useCallback, useState } from "react"
import { submitFollowUp } from "@/app/follow-up/actions"
import { link } from "@/lib/destinations"
import {
  emptyFollowUpDraft,
  followUpFieldErrors,
  followUpFieldOrder,
  followUpRatingChoices,
  type FollowUpDraft,
  type FollowUpFieldErrors,
} from "@/lib/follow-up"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { SubmitButton } from "@/components/submit-button"

type FollowUpFormPhase =
  | { status: "editing"; draft: FollowUpDraft; errors: FollowUpFieldErrors }
  | { status: "pending"; draft: FollowUpDraft }
  | { status: "thank-you"; rebook: boolean }

const emptyErrors: FollowUpFieldErrors = {}

export function FollowUpForm() {
  const reduceMotion = useReducedMotion()
  const [phase, setPhase] = useState<FollowUpFormPhase>({
    status: "editing",
    draft: emptyFollowUpDraft,
    errors: emptyErrors,
  })
  const errors = phase.status === "editing" ? phase.errors : emptyErrors

  const focusBanner = useCallback((node: HTMLDivElement | null) => {
    if (!node) return
    if (followUpFieldOrder.some((key) => errors[key])) return
    node.focus()
  }, [errors])

  function focusFirstInvalid(fieldErrors: FollowUpFieldErrors) {
    const field = followUpFieldOrder.find((key) => fieldErrors[key])
    if (field) document.getElementById(field)?.focus()
  }

  function changeDraft(patch: Partial<FollowUpDraft>) {
    setPhase((current) => {
      if (current.status === "thank-you") return current
      return { ...current, draft: { ...current.draft, ...patch } }
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (phase.status !== "editing") return

    const draft = phase.draft
    const fieldErrors = followUpFieldErrors(draft)
    if (Object.keys(fieldErrors).length > 0) {
      setPhase({ status: "editing", draft, errors: fieldErrors })
      focusFirstInvalid(fieldErrors)
      return
    }

    setPhase({ status: "pending", draft })

    try {
      const result = await submitFollowUp(draft)
      if (result.success) {
        setPhase({ status: "thank-you", rebook: draft.rebook })
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

  const draft = phase.status === "thank-you" ? emptyFollowUpDraft : phase.draft

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-5 bg-white p-4 sm:gap-8 sm:p-8 rounded-lg shadow-lg border border-gray-100"
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
            {phase.rebook ? (
              <p className="mt-6">
                <Link
                  href={link("contact").path}
                  className="inline-flex min-h-11 items-center text-sm font-medium text-[#9d174d] underline underline-offset-4"
                >
                  Request another quote
                </Link>
              </p>
            ) : null}
          </motion.div>
        ) : (
        <div className="flex flex-col gap-5 sm:gap-8">
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
        <div>
          <Label htmlFor="hostName" className="mb-1.5 block">Your name</Label>
          <Input
            id="hostName"
            name="hostName"
            autoComplete="name"
            value={draft.hostName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => changeDraft({ hostName: event.target.value })}
            maxLength={80}
            className="h-11 sm:h-10"
            required
            aria-invalid={errors.hostName ? true : undefined}
            aria-describedby={errors.hostName ? "hostName-error" : undefined}
          />
          {errors.hostName && <p id="hostName-error" className="text-red-500 text-sm mt-1">{errors.hostName}</p>}
        </div>

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

        <fieldset
          id="rating"
          tabIndex={-1}
          className="min-w-0 border-0 p-0"
          aria-invalid={errors.rating ? true : undefined}
          aria-describedby={errors.rating ? "rating-hint rating-error" : "rating-hint"}
        >
          <legend className="mb-1.5 block text-sm font-medium leading-none">Rating</legend>
          <div className="flex flex-wrap gap-3">
            {followUpRatingChoices.map((value) => (
              <label key={value} className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm text-gray-700">
                <input
                  type="radio"
                  name="rating"
                  value={value}
                  checked={draft.rating === value}
                  onChange={() => changeDraft({ rating: value })}
                  className="h-5 w-5 accent-[#9d174d]"
                  required
                />
                {value}
              </label>
            ))}
          </div>
          <p id="rating-hint" className="mt-2 text-sm text-gray-500">1 is rough. 5 is wonderful.</p>
          {errors.rating && <p id="rating-error" className="text-red-500 text-sm mt-1">{errors.rating}</p>}
        </fieldset>

        <div className="space-y-2">
          <Label htmlFor="testimonial" className="mb-1.5 block">Note</Label>
          <Textarea
            id="testimonial"
            name="testimonial"
            value={draft.testimonial}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => changeDraft({ testimonial: event.target.value })}
            maxLength={500}
            className="min-h-[100px] sm:min-h-[120px]"
            required
            aria-invalid={errors.testimonial ? true : undefined}
            aria-describedby={errors.testimonial ? "testimonial-error" : undefined}
          />
          {errors.testimonial && <p id="testimonial-error" className="text-red-500 text-sm mt-1">{errors.testimonial}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex min-h-[44px] items-center space-x-2">
            <input
              id="publish"
              name="publish"
              type="checkbox"
              checked={draft.publish}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => changeDraft({ publish: event.target.checked })}
              className="h-5 w-5 shrink-0 accent-[#9d174d]"
            />
            <Label htmlFor="publish" className="flex min-h-[44px] cursor-pointer items-center text-sm text-gray-600 sm:text-base">
              Brenda may publish this note
            </Label>
          </div>
          <div className="flex min-h-[44px] items-center space-x-2">
            <input
              id="rebook"
              name="rebook"
              type="checkbox"
              checked={draft.rebook}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => changeDraft({ rebook: event.target.checked })}
              className="h-5 w-5 shrink-0 accent-[#9d174d]"
            />
            <Label htmlFor="rebook" className="flex min-h-[44px] cursor-pointer items-center text-sm text-gray-600 sm:text-base">
              I want to rebook or get a new quote
            </Label>
          </div>
          <div className="flex min-h-[44px] items-center space-x-2">
            <input
              id="events"
              name="events"
              type="checkbox"
              checked={draft.events}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => changeDraft({ events: event.target.checked })}
              className="h-5 w-5 shrink-0 accent-[#9d174d]"
            />
            <Label htmlFor="events" className="flex min-h-[44px] cursor-pointer items-center text-sm text-gray-600 sm:text-base">
              Tell me about future events
            </Label>
          </div>
        </div>

        <div className="sm:static sm:p-0 -mx-4 -mb-4 sm:mx-0 sm:mb-0 sticky bottom-0 bg-white p-4 border-t sm:border-t-0 border-gray-200 safe-bottom">
          <SubmitButton pending={phase.status === "pending"} />
        </div>
        </div>
        )}
      </form>
    </div>
  )
}
