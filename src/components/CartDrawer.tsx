import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatPrice, DELIVERY_SETTINGS } from "@/data/config";

export function CartDrawer() {
  const { cartOpen, setCartOpen, items, subtotal, updateQuantity, removeItem } = useStore();

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[70] bg-ink/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            role="dialog"
            aria-label="Your cart"
            className="fixed inset-y-0 right-0 z-[71] flex w-full max-w-md flex-col bg-background"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="font-display text-2xl tracking-wide">YOUR ORDER</h2>
              <button
                type="button"
                aria-label="Close cart"
                onClick={() => setCartOpen(false)}
                className="grid size-10 place-items-center rounded-full hover:bg-sand"
              >
                <X className="size-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <div className="grid size-20 place-items-center rounded-full bg-brand/20">
                  <ShoppingBag className="size-8 text-brand-deep" />
                </div>
                <p className="mt-5 font-display text-3xl">YOUR CART IS HUNGRY</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Add something delicious and let's fix that.
                </p>
                <Link
                  to="/menu"
                  onClick={() => setCartOpen(false)}
                  className="mt-6 rounded-full bg-ink px-6 py-3 text-xs font-bold uppercase tracking-widest text-cream"
                >
                  Explore Menu
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 space-y-3 overflow-y-auto p-4">
                  {items.map((item) => (
                    <motion.li
                      key={item.key}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 24 }}
                      className="flex gap-3 rounded-xl border border-border bg-card p-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        width={64}
                        height={64}
                        className="size-16 rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold">{item.name}</p>
                        {item.variant && (
                          <p className="text-xs text-muted-foreground">{item.variant}</p>
                        )}
                        {item.instructions && (
                          <p className="truncate text-xs italic text-muted-foreground">
                            {item.instructions}
                          </p>
                        )}
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex items-center rounded-full border border-border">
                            <button
                              type="button"
                              aria-label={`Decrease ${item.name}`}
                              onClick={() => updateQuantity(item.key, item.quantity - 1)}
                              className="grid size-7 place-items-center rounded-full hover:bg-sand"
                            >
                              <Minus className="size-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              aria-label={`Increase ${item.name}`}
                              onClick={() => updateQuantity(item.key, item.quantity + 1)}
                              className="grid size-7 place-items-center rounded-full hover:bg-sand"
                            >
                              <Plus className="size-3" />
                            </button>
                          </div>
                          <button
                            type="button"
                            aria-label={`Remove ${item.name}`}
                            onClick={() => removeItem(item.key)}
                            className="grid size-7 place-items-center rounded-full text-muted-foreground hover:bg-sand hover:text-destructive"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                          <span className="ml-auto text-sm font-bold">
                            {formatPrice(item.unitPrice * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>

                <div className="border-t border-border bg-card p-5">
                  <dl className="space-y-1.5 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Subtotal</dt>
                      <dd className="font-semibold">{formatPrice(subtotal)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Delivery fee</dt>
                      <dd className="font-semibold">
                        {DELIVERY_SETTINGS.baseDeliveryFee === null
                          ? "Confirmed at checkout"
                          : formatPrice(DELIVERY_SETTINGS.baseDeliveryFee)}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Discount</dt>
                      <dd className="font-semibold">—</dd>
                    </div>
                    <div className="flex justify-between border-t border-border pt-2 text-base">
                      <dt className="font-display text-xl">TOTAL</dt>
                      <dd className="font-display text-xl">{formatPrice(subtotal)}</dd>
                    </div>
                  </dl>
                  <Link
                    to="/checkout"
                    onClick={() => setCartOpen(false)}
                    className="mt-4 block rounded-full bg-brand py-3.5 text-center text-xs font-bold uppercase tracking-widest text-ink transition-transform hover:scale-[1.01]"
                  >
                    Checkout
                  </Link>
                  <button
                    type="button"
                    onClick={() => setCartOpen(false)}
                    className="mt-2 w-full rounded-full py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground"
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
