"use client"

import { useEffect, useState } from "react"

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(target: string): TimeLeft | null {
  const remaining = new Date(target).getTime() - Date.now()
  if (remaining <= 0) {
    return null
  }

  return {
    days: Math.floor(remaining / (1000 * 60 * 60 * 24)),
    hours: Math.floor((remaining / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((remaining / (1000 * 60)) % 60),
    seconds: Math.floor((remaining / 1000) % 60),
  }
}

function formatUnit(value: number, pad: boolean) {
  return pad ? String(value).padStart(2, "0") : String(value)
}

export function EventCountdown({ target }: { target: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() => getTimeLeft(target))

  useEffect(() => {
    const update = () => setTimeLeft(getTimeLeft(target))
    update()
    const timer = window.setInterval(update, 1000)
    return () => window.clearInterval(timer)
  }, [target])

  if (!timeLeft) {
    return (
      <p className="text-lg font-medium text-white" style={{ textShadow: "0 2px 16px rgba(0,0,0,0.7)" }}>
        This event is starting now. See you there!
      </p>
    )
  }

  const units = [
    { label: "Days", value: formatUnit(timeLeft.days, timeLeft.days < 100) },
    { label: "Hours", value: formatUnit(timeLeft.hours, true) },
    { label: "Minutes", value: formatUnit(timeLeft.minutes, true) },
    { label: "Seconds", value: formatUnit(timeLeft.seconds, true) },
  ]

  return (
    <div className="flex items-start justify-center">
      {units.map((unit, index) => (
        <div key={unit.label} className="flex items-start">
          {index > 0 ? (
            <div className="mx-4 mt-3 h-10 w-px bg-white/25 sm:mx-6 sm:mt-4 sm:h-12 md:mx-8" />
          ) : null}
          <div className="min-w-[4.5rem] text-center sm:min-w-[5.5rem]">
            <div
              className="font-display text-5xl leading-none tabular-nums text-white sm:text-6xl md:text-7xl"
              style={{ textShadow: "0 2px 28px rgba(0,0,0,0.7)" }}
            >
              {unit.value}
            </div>
            <div className="mt-3 text-xs font-medium uppercase tracking-[0.28em] text-white">
              {unit.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
