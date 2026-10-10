import { useState } from "react";
import type { Product } from "@/data/menu";
import { ProductCard } from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";
import { cn } from "@/lib/utils";

export function ProductGrid({
  products,
  className,
  emptyTitle = "NO CRAVINGS FOUND",
  emptyText = "Try searching for pizza, burger, chicken or naan.",
}: {
  products: Product[];
  className?: string;
  emptyTitle?: string;
  emptyText?: string;
}) {
  const [active, setActive] = useState<Product | null>(null);

  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border py-16 text-center">
        <p className="font-display text-2xl">{emptyTitle}</p>
        <p className="mt-1 text-sm text-muted-foreground">{emptyText}</p>
      </div>
    );
  }

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
          className,
        )}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onOpen={setActive} />
        ))}
      </div>
      <ProductModal product={active} onClose={() => setActive(null)} />
    </>
  );
}
