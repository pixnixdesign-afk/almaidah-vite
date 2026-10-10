import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Product } from "@/data/menu";
import { formatPrice } from "@/data/config";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ProductModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const { addItem } = useStore();
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (product) {
      setSize(product.sizes ? product.sizes[0]!.label : null);
      setQty(1);
      setNotes("");
    }
  }, [product]);

  if (!product) return null;

  const unitPrice =
    product.sizes?.find((s) => s.label === size)?.price ?? product.price ?? 0;

  return (
    <Dialog open={!!product} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl overflow-hidden p-0 sm:rounded-xl">
        <div className="grid max-h-[85vh] overflow-y-auto sm:grid-cols-2">
          <div className="aspect-square w-full bg-sand sm:aspect-auto sm:h-full">
            <img
              src={product.image}
              alt={product.name}
              width={700}
              height={700}
              className="size-full object-cover"
            />
          </div>
          <div className="flex flex-col p-5">
            <DialogHeader className="space-y-1 text-left">
              <DialogTitle className="font-display text-2xl leading-tight tracking-wide">
                {product.name}
              </DialogTitle>
            </DialogHeader>
            <p className="mt-1 text-sm text-muted-foreground">{product.description}</p>

            {product.sizes && (
              <fieldset className="mt-5">
                <legend className="eyebrow mb-2 text-muted-foreground">Choose a size</legend>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s.label}
                      type="button"
                      onClick={() => setSize(s.label)}
                      aria-pressed={size === s.label}
                      className={cn(
                        "rounded-lg border px-3 py-2 text-sm font-semibold transition-colors",
                        size === s.label
                          ? "border-ink bg-ink text-cream"
                          : "border-border hover:border-ink",
                      )}
                    >
                      {s.label} · {formatPrice(s.price)}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            <div className="mt-5">
              <label htmlFor="notes" className="eyebrow mb-2 block text-muted-foreground">
                Special instructions
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="Extra spicy, no onions…"
                className="w-full resize-none rounded-lg border border-border bg-background p-3 text-sm outline-none focus:border-ink"
              />
            </div>

            <div className="mt-auto flex items-center gap-3 pt-6">
              <div className="flex items-center rounded-full border border-border">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid size-10 place-items-center rounded-full hover:bg-sand"
                >
                  <Minus className="size-4" />
                </button>
                <span className="w-8 text-center text-sm font-bold" aria-live="polite">
                  {qty}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => q + 1)}
                  className="grid size-10 place-items-center rounded-full hover:bg-sand"
                >
                  <Plus className="size-4" />
                </button>
              </div>
              <button
                type="button"
                disabled={!unitPrice}
                onClick={() => {
                  addItem(product, {
                    variant: size,
                    quantity: qty,
                    unitPrice,
                    ...(notes ? { instructions: notes } : {}),
                  });
                  onClose();
                }}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-xs font-bold uppercase tracking-widest text-cream transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {unitPrice ? `Add to cart · ${formatPrice(unitPrice * qty)}` : "Price coming soon"}
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
