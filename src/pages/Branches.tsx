import { Link } from "react-router-dom";
import { useHead } from "@/lib/use-head";
import { motion } from "motion/react";
import { MapPin, Navigation, Phone } from "lucide-react";
import { BRANCHES } from "@/data/branches";
import { useStore } from "@/lib/store";

const HEAD = {
    meta: [
      { title: "Our Branches | Al-Maidah Café Hayatabad, Nasir Bagh & Warsak Road" },
      {
        name: "description",
        content:
          "Find your nearest Al-Maidah Café — F-8 Phase 6 Hayatabad, Phase 4 Hayatabad, Nasir Bagh Road and Warsak Road, Peshawar.",
      },
      { property: "og:title", content: "Find Your Nearest Al-Maidah Café" },
      { property: "og:description", content: "Four branches serving Peshawar." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/branches" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/branches" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": BRANCHES.map((b) => ({
            "@type": "Restaurant",
            name: `Al-Maidah Café — ${b.name}`,
            servesCuisine: ["Pakistani", "Chinese", "Fast Food", "BBQ", "Pizza"],
            address: {
              "@type": "PostalAddress",
              streetAddress: b.address,
              addressLocality: "Peshawar",
              addressCountry: "PK",
            },
            hasMap: b.mapUrl,
          })),
        }),
      },
    ],
};

export default function BranchesPage() {
  useHead(HEAD);
  const { setBranchId, branchId } = useStore();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="bg-ink px-4 py-14 text-cream sm:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow text-brand">4 branches across Peshawar</p>
          <h1 className="display-lg mt-2">FIND YOUR NEAREST AL-MAIDAH</h1>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-5 px-4 py-12 sm:px-6 md:grid-cols-2">
        {BRANCHES.map((branch) => (
          <article
            key={branch.id}
            className="flex flex-col rounded-2xl border border-border bg-card p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="font-display text-4xl text-brand-deep">{branch.number}</span>
                <h2 className="font-display text-2xl tracking-wide">{branch.name}</h2>
              </div>
              <span className="rounded-full bg-sand px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground">
                {branch.isOpen === null ? "Hours on request" : branch.isOpen ? "Open" : "Closed"}
              </span>
            </div>
            <p className="mt-3 flex gap-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand-deep" />
              {branch.address}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setBranchId(branch.id)}
                className={
                  branchId === branch.id
                    ? "rounded-full bg-success px-4 py-2 text-xs font-bold uppercase tracking-wider text-cream"
                    : "rounded-full border border-border px-4 py-2 text-xs font-bold uppercase tracking-wider hover:border-ink"
                }
              >
                {branchId === branch.id ? "Selected" : "Select Branch"}
              </button>
              {branch.phone ? (
                <a
                  href={`tel:${branch.phone}`}
                  className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-bold uppercase tracking-wider hover:border-ink"
                >
                  <Phone className="size-3.5" /> Call
                </a>
              ) : (
                <span className="flex items-center gap-1.5 rounded-full border border-dashed border-border px-4 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <Phone className="size-3.5" /> Phone coming soon
                </span>
              )}
              <a
                href={branch.mapUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-bold uppercase tracking-wider hover:border-ink"
              >
                <Navigation className="size-3.5" /> Directions
              </a>
              <Link
                to="/menu"
                onClick={() => setBranchId(branch.id)}
                className="rounded-full bg-ink px-4 py-2 text-xs font-bold uppercase tracking-wider text-cream"
              >
                Order From Here
              </Link>
            </div>
          </article>
        ))}
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="rounded-2xl border border-border bg-sand p-8 text-center">
          <h2 className="font-display text-3xl">ON THE MAP</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Each branch opens directly in Google Maps with its exact street address.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {BRANCHES.map((b) => (
              <a
                key={b.id}
                href={b.mapUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-full bg-card px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-brand hover:text-ink"
              >
                {b.name}
              </a>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
