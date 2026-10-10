import { useState } from "react";
import { motion } from "motion/react";
import { Heart, Plus } from "lucide-react";
import type { Product } from "@/data/menu";
import { formatPrice } from "@/data/config";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  onOpen,
}: {
  product: Product;
  onOpen: (p: Product) => void;
}) {
  const { addItem } = useStore();
  const [fav, setFav] = useState(false);
  const [added, setAdded] = useState(false);
  const badge = product.tags?.find((t) =>
    ["Best Seller", "Popular", "Chef's Pick", "New"].includes(t),
  );
  const from = product.sizes ? product.sizes[0]!.price : product.price;

  const quickAdd = () => {
    if (product.sizes) {
      onOpen(product);
      return;
    }
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-[0_1px_0_rgba(0,0,0,0.04)] transition-shadow hover:shadow-lift"
    >
      <button
        type="button"
        onClick={() => onOpen(product)}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-sand text-left"
        aria-label={`View ${product.name}`}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={600}
          height={450}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {badge && (
          <span className="absolute left-3 top-3 rounded-full bg-brand px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-widest text-ink">
            {badge}
          </span>
        )}
      </button>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg leading-tight tracking-wide">{product.name}</h3>
          <button
            type="button"
            aria-pressed={fav}
            aria-label={`${fav ? "Remove" : "Save"} ${product.name} as a favourite`}
            onClick={() => setFav((v) => !v)}
            className="shrink-0 rounded-full p-1 text-muted-foreground transition-colors hover:text-ink"
          >
            <Heart className={cn("size-4", fav && "fill-brand text-brand")} />
          </button>
        </div>
        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{product.description}</p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="font-display text-xl">
            {from ? (
              <>
                {product.sizes && (
                  <span className="mr-1 text-xs font-sans font-semibold text-muted-foreground">
                    from
                  </span>
                )}
                {formatPrice(from)}
              </>
            ) : (
              <span className="text-sm font-sans font-semibold text-muted-foreground">
                Price on request
              </span>
            )}
          </span>
          <button
            type="button"
            onClick={quickAdd}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors",
              added ? "bg-success text-cream" : "bg-ink text-cream hover:bg-charcoal",
            )}
          >
            {added ? "Added" : <><Plus className="size-3.5" /> Add</>}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
