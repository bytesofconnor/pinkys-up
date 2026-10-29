import { escapeHtml, escapeHtmlWithBreaks } from "@/lib/html"
import type { FollowUpLetter } from "@/lib/follow-up"

export function FollowUpEmail({ hostName, email, lines, testimonial }: FollowUpLetter): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(to right, #ec4899, #a855f7); padding: 20px; color: white; border-radius: 8px; }
          .section { margin: 20px 0; }
          .label { font-weight: bold; color: #666; }
          .value { margin-top: 4px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${escapeHtml("New note for PINKYS UP")}</h1>
          </div>

          <div class="section">
            <div class="label">Host:</div>
            <div class="value">${escapeHtml(hostName)}</div>
            <div class="value">${escapeHtml(email)}</div>
          </div>

          <div class="section">
            ${lines.map((line) => `<div class="value">${escapeHtml(line)}</div>`).join("\n")}
          </div>

          <div class="section">
            <div class="label">Note:</div>
            <div class="value">${escapeHtmlWithBreaks(testimonial)}</div>
          </div>
        </div>
      </body>
    </html>
  `
}
