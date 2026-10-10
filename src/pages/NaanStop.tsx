import { useHead } from "@/lib/use-head";

import { motion } from "motion/react";
import { NAAN_STOP_PRODUCTS } from "@/data/menu";
import { ProductGrid } from "@/components/ProductGrid";
import naanImg from "@/assets/naan.jpg";

const HEAD = {
    meta: [
      { title: "Al-Maidah Naan Stop | Stuffed Naan in Peshawar" },
      {
        name: "description",
        content:
          "Chicken cheese naan, pizza naan, pepperoni naan, nutella naan and more — freshly stuffed from the Al-Maidah Naan Stop in Peshawar.",
      },
      { property: "og:title", content: "Al-Maidah Naan Stop" },
      { property: "og:description", content: "Freshly stuffed naan, straight from the tandoor." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/naan-stop" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/naan-stop" }],
};

export default function NaanStopPage() {
  useHead(HEAD);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <section className="relative overflow-hidden bg-brand">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-ink/70">Straight from the tandoor</p>
            <h1 className="display-lg mt-2 text-ink">AL-MAIDAH NAAN STOP</h1>
            <p className="mt-3 max-w-md text-sm font-medium text-ink/75">
              Stuffed, folded and baked to order. Cheese pulls guaranteed.
            </p>
          </div>
          <motion.img
            src={naanImg}
            alt="Chicken cheese naan with a melted cheese pull"
            width={700}
            height={700}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto max-h-80 w-full max-w-md rounded-2xl object-cover shadow-plate"
          />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <ProductGrid products={NAAN_STOP_PRODUCTS} />
      </div>
    </motion.div>
  );
}
