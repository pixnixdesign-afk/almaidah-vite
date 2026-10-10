import { Link } from "react-router-dom";
import { useHead } from "@/lib/use-head";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { getBranch } from "@/data/branches";
import { DELIVERY_SETTINGS, formatPrice } from "@/data/config";
import { useStore } from "@/lib/store";

const HEAD = {
    meta: [
      { title: "Order Confirmed | Al-Maidah Café" },
      { name: "description", content: "Your Al-Maidah Café order has been received." },
      { property: "og:title", content: "Order Confirmed | Al-Maidah Café" },
      { property: "og:description", content: "Something delicious is coming your way." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/order-confirmation" },
      { name: "robots", content: "noindex" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/order-confirmation" }],
};

export default function OrderConfirmationPage() {
  useHead(HEAD);
  const { lastOrder, hydrated } = useStore();

  if (!hydrated) return <div className="min-h-[50vh]" />;

  if (!lastOrder) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="display-lg">NO RECENT ORDER</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Once you place an order, your confirmation will appear here.
        </p>
        <Link to="/menu" className="mt-6 inline-flex rounded-full bg-ink px-6 py-3 text-xs font-bold uppercase tracking-widest text-cream">
          Explore Menu
        </Link>
      </div>
    );
  }

  const branch = getBranch(lastOrder.branchId);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 14 }}
        className="mx-auto grid size-20 place-items-center rounded-full bg-success text-cream"
      >
        <Check className="size-10" />
      </motion.div>
      <h1 className="display-lg mt-6">ORDER CONFIRMED!</h1>
      <p className="mt-2 text-sm text-muted-foreground">Something delicious is coming your way.</p>

      <dl className="mt-8 grid gap-3 rounded-2xl border border-border bg-card p-6 text-left text-sm sm:grid-cols-2">
        <Row label="Order number" value={lastOrder.id} />
        <Row label="Order type" value={lastOrder.orderType === "delivery" ? "Delivery" : "Pickup"} />
        <Row label="Branch" value={branch?.name ?? "To be confirmed"} />
        <Row
          label="Estimated prep time"
          value={
            DELIVERY_SETTINGS.estimatedPrepTimeMinutes
              ? `${DELIVERY_SETTINGS.estimatedPrepTimeMinutes} min`
              : "Confirmed by the branch"
          }
        />
      </dl>

      <ul className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card p-6 text-left text-sm">
        {lastOrder.items.map((i) => (
          <li key={i.key} className="flex justify-between gap-3 py-2">
            <span>
              {i.quantity}× {i.name}
              {i.variant ? ` (${i.variant})` : ""}
            </span>
            <span className="font-bold">{formatPrice(i.unitPrice * i.quantity)}</span>
          </li>
        ))}
        <li className="flex justify-between pt-3 font-display text-xl">
          <span>TOTAL</span>
          <span>{formatPrice(lastOrder.total)}</span>
        </li>
      </ul>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/track-order" className="rounded-full bg-brand px-6 py-3 text-xs font-bold uppercase tracking-widest text-ink">
          Track Order
        </Link>
        <Link to="/" className="rounded-full border border-border px-6 py-3 text-xs font-bold uppercase tracking-widest">
          Back to Home
        </Link>
      </div>
    </motion.div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="eyebrow text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-bold">{value}</dd>
    </div>
  );
}
