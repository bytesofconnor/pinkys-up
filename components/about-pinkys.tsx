import Link from "next/link"

export function AboutPinkys() {
  return (
    <section className="border-t border-black/5 bg-white py-16 sm:py-24">
      <div className="container mx-auto max-w-3xl px-4 sm:px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-pink-600">PINKYS UP</p>
        <h2 className="mt-3 font-display text-3xl text-gray-900 sm:text-4xl">
          A zero-proof mocktail bar for DC and Minneapolis.
        </h2>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-gray-700 sm:text-lg">
          <p>
            PINKYS UP is Brenda Pereira Vargas&apos;s mobile mocktail cart and community wellness
            project. We do not serve alcohol. The cart is for weddings, parties, and brand events.
            The gatherings are free, and they show up on{" "}
            <Link href="/events" className="font-medium text-[#9d174d] underline-offset-4 hover:underline">
              Events
            </Link>{" "}
            when a real date is booked.
          </p>
          <p>
            Looking for a{" "}
            <Link href="/washington-dc" className="font-medium text-[#9d174d] underline-offset-4 hover:underline">
              mocktail bar in Washington, DC
            </Link>{" "}
            or a{" "}
            <Link href="/minneapolis" className="font-medium text-[#9d174d] underline-offset-4 hover:underline">
              mocktail cart in Minneapolis
            </Link>
            ? Start with a{" "}
            <Link href="/quote" className="font-medium text-[#9d174d] underline-offset-4 hover:underline">
              quote
            </Link>
            . Menu, booking questions, and who we are:{" "}
            <Link href="/faq" className="font-medium text-[#9d174d] underline-offset-4 hover:underline">
              FAQ
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
