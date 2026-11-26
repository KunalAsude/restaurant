import '@fontsource/dm-serif-display/400.css'
import '@fontsource/manrope/400.css'
import '@fontsource/manrope/500.css'
import '@fontsource/manrope/600.css'
import '@fontsource/manrope/700.css'
import '@fontsource/noto-sans-devanagari/400.css'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { allowIndexing, siteUrl } from '@/lib/site'

const restaurantJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Hotel Palm Paradise',
  description: 'Pure vegetarian family restaurant with banquets, garden lawn and rooftop terrace dining in Kopargaon, Maharashtra.',
  servesCuisine: ['Vegetarian', 'North Indian', 'South Indian', 'Chinese'],
  telephone: '+918329085092',
  priceRange: '₹₹',
  openingHours: 'Mo-Su 08:00-23:30',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Nagar–Manmad Road, Takli Phata, Yeola–Kopargaon Road, opposite the HP petrol pump',
    addressLocality: 'Kopargaon',
    addressRegion: 'Maharashtra',
    postalCode: '423601',
    addressCountry: 'IN',
  },
  image: `${siteUrl}/images/sunset-hero.jpg`,
  url: siteUrl,
  sameAs: ['https://www.instagram.com/hotelpalmparadise/'],
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Hotel Palm Paradise – Pure Veg Restaurant, Banquets & Garden | Kopargaon',
  description: 'A warm pure-vegetarian family restaurant in Kopargaon, Maharashtra. North Indian, South Indian and Chinese food, rooftop terrace, garden lawn and banquet spaces.',
  openGraph: {
    title: 'Hotel Palm Paradise – Where Taste Meets Elegance',
    description: 'Pure veg dining, garden celebrations and lantern-lit terrace evenings in Kopargaon.',
    images: [{ url: '/images/sunset-hero.jpg', width: 1672, height: 941, alt: 'Hotel Palm Paradise at sunset' }],
    type: 'website',
  },
  robots: { index: allowIndexing, follow: allowIndexing },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f7f1e6',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd).replace(/</g, '\\u003c') }} />
      </body>
    </html>
  )
}
