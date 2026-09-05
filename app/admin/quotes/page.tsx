import { getRecentQuoteSubmissions } from '@/lib/db'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

async function verifyAccess(searchParams: { token?: string }) {
  const adminToken = process.env.ADMIN_TOKEN
  
  if (!adminToken) {
    return false
  }

  const token = searchParams.token
  return token === adminToken
}

export default async function AdminQuotesPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const params = await searchParams
  const hasAccess = await verifyAccess(params)

  if (!hasAccess) {
    redirect('/')
  }

  const quotes = await getRecentQuoteSubmissions(100)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Quote Submissions</h1>
          <p className="mt-2 text-sm text-gray-600">
            Showing {quotes.length} most recent quote requests
          </p>
        </div>

        {quotes.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500">No quote submissions yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {quotes.map((quote) => (
              <div
                key={quote.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {quote.first_name} {quote.last_name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(quote.created_at).toLocaleString('en-US', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {quote.email_sent ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Email Sent
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Email Failed
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 font-medium">Contact</p>
                    <p className="text-gray-900">
                      <a href={`mailto:${quote.email}`} className="text-blue-600 hover:underline">
                        {quote.email}
                      </a>
                    </p>
                    <p className="text-gray-900">
                      <a href={`tel:${quote.phone}`} className="text-blue-600 hover:underline">
                        {quote.phone}
                      </a>
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-600 font-medium">Event Details</p>
                    <p className="text-gray-900">{quote.event_type}</p>
                    <p className="text-gray-900">
                      {new Date(quote.event_date).toLocaleDateString('en-US', {
                        dateStyle: 'long',
                      })}
                    </p>
                    <p className="text-gray-900">{quote.guest_count} guests</p>
                  </div>

                  <div>
                    <p className="text-gray-600 font-medium">Location</p>
                    <p className="text-gray-900">{quote.location}</p>
                  </div>

                  <div>
                    <p className="text-gray-600 font-medium">Services</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {quote.services.map((service) => (
                        <span
                          key={service}
                          className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-pink-100 text-pink-800"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  {quote.referral_source && (
                    <div>
                      <p className="text-gray-600 font-medium">Referral Source</p>
                      <p className="text-gray-900">{quote.referral_source}</p>
                    </div>
                  )}

                  {quote.additional_details && (
                    <div className="md:col-span-2">
                      <p className="text-gray-600 font-medium">Additional Details</p>
                      <p className="text-gray-900 whitespace-pre-wrap">{quote.additional_details}</p>
                    </div>
                  )}

                  {quote.email_error && (
                    <div className="md:col-span-2">
                      <p className="text-red-600 font-medium">Email Error</p>
                      <p className="text-red-700 text-xs font-mono bg-red-50 p-2 rounded">
                        {quote.email_error}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
