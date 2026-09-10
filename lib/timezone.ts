export function wallTimeToIso(date: string, time: string, timeZone: string): string {
  const probe = new Date(`${date}T12:00:00Z`)
  const offset = gmtOffset(probe, timeZone)
  const [hours = "00", minutes = "00"] = time.split(":")
  return `${date}T${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}:00${offset}`
}

export function isoToWallTime(iso: string, timeZone: string): { date: string; time: string } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(iso))
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? ""
  return {
    date: `${value("year")}-${value("month")}-${value("day")}`,
    time: `${value("hour")}:${value("minute")}`,
  }
}

function gmtOffset(date: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "longOffset",
  }).formatToParts(date)
  const name = parts.find((part) => part.type === "timeZoneName")?.value ?? "GMT-05:00"
  const match = name.match(/GMT([+-])(\d{1,2})(?::(\d{2}))?/)
  if (!match) return "-05:00"
  return `${match[1]}${match[2].padStart(2, "0")}:${(match[3] ?? "00").padStart(2, "0")}`
}
