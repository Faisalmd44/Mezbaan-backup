'use client'

import { useMemo, useState, useEffect } from 'react'
import Image from 'next/image'
import { CATEGORIES, MENU, BRAND } from '@/lib/menu'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  ShoppingBag, Search, Plus, Minus, X, Flame, Star,
  MessageCircle, Phone, MapPin, ArrowRight, Utensils, Leaf, Drumstick
} from 'lucide-react'

const inr = (n) => `₹${n}`

function Logo({ size = "md" }) {
  const hClass = size === "lg" ? "h-24 md:h-28" : "h-14 md:h-16"
  return (
    <div className="flex items-center py-1">
      <Image
        src="/Logo.png"
        alt="Mezbaan"
        width={320}
        height={110}
        priority
        className={`${hClass} w-auto object-contain cursor-pointer transition-transform duration-200 hover:scale-105`}
      />
    </div>
  )
}

function Navbar({ cartCount, onCartClick }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', on)
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
          <a href="#home" className="hover:text-[color:var(--mez-yellow)] transition">Home</a>
          <a href="#menu" className="hover:text-[color:var(--mez-yellow)] transition">Menu</a>
          <a href="#about" className="hover:text-[color:var(--mez-yellow)] transition">About</a>
          <a href="#contact" className="hover:text-[color:var(--mez-yellow)] transition">Contact</a>
        </nav>
        <button onClick={onCartClick} className="relative flex items-center gap-2 bg-[color:var(--mez-yellow)] hover:bg-[color:var(--mez-yellow-dark)] text-black font-bold px-4 py-2 rounded-full transition">
          <ShoppingBag className="w-4 h-4" />
          <span className="hidden sm:inline">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[22px] h-[22px] px-1 rounded-full bg-black text-[color:var(--mez-yellow)] text-xs font-bold flex items-center justify-center ring-2 ring-[color:var(--mez-yellow)]">{cartCount}</span>
          )}
        </button>
      </div>
    </header>
  )
}

function Hero({ onOrder }) {
  return (
    <section id="home" className="hero-gradient min-h-screen pt-28 md:pt-32 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-10 items-center relative z-10">
        <div className="fade-up">
          <Badge className="bg-[color:var(--mez-yellow)]/15 text-[color:var(--mez-yellow)] border border-[color:var(--mez-yellow)]/30 rounded-full px-4 py-1 mb-6">
            <Flame className="w-3.5 h-3.5 mr-1" /> Now serving in Jamia Nagar
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight">
            Freshly <span className="text-[color:var(--mez-yellow)]">Crafted.</span><br />
            Honestly <span className="underline decoration-[color:var(--mez-yellow)] decoration-8 underline-offset-4">Served.</span>
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-lg">
            Burgers, Pizza, Pasta, Wraps, Fries and our signature <span className="text-[color:var(--mez-yellow)] font-semibold">Chicken Cheese Burst Nuggets</span>.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button onClick={onOrder} className="bg-[color:var(--mez-yellow)] hover:bg-[color:var(--mez-yellow-dark)] text-black font-bold px-8 py-6 rounded-full text-base pulse-glow">
              Order Now <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button asChild variant="outline" className="border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-6 rounded-full text-base bg-transparent">
              <a href="#menu">View Menu</a>
            </Button>
          </div>

          <div className="mt-4 flex flex-wrap gap-4">
            <a
              href="https://zomato.onelink.me/xqzv/pxqsyv83"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 shadow-lg transition-all"
            >
              🍽️ Order on Zomato
            </a>

            <a
              href="https://www.instagram.com/mezbaann_?igsh=YTdzZXZ3MXNpazJ6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white font-bold px-6 py-3 shadow-lg transition-all"
            >
              📷 Follow on Instagram
            </a>
          </div>

          <div className="mt-10 flex items-center gap-6 text-sm text-white/60">
            <div className="flex items-center gap-2"><Star className="w-4 h-4 text-[color:var(--mez-yellow)] fill-[color:var(--mez-yellow)]" /> 4.7 rated</div>
            <div className="flex items-center gap-2"><Flame className="w-4 h-4 text-[color:var(--mez-yellow)]" /> Fast delivery</div>
            <div className="flex items-center gap-2"><Drumstick className="w-4 h-4 text-[color:var(--mez-yellow)]" /> Fresh daily</div>
          </div>
        </div>

        <div className="relative h-[380px] md:h-[560px]">
          <div className="absolute inset-0 rounded-full bg-[color:var(--mez-yellow)]/25 blur-3xl" />
          <div className="relative w-full h-full float-anim">
            <Image
              src="https://images.pexels.com/photos/12325287/pexels-photo-12325287.jpeg?auto=compress&cs=tinysrgb&w=900"
              alt="Mezbaan signature burger"
              fill
              priority
              unoptimized
              className="object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.6)]"
            />
          </div>
          <div className="absolute top-6 right-2 md:right-8 bg-white text-black rounded-2xl px-4 py-3 shadow-xl rotate-6">
            <div className="text-xs text-black/60">Signature</div>
            <div className="font-bold">Cheese Burst Nuggets</div>
            <div className="text-[color:var(--mez-yellow-dark)] font-black">from ₹109</div>
          </div>
          <div className="absolute bottom-6 left-2 md:left-4 bg-black border border-[color:var(--mez-yellow)]/40 rounded-2xl px-4 py-3 shadow-xl -rotate-3">
            <div className="text-xs text-white/60">Zinger Combo</div>
            <div className="font-bold text-white">Burger + Fries + Drink</div>
            <div className="text-[color:var(--mez-yellow)] font-black">₹199</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function VegBadge({ veg }) {
  return (
    <div className={`w-4 h-4 border-2 ${veg ? 'border-green-500' : 'border-red-500'} flex items-center justify-center`}>
      <div className={`w-1.5 h-1.5 rounded-full ${veg ? 'bg-green-500' : 'bg-red-500'}`} />
    </div>
  )
}

function MenuCard({ item, qty, onAdd, onInc, onDec }) {
  const [selectedVariant, setSelectedVariant] = useState(
    item.variants && item.variants.length > 0 ? item.variants[0] : null
  )

  const currentPrice = selectedVariant ? selectedVariant.price : item.price
  const displayName = selectedVariant ? `${item.name} (${selectedVariant.name})` : item.name
  const itemKey = selectedVariant ? `${item.id}-${selectedVariant.name}` : item.id

  return (
    <div className="group relative bg-neutral-900/90 border border-white/10 rounded-2xl overflow-hidden hover:border-[color:var(--mez-yellow)]/50 transition duration-300 flex flex-col justify-between shadow-lg">
      <div>
        <div className="relative h-48 w-full overflow-hidden bg-neutral-800">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {item.popular && (
            <span className="absolute top-3 left-3 bg-[color:var(--mez-yellow)] text-black text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
              Popular
            </span>
          )}
          <span className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full ${item.veg ? "bg-green-600/90 text-white" : "bg-red-600/90 text-white"} shadow backdrop-blur-sm`}>
            {item.veg ? "VEG" : "NON-VEG"}
          </span>
        </div>

        <div className="p-4">
          <h4 className="font-bold text-lg text-white group-hover:text-[color:var(--mez-yellow)] transition">
            {item.name}
          </h4>
          <p className="text-white/60 text-xs mt-1 line-clamp-2 leading-relaxed">
            {item.desc}
          </p>

          {item.variants && item.variants.length > 0 && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs text-white/50 font-medium">Size:</span>
              <div className="flex gap-1.5">
                {item.variants.map((v) => {
                  const isActive = selectedVariant?.name === v.name
                  return (
                    <button
                      key={v.name}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedVariant(v)
                      }}
                      className={`text-xs px-2.5 py-1 rounded-md font-bold transition ${
                        isActive
                          ? "bg-[color:var(--mez-yellow)] text-black shadow"
                          : "bg-neutral-800 text-white/70 hover:bg-neutral-700 hover:text-white border border-white/10"
                      }`}
                    >
                      {v.name} · {inr(v.price)}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 pt-0 flex items-center justify-between mt-2 border-t border-white/5">
        <div>
          <span className="text-xs text-white/40 block">Price</span>
          <span className="text-xl font-extrabold text-[color:var(--mez-yellow)]">
            {inr(currentPrice)}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onAdd({ ...item, id: itemKey, name: displayName, price: currentPrice })}
          className="bg-[color:var(--mez-yellow)] hover:bg-yellow-400 text-black font-bold px-4 py-2 rounded-xl text-sm transition transform active:scale-95 shadow"
        >
          Add +
        </button>
      </div>
    </div>
  )
}

function MenuSection({ cart, onAdd, onInc, onDec }) {
  const [query, setQuery] = useState('')
  const [activeCat, setActiveCat] = useState('all')
  const [vegOnly, setVegOnly] = useState(false)

  const filtered = useMemo(() => {
    return MENU.filter(m => {
      if (activeCat !== 'all' && m.category !== activeCat) return false
      if (vegOnly && !m.veg) return false
      if (query && !m.name.toLowerCase().includes(query.toLowerCase())) return false
      return true
    })
  }, [query, activeCat, vegOnly])

  const grouped = useMemo(() => {
    const g = {}
    filtered.forEach(item => {
      g[item.category] = g[item.category] || []
      g[item.category].push(item)
    })
    return g
  }, [filtered])

  return (
    <section id="menu" className="py-16 md:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <p className="text-[color:var(--mez-yellow)] font-semibold tracking-widest text-sm">OUR MENU</p>
          <h2 className="text-4xl md:text-6xl font-black mt-2">Made <span className="text-[color:var(--mez-yellow)]">Fresh.</span> Served <span className="text-[color:var(--mez-yellow)]">Hot.</span></h2>
        </div>

        {/* Search + Veg toggle */}
        <div className="flex flex-col md:flex-row gap-3 mb-6 max-w-3xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search burgers, pizza, nuggets…"
              className="pl-12 h-12 bg-neutral-900 border-white/10 text-white placeholder:text-white/40 rounded-full focus-visible:ring-[color:var(--mez-yellow)]"
            />
          </div>
          <button
            onClick={() => setVegOnly(v => !v)}
            className={`h-12 px-6 rounded-full font-semibold border transition flex items-center justify-center gap-2 ${vegOnly ? 'bg-green-600 border-green-600 text-white' : 'bg-neutral-900 border-white/10 text-white/80 hover:border-white/30'}`}
          >
            <Leaf className="w-4 h-4" /> Veg Only
          </button>
        </div>

        {/* Category chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-8 -mx-4 px-4 md:justify-center">
          <button onClick={() => setActiveCat('all')} className={`shrink-0 px-5 py-2 rounded-full font-semibold text-sm transition ${activeCat === 'all' ? 'bg-[color:var(--mez-yellow)] text-black' : 'bg-neutral-900 text-white/70 hover:bg-neutral-800'}`}>All</button>
          {CATEGORIES.map(c => (
            <button key={c.id} onClick={() => setActiveCat(c.id)} className={`shrink-0 px-5 py-2 rounded-full font-semibold text-sm transition flex items-center gap-1.5 ${activeCat === c.id ? 'bg-[color:var(--mez-yellow)] text-black' : 'bg-neutral-900 text-white/70 hover:bg-neutral-800'}`}>
              <span>{c.emoji}</span> {c.name}
            </button>
          ))}
        </div>

        {/* Grouped grids */}
        {Object.keys(grouped).length === 0 && (
          <div className="text-center text-white/50 py-20">No items match your search.</div>
        )}
        {CATEGORIES.filter(c => grouped[c.id]).map(cat => (
          <div key={cat.id} className="mb-12">
            <h3 className="text-2xl md:text-3xl font-black mb-5 flex items-center gap-3">
              <span className="text-3xl">{cat.emoji}</span> {cat.name}
              <span className="h-px bg-white/10 flex-1 ml-4" />
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {grouped[cat.id].map(item => (
                <MenuCard
                  key={item.id}
                  item={item}
                  qty={cart[item.id]?.qty || 0}
                  onAdd={onAdd}
                  onInc={onInc}
                  onDec={onDec}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function CartDrawer({ open, onClose, cart, onInc, onDec, onRemove }) {
  const items = Object.values(cart)
  const total = items.reduce((s, i) => s + i.price * i.qty, 0)
  const totalQty = items.reduce((s, i) => s + i.qty, 0)

  const whatsappOrder = () => {
    if (items.length === 0) return
    const lines = items.map((i, idx) => `${idx + 1}. ${i.name} x${i.qty} — ₹${i.price * i.qty}`).join('%0A')
    const msg = `Hi Mezbaan! I'd like to place an order:%0A%0A${lines}%0A%0A*Total: ₹${total}*%0A%0AName: %0AAddress: %0APhone: `
    window.open(`https://wa.me/${BRAND.phoneRaw}?text=${msg}`, '_blank')
  }

  return (
    <>
      <div className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />
      <aside className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-neutral-950 border-l border-white/10 z-50 shadow-2xl transition-transform duration-300 flex flex-col ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <div className="text-xs text-white/50 tracking-widest">YOUR ORDER</div>
            <div className="font-black text-xl flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[color:var(--mez-yellow)]" />
              {totalQty} {totalQty === 1 ? 'item' : 'items'}
            </div>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center"><X className="w-4 h-4" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-3">🍔</div>
              <p className="text-white/60">Your cart is empty.</p>
              <p className="text-white/40 text-sm mt-1">Add something delicious!</p>
            </div>
          ) : items.map(i => (
            <div key={i.id} className="flex gap-3 bg-neutral-900 rounded-xl p-3 border border-white/5">
              <div className="w-14 h-14 rounded-lg bg-neutral-800 shrink-0 overflow-hidden">
                <img src={i.image || 'https://images.pexels.com/photos/20535804/pexels-photo-20535804.jpeg?auto=compress&cs=tinysrgb&w=200'} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="font-semibold text-sm leading-tight">{i.name}</div>
                  <button onClick={() => onRemove(i)} className="text-white/40 hover:text-red-400"><X className="w-3.5 h-3.5" /></button>
                </div>
                <div className="text-[color:var(--mez-yellow)] text-sm font-bold mt-0.5">₹{i.price * i.qty}</div>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => onDec(i)} className="w-7 h-7 rounded-md bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center"><Minus className="w-3.5 h-3.5" /></button>
                  <span className="text-sm font-bold w-5 text-center">{i.qty}</span>
                  <button onClick={() => onInc(i)} className="w-7 h-7 rounded-md bg-[color:var(--mez-yellow)] text-black hover:bg-[color:var(--mez-yellow-dark)] flex items-center justify-center"><Plus className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-5 border-t border-white/10 bg-neutral-950 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-white/60">Total</span>
            <span className="text-2xl font-black text-[color:var(--mez-yellow)]">₹{total}</span>
          </div>
          <Button onClick={whatsappOrder} disabled={items.length === 0} className="w-full h-12 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full text-base disabled:opacity-40">
            <MessageCircle className="w-5 h-5 mr-2" /> Order on WhatsApp
          </Button>
          <a href={`tel:${BRAND.phone}`} className="w-full h-11 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-full text-sm flex items-center justify-center">
            <Phone className="w-4 h-4 mr-2" /> Call to Order — {BRAND.phone}
          </a>
          <p className="text-[11px] text-white/40 text-center">Your cart details will be pre-filled in WhatsApp. Just add your address and hit send.</p>
        </div>
      </aside>
    </>
  )
}

function Footer() {
  return (
    <footer id="contact" className="bg-neutral-950 border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-3 gap-8">
        <div>
          <Logo size="lg" />
          <p className="mt-4 text-white/60 max-w-sm">Premium fast food, freshly crafted. Serving Jamia Nagar and beyond with love.</p>
        </div>
        <div>
          <h4 className="font-bold mb-3 text-[color:var(--mez-yellow)]">Visit Us</h4>
          <p className="text-white/70 flex items-start gap-2"><MapPin className="w-4 h-4 mt-1 shrink-0" /> {BRAND.address}</p>
          <a href={`tel:${BRAND.phone}`} className="mt-2 text-white/70 flex items-center gap-2 hover:text-[color:var(--mez-yellow)]"><Phone className="w-4 h-4" /> {BRAND.phone}</a>
          <p className="mt-2 text-white/70">🌐 {BRAND.website}</p>
        </div>
        <div>
          <h4 className="font-bold mb-3 text-[color:var(--mez-yellow)]">Quick Links</h4>
          <div className="flex flex-col gap-2 text-white/70">
            <a href="#home" className="hover:text-[color:var(--mez-yellow)]">Home</a>
            <a href="#menu" className="hover:text-[color:var(--mez-yellow)]">Menu</a>
            <a href="#contact" className="hover:text-[color:var(--mez-yellow)]">Contact</a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-white/40">
        <p>© {new Date().getFullYear()} Mezbaan. All rights reserved.</p>
        <p>Freshly Crafted. Honestly Served.</p>
      </div>
    </footer>
  )
}

function App() {
  const [cart, setCart] = useState({})
  const [cartOpen, setCartOpen] = useState(false)

  const addItem = (item) => {
    setCart(c => ({ ...c, [item.id]: { ...item, qty: (c[item.id]?.qty || 0) + 1 } }))
    setCartOpen(true)
  }
  const incItem = (item) => setCart(c => ({ ...c, [item.id]: { ...c[item.id], qty: (c[item.id]?.qty || 0) + 1 } }))
  const decItem = (item) => setCart(c => {
    const cur = c[item.id]
    if (!cur) return c
    if (cur.qty <= 1) { const n = { ...c }; delete n[item.id]; return n }
    return { ...c, [item.id]: { ...cur, qty: cur.qty - 1 } }
  })
  const removeItem = (item) => setCart(c => { const n = { ...c }; delete n[item.id]; return n })

  const cartCount = Object.values(cart).reduce((s, i) => s + i.qty, 0)

  return (
    <main className="bg-black min-h-screen">
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      <Hero onOrder={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })} />
      <MenuSection cart={cart} onAdd={addItem} onInc={incItem} onDec={decItem} />
      <Footer />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onInc={incItem}
        onDec={decItem}
        onRemove={removeItem}
      />

      {/* Floating WhatsApp */}
      <a
        href={`https://wa.me/${BRAND.phoneRaw}?text=Hi%20Mezbaan!%20I'd%20like%20to%20place%20an%20order.`}
        target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-30 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-2xl flex items-center justify-center transition-transform hover:scale-110"
        aria-label="WhatsApp Order"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
    </main>
  )
}

export default App
