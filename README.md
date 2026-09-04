# 🍹 PINKYS UP DC

PINKYS UP DC is a premium mobile mocktail catering service based in Washington, DC. We specialize in creating sophisticated, non-alcoholic beverages for events that deserve an elevated touch.

## 🌟 Features

- **Signature Mocktails**: Browse our curated collection of non-alcoholic beverages
- **Event Booking**: Easy-to-use quote request system
- **Mobile-First Design**: Fully responsive interface for all devices
- **Real-time Form Validation**: Instant feedback for quote submissions
- **Automated Email Notifications**: Immediate confirmation of quote requests

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS with custom UI components
- **Animations**: Framer Motion
- **Form Handling**: Server Actions with Zod validation
- **Email Service**: Resend
- **Deployment**: Vercel

## 📅 Managing Events

**Non-technical users:** See the [Events Guide](./EVENTS_GUIDE.md) for step-by-step instructions on how to add, edit, or remove community events without needing an engineer.

All event data is stored in [`data/events.json`](./data/events.json) and automatically updates the website when changed.

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/cbarrett3/pinkys-up.git
   ```

2. Install dependencies:
   ```bash
   cd pinkys-up
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with:
   ```
   RESEND_API_KEY=your_resend_api_key
   QUOTE_NOTIFICATION_EMAIL=your_notification_email
   RESEND_FROM_EMAIL=Pinkys Up <onboarding@resend.dev>
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Environment Variables

- `RESEND_API_KEY`: Required for email functionality (quote form submissions)
- `QUOTE_NOTIFICATION_EMAIL`: Inbox that receives quote requests
- `RESEND_FROM_EMAIL`: Optional From address (defaults to Resend's onboarding sender)

## 🎨 Design System

- **Typography**: Playfair Display for headings, Inter for body text
- **Color Palette**: Pink-to-purple gradients, minimalist whites
- **Design Philosophy**: Modern glassmorphism with emphasis on sophistication
- **Animations**: Subtle motion for enhanced user experience

## 📱 Key Features

### Quote Form
- Real-time validation
- Automated email notifications
- Comprehensive event details collection

### Mocktail Showcase
- Seasonal collections
- Detailed ingredient lists
- Beautiful presentation imagery

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interactions

## 🔄 Continuous Integration

The project is set up with continuous deployment:
- GitHub repository: [cbarrett3/pinkys-up](https://github.com/cbarrett3/pinkys-up)
- Vercel deployment: Automatic deploys on push to main branch

## 👩‍💼 About

PINKYS UP DC was founded by Brenda Pereira Vargas with a vision to revolutionize the non-alcoholic beverage scene in Washington, DC. Our mission is to provide sophisticated, inclusive drinking experiences for all types of celebrations.

## 📞 Contact

For business inquiries:
- WhatsApp: [Contact Us](http://Wa.me/+15715014766)
- Instagram: [@pinkysupdc](https://instagram.com/pinkysupdc)
- TikTok: [@pinkysupdc](https://tiktok.com/@pinkysupdc)

## 📄 License

This project is proprietary software. All rights reserved.
