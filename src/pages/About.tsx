import { Link } from "react-router-dom";
import { useHead } from "@/lib/use-head";
import { motion } from "motion/react";
import heroFood from "@/assets/hero-food.jpg";

const HEAD = {
    meta: [
      { title: "About Al-Maidah Café | Peshawar Restaurant" },
      {
        name: "description",
        content:
          "Al-Maidah Café brings Pakistani, Chinese, BBQ, burgers and pizza together under one roof, served across four branches in Peshawar.",
      },
      { property: "og:title", content: "About Al-Maidah Café" },
      { property: "og:description", content: "A taste for every craving, made in Peshawar." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
};

export default function AboutPage() {
  useHead(HEAD);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="eyebrow text-brand-deep">About us</p>
          <h1 className="display-lg mt-2">A TASTE FOR EVERY CRAVING</h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            At Al-Maidah Café, we bring together the flavors people love — from traditional
            Pakistani dishes and BBQ to Chinese favorites, burgers, pizzas and more. Fresh
            ingredients, generous portions and authentic taste come together under one roof.
          </p>
          <Link
            to="/menu"
            className="mt-7 inline-flex rounded-full bg-ink px-6 py-3 text-xs font-bold uppercase tracking-widest text-cream"
          >
            Explore Menu
          </Link>
        </div>
        <img
          src={heroFood}
          alt="A spread of Al-Maidah Café dishes including karahi, naan, burger and BBQ"
          loading="lazy"
          width={1408}
          height={1104}
          className="rounded-2xl object-cover shadow-plate"
        />
      </div>
    </motion.div>
  );
}
