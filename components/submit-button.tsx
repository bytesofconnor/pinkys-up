'use client'

import type { ReactNode } from 'react'
import { Loader2 } from 'lucide-react'

export function SubmitButton({
  pending = false,
  children = "Send request",
}: {
  pending?: boolean
  children?: ReactNode
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#9d174d] px-7 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-[#831843] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9d174d] disabled:pointer-events-none disabled:opacity-60"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Sending...
        </>
      ) : (
        children
      )}
    </button>
  )
}
