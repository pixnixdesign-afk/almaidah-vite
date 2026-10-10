import { useHead } from "@/lib/use-head";

import { motion } from "motion/react";
import { Facebook, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { BRANCHES } from "@/data/branches";
import { CONTACT_PHONE, SOCIAL, whatsappUrl } from "@/data/config";

const HEAD = {
    meta: [
      { title: "Contact Al-Maidah Café | Peshawar" },
      {
        name: "description",
        content:
          "Get in touch with Al-Maidah Café Peshawar — find us on Instagram and Facebook, or visit any of our four branches in Hayatabad, Nasir Bagh and Warsak Road.",
      },
      { property: "og:title", content: "Contact Al-Maidah Café" },
      { property: "og:description", content: "Reach us on social, or visit a branch." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
};

export default function ContactPage() {
  useHead(HEAD);
  const wa = whatsappUrl();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <p className="eyebrow text-brand-deep">Say hello</p>
        <h1 className="display-lg mt-2">GET IN TOUCH</h1>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <a
            href={SOCIAL.instagram}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-ink"
          >
            <Instagram className="size-6 text-brand-deep" />
            <h2 className="mt-4 font-display text-xl">INSTAGRAM</h2>
            <p className="mt-1 text-sm text-muted-foreground">@almaidahcafe</p>
          </a>
          <a
            href={SOCIAL.facebook}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-ink"
          >
            <Facebook className="size-6 text-brand-deep" />
            <h2 className="mt-4 font-display text-xl">FACEBOOK</h2>
            <p className="mt-1 text-sm text-muted-foreground">Al-Maidah Café Peshawar</p>
          </a>
          <div className="rounded-2xl border border-border bg-card p-6">
            <MessageCircle className="size-6 text-brand-deep" />
            <h2 className="mt-4 font-display text-xl">WHATSAPP</h2>
            {wa ? (
              <a href={wa} target="_blank" rel="noreferrer noopener" className="mt-1 block text-sm font-semibold underline">
                Message us
              </a>
            ) : (
              <p className="mt-1 text-sm text-muted-foreground">Number coming soon.</p>
            )}
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <Phone className="size-6 text-brand-deep" />
            <h2 className="mt-4 font-display text-xl">PHONE</h2>
            {CONTACT_PHONE ? (
              <a href={`tel:${CONTACT_PHONE}`} className="mt-1 block text-sm font-semibold">
                {CONTACT_PHONE}
              </a>
            ) : (
              <p className="mt-1 text-sm text-muted-foreground">Number coming soon.</p>
            )}
          </div>
        </div>

        <h2 className="mt-14 font-display text-3xl">VISIT US</h2>
        <ul className="mt-5 grid gap-4 md:grid-cols-2">
          {BRANCHES.map((b) => (
            <li key={b.id} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-display text-xl">{b.name}</h3>
              <p className="mt-2 flex gap-2 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-deep" />
                {b.address}
              </p>
              <a
                href={b.mapUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-3 inline-block text-xs font-bold uppercase tracking-wider underline"
              >
                Get directions
              </a>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
