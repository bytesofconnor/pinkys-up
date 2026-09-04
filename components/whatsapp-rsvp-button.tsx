"use client"

import { useState } from "react"
import Link from "next/link"
import { MessageCircle, Copy, Check } from "lucide-react"

type WhatsAppRSVPButtonProps = {
  href: string
  eventName: string
  className?: string
  variant?: "link" | "button"
  size?: "sm" | "lg"
}

export function WhatsAppRSVPButton({
  href,
  eventName,
  className = "",
  variant = "link",
  size = "sm",
}: WhatsAppRSVPButtonProps) {
  const [showFallback, setShowFallback] = useState(false)
  const [copied, setCopied] = useState(false)

  const whatsappNumber = "1-571-501-4766"
  const message = decodeURIComponent(href.split("?text=")[1] || "")

  const handleClick = (e: React.MouseEvent) => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    
    if (!isMobile && typeof window !== "undefined") {
      const hasWhatsAppDesktop = false
      
      if (!hasWhatsAppDesktop) {
        e.preventDefault()
        setShowFallback(true)
      }
    }
  }

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleCopyNumber = async () => {
    try {
      await navigator.clipboard.writeText(whatsappNumber)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  if (showFallback) {
    return (
      <div className="rounded-lg border border-pink-200 bg-pink-50 p-6 text-left">
        <div className="mb-4 flex items-start gap-3">
          <MessageCircle className="mt-1 h-5 w-5 text-pink-600" />
          <div>
            <h4 className="font-semibold text-gray-900">RSVP via WhatsApp</h4>
            <p className="mt-1 text-sm text-gray-600">
              Send us a message to register for {eventName}
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Phone Number:</label>
              <button
                onClick={handleCopyNumber}
                className="flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-pink-600 hover:bg-pink-100"
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <code className="block rounded bg-white px-3 py-2 text-sm text-gray-900">
              {whatsappNumber}
            </code>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Message:</label>
              <button
                onClick={handleCopyMessage}
                className="flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-pink-600 hover:bg-pink-100"
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="max-h-32 overflow-y-auto rounded bg-white px-3 py-2 text-sm text-gray-900">
              {message}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-md bg-pink-600 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-pink-700"
            >
              Open WhatsApp
            </a>
            <button
              onClick={() => setShowFallback(false)}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (variant === "button") {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={
          size === "lg"
            ? `inline-flex items-center gap-2 bg-[#be185d] px-10 py-6 text-base font-semibold uppercase tracking-[0.2em] text-white hover:bg-[#9d174d] ${className}`
            : `inline-flex items-center gap-2 rounded-md bg-pink-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-700 ${className}`
        }
      >
        <MessageCircle className="h-4 w-4" />
        RSVP via WhatsApp
        <span className="sr-only"> (opens WhatsApp)</span>
      </Link>
    )
  }

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#be185d] underline-offset-4 hover:underline ${className}`}
    >
      <MessageCircle className="h-3.5 w-3.5" />
      RSVP via WhatsApp
      <span className="sr-only"> (opens WhatsApp)</span>
    </Link>
  )
}
