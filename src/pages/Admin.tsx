import { useHead } from "@/lib/use-head";

import { LayoutDashboard, Lock } from "lucide-react";
import { BRANCHES } from "@/data/branches";
import { CATEGORIES, PRODUCTS } from "@/data/menu";

const HEAD = {
    meta: [
      { title: "Admin | Al-Maidah Café" },
      { name: "description", content: "Al-Maidah Café management dashboard." },
      { property: "og:title", content: "Admin | Al-Maidah Café" },
      { property: "og:description", content: "Management dashboard foundation." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/admin" },
      { name: "robots", content: "noindex" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/admin" }],
};

const SECTIONS = [
  "Products", "Categories", "Prices", "Availability", "Branches", "Orders",
  "Deals", "Coupons", "Delivery Charges", "Restaurant Settings", "Reviews", "Social Links",
];

const METRICS = [
  "Today's orders", "Pending", "Preparing", "Ready", "Completed", "Total sales",
];

export default function AdminPage() {
  useHead(HEAD);
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="flex items-center gap-3">
        <LayoutDashboard className="size-6 text-brand-deep" />
        <h1 className="display-lg">ADMIN DASHBOARD</h1>
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-xl border border-dashed border-border bg-sand p-4 text-sm text-muted-foreground">
        <Lock className="size-4 shrink-0" />
        Authentication and live data are not connected yet. This is the dashboard structure —
        metrics stay blank until the backend is enabled.
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {METRICS.map((m) => (
          <div key={m} className="rounded-xl border border-border bg-card p-4">
            <p className="eyebrow text-muted-foreground">{m}</p>
            <p className="mt-2 font-display text-3xl text-muted-foreground/50">—</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <section className="rounded-2xl border border-border bg-card p-6 lg:col-span-2">
          <h2 className="font-display text-2xl">MANAGE</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {SECTIONS.map((s) => (
              <li key={s} className="rounded-lg border border-border px-4 py-3 text-sm font-semibold text-muted-foreground">
                {s}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-2xl">CATALOGUE</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Products</dt><dd className="font-bold">{PRODUCTS.length}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Categories</dt><dd className="font-bold">{CATEGORIES.length}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Branches</dt><dd className="font-bold">{BRANCHES.length}</dd></div>
          </dl>
          <h3 className="mt-6 font-display text-xl">BRANCH PERFORMANCE</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {BRANCHES.map((b) => (
              <li key={b.id} className="flex justify-between">
                <span className="text-muted-foreground">{b.name}</span>
                <span className="text-muted-foreground/50">—</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
