import { useHead } from "@/lib/use-head";

import { BRANCHES } from "@/data/branches";
import { DELIVERY_SETTINGS } from "@/data/config";

const HEAD = {
    meta: [
      { title: "Delivery Information | Al-Maidah Café Peshawar" },
      { name: "description", content: "How delivery and pickup work at Al-Maidah Café across our four Peshawar branches." },
      { property: "og:title", content: "Delivery Information | Al-Maidah Café" },
      { property: "og:description", content: "Delivery and pickup, branch by branch." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/delivery-information" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/delivery-information" }],
};

export default function DeliveryInformationPage() {
  useHead(HEAD);
  const rows = [
    ["Base delivery fee", DELIVERY_SETTINGS.baseDeliveryFee ?? "Confirmed by your branch"],
    ["Free delivery threshold", DELIVERY_SETTINGS.freeDeliveryThreshold ?? "Not currently offered"],
    ["Minimum order", DELIVERY_SETTINGS.minimumOrder ?? "No published minimum"],
    ["Estimated preparation time", DELIVERY_SETTINGS.estimatedPrepTimeMinutes ?? "Confirmed by your branch"],
  ] as const;

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="display-lg">DELIVERY INFORMATION</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Orders are handled by the branch you select. Charges and timings are confirmed by that
        branch when your order is accepted.
      </p>

      <dl className="mt-8 divide-y divide-border rounded-2xl border border-border bg-card p-6 text-sm">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4 py-3">
            <dt className="text-muted-foreground">{label}</dt>
            <dd className="text-right font-semibold">{value}</dd>
          </div>
        ))}
      </dl>

      <h2 className="mt-10 font-display text-2xl">DELIVERING FROM</h2>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {BRANCHES.map((b) => (
          <li key={b.id}>
            <span className="font-semibold text-foreground">{b.name}</span> — {b.address}
          </li>
        ))}
      </ul>
    </div>
  );
}
