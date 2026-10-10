import { useHead } from "@/lib/use-head";


const HEAD = {
    meta: [
      { title: "Terms & Conditions | Al-Maidah Café" },
      { name: "description", content: "Terms and conditions for ordering online from Al-Maidah Café, Peshawar." },
      { property: "og:title", content: "Terms & Conditions | Al-Maidah Café" },
      { property: "og:description", content: "The terms that apply to online orders." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/terms" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
};

export default function TermsPage() {
  useHead(HEAD);
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="display-lg">TERMS &amp; CONDITIONS</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          Orders placed on this website are requests to the Al-Maidah Café branch you select. An
          order is confirmed once the branch accepts it.
        </p>
        <p>
          Menu prices are shown in Pakistani Rupees. Items listed without a price are not available
          for online ordering until pricing is published.
        </p>
        <p>
          Delivery charges, delivery zones and preparation times are set by each branch and
          confirmed when your order is accepted.
        </p>
        <p>
          Availability of any dish depends on the kitchen at the time of ordering. If an item is
          unavailable, the branch will contact you on the phone number you provide.
        </p>
      </div>
    </div>
  );
}
