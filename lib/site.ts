import { whatsAppTelephone } from "@/lib/booking"

export const SITE_URL = "https://www.pinkysup.social"

export const SITE_NAME = "PINKYS UP"

export const CONTACT = {
  phone: whatsAppTelephone,
  email: "pinkysup.social@gmail.com",
  instagram: "https://www.instagram.com/pinkysup_dc",
  tiktok: "https://www.tiktok.com/@pinkysup_dc",
}

export const CITIES = [
  { name: "Washington, DC", slug: "washington-dc", region: "DC" },
  { name: "Minneapolis", slug: "minneapolis", region: "MN" },
] as const
