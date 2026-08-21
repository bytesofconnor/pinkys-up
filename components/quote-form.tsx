'use client'

import { motion } from "framer-motion"
import { useState } from "react"
import { submitQuoteForm } from '@/app/actions'
import { type AllowedService } from '@/lib/quote'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { SubmitButton } from '@/components/submit-button'

export function QuoteForm() {
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
    services: [] as AllowedService[]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

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
    try {
      const result = await submitQuoteForm({ error: null, success: false }, {
        ...formData,
        services: formData.services.length > 0 ? formData.services : ['bar']
      });
      
      if (result.success) {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          services: [],
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
      } else if (result.error) {
        setErrors({ submit: result.error });
      }
      setFormState({ status: 'idle' });
    } catch {
      setFormState({ status: 'error' });
      setErrors({ submit: 'Failed to submit form. Please try again.' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative"
    >            
      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-lg shadow-lg border border-gray-100">
        {formState.status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-red-50 border border-red-500 rounded text-red-500"
          >
            An unexpected error occurred
          </motion.div>
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
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="py-10 px-6 text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6"
            >
              <svg
                className="w-16 h-16 mx-auto mb-4 text-pink-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Thank You for Choosing PINKYS UP!
              </h3>
              <p className="text-gray-600 text-lg">
                We&apos;ll get back to you within 24-48 hours with pricing and availability.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-sm text-gray-500"
            >
              Keep an eye on your email for our response!
            </motion.div>
          </motion.div>
        ) : (
        <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, firstName: e.target.value })}
              maxLength={80}
              required
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>

          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, lastName: e.target.value })}
              maxLength={80}
              required
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
              maxLength={254}
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, phone: e.target.value })}
              maxLength={30}
              required
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-gray-700 font-medium">Services Needed</Label>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="bar" name="services" value="bar" className="border-2 border-gray-300 data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500" 
                checked={formData.services.includes('bar')} 
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFormData({ ...formData, services: [...formData.services, 'bar' as const] });
                  } else {
                    setFormData({ ...formData, services: formData.services.filter((service) => service !== 'bar') });
                  }
                }}
              />
              <Label htmlFor="bar" className="text-gray-600">Bar Service</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="mixologist" name="services" value="mixologist" className="border-2 border-gray-300 data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500" 
                checked={formData.services.includes('mixologist')} 
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFormData({ ...formData, services: [...formData.services, 'mixologist' as const] });
                  } else {
                    setFormData({ ...formData, services: formData.services.filter((service) => service !== 'mixologist') });
                  }
                }}
              />
              <Label htmlFor="mixologist" className="text-gray-600">Mixologist</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="glassware" name="services" value="glassware" className="border-2 border-gray-300 data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500" 
                checked={formData.services.includes('glassware')} 
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFormData({ ...formData, services: [...formData.services, 'glassware' as const] });
                  } else {
                    setFormData({ ...formData, services: formData.services.filter((service) => service !== 'glassware') });
                  }
                }}
              />
              <Label htmlFor="glassware" className="text-gray-600">Glassware</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="custom" name="services" value="custom" className="border-2 border-gray-300 data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500" 
                checked={formData.services.includes('custom')} 
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFormData({ ...formData, services: [...formData.services, 'custom' as const] });
                  } else {
                    setFormData({ ...formData, services: formData.services.filter((service) => service !== 'custom') });
                  }
                }}
              />
              <Label htmlFor="custom" className="text-gray-600">Custom Menu</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="dj" name="services" value="dj" className="border-2 border-gray-300 data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500" 
                checked={formData.services.includes('dj')} 
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFormData({ ...formData, services: [...formData.services, 'dj' as const] });
                  } else {
                    setFormData({ ...formData, services: formData.services.filter((service) => service !== 'dj') });
                  }
                }}
              />
              <Label htmlFor="dj" className="text-gray-600">DJ Service</Label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="eventType">Event Type</Label>
            <Input
              id="eventType"
              name="eventType"
              value={formData.eventType}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, eventType: e.target.value })}
              maxLength={120}
              required
            />
            {errors.eventType && <p className="text-red-500 text-sm mt-1">{errors.eventType}</p>}
          </div>

          <div>
            <Label htmlFor="eventDate">Event Date</Label>
            <Input
              id="eventDate"
              name="eventDate"
              type="date"
              value={formData.eventDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, eventDate: e.target.value })}
              required
            />
            {errors.eventDate && <p className="text-red-500 text-sm mt-1">{errors.eventDate}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="guestCount">Guest Count</Label>
            <Input
              id="guestCount"
              name="guestCount"
              type="number"
              value={formData.guestCount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, guestCount: e.target.value })}
              min={1}
              max={99999}
              required
            />
            {errors.guestCount && <p className="text-red-500 text-sm mt-1">{errors.guestCount}</p>}
          </div>

          <div>
            <Label htmlFor="location">Event Location</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, location: e.target.value })}
              maxLength={200}
              required
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="referralSource">How did you hear about us?</Label>
          <Input
            id="referralSource"
            name="referralSource"
            value={formData.referralSource}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, referralSource: e.target.value })}
            maxLength={200}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="additionalDetails">Additional Details</Label>
          <Textarea
            id="additionalDetails"
            name="additionalDetails"
            value={formData.additionalDetails}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, additionalDetails: e.target.value })}
            maxLength={2000}
          />
        </div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full"
        >
          <SubmitButton className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-md" />
        </motion.div>
        </>
        )}
      </form>
    </motion.div>
  )
}
