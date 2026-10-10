import { useHead } from "@/lib/use-head";

import { motion } from "motion/react";
import { DEALS, dealTotal, getProduct } from "@/data/menu";
import { formatPrice } from "@/data/config";
import { useStore } from "@/lib/store";

const HEAD = {
    meta: [
      { title: "Deals & Bundles | Al-Maidah Café Peshawar" },
      {
        name: "description",
        content:
          "Family bundles and combo deals from Al-Maidah Café Peshawar — naan stop nights, desi feasts, burger squads and pizza parties.",
      },
      { property: "og:title", content: "Deals & Bundles | Al-Maidah Café" },
      { property: "og:description", content: "Bundle up and feed the whole table." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/deals" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/deals" }],
};

export default function DealsPage() {
  useHead(HEAD);
  const { addItem, setCartOpen } = useStore();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="bg-ink px-4 py-14 text-cream sm:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow text-brand">Bundle up</p>
          <h1 className="display-lg mt-2">DEALS YOU CAN'T RESIST</h1>
          <p className="mt-3 max-w-xl text-sm text-cream/70">
            Built from our most-loved dishes. Bundle prices are the sum of the published item
            prices — no hidden extras.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-2">
        {DEALS.map((deal) => (
          <article
            key={deal.id}
            className="group grid overflow-hidden rounded-2xl border border-border bg-card sm:grid-cols-[minmax(0,200px)_1fr]"
          >
            <img
              src={deal.image}
              alt={deal.title}
              loading="lazy"
              width={400}
              height={400}
              className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-full"
            />
            <div className="flex flex-col p-5">
              <h2 className="font-display text-2xl tracking-wide">{deal.title}</h2>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                {deal.includes.map((i) => (
                  <li key={i}>· {i}</li>
                ))}
              </ul>
              <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                <span className="font-display text-2xl">{formatPrice(dealTotal(deal))}</span>
                <button
                  type="button"
                  onClick={() => {
                    deal.productIds.forEach((id) => {
                      const product = getProduct(id);
                      if (product)
                        addItem(product, product.sizes ? { variant: product.sizes[0]!.label, unitPrice: product.sizes[0]!.price } : {});
                    });
                    setCartOpen(true);
                  }}
                  className="rounded-full bg-brand px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-ink transition-transform hover:scale-[1.03]"
                >
                  Order Deal
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </motion.div>
  );
}
