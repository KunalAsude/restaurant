"use client"

import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"
import { ArrowRight, Camera, Check, ChevronLeft, ChevronRight, Clock3, MapPin, Menu as MenuIcon, Minus, Phone, Plus, Search, Star, Users, X } from "lucide-react"
import { categories, dishes, eventOccasions, packages, photos, restaurant, venues, type MenuCategory } from "@/data/restaurant"
import { SwayingPalm } from "@/components/swaying-palm"

const wa = (message: string) => `https://wa.me/${restaurant.whatsapp}?text=${encodeURIComponent(message)}`
const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`

function PalmMark({ light = false }: { light?: boolean }) {
  return <span className={`palm-mark ${light ? "palm-mark-light" : ""}`} aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path d="M16 15.2c-.5 4.4-.9 8.8-1.1 12.5m1.2-12.6C12 11.4 8.1 9.8 4.8 9.9c1 3.4 4.2 5.7 10.8 5.4M16.1 15.1C11 8.7 10.5 5.1 11.1 2.9c3.4 1.2 5.3 4.7 5.2 12.2M16.2 15.1c1.2-7.3 3.5-10.3 6.7-11.1.4 3.6-1.6 7.3-6.7 11.1m.1 0c4.5-4.5 8.3-5.7 11.1-4.8-.8 3.5-4.2 5.5-11.1 4.8m-5.6 12.6h9.1" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
}

function Photo({ src, alt, className = "", priority = false, sizes = "(max-width: 768px) 100vw, 50vw" }: { src: string; alt: string; className?: string; priority?: boolean; sizes?: string }) {
  const [missing, setMissing] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const reducedMotion = useReducedMotion()
  const photoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reducedMotion) {
      setRevealed(true)
      return
    }
    const element = photoRef.current
    if (!element || !("IntersectionObserver" in window)) {
      setRevealed(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setRevealed(true)
        observer.disconnect()
      }
    }, { threshold: 0.08 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [reducedMotion])

  return <div ref={photoRef} className={`photo-frame ${className} ${missing ? "photo-missing" : ""} ${revealed ? "photo-revealed" : "photo-reveal"}`}>
    {!missing && <Image src={src} alt={alt} fill priority={priority} sizes={sizes} onError={() => setMissing(true)} className="photo-image" />}
    {missing && <div className="photo-fallback" aria-label={alt}><PalmMark light /><span>{alt}</span></div>}
  </div>
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M20.2 11.7a8.2 8.2 0 0 1-12.1 7.2L3.1 20l1.2-4.8a8.2 8.2 0 1 1 15.9-3.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M8.4 7.9c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.8 1.8c.1.2.1.4-.1.6l-.6.7c-.2.2-.2.4 0 .7.5.8 1.2 1.5 2 2 .3.2.5.2.7 0l.8-.9c.2-.2.4-.3.7-.2l1.8.9c.3.1.4.3.4.6 0 .4-.2 1.1-.7 1.5-.5.5-1.2.8-2 .7-1-.1-2.3-.7-3.7-1.9-1.8-1.5-2.8-3.4-2.9-4.4-.1-.8.2-1.5.7-2.1.2-.2.4-.3.6-.3Z" fill="currentColor"/></svg>
}

function OpenStatus() {
  const [open, setOpen] = useState(true)
  useEffect(() => {
    const update = () => {
      const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(new Date()).split(":").map(Number)
      const time = parts[0] * 60 + parts[1]
      setOpen(time >= 480 && time < 1410)
    }
    update()
    const timer = window.setInterval(update, 60_000)
    return () => window.clearInterval(timer)
  }, [])
  return <span className={`status-chip ${open ? "is-open" : ""}`}><span className="status-dot" />{open ? "Open now · closes 11:30 PM" : "Closed · opens 8:00 AM"}</span>
}

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  return <header className={`site-header ${scrolled ? "header-solid" : ""}`}>
    <Link href="/" className="brand" aria-label="Hotel Palm Paradise home"><PalmMark /><span><b>Palm Paradise</b><small>KOPARGAON · MAHARASHTRA</small></span></Link>
    <button className="mobile-menu-button" onClick={() => setNavOpen(!navOpen)} aria-label={navOpen ? "Close navigation" : "Open navigation"} aria-expanded={navOpen}>{navOpen ? <X /> : <MenuIcon />}</button>
    <nav className={`main-nav ${navOpen ? "nav-open" : ""}`} aria-label="Main navigation">
      <a href="/#terrace" onClick={() => setNavOpen(false)}>The terrace</a><Link href="/menu" onClick={() => setNavOpen(false)}>Menu</Link><Link href="/banquets" onClick={() => setNavOpen(false)}>Celebrations</Link><a href="/#visit" onClick={() => setNavOpen(false)}>Find us</a>
    </nav>
    <div className="header-actions"><a className="icon-call" href={`tel:+91${restaurant.phone}`} aria-label="Call Hotel Palm Paradise"><Phone size={17} /></a><a href={wa("Hello, I'd like to know more about Hotel Palm Paradise.")} className="header-whatsapp"><WhatsAppIcon size={16} /> WhatsApp</a></div>
  </header>
}

function Hero() {
  const reduceMotion = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(true)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const palmY = useTransform(scrollYProgress, [0, 1], [0, -145])
  const palmOpacity = useTransform(scrollYProgress, [0, 0.62, 1], [1, 0.9, 0])

  useEffect(() => {
    const element = heroRef.current
    if (!element || !("IntersectionObserver" in window)) return
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { rootMargin: "120px" })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return <section ref={heroRef} className="hero" aria-labelledby="hero-title">
    <div className="hero-photo"><Photo src="/images/sunset-hero.jpg" alt="Hotel Palm Paradise at sunset, with its turquoise roof and glowing garden lights" priority sizes="100vw" /></div>
    <div className="hero-overlay" />
    <div className={`hero-palms ${isVisible ? "" : "palms-paused"}`} aria-hidden="true"><motion.div className="hero-palm hero-palm-right" style={reduceMotion ? undefined : { y: palmY, opacity: palmOpacity }}><SwayingPalm flip /></motion.div></div>
    <div className="hero-content">
      <div className="hero-copy">
        <h1 id="hero-title"><span className="hero-word-line">Where taste</span><span className="hero-word-line"><em>meets elegance.</em></span></h1>
        <p>Pure veg family restaurant · Banquets · Garden · Rooftop terrace</p>
        <div className="hero-actions"><a className="button button-green" href={wa("Hello Hotel Palm Paradise! I'd like to reserve a table.")}>Reserve a table <ArrowRight size={16} /></a><Link className="button hero-menu-button" href="/menu">See the menu</Link></div>
        <div className="hero-badges"><span>Pure veg</span><span>Open daily 8 AM–11:30 PM</span><span>4.2 on Google</span></div>
      </div>
    </div>
  </section>
}

function Marquee() {
  const words = ["Paneer butter masala", "Masala dosa", "Veg biryani", "Hakka noodles", "Special thali"]
  return <div className="marquee" aria-label="Restaurant favourites"><div className="marquee-track">{[...words, ...words].map((word, i) => <span key={`${word}-${i}`}>{word}<i>✦</i></span>)}</div></div>
}

function WelcomeSection() {
  return <section id="welcome" className="welcome-section section-wrap">
    <div className="welcome-copy"><span className="eyebrow">A little paradise on the road</span><h2>Come as you are.<br /><em>Leave a little happier.</em></h2><p>On the road between Yeola and Kopargaon, there&apos;s a place where a family meal can turn into a celebration. Thoughtful vegetarian cooking, a welcoming team and room to make memories — from a quick South Indian breakfast to a lantern-lit evening on the terrace.</p><p className="welcome-marathi">शुद्ध शाकाहारी, मनापासून केलेले.</p><a className="text-link" href="#visit">Find your way here <ArrowRight size={16} /></a></div>
    <div className="welcome-images"><div className="welcome-photo-one"><Photo src="/images/entrance-sign.jpg" alt="The Palm Paradise entrance sign above the stone fountain" /><div className="fountain-ripples" aria-hidden="true"><span /><span /><span /></div></div><div className="welcome-caption"><span className="caption-sun" />A warm welcome, every day</div><div className="welcome-photo-two"><Photo src="/images/building-day.jpg" alt="The Palm Paradise building in the afternoon light" /></div></div>
  </section>
}

function TerraceSection() {
  const reducedMotion = useReducedMotion()
  const terraceRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(true)
  const { scrollYProgress } = useScroll({ target: terraceRef, offset: ["start end", "end start"] })
  const nightOpacity = useTransform(scrollYProgress, [0, 0.38, 0.82, 1], [0, 0.5, 0.92, 1])
  const stackBackRotation = useTransform(scrollYProgress, [0, 1], [-8, -4])
  const stackMidRotation = useTransform(scrollYProgress, [0, 1], [0, 2])
  const stackFrontRotation = useTransform(scrollYProgress, [0, 1], [6, 8])
  const stackBackX = useTransform(scrollYProgress, [0, 1], [0, 18])
  const stackMidX = useTransform(scrollYProgress, [0, 1], [0, -14])
  const stackFrontX = useTransform(scrollYProgress, [0, 1], [0, 28])

  useEffect(() => {
    const element = terraceRef.current
    if (!element || !("IntersectionObserver" in window)) return
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { rootMargin: "120px" })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return <section ref={terraceRef} id="terrace" className={`terrace-section ${isVisible ? "is-in-view" : "is-out-of-view"}`}>
    <motion.div className="terrace-night-overlay" aria-hidden="true" style={reducedMotion ? { opacity: 0.75 } : { opacity: nightOpacity }} />
    <motion.div className="terrace-light-layer" aria-hidden="true" style={reducedMotion ? { opacity: 0.55 } : { opacity: nightOpacity }}>
      <div className="terrace-stars">{Array.from({ length: 18 }, (_, index) => <i key={index} style={{ left: `${(index * 47 + 9) % 97}%`, top: `${(index * 31 + 11) % 63}%`, animationDelay: `${(index % 7) * 0.31}s` }} />)}</div>
      <svg className="fairy-strings" viewBox="0 0 1000 210" preserveAspectRatio="none">
        <path d="M0 18 Q250 105 500 28 T1000 38" /><path d="M0 98 Q250 8 500 110 T1000 90" />
        {[0, 1].map((line) => Array.from({ length: 14 }, (_, index) => {
          const x = 28 + index * 72
          const t = x / 1000
          const y = line === 0 ? 18 + 82 * (1 - Math.abs(t - 0.5) * 2) + 18 * t : 98 - 78 * (1 - Math.abs(t - 0.5) * 2) - 8 * t
          return <circle key={`${line}-${index}`} className="fairy-light" cx={x} cy={y} r={line === 0 ? 3.2 : 2.7} style={{ animationDelay: `${((index * 11 + line * 7) % 35) / 10}s`, animationDuration: `${1.8 + ((index * 3 + line) % 18) / 10}s` }} />
        }))}
      </svg>
      <div className="hanging-lanterns">{[0, 1, 2].map((index) => <svg key={index} className={`hanging-lantern lantern-${index + 1}`} viewBox="0 0 52 100"><defs><radialGradient id={`lantern-glow-${index}`}><stop stopColor="#ffe6a0" stopOpacity=".9" /><stop offset="1" stopColor="#f2a541" stopOpacity="0" /></radialGradient></defs><path d="M26 0v22" stroke="#c9ae70" strokeWidth="1.5"/><circle cx="26" cy="56" r="31" fill={`url(#lantern-glow-${index})`} opacity=".45"/><path d="M18 22h16l5 9v33l-5 9H18l-5-9V31l5-9Z" fill="#e4b965" fillOpacity=".22" stroke="#e8c983" strokeWidth="1.5"/><path d="M17 34h18M17 61h18M26 31v33" stroke="#f7dc9a" strokeWidth="1" opacity=".8"/><circle cx="26" cy="47" r="5" fill="#ffe7a9" /></svg>)}</div>
    </motion.div>
    <div className="terrace-orb orb-one" /><div className="terrace-orb orb-two" />
    <svg className="vine-decoration" viewBox="0 0 1000 150" preserveAspectRatio="none" aria-hidden="true"><path d="M0 18C170 8 210 78 370 58S630 10 760 53s165 48 240 22" fill="none" stroke="#8cad72" strokeWidth="3"/>{Array.from({ length: 15 }, (_, index) => { const x = index * 69 + 18; const y = 20 + Math.sin(index * 0.72) * 27; return <g key={index} transform={`translate(${x} ${y}) rotate(${(index % 2 ? 1 : -1) * (18 + (index % 4) * 5)})`}><path d="M0 0C-14-18-30-15-34-5C-24 7-10 7 0 0Z" fill="#3f7044" stroke="#89a96d" strokeWidth="1.2"/><path d="M0 0C13-19 28-17 32-7C24 5 10 7 0 0Z" fill="#547f4c" stroke="#9bb778" strokeWidth="1.2"/><path d="M-27-5L-2 0M26-7L2 0" stroke="#9db97b" strokeWidth=".8"/></g>})}</svg>
    <div className="terrace-inner section-wrap"><div className="terrace-copy"><span className="eyebrow eyebrow-light">As evening settles in</span><div className="terrace-title-row"><h2>The Terrace</h2><SwayingPalm className="terrace-heading-palm" /></div><p className="terrace-italic">A little sky above.<br />A little magic all around.</p><p>Settle beneath the white pergola, where green vines sway overhead and lanterns begin to glow. A rooftop dinner with your favourite people is a fine way to end the day.</p><a className="button button-sand" href={wa("Hello! I'd love to book a table on the rooftop terrace.")}>Book a terrace table <ArrowRight size={16} /></a></div>
      <div className="terrace-stack"><motion.div className="terrace-photo terrace-photo-back" style={reducedMotion ? undefined : { rotate: stackBackRotation, x: stackBackX }}><Photo src="/images/terrace-2.jpg" alt="Lanterns and vines on the Palm Paradise rooftop terrace" /></motion.div><motion.div className="terrace-photo terrace-photo-mid" style={reducedMotion ? undefined : { rotate: stackMidRotation, x: stackMidX }}><Photo src="/images/terrace-3.jpg" alt="Colourful tile border and turquoise backdrop on the rooftop" /></motion.div><motion.div className="terrace-photo terrace-photo-front" style={reducedMotion ? undefined : { rotate: stackFrontRotation, x: stackFrontX }}><Photo src="/images/terrace-1.jpg" alt="White pergola and hanging leafy vines on the rooftop terrace" /></motion.div><div className="terrace-stamp"><span>MADE FOR</span><b>slow<br />evenings</b><i>✳</i></div></div></div>
  </section>
}

function MenuSection({ full = false }: { full?: boolean }) {
  const [category, setCategory] = useState<MenuCategory>("Soups & starters")
  const [search, setSearch] = useState("")
  const [jainOnly, setJainOnly] = useState(false)
  const [cart, setCart] = useState<Record<string, number>>({})
  const [added, setAdded] = useState("")
  const filtered = useMemo(() => dishes.filter((dish) => dish.category === category && (!jainOnly || dish.jain) && `${dish.name} ${dish.description}`.toLowerCase().includes(search.toLowerCase())), [category, full, jainOnly, search])
  const count = Object.values(cart).reduce((a, b) => a + b, 0)
  const total = dishes.reduce((sum, dish) => sum + (cart[dish.id] || 0) * dish.price, 0)
  function change(id: string, amount: number) { setCart((prev) => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) + amount) })); if (amount > 0) { setAdded(id); window.setTimeout(() => setAdded(""), 600) } }
  function order() { const list = dishes.filter((dish) => cart[dish.id]).map((dish) => `${dish.name} × ${cart[dish.id]} — ${formatPrice(dish.price * cart[dish.id])}`).join("\n"); window.open(wa(`Hello Hotel Palm Paradise! I'd like to place a takeaway order.\n\n${list}\n\nTotal: ${formatPrice(total)}\nName: [Your name]\nPickup time: [Preferred pickup time]`), "_blank", "noopener,noreferrer") }
  return <section id="menu" className={`menu-section section-wrap ${full ? "menu-page-section" : ""}`}>
    <div className="section-heading"><span className="eyebrow">A menu made for everyone</span><h2>Good things, <em>made veg.</em></h2><p>North Indian, South Indian and Chinese favourites — all made fresh, all vegetarian. Jain preparations available on request.</p><div className="menu-heading-note"><span className="veg-mark" /> 100% vegetarian <span className="note-divider">·</span> Jain food on request</div></div>
    {!full && <div className="menu-controls"><div className="category-tabs" role="tablist" aria-label="Menu categories">{categories.map((item) => <button key={item} className={category === item ? "active" : ""} role="tab" aria-selected={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div><div className="menu-tools"><label className="menu-search"><Search size={16} /><input placeholder="Find a dish" aria-label="Search dishes" value={search} onChange={(e) => setSearch(e.target.value)} /></label><label className="jain-toggle"><input type="checkbox" checked={jainOnly} onChange={(e) => setJainOnly(e.target.checked)} /><span className="toggle-track" /> Jain options</label></div></div>}
    {full && <div className="menu-tools menu-tools-full"><label className="menu-search"><Search size={16} /><input placeholder="Find a dish" aria-label="Search dishes" value={search} onChange={(e) => setSearch(e.target.value)} /></label><label className="jain-toggle"><input type="checkbox" checked={jainOnly} onChange={(e) => setJainOnly(e.target.checked)} /><span className="toggle-track" /> Jain options</label></div>}
    {full && <div className="menu-category-list">{categories.map((item) => <button key={item} className={category === item ? "selected" : ""} onClick={() => setCategory(item)}>{item}<ArrowRight size={14} /></button>)}</div>}
    <motion.div className="dish-grid" layout>{filtered.length ? filtered.map((dish, index) => <motion.article layout key={dish.id} className={`dish-card ${added === dish.id ? "dish-added" : ""}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.035 }}><div className="dish-info"><div className="dish-title-row"><span className="veg-mark" /><h3>{dish.name}</h3>{dish.jain && <span className="jain-label">JAIN</span>}</div><p>{dish.description}</p><strong>{formatPrice(dish.price)}</strong></div><div className="dish-action">{cart[dish.id] ? <div className="qty-stepper"><button aria-label={`Remove one ${dish.name}`} onClick={() => change(dish.id, -1)}><Minus size={14} /></button><span>{cart[dish.id]}</span><button aria-label={`Add one ${dish.name}`} onClick={() => change(dish.id, 1)}><Plus size={14} /></button></div> : <button className="dish-add" onClick={() => change(dish.id, 1)}>Add <Plus size={13} /></button>}{added === dish.id && <span className="added-pop">+1</span>}</div></motion.article>) : <p className="empty-menu">No dishes found. Try another search.</p>}</motion.div>
    {!full && <div className="menu-footer-link"><Link className="button button-outline" href="/menu">Explore the full menu <ArrowRight size={15} /></Link><span>Menu prices are indicative; please check with our team.</span></div>}
    <AnimatePresence>{count > 0 && <motion.div className="cart-bar" initial={{ y: 90, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 90, opacity: 0 }} transition={{ type: "spring", stiffness: 330, damping: 27 }}><div className="cart-count"><span>{count}</span><small>{count === 1 ? "item" : "items"}</small></div><div className="cart-total">{formatPrice(total)}<small>Takeaway subtotal</small></div><button onClick={order}>Order on WhatsApp <ArrowRight size={15} /></button></motion.div>}</AnimatePresence>
  </section>
}

function VenuesSection() {
  return <section className="venues-section section-wrap"><div className="section-heading section-heading-left"><span className="eyebrow">Make a day of it</span><h2>Room for every <em>gathering.</em></h2><p>From a family lunch to a once-in-a-lifetime celebration, there&apos;s a place for it here.</p></div><div className="venue-grid">{venues.map((venue, i) => <Link key={venue.name} href="/banquets" className={`venue-card venue-${i + 1}`}><div className="venue-number">{venue.icon}</div><div><h3>{venue.name}</h3><p>{venue.note}</p><span className="venue-capacity"><Users size={14} />{venue.capacity}</span></div><ArrowRight className="venue-arrow" size={18} /></Link>)}</div><div className="occasion-chips">{eventOccasions.map((occasion) => <span key={occasion}>{occasion}</span>)}</div><div className="venues-note">A setting for wedding receptions, birthdays, naming ceremonies, conferences &amp; CMEs.</div></section>
}

function GallerySection() {
  const [active, setActive] = useState<number | null>(null)
  function move(direction: number) { setActive((current) => current === null ? 0 : (current + direction + photos.length) % photos.length) }
  useEffect(() => { if (active === null) return; const key = (e: KeyboardEvent) => { if (e.key === "Escape") setActive(null); if (e.key === "ArrowRight") move(1); if (e.key === "ArrowLeft") move(-1) }; window.addEventListener("keydown", key); return () => window.removeEventListener("keydown", key) }, [active])
  return <section className="gallery-section section-wrap"><div className="gallery-heading"><div><span className="eyebrow">A glimpse of paradise</span><h2>Come take <em>a look.</em></h2></div><a href={restaurant.instagram} target="_blank" rel="noreferrer" className="instagram-link"><Camera size={16} /> @hotelpalmparadise <ArrowRight size={14} /></a></div><div className="gallery-grid">{photos.map((photo, i) => <button className={`gallery-tile gallery-tile-${i + 1}`} key={photo.src} onClick={() => setActive(i)} aria-label={`Open photo: ${photo.alt}`}><Photo src={photo.src} alt={photo.alt} /></button>)}</div>
    <AnimatePresence>{active !== null && <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label="Photo gallery" onClick={() => setActive(null)}><button className="lightbox-close" onClick={() => setActive(null)} aria-label="Close gallery"><X /></button><button className="lightbox-arrow lightbox-prev" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); move(-1) }}><ChevronLeft /></button><div className="lightbox-image" onClick={(e) => e.stopPropagation()}><Photo src={photos[active].src} alt={photos[active].alt} sizes="90vw" /></div><button className="lightbox-arrow lightbox-next" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); move(1) }}><ChevronRight /></button><p>{photos[active].alt}</p></motion.div>}</AnimatePresence>
  </section>
}

function GuestSection() {
  const mentions = ["Tasty, homely food", "Clean kitchen", "Quick, polite staff", "Calm family setting"]
  return <section className="guest-section"><div className="guest-inner section-wrap"><div className="rating-block"><span className="eyebrow eyebrow-light">A good word travels</span><div className="rating-number">4.2<span>/5</span></div><div className="rating-stars" aria-label="4.2 out of 5 stars">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={17} fill="currentColor" style={i === 4 ? { opacity: 0.35 } : undefined} />)}</div><p>Google rating · around 290 reviews</p><a className="button button-sand" href={restaurant.reviews} target="_blank" rel="noreferrer">Read reviews on Google <ArrowRight size={15} /></a></div><div className="guest-mentions"><span className="eyebrow eyebrow-light">What guests mention</span>{mentions.map((item, i) => <div className="mention-row" key={item}><span>0{i + 1}</span><p>{item}</p><Check size={15} /></div>)}<small>Shared themes from guest feedback — not individual quotes.</small></div></div></section>
}

function InstagramSection() {
  return <section className="instagram-section"><div className="instagram-top"><div><span className="eyebrow">A little more of us</span><h2>Follow the <em>good times.</em></h2></div><a href={restaurant.instagram} target="_blank" rel="noreferrer" className="insta-follow"><Camera size={17} /> @hotelpalmparadise <span>2.7k followers</span></a></div><div className="instagram-photos">{photos.map((photo) => <a key={photo.src} href={restaurant.instagram} target="_blank" rel="noreferrer" aria-label={`See ${photo.alt} on Instagram`}><Photo src={photo.src} alt={photo.alt} sizes="20vw" /></a>)}</div></section>
}

function VisitSection() {
  return <section id="visit" className="visit-section section-wrap"><div className="visit-copy"><span className="eyebrow">We&apos;ll leave the light on</span><h2>Come find <em>your way here.</em></h2><p className="visit-marathi">आमच्याकडे या, तुमचंच घर समजा.</p><div className="visit-detail"><MapPin size={19} /><div><b>Hotel Palm Paradise</b><p>{restaurant.address}<br />Opposite the HP petrol pump</p></div></div><div className="visit-detail"><Clock3 size={19} /><div><b>Every day, 8:00 AM – 11:30 PM</b><p>Open daily · Indian Standard Time</p></div></div><div className="visit-actions"><a className="button button-green" href={restaurant.directions} target="_blank" rel="noreferrer">Get directions <ArrowRight size={15} /></a><a className="button button-outline" href={`tel:+91${restaurant.phone}`}><Phone size={15} /> 8329085092</a></div></div><div className="map-wrap"><iframe title="Map to Hotel Palm Paradise, Kopargaon" src={restaurant.map} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /><a className="map-label" href={restaurant.directions} target="_blank" rel="noreferrer"><MapPin size={15} /> Nagar–Manmad Road · Kopargaon</a></div></section>
}

function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const element = footerRef.current
    if (!element || !("IntersectionObserver" in window)) return
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { rootMargin: "120px" })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return <footer ref={footerRef} className={`site-footer ${isVisible ? "is-in-view" : "is-out-of-view"}`}><div className="footer-main"><Link href="/" className="footer-brand"><SwayingPalm className="footer-palm" /><span><b>Palm Paradise</b><small>WHERE TASTE MEETS ELEGANCE</small></span></Link><p>Good food. Warm welcomes.<br />A little paradise in Kopargaon.</p><div className="footer-links"><Link href="/menu">Menu</Link><Link href="/banquets">Banquets &amp; events</Link><a href={restaurant.instagram} target="_blank" rel="noreferrer">Instagram</a><a href={`tel:+91${restaurant.phone}`}>Call us</a></div><div className="footer-social"><a href={restaurant.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Camera size={17} /></a><a href={wa("Hello Hotel Palm Paradise!")} aria-label="WhatsApp"><WhatsAppIcon size={17} /></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Hotel Palm Paradise · Kopargaon, Maharashtra</span><span>शुद्ध शाकाहारी · Pure vegetarian</span></div></footer>
}

function BanquetEnquiry() {
  const [event, setEvent] = useState<string>(eventOccasions[0])
  const [date, setDate] = useState("")
  const [guests, setGuests] = useState("100")
  const [venue, setVenue] = useState<string>(venues[0].name)
  const [pack, setPack] = useState<string>(packages[1].name)
  const [name, setName] = useState("")
  const unit = packages.find((p) => p.name === pack)?.price || 0
  const estimate = (Number(guests) || 0) * unit
  function enquire(e: React.FormEvent) { e.preventDefault(); window.open(wa(`Hello Hotel Palm Paradise! I'd like to enquire about an event.\nName: ${name || "[Your name]"}\nEvent: ${event}\nDate: ${date || "Flexible"}\nGuests: ${guests}\nVenue: ${venue}\nPackage: ${pack} (${formatPrice(unit)}/plate)\nEstimated total: ${formatPrice(estimate)}`), "_blank", "noopener,noreferrer") }
  return <form className="event-form" onSubmit={enquire}><div className="event-form-heading"><span className="eyebrow">Tell us what you&apos;re planning</span><h2>Let&apos;s make it <em>memorable.</em></h2><p>Share a few details and our team will be in touch on WhatsApp.</p></div><div className="event-fields"><label>Your name<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" /></label><label>Celebration<select value={event} onChange={(e) => setEvent(e.target.value)}>{eventOccasions.map((o) => <option key={o}>{o}</option>)}</select></label><label>Preferred date<input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label><label>Number of guests<input type="number" min="1" max="1000" value={guests} onChange={(e) => setGuests(e.target.value)} /></label><label>Venue<select value={venue} onChange={(e) => setVenue(e.target.value)}>{venues.map((v) => <option key={v.name}>{v.name}</option>)}</select></label><label>Veg menu package<select value={pack} onChange={(e) => setPack(e.target.value)}>{packages.map((p) => <option key={p.name} value={p.name}>{p.name} · {formatPrice(p.price)}/plate</option>)}</select></label></div><div className="estimate"><div><span>Indicative estimate</span><small>{guests || 0} guests × {formatPrice(unit)} per plate</small></div><strong>{formatPrice(estimate)}</strong></div><p className="estimate-note">Final arrangements and pricing confirmed by our events team.</p><button className="button button-green event-submit" type="submit">Send enquiry on WhatsApp <ArrowRight size={16} /></button></form>
}

function BanquetsPageContent() {
  return <><section className="subpage-hero banquet-hero"><div className="subpage-hero-copy"><span className="eyebrow eyebrow-light">A place for all your people</span><h1>Gather beautifully.<br /><em>Celebrate together.</em></h1><p>From a family milestone to a conference, make it a day that feels like yours.</p><div className="subpage-hero-actions"><a href="#enquire" className="button button-sand">Plan your event <ArrowRight size={15} /></a><OpenStatus /></div></div><Photo src="/images/terrace-1.jpg" alt="The Palm Paradise rooftop terrace ready for an evening celebration" priority /></section><section className="banquet-intro section-wrap"><span className="eyebrow">Four ways to celebrate</span><h2>Find your <em>perfect setting.</em></h2><p className="intro-copy">A little more room, a little more time, a lot of reasons to come together.</p><div className="banquet-venues">{venues.map((venue, i) => <article className="banquet-venue" key={venue.name}><span className="banquet-index">0{i + 1}</span><div><h3>{venue.name}</h3><p>{venue.note}</p></div><span className="venue-capacity"><Users size={14} /> {venue.capacity}</span></article>)}</div><div className="occasion-chips">{eventOccasions.map((o) => <span key={o}>{o}</span>)}</div></section><section id="enquire" className="event-section"><div className="section-wrap event-section-inner"><div className="event-side"><span className="eyebrow eyebrow-light">A good day starts here</span><h2>We&apos;ll help with<br /><em>the little things.</em></h2><p>Vegetarian menus, warm service and spaces that bring people together. Tell us what you have in mind — we&apos;ll take it from there.</p><div className="event-side-detail"><Phone size={17} /><span>Prefer to talk? <a href={`tel:+91${restaurant.phone}`}>8329085092</a></span></div></div><BanquetEnquiry /></div></section></>
}

function EveningTint() {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 450, 1450, 2300], [1, 0.76, 0.3, 0])
  return <motion.div className="evening-tint" aria-hidden="true" style={{ opacity }} />
}

export function HomePage() {
  return <><EveningTint /><Header /><main><Hero /><Marquee /><WelcomeSection /><TerraceSection /><MenuSection /><VenuesSection /><GallerySection /><GuestSection /><InstagramSection /><VisitSection /></main><Footer /><a className="floating-whatsapp" href={wa("Hello Hotel Palm Paradise!")} target="_blank" rel="noreferrer" aria-label="Chat with Hotel Palm Paradise on WhatsApp"><WhatsAppIcon size={21} /><span>Let&apos;s chat</span></a></>
}

export function MenuPage() {
  return <><Header /><main><section className="simple-page-hero"><span className="eyebrow">Fresh from our kitchen</span><h1>Good things, <em>made veg.</em></h1><p>North Indian · South Indian · Chinese · Jain food on request</p><OpenStatus /></section><MenuSection full /><VisitSection /></main><Footer /></>
}

export function BanquetsPage() {
  return <><Header /><main><BanquetsPageContent /><VisitSection /></main><Footer /></>
}
