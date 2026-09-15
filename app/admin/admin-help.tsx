export function AdminHelp({ current }: { current: "events" | "quotes" }) {
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
          These are submissions from the public quote form. Each one also emails
          Brenda. If a row is here but email failed, follow up from the contact
          details on the card.
        </>
      )}
    </p>
  )
}
