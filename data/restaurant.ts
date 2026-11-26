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

export type MenuCategory = "Soups & starters" | "Main course" | "Breads & rice" | "South Indian" | "Chinese" | "Thali & desserts"
export type Dish = { id: string; name: string; category: MenuCategory; description: string; price: number; jain?: boolean }

export const categories: MenuCategory[] = ["Soups & starters", "Main course", "Breads & rice", "South Indian", "Chinese", "Thali & desserts"]

export const dishes: Dish[] = [
  { id: "tomato-soup", name: "Tomato soup", category: "Soups & starters", description: "Slow-simmered tomato, finished with herbs", price: 110, jain: true },
  { id: "paneer-tikka", name: "Paneer tikka", category: "Soups & starters", description: "Tandoor-charred paneer with a gentle spice", price: 260, jain: true },
  { id: "veg-crispy", name: "Veg crispy", category: "Soups & starters", description: "Crisp seasonal vegetables, house seasoning", price: 210 },
  { id: "paneer-butter", name: "Paneer butter masala", category: "Main course", description: "Soft paneer in a silky tomato-cashew gravy", price: 290, jain: true },
  { id: "veg-kolhapuri", name: "Veg kolhapuri", category: "Main course", description: "Market vegetables in a bold Maharashtrian masala", price: 250 },
  { id: "dal-tadka", name: "Dal tadka", category: "Main course", description: "Yellow lentils with a fragrant ghee tempering", price: 190, jain: true },
  { id: "butter-naan", name: "Butter naan", category: "Breads & rice", description: "Tandoor-baked and brushed with butter", price: 55, jain: true },
  { id: "veg-biryani", name: "Veg biryani", category: "Breads & rice", description: "Basmati rice layered with garden vegetables", price: 230 },
  { id: "jeera-rice", name: "Jeera rice", category: "Breads & rice", description: "Steamed basmati, cumin and a little ghee", price: 150, jain: true },
  { id: "masala-dosa", name: "Masala dosa", category: "South Indian", description: "Golden crisp dosa, potato masala, chutneys", price: 150 },
  { id: "idli", name: "Idli sambar", category: "South Indian", description: "Soft steamed idlis with sambar and chutney", price: 110 },
  { id: "uttapam", name: "Veg uttapam", category: "South Indian", description: "Soft rice-lentil pancake with fresh vegetables", price: 160 },
  { id: "hakka-noodles", name: "Veg hakka noodles", category: "Chinese", description: "Wok-tossed noodles with crisp vegetables", price: 190 },
  { id: "manchurian", name: "Veg manchurian", category: "Chinese", description: "House-made veg dumplings in a tangy sauce", price: 210 },
  { id: "fried-rice", name: "Schezwan fried rice", category: "Chinese", description: "Wok-fired rice with a lively chilli kick", price: 190 },
  { id: "special-thali", name: "Special veg thali", category: "Thali & desserts", description: "A generous seasonal spread, served the homely way", price: 280 },
  { id: "gulab-jamun", name: "Gulab jamun", category: "Thali & desserts", description: "Warm milk dumplings in cardamom syrup", price: 90, jain: true },
]

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
] as const
