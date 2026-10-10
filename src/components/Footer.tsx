import { Link } from "react-router-dom";
import { Facebook, Instagram, MapPin, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";
import { BRANCHES } from "@/data/branches";
import { SOCIAL, whatsappUrl } from "@/data/config";

const QUICK = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/deals", label: "Deals" },
  { to: "/naan-stop", label: "Naan Stop" },
  { to: "/branches", label: "Branches" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

const SUPPORT = [
  { to: "/delivery-information", label: "Delivery Information" },
  { to: "/faqs", label: "FAQs" },
  { to: "/privacy-policy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms & Conditions" },
] as const;

export function Footer() {
  const wa = whatsappUrl();

  return (
    <footer className="bg-charcoal text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4">
        <div>
          <img
            src={logo}
            alt="Al-Maidah Café logo"
            width={64}
            height={64}
            loading="lazy"
            className="size-16 rounded-lg object-cover"
          />
          <p className="mt-4 max-w-xs text-sm text-cream/70">
            Serving Peshawar with Pakistani, Chinese, BBQ, burgers, pizza and more.
          </p>
          <div className="mt-5 flex gap-2">
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Al-Maidah Café on Instagram"
              className="grid size-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-brand hover:text-ink"
            >
              <Instagram className="size-4" />
            </a>
            <a
              href={SOCIAL.facebook}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Al-Maidah Café on Facebook"
              className="grid size-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-brand hover:text-ink"
            >
              <Facebook className="size-4" />
            </a>
            {wa && (
              <a
                href={wa}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Message Al-Maidah Café on WhatsApp"
                className="grid size-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-success"
              >
                <MessageCircle className="size-4" />
              </a>
            )}
          </div>
        </div>

        <nav aria-label="Quick links">
          <h2 className="eyebrow text-brand">Quick Links</h2>
          <ul className="mt-4 space-y-2 text-sm text-cream/70">
            {QUICK.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-brand">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/menu" className="font-bold text-cream transition-colors hover:text-brand">
                Order Now
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Customer support">
          <h2 className="eyebrow text-brand">Customer Support</h2>
          <ul className="mt-4 space-y-2 text-sm text-cream/70">
            {SUPPORT.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-brand">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow text-brand">Our Branches</h2>
          <ul className="mt-4 space-y-3 text-sm text-cream/70">
            {BRANCHES.map((b) => (
              <li key={b.id} className="flex gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand" />
                <span>
                  <span className="block font-semibold text-cream">{b.name}</span>
                  {b.address}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-cream/50">
        © 2026 Al-Maidah Café. All Rights Reserved.
      </div>
    </footer>
  );
}
