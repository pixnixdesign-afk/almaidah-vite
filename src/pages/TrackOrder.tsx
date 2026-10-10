import { Link } from "react-router-dom";
import { useHead } from "@/lib/use-head";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { getBranch } from "@/data/branches";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const HEAD = {
    meta: [
      { title: "Track Your Order | Al-Maidah Café" },
      { name: "description", content: "Follow your Al-Maidah Café order from kitchen to doorstep." },
      { property: "og:title", content: "Track Your Order | Al-Maidah Café" },
      { property: "og:description", content: "Follow your order from kitchen to doorstep." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/track-order" },
      { name: "robots", content: "noindex" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/track-order" }],
};

const DELIVERY_STAGES = ["ORDER RECEIVED", "PREPARING", "READY", "OUT FOR DELIVERY", "DELIVERED"];
const PICKUP_STAGES = ["ORDER RECEIVED", "PREPARING", "READY FOR PICKUP", "COLLECTED"];

export default function TrackOrderPage() {
  useHead(HEAD);
  const { lastOrder, hydrated } = useStore();

  if (!hydrated) return <div className="min-h-[50vh]" />;

  if (!lastOrder) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="display-lg">NOTHING TO TRACK YET</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Place an order and you'll be able to follow it here.
        </p>
        <Link to="/menu" className="mt-6 inline-flex rounded-full bg-ink px-6 py-3 text-xs font-bold uppercase tracking-widest text-cream">
          Explore Menu
        </Link>
      </div>
    );
  }

  const stages = lastOrder.orderType === "delivery" ? DELIVERY_STAGES : PICKUP_STAGES;
  const currentIndex = Math.max(0, stages.indexOf(lastOrder.status));
  const branch = getBranch(lastOrder.branchId);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <p className="eyebrow text-brand-deep">Order {lastOrder.id}</p>
      <h1 className="display-lg mt-2">TRACK YOUR ORDER</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {lastOrder.orderType === "delivery" ? "Delivery" : "Pickup"}
        {branch ? ` · ${branch.name}` : ""}
      </p>

      <ol className="mt-10 space-y-0">
        {stages.map((stage, i) => {
          const done = i <= currentIndex;
          return (
            <li key={stage} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    "grid size-9 place-items-center rounded-full border-2",
                    done ? "border-brand bg-brand text-ink" : "border-border text-muted-foreground",
                  )}
                >
                  {done ? <Check className="size-4" /> : <span className="text-xs font-bold">{i + 1}</span>}
                </span>
                {i < stages.length - 1 && (
                  <span className={cn("h-14 w-0.5", i < currentIndex ? "bg-brand" : "bg-border")} />
                )}
              </div>
              <div className="pb-2 pt-1.5">
                <p className={cn("font-display text-xl tracking-wide", !done && "text-muted-foreground")}>
                  {stage}
                </p>
                {i === currentIndex && (
                  <p className="text-xs text-muted-foreground">Current status</p>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      <p className="mt-8 rounded-xl bg-sand p-4 text-xs text-muted-foreground">
        Live status updates are activated once the branch ordering system is connected. Your branch
        will confirm your order directly.
      </p>
    </motion.div>
  );
}
