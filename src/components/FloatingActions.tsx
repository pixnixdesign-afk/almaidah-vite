import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/data/config";

export function FloatingActions() {
  const wa = whatsappUrl();
  if (!wa) return null;

  return (
    <a
      href={wa}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Chat with Al-Maidah Café on WhatsApp"
      className="fixed bottom-20 right-4 z-40 grid size-13 place-items-center rounded-full bg-success p-3.5 text-cream shadow-plate transition-transform hover:scale-105 md:bottom-6"
    >
      <MessageCircle className="size-6" />
    </a>
  );
}
