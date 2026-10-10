import { useHead } from "@/lib/use-head";


const HEAD = {
    meta: [
      { title: "Privacy Policy | Al-Maidah Café" },
      { name: "description", content: "How Al-Maidah Café handles the information you share when placing an order." },
      { property: "og:title", content: "Privacy Policy | Al-Maidah Café" },
      { property: "og:description", content: "How we handle your order information." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/privacy-policy" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/privacy-policy" }],
};

export default function PrivacyPolicyPage() {
  useHead(HEAD);
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="display-lg">PRIVACY POLICY</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          When you place an order we collect only what is needed to prepare and deliver it: your
          name, phone number and — for delivery orders — your address and any instructions you add.
        </p>
        <p>
          Your cart and order details are stored in your own browser so you can return to them.
          They are not shared with third parties for advertising.
        </p>
        <p>
          Order information is shared with the Al-Maidah Café branch fulfilling your order so the
          team can contact you and complete delivery or pickup.
        </p>
        <p>
          For any question about your information, contact us through our official Instagram or
          Facebook page, or at the branch you ordered from.
        </p>
      </div>
    </div>
  );
}
