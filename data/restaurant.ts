import type { MenuGroup } from "./menu"

export const restaurant = {
  name: "Hotel Palm Paradise",
  tagline: "Where Taste Meets Elegance",
  phone: "8329085092",
  whatsapp: "918329085092",
  address: "Nagar–Manmad Road, Takli Phata, Yeola–Kopargaon Road, Kopargaon, Maharashtra 423601",
  directions: "https://www.google.com/maps/search/?api=1&query=Hotel+Palm+Paradise+Kopargaon",
  instagram: "https://www.instagram.com/hotelpalmparadise/",
  reviews: "https://www.google.com/search?q=Hotel+Palm+Paradise+Kopargaon+reviews",
  hours: "8:00 AM – 11:30 PM",
  map: "https://www.google.com/maps?q=Hotel+Palm+Paradise+Kopargaon&output=embed",
} as const

export const venues = [
  { name: "Banquet hall", capacity: "Up to 300 guests", note: "An elegant setting for your grand celebrations", icon: "01" },
  { name: "Garden lawn", capacity: "Up to 500 guests", note: "Open-air gatherings beneath the palms", icon: "02" },
  { name: "Rooftop terrace", capacity: "Up to 80 guests", note: "Dinner under lanterns and leafy vines", icon: "03" },
  { name: "Conference room", capacity: "Up to 100 guests", note: "A welcoming space for meetings and CMEs", icon: "04" },
] as const

export const eventOccasions = ["Wedding / reception", "Engagement", "Birthday", "Naming ceremony", "Conference / CME", "Get-together"] as const
export const packages = [
  { name: "Garden lunch", price: 450 },
  { name: "Palm celebration", price: 650 },
  { name: "Grand feast", price: 850 },
] as const

export const photos = [
  { src: "/images/entrance-sign.jpg", alt: "Palm Paradise sign on the stone fountain wall" },
  { src: "/images/sunset-front.jpg", alt: "Hotel Palm Paradise at sunset with palms in front" },
  { src: "/images/building-day.jpg", alt: "Hotel Palm Paradise building on a clear day" },
  { src: "/images/terrace-1.jpg", alt: "Rooftop terrace with a white pergola and hanging vines" },
  { src: "/images/terrace-2.jpg", alt: "Lantern-lit rooftop terrace dining" },
  { src: "/images/terrace-3.jpg", alt: "Turquoise and colourful details on the rooftop terrace" },
  { src: "/images/garden-night.jpg", alt: "Garden seating among the palms at dusk" },
  { src: "/images/entrance-night.jpg", alt: "The lit-up Palm Paradise entrance at night" },
  { src: "/images/night-sign.jpg", alt: "The Palm Paradise roadside sign glowing at night: Banquet / Lawns, Pure Veg" },
] as const

/** Optional photo banner per menu group (files in public/images/menu/, credits in CREDITS.md there). Groups without one get a pattern banner. */
export const menuBanners: Partial<Record<MenuGroup, { src: string; alt: string }>> = {}
