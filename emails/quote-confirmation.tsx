import { escapeHtml } from "@/lib/html"

interface QuoteConfirmationEmailProps {
  firstName: string
  lastName: string
  eventDate: string
  eventType: string
  services: string[]
}

export function QuoteConfirmationEmail({
  firstName,
  lastName,
  eventDate,
  eventType,
  services,
}: QuoteConfirmationEmailProps) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(to right, #ec4899, #a855f7); padding: 30px 20px; color: white; border-radius: 8px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; }
          .content { padding: 30px 20px; }
          .section { margin: 20px 0; }
          .highlight { background: #fdf2f8; padding: 20px; border-radius: 8px; border-left: 4px solid #ec4899; }
          .services { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px; }
          .service-tag { background: #ec4899; color: white; padding: 6px 12px; border-radius: 4px; font-size: 14px; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; border-top: 1px solid #e5e7eb; margin-top: 30px; }
          .cta { margin: 30px 0; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🥂 Thank You, ${escapeHtml(firstName)}!</h1>
          </div>
          
          <div class="content">
            <div class="section">
              <p>Hi ${escapeHtml(firstName)} ${escapeHtml(lastName)},</p>
              <p>Thank you for choosing <strong>PINKYS UP</strong> for your upcoming event! We're excited to help make your special day unforgettable.</p>
            </div>

            <div class="highlight">
              <p style="margin: 0 0 10px 0;"><strong>What happens next?</strong></p>
              <p style="margin: 0;">Our team will review your request and get back to you within <strong>24-48 hours</strong> with pricing, availability, and next steps.</p>
            </div>

            <div class="section">
              <p><strong>Your Event Details:</strong></p>
              <ul style="list-style: none; padding: 0;">
                <li>📅 <strong>Date:</strong> ${escapeHtml(eventDate)}</li>
                <li>🎉 <strong>Type:</strong> ${escapeHtml(eventType)}</li>
                <li>✨ <strong>Services:</strong></li>
              </ul>
              <div class="services">
                ${services.map((service) => `<span class="service-tag">${escapeHtml(service)}</span>`).join(" ")}
              </div>
            </div>

            <div class="section">
              <p><strong>Questions in the meantime?</strong></p>
              <p>Feel free to reply to this email or reach out to us directly. We're here to help!</p>
            </div>

            <div class="cta">
              <p style="font-size: 18px; color: #ec4899; margin: 0;">Cheers to an amazing event! 🥂</p>
            </div>
          </div>

          <div class="footer">
            <p style="margin: 0 0 5px 0;"><strong>PINKYS UP</strong></p>
            <p style="margin: 0;">Premium Bar & Event Services</p>
          </div>
        </div>
      </body>
    </html>
  `
}
