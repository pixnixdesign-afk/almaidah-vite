import { useState } from "react";
import { useHead } from "@/lib/use-head";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Bike, Check, Store } from "lucide-react";
import { BRANCHES } from "@/data/branches";
import { DELIVERY_SETTINGS, PAYMENT_METHODS, formatPrice } from "@/data/config";
import { useStore, type Order } from "@/lib/store";
import { cn } from "@/lib/utils";

const HEAD = {
    meta: [
      { title: "Checkout | Al-Maidah Café" },
      {
        name: "description",
        content: "Complete your Al-Maidah Café order — choose delivery or pickup, confirm your branch and place your order.",
      },
      { property: "og:title", content: "Checkout | Al-Maidah Café" },
      { property: "og:description", content: "A few details and your food is on its way." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/checkout" },
      { name: "robots", content: "noindex" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/checkout" }],
};

const STEPS = ["Your details", "Delivery or pickup", "Order summary", "Payment"];

export default function CheckoutPage() {
  useHead(HEAD);
  const navigate = useNavigate();
  const { items, subtotal, orderType, setOrderType, branchId, setBranchId, placeOrder } = useStore();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");
  const [instructions, setInstructions] = useState("");
  const [payment, setPayment] = useState("cod");
  const [error, setError] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="display-lg">YOUR CART IS HUNGRY</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Add something delicious and let's fix that.
        </p>
        <Link
          to="/menu"
          className="mt-6 inline-flex rounded-full bg-ink px-6 py-3 text-xs font-bold uppercase tracking-widest text-cream"
        >
          Explore Menu
        </Link>
      </div>
    );
  }

  const next = () => {
    setError(null);
    if (step === 0) {
      if (!name.trim()) return setError("Please enter your name.");
      if (!/^[0-9+\-\s]{7,}$/.test(phone.trim())) return setError("Please enter a valid phone number.");
    }
    if (step === 1) {
      if (!orderType) return setError("Please choose delivery or pickup.");
      if (orderType === "delivery" && !address.trim())
        return setError("Please enter your delivery address.");
      if (orderType === "pickup" && !branchId) return setError("Please select a branch.");
      if (orderType === "delivery" && !branchId) return setError("Please select your nearest branch.");
    }
    setStep((s) => Math.min(STEPS.length - 1, s + 1));
  };

  const submit = () => {
    const order: Order = {
      id: `AM-${Date.now().toString().slice(-6)}`,
      branchId,
      customer: { name, phone, address, area, instructions },
      items,
      orderType: orderType ?? "pickup",
      subtotal,
      deliveryFee: DELIVERY_SETTINGS.baseDeliveryFee,
      discount: 0,
      total: subtotal + (DELIVERY_SETTINGS.baseDeliveryFee ?? 0),
      paymentMethod: PAYMENT_METHODS.find((p) => p.id === payment)?.label ?? "Cash on Delivery",
      status: "ORDER RECEIVED",
      createdAt: new Date().toISOString(),
    };
    placeOrder(order);
    navigate("/order-confirmation");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="display-lg">CHECKOUT</h1>

      <ol className="mt-6 flex flex-wrap gap-2" aria-label="Checkout steps">
        {STEPS.map((label, i) => (
          <li
            key={label}
            aria-current={i === step ? "step" : undefined}
            className={cn(
              "flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider",
              i === step ? "bg-ink text-cream" : i < step ? "bg-success/15 text-success" : "bg-sand text-muted-foreground",
            )}
          >
            {i < step ? <Check className="size-3.5" /> : <span>{i + 1}</span>}
            {label}
          </li>
        ))}
      </ol>

      <div className="mt-8 rounded-2xl border border-border bg-card p-6">
        {step === 0 && (
          <div className="space-y-4">
            <Field label="Full name" value={name} onChange={setName} placeholder="Your name" />
            <Field label="Phone number" value={phone} onChange={setPhone} placeholder="03XX XXXXXXX" type="tel" />
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setOrderType("delivery")}
                className={cn(
                  "flex items-center gap-3 rounded-xl border p-4 text-left",
                  orderType === "delivery" ? "border-ink bg-sand" : "border-border",
                )}
              >
                <Bike className="size-5" />
                <span>
                  <span className="block font-bold">Delivery</span>
                  <span className="block text-xs text-muted-foreground">To your doorstep</span>
                </span>
              </button>
              <button
                type="button"
                onClick={() => setOrderType("pickup")}
                className={cn(
                  "flex items-center gap-3 rounded-xl border p-4 text-left",
                  orderType === "pickup" ? "border-ink bg-sand" : "border-border",
                )}
              >
                <Store className="size-5" />
                <span>
                  <span className="block font-bold">Pickup</span>
                  <span className="block text-xs text-muted-foreground">Collect from a branch</span>
                </span>
              </button>
            </div>

            {orderType === "delivery" && (
              <div className="space-y-4">
                <Field label="Delivery address" value={address} onChange={setAddress} placeholder="House, street, sector" />
                <Field label="Area" value={area} onChange={setArea} placeholder="Hayatabad, Warsak Road…" />
                <Field label="Delivery instructions (optional)" value={instructions} onChange={setInstructions} placeholder="Gate code, landmark…" />
              </div>
            )}

            <fieldset>
              <legend className="eyebrow mb-2 text-muted-foreground">
                {orderType === "pickup" ? "Choose your branch" : "Nearest branch"}
              </legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {BRANCHES.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBranchId(b.id)}
                    className={cn(
                      "rounded-xl border p-3 text-left text-sm",
                      branchId === b.id ? "border-ink bg-sand" : "border-border",
                    )}
                  >
                    <span className="block font-bold">{b.name}</span>
                    <span className="block text-xs text-muted-foreground">{b.address}</span>
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
        )}

        {step === 2 && (
          <div>
            <ul className="divide-y divide-border">
              {items.map((i) => (
                <li key={i.key} className="flex justify-between gap-3 py-3 text-sm">
                  <span>
                    <span className="font-semibold">{i.quantity}× {i.name}</span>
                    {i.variant && <span className="block text-xs text-muted-foreground">{i.variant}</span>}
                  </span>
                  <span className="font-bold">{formatPrice(i.unitPrice * i.quantity)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-4 space-y-1.5 border-t border-border pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-semibold">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Delivery fee</dt>
                <dd className="font-semibold">
                  {DELIVERY_SETTINGS.baseDeliveryFee === null
                    ? "Confirmed by the branch"
                    : formatPrice(DELIVERY_SETTINGS.baseDeliveryFee)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-border pt-2">
                <dt className="font-display text-xl">TOTAL</dt>
                <dd className="font-display text-xl">
                  {formatPrice(subtotal + (DELIVERY_SETTINGS.baseDeliveryFee ?? 0))}
                </dd>
              </div>
            </dl>
          </div>
        )}

        {step === 3 && (
          <fieldset className="space-y-2">
            <legend className="eyebrow mb-2 text-muted-foreground">Payment method</legend>
            {PAYMENT_METHODS.map((m) => (
              <label
                key={m.id}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-xl border p-4",
                  !m.enabled && "cursor-not-allowed opacity-50",
                  payment === m.id ? "border-ink bg-sand" : "border-border",
                )}
              >
                <input
                  type="radio"
                  name="payment"
                  value={m.id}
                  disabled={!m.enabled}
                  checked={payment === m.id}
                  onChange={() => setPayment(m.id)}
                  className="size-4 accent-[var(--brand)]"
                />
                <span>
                  <span className="block text-sm font-bold">{m.label}</span>
                  <span className="block text-xs text-muted-foreground">{m.description}</span>
                </span>
              </label>
            ))}
          </fieldset>
        )}

        {error && (
          <p role="alert" className="mt-4 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}

        <div className="mt-6 flex gap-3">
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="rounded-full border border-border px-5 py-3 text-xs font-bold uppercase tracking-widest"
            >
              Back
            </button>
          )}
          <button
            type="button"
            onClick={step === STEPS.length - 1 ? submit : next}
            className="flex-1 rounded-full bg-brand py-3 text-xs font-bold uppercase tracking-widest text-ink"
          >
            {step === STEPS.length - 1 ? "Place Order" : "Continue"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  const id = label.toLowerCase().replace(/[^a-z]+/g, "-");
  return (
    <div>
      <label htmlFor={id} className="eyebrow mb-2 block text-muted-foreground">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-ink"
      />
    </div>
  );
}
