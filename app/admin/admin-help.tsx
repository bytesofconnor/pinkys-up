import { quoteNotificationEmail } from "@/lib/quote"

export function AdminHelp({ current }: { current: "events" | "quotes" }) {
  const inbox = quoteNotificationEmail()

  return (
    <p className="mb-6 max-w-2xl text-sm text-gray-600">
      {current === "events" ? (
        <>
          Dates you add here show on the homepage and the Events page. Leave the
          registration link blank for WhatsApp RSVP. Uncheck{" "}
          <span className="font-medium text-gray-800">Show on the website</span> to
          hide a date without deleting it. Quote requests live under Quotes.
        </>
      ) : (
        <>
          These are submissions from the public quote form. Every request is also
          emailed to{" "}
          <a href={`mailto:${inbox}`} className="font-medium text-gray-800 hover:underline">
            {inbox}
          </a>
          . If a row is here but email failed, follow up from the contact details
          on the card.
        </>
      )}
    </p>
  )
}
