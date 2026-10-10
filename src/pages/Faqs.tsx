import { useHead } from "@/lib/use-head";


const HEAD = {
    meta: [
      { title: "FAQs | Al-Maidah Café Peshawar" },
      { name: "description", content: "Answers to common questions about ordering from Al-Maidah Café in Peshawar." },
      { property: "og:title", content: "FAQs | Al-Maidah Café" },
      { property: "og:description", content: "Ordering, branches and delivery questions answered." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/faqs" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/faqs" }],
};

const FAQS = [
  {
    q: "Which areas do you deliver to?",
    a: "We deliver from four branches across Peshawar — Hayatabad (F-8 Phase 6 and Phase 4), Nasir Bagh Road and Warsak Road. Delivery zones are confirmed by your selected branch.",
  },
  {
    q: "How much is delivery?",
    a: "Delivery charges are confirmed by the branch handling your order. They are not applied automatically at checkout.",
  },
  {
    q: "Can I collect my order myself?",
    a: "Yes. Choose Pickup at checkout, select your nearest branch and pay at the counter when you collect.",
  },
  {
    q: "How do I pay?",
    a: "Cash on Delivery and Pay at Pickup are available today. JazzCash, Easypaisa, card and online banking will be enabled once set up.",
  },
];

export default function FaqsPage() {
  useHead(HEAD);
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="display-lg">FAQS</h1>
      <dl className="mt-8 space-y-6">
        {FAQS.map((f) => (
          <div key={f.q} className="rounded-2xl border border-border bg-card p-6">
            <dt className="font-display text-xl">{f.q}</dt>
            <dd className="mt-2 text-sm text-muted-foreground">{f.a}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
