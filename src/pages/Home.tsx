import { useMemo, useState } from "react";
import { useHead } from "@/lib/use-head";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Bike, Facebook, Instagram, MapPin, Star, Store, Truck, UtensilsCrossed, Leaf, Flame } from "lucide-react";
import heroFood from "@/assets/hero-food.jpg";
import naanImg from "@/assets/naan.jpg";
import { SectionHeading, Sunburst } from "@/components/Brand";
import { ProductGrid } from "@/components/ProductGrid";
import { BRANCHES } from "@/data/branches";
import { REVIEWS } from "@/data/reviews";
import { SOCIAL, formatPrice } from "@/data/config";
import {
  AFGHANI_PRODUCTS,
  CATEGORIES,
  DEALS,
  FEATURED_PRODUCTS,
  NAAN_STOP_PRODUCTS,
  PRODUCTS,
  dealTotal,
  type CategoryId,
} from "@/data/menu";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const HEAD = {
    meta: [
      { title: "Al-Maidah Café | Pakistani, Chinese & Fast Food in Peshawar" },
      {
        name: "description",
        content:
          "Order fresh Pakistani, Chinese, BBQ, burgers, pizza, pasta and more from Al-Maidah Café. Serving Peshawar from 4 convenient branches.",
      },
      { property: "og:title", content: "Al-Maidah Café | Pakistani, Chinese & Fast Food in Peshawar" },
      {
        property: "og:description",
        content: "Order online from Al-Maidah Café — Hayatabad, Nasir Bagh Road and Warsak Road, Peshawar.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: "Al-Maidah Café",
          servesCuisine: ["Pakistani", "Chinese", "Thai", "BBQ", "Pizza", "Burgers", "Fast Food"],
          areaServed: "Peshawar, Pakistan",
          sameAs: [SOCIAL.instagram, SOCIAL.facebook],
          address: BRANCHES.map((b) => ({
            "@type": "PostalAddress",
            streetAddress: b.address,
            addressLocality: "Peshawar",
            addressCountry: "PK",
          })),
        }),
      },
    ],
};

export default function HomePage() {
  useHead(HEAD);
  const { orderType, setOrderType, setBranchId, branchId } = useStore();
  const [category, setCategory] = useState<CategoryId | "all">("all");

  const filtered = useMemo(
    () => (category === "all" ? FEATURED_PRODUCTS : PRODUCTS.filter((p) => p.category === category).slice(0, 8)),
    [category],
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
      {/* ORDERING BAR */}
      <section aria-label="Choose delivery or pickup" className="border-b border-border bg-sand">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:px-6">
          <div className="flex rounded-full bg-card p-1">
            <button
              type="button"
              onClick={() => setOrderType("delivery")}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors",
                orderType === "delivery" ? "bg-ink text-cream" : "text-muted-foreground",
              )}
            >
              <Bike className="size-4" /> Delivery
            </button>
            <button
              type="button"
              onClick={() => setOrderType("pickup")}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors",
                orderType === "pickup" ? "bg-ink text-cream" : "text-muted-foreground",
              )}
            >
              <Store className="size-4" /> Pickup
            </button>
          </div>
          <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5">
            <MapPin className="size-4 shrink-0 text-brand-deep" />
            <select
              aria-label={orderType === "delivery" ? "Enter your delivery location" : "Choose your nearest branch"}
              value={branchId ?? ""}
              onChange={(e) => setBranchId(e.target.value || null)}
              className="w-full bg-transparent text-sm outline-none"
            >
              <option value="">
                {orderType === "delivery" ? "Enter your delivery location — pick a branch" : "Choose your nearest branch"}
              </option>
              {BRANCHES.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} — {b.area}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* HERO */}
      <section className="relative overflow-hidden bg-ink text-cream">
        <Sunburst className="-left-24 top-10 text-brand" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="eyebrow text-brand"
            >
              Peshawar · 4 branches
            </motion.p>
            <h1 className="display-xl mt-4">
              {["YOUR CRAVINGS.", "OUR SPECIALTY."].map((line, i) => (
                <motion.span
                  key={line}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.12, duration: 0.5 }}
                  className={cn("block", i === 1 && "text-brand")}
                >
                  {line}
                </motion.span>
              ))}
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.42 }}
              className="mt-5 max-w-md text-base text-cream/70"
            >
              From desi favorites to cheesy pizzas, juicy burgers and Chinese classics — Al-Maidah
              Café brings your favorites fresh to your table.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                to="/menu"
                className="rounded-full bg-brand px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-ink transition-transform hover:scale-[1.03]"
              >
                Order Now
              </Link>
              <Link
                to="/menu"
                className="rounded-full border border-cream/25 px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-cream transition-colors hover:border-brand hover:text-brand"
              >
                Explore Menu
              </Link>
            </motion.div>
          </div>
          <motion.img
            src={heroFood}
            alt="Al-Maidah Café spread of karahi, cheese naan, burger, pizza and BBQ skewers"
            width={1408}
            height={1104}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-full rounded-2xl object-cover shadow-plate"
          />
        </div>
      </section>

      {/* CATEGORY NAV */}
      <section aria-label="Browse by category" className="border-b border-border bg-cream">
        <div className="no-scrollbar mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-4 sm:px-6">
          <button
            type="button"
            onClick={() => setCategory("all")}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider",
              category === "all" ? "border-ink bg-ink text-cream" : "border-border bg-card text-muted-foreground",
            )}
          >
            All
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider",
                category === c.id ? "border-ink bg-ink text-cream" : "border-border bg-card text-muted-foreground",
              )}
            >
              {c.name}
            </button>
          ))}
        </div>
      </section>

      {/* CUSTOMER FAVORITES */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="Customer favorites"
          title="SOME CRAVINGS NEED NO INTRODUCTION"
          subtitle="The dishes our regulars order again and again."
        />
        <div className="mt-8">
          <ProductGrid products={filtered} />
        </div>
      </section>

      {/* DEALS */}
      <section className="bg-sand py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Bundle up" title="DEALS YOU CAN'T RESIST" />
          <div className="no-scrollbar mt-8 flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-4">
            {DEALS.map((deal) => (
              <article
                key={deal.id}
                className="w-[80%] shrink-0 overflow-hidden rounded-2xl border border-border bg-card md:w-auto"
              >
                <img
                  src={deal.image}
                  alt={deal.title}
                  loading="lazy"
                  width={400}
                  height={300}
                  className="h-40 w-full object-cover"
                />
                <div className="p-5">
                  <h3 className="font-display text-xl">{deal.title}</h3>
                  <p className="mt-2 text-xs text-muted-foreground">{deal.includes.join(" · ")}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-display text-xl">{formatPrice(dealTotal(deal))}</span>
                    <Link
                      to="/deals"
                      className="rounded-full bg-ink px-4 py-2 text-[0.65rem] font-bold uppercase tracking-widest text-cream"
                    >
                      Order Deal
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* NAAN STOP */}
      <section className="relative overflow-hidden bg-brand py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_minmax(0,380px)]">
          <div>
            <p className="eyebrow text-ink/70">Freshly stuffed</p>
            <h2 className="display-lg mt-2 text-ink">AL-MAIDAH NAAN STOP</h2>
            <ul className="mt-6 grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {NAAN_STOP_PRODUCTS.map((n) => (
                <li key={n.id} className="flex justify-between border-b border-ink/15 py-2 text-sm font-semibold text-ink">
                  <span>{n.name}</span>
                  <span>{n.price ? formatPrice(n.price) : "—"}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/naan-stop"
              className="mt-7 inline-flex rounded-full bg-ink px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-cream transition-transform hover:scale-[1.03]"
            >
              Order Naan Now
            </Link>
          </div>
          <motion.img
            src={naanImg}
            alt="Chicken cheese naan with melted cheese"
            loading="lazy"
            width={760}
            height={760}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-2xl object-cover shadow-plate"
          />
        </div>
      </section>

      {/* AFGHANI */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="New on the menu"
          title="SPECIAL AFGHANI MENU"
          subtitle="Three new arrivals from the grill. Pricing is confirmed by your branch."
        />
        <div className="mt-8">
          <ProductGrid products={AFGHANI_PRODUCTS} className="lg:grid-cols-3 xl:grid-cols-3" />
        </div>
        <Link
          to="/menu"
          className="mt-8 inline-flex rounded-full border border-ink px-7 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors hover:bg-ink hover:text-cream"
        >
          See the full menu
        </Link>
      </section>

      {/* WHY */}
      <section className="bg-charcoal py-16 text-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Why Al-Maidah" title="MADE PROPERLY, EVERY TIME" invert />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Leaf, title: "FRESH INGREDIENTS", text: "Prepared with care." },
              { icon: Flame, title: "BIG FLAVOR", text: "From desi classics to modern favorites." },
              { icon: MapPin, title: "4 CONVENIENT BRANCHES", text: "Serving customers across Peshawar." },
              { icon: Truck, title: "FAST HOME DELIVERY", text: "Your favorites delivered to your doorstep." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <f.icon className="size-6 text-brand" />
                <h3 className="mt-4 font-display text-xl">{f.title}</h3>
                <p className="mt-1 text-sm text-cream/70">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRANCHES */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeading eyebrow="Find us" title="FOUR BRANCHES IN PESHAWAR" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BRANCHES.map((b) => (
            <article key={b.id} className="flex flex-col rounded-2xl border border-border bg-card p-5">
              <span className="font-display text-3xl text-brand-deep">{b.number}</span>
              <h3 className="font-display text-xl">{b.name}</h3>
              <p className="mt-2 flex-1 text-xs text-muted-foreground">{b.address}</p>
              <Link
                to="/branches"
                className="mt-4 rounded-full bg-ink px-4 py-2.5 text-center text-[0.65rem] font-bold uppercase tracking-widest text-cream"
              >
                Order From This Branch
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* SOCIAL */}
      <section className="bg-sand py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="@almaidahcafe" title="FOLLOW THE FLAVOR" subtitle="See what's cooking at Al-Maidah Café." />
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-xs font-bold uppercase tracking-widest text-cream"
              >
                <Instagram className="size-4" /> Follow on Instagram
              </a>
              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-2 rounded-full border border-ink px-6 py-3 text-xs font-bold uppercase tracking-widest"
              >
                <Facebook className="size-4" /> Follow on Facebook
              </a>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {CATEGORIES.slice(0, 6).map((c) => (
              <a
                key={c.id}
                href={SOCIAL.instagram}
                target="_blank"
                rel="noreferrer noopener"
                className="group relative overflow-hidden rounded-xl"
                aria-label={`${c.name} on our Instagram`}
              >
                <img
                  src={c.image}
                  alt={`${c.name} at Al-Maidah Café`}
                  loading="lazy"
                  width={300}
                  height={300}
                  className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeading eyebrow="Word of mouth" title="WHAT OUR CUSTOMERS SAY" />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <blockquote key={r.id} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex gap-0.5" aria-label={`${r.rating} out of 5`}>
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="size-4 fill-brand text-brand" />
                ))}
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{r.text}</p>
              <footer className="mt-4 text-xs font-bold uppercase tracking-wider">
                {r.name} · <span className="text-muted-foreground">{r.branch}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-sand py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <img
            src={heroFood}
            alt="Al-Maidah Café dishes served together"
            loading="lazy"
            width={1408}
            height={1104}
            className="rounded-2xl object-cover shadow-lift"
          />
          <div>
            <SectionHeading eyebrow="About" title="A TASTE FOR EVERY CRAVING" />
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              At Al-Maidah Café, we bring together the flavors people love — from traditional
              Pakistani dishes and BBQ to Chinese favorites, burgers, pizzas and more. Fresh
              ingredients, generous portions and authentic taste come together under one roof.
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3 text-xs font-bold uppercase tracking-widest"
            >
              <UtensilsCrossed className="size-4" /> Our story
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-ink py-20 text-center text-cream">
        <Sunburst className="-right-20 bottom-0" />
        <div className="relative mx-auto max-w-2xl px-4">
          <h2 className="display-xl">HUNGRY YET?</h2>
          <p className="mt-4 text-cream/70">Your next favorite meal is just a few clicks away.</p>
          <Link
            to="/menu"
            className="mt-8 inline-flex rounded-full bg-brand px-9 py-4 text-xs font-bold uppercase tracking-widest text-ink transition-transform hover:scale-[1.04]"
          >
            Order Now
          </Link>
        </div>
      </section>
    </motion.div>
  );
}

