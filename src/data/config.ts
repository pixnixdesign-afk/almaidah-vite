/**
 * Central, editable configuration for Al-Maidah Café.
 * Anything not officially supplied is left null/empty on purpose — never invented.
 */

export const SOCIAL = {
  instagram: "https://www.instagram.com/almaidahcafe/",
  facebook: "https://www.facebook.com/almaidahcafepeshawar/",
  /** Add the official TikTok handle URL when available. */
  tiktok: null as string | null,
} as const;

/** Digits only, international format, e.g. "92XXXXXXXXXX". Leave null until supplied. */
export const WHATSAPP_NUMBER: string | null = null;
export const WHATSAPP_MESSAGE = "Hi Al-Maidah Café, I'd like to place an order.";

/** Public phone number for the café. Leave null until supplied. */
export const CONTACT_PHONE: string | null = null;

export const whatsappUrl = () =>
  WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
    : null;

/** Delivery economics — all configurable, none assumed. */
export const DELIVERY_SETTINGS = {
  baseDeliveryFee: null as number | null,
  freeDeliveryThreshold: null as number | null,
  minimumOrder: null as number | null,
  estimatedPrepTimeMinutes: null as number | null,
  zones: [] as { id: string; name: string; fee: number }[],
};

export type PaymentMethod = {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
};

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "cod",
    label: "Cash on Delivery",
    description: "Pay the rider when your order arrives.",
    enabled: true,
  },
  {
    id: "pay_at_pickup",
    label: "Pay at Pickup",
    description: "Pay at the counter when you collect.",
    enabled: true,
  },
  { id: "jazzcash", label: "JazzCash", description: "Coming soon.", enabled: false },
  { id: "easypaisa", label: "Easypaisa", description: "Coming soon.", enabled: false },
  { id: "card", label: "Debit / Credit Card", description: "Coming soon.", enabled: false },
  { id: "bank", label: "Online Banking", description: "Coming soon.", enabled: false },
];

export type Coupon = {
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minimumOrder?: number;
  expiresAt?: string;
  branchIds?: string[];
  firstOrderOnly?: boolean;
};

/** No live promotions until the café supplies them. */
export const COUPONS: Coupon[] = [];

export const formatPrice = (value: number) =>
  `Rs ${value.toLocaleString("en-PK", { maximumFractionDigits: 0 })}`;
