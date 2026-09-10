'use client'

import { motion } from "framer-motion"
import { useState } from "react"
import { submitQuoteForm } from '@/app/actions'
import { SERVICE_CHECKBOXES, SERVICE_OPTIONS, type AllowedService } from '@/lib/quote'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { SubmitButton } from '@/components/submit-button'
import { cn } from '@/lib/utils'

export function QuoteForm({
  initialServices = [],
}: {
  initialServices?: AllowedService[]
}) {
  const [formState, setFormState] = useState<{ status: 'idle' | 'pending' | 'error' }>({ status: 'idle' });
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    eventDate: '',
    eventType: '',
    guestCount: '',
    location: '',
    referralSource: '',
    additionalDetails: '',
    website: '',
    services: initialServices
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const wantsMocktails = formData.services.includes("mocktails")
  const wantsEvents = formData.services.includes("events")
  const eventTypePlaceholder =
    wantsMocktails && !wantsEvents
      ? "Wedding, birthday, brand event..."
      : wantsEvents && !wantsMocktails
        ? "Private wellness gathering, community partnership..."
        : "Wedding, wellness gathering, brand event..."

  const toggleService = (id: AllowedService) => {
    setFormData((current) => {
      const selected = current.services.includes(id)
      return {
        ...current,
        services: selected
          ? current.services.filter((service) => service !== id)
          : [...current.services, id],
      }
    })
    setErrors((current) => {
      if (!current.services) return current
      const next = { ...current }
      delete next.services
      return next
    })
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.services.includes("mocktails") && !formData.services.includes("events")) {
      newErrors.services = "Choose mocktail cart, community events, or both"
    }
    if (!formData.eventDate.trim()) newErrors.eventDate = 'Event date is required';
    if (!formData.eventType.trim()) newErrors.eventType = 'Event type is required';
    if (!formData.guestCount.trim()) newErrors.guestCount = 'Guest count is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setFormState({ status: 'pending' });
    setErrors({});
    
    try {
      const result = await submitQuoteForm({ error: null, success: false }, {
        ...formData,
        services: formData.services,
      });
      
      if (result.success) {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          services: initialServices,
          eventType: '',
          eventDate: '',
          location: '',
          guestCount: '',
          referralSource: '',
          additionalDetails: '',
          website: ''
        });
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
      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-8 bg-white p-4 sm:p-8 rounded-lg shadow-lg border border-gray-100">
        {errors.submit && (
          <div className="p-4 bg-red-50 border border-red-300 rounded-lg">
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
        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formData.website}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, website: e.target.value })}
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
        <div className="space-y-3">
          <Label className="text-gray-700 font-medium mb-1.5 block">What do you need?</Label>
          <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 sm:gap-4">
            {SERVICE_OPTIONS.map((option) => {
              const selected = formData.services.includes(option.id)
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => toggleService(option.id)}
                  className={cn(
                    "flex h-full flex-col items-stretch justify-start rounded-2xl border px-5 py-5 text-left shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9d174d] sm:px-6 sm:py-6",
                    selected
                      ? "border-[#9d174d] bg-pink-50 shadow-none"
                      : "border-gray-200 bg-white hover:border-pink-200"
                  )}
                >
                  <span className="flex w-full items-start justify-between gap-3">
                    <p className="font-display text-xl leading-tight text-gray-900 sm:text-2xl">{option.title}</p>
                    <span
                      className={cn(
                        "mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                        selected
                          ? "border-[#9d174d] bg-[#9d174d] text-white"
                          : "border-gray-300 bg-white"
                      )}
                      aria-hidden="true"
                    >
                      {selected ? (
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : null}
                    </span>
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{option.description}</p>
                </button>
              )
            })}
          </div>
          {errors.services && <p className="text-red-500 text-sm">{errors.services}</p>}
        </div>

        <div className="space-y-2">
          <Label className="text-gray-700 font-medium mb-1.5 block">Services Needed</Label>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {SERVICE_CHECKBOXES.map((option) => (
              <div key={option.id} className="flex min-h-[44px] items-center space-x-2">
                <Checkbox
                  id={option.id}
                  name="services"
                  value={option.id}
                  className="h-5 w-5 border-2 border-gray-300 data-[state=checked]:border-pink-500 data-[state=checked]:bg-pink-500"
                  checked={formData.services.includes(option.id)}
                  onCheckedChange={() => toggleService(option.id)}
                />
                <Label htmlFor={option.id} className="cursor-pointer text-sm text-gray-600 sm:text-base">
                  {option.title}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <Label htmlFor="firstName" className="mb-1.5 block">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, firstName: e.target.value })}
              maxLength={80}
              className="h-11 sm:h-10"
              required
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>

          <div>
            <Label htmlFor="lastName" className="mb-1.5 block">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, lastName: e.target.value })}
              maxLength={80}
              className="h-11 sm:h-10"
              required
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <Label htmlFor="email" className="mb-1.5 block">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
              maxLength={254}
              className="h-11 sm:h-10"
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <Label htmlFor="phone" className="mb-1.5 block">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, phone: e.target.value })}
              maxLength={30}
              className="h-11 sm:h-10"
              required
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <Label htmlFor="eventType" className="mb-1.5 block">What are you planning?</Label>
            <Input
              id="eventType"
              name="eventType"
              value={formData.eventType}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, eventType: e.target.value })}
              maxLength={120}
              placeholder={eventTypePlaceholder}
              className="h-11 sm:h-10"
              required
            />
            {errors.eventType && <p className="text-red-500 text-sm mt-1">{errors.eventType}</p>}
          </div>

          <div>
            <Label htmlFor="eventDate" className="mb-1.5 block">Date</Label>
            <Input
              id="eventDate"
              name="eventDate"
              type="date"
              value={formData.eventDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, eventDate: e.target.value })}
              className="h-11 sm:h-10"
              required
            />
            {errors.eventDate && <p className="text-red-500 text-sm mt-1">{errors.eventDate}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <Label htmlFor="guestCount" className="mb-1.5 block">Guest Count</Label>
            <Input
              id="guestCount"
              name="guestCount"
              type="number"
              value={formData.guestCount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, guestCount: e.target.value })}
              min={1}
              max={99999}
              className="h-11 sm:h-10"
              required
            />
            {errors.guestCount && <p className="text-red-500 text-sm mt-1">{errors.guestCount}</p>}
          </div>

          <div>
            <Label htmlFor="location" className="mb-1.5 block">Location</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, location: e.target.value })}
              maxLength={200}
              placeholder="Washington, DC or Minneapolis"
              className="h-11 sm:h-10"
              required
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="referralSource" className="mb-1.5 block">How did you hear about us?</Label>
          <Input
            id="referralSource"
            name="referralSource"
            value={formData.referralSource}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, referralSource: e.target.value })}
            maxLength={200}
            className="h-11 sm:h-10"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="additionalDetails" className="mb-1.5 block">Anything else we should know?</Label>
          <Textarea
            id="additionalDetails"
            name="additionalDetails"
            value={formData.additionalDetails}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, additionalDetails: e.target.value })}
            maxLength={2000}
            className="min-h-[100px] sm:min-h-[120px]"
          />
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
