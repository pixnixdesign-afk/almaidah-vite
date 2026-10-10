import { useMemo, useState } from "react";
import { useHead } from "@/lib/use-head";

import { motion } from "motion/react";
import { CATEGORIES, PRODUCTS, type CategoryId } from "@/data/menu";
import { ProductGrid } from "@/components/ProductGrid";
import { cn } from "@/lib/utils";

const HEAD = {
    meta: [
      { title: "Full Menu | Al-Maidah Café Peshawar" },
      {
        name: "description",
        content:
          "Browse the complete Al-Maidah Café menu — burgers, pizza, BBQ, desi karahi, Chinese, naan stop, pasta, rice and more. Order online in Peshawar.",
      },
      { property: "og:title", content: "Full Menu | Al-Maidah Café Peshawar" },
      {
        property: "og:description",
        content: "Burgers, pizza, BBQ, karahi, Chinese and naan — order online from Al-Maidah Café.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/menu" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/menu" }],
};

export default function MenuPage() {
  useHead(HEAD);
  const [category, setCategory] = useState<CategoryId | "all">("all");
  const [query, setQuery] = useState("");

  const products = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        (!q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)),
    );
  }, [category, query]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="border-b border-border bg-ink text-cream">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <p className="eyebrow text-brand">The full spread</p>
          <h1 className="display-lg mt-2">OUR MENU</h1>
          <p className="mt-3 max-w-xl text-sm text-cream/70">
            Everything we cook, in one place. Pick a category, add to your cart and order.
          </p>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pizza, burger, chicken, naan…"
            aria-label="Search the menu"
            className="mt-6 w-full max-w-md rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm text-cream outline-none placeholder:text-cream/40 focus:border-brand"
          />
        </div>
      </div>

      <div className="sticky top-14 z-30 border-b border-border bg-cream/95 backdrop-blur lg:hidden">
        <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 py-3">
          <CategoryPill active={category === "all"} onClick={() => setCategory("all")} label="All" />
          {CATEGORIES.map((c) => (
            <CategoryPill
              key={c.id}
              active={category === c.id}
              onClick={() => setCategory(c.id)}
              label={c.name}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">
          <nav aria-label="Menu categories" className="sticky top-24 space-y-1">
            <CategorySide active={category === "all"} onClick={() => setCategory("all")} label="All items" />
            {CATEGORIES.map((c) => (
              <CategorySide
                key={c.id}
                active={category === c.id}
                onClick={() => setCategory(c.id)}
                label={c.name}
              />
            ))}
          </nav>
        </aside>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {products.length} items
          </p>
          <ProductGrid products={products} className="xl:grid-cols-3" />
        </div>
      </div>
    </motion.div>
  );
}

function CategoryPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "shrink-0 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors",
        active ? "border-ink bg-ink text-cream" : "border-border bg-card text-muted-foreground",
      )}
    >
      {label}
    </button>
  );
}

function CategorySide({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors",
        active ? "bg-brand text-ink" : "text-muted-foreground hover:bg-sand hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}
