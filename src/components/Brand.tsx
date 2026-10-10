import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

export function Logo({ className, size = 44 }: { className?: string; size?: number }) {
  return (
    <Link to="/" className={cn("flex items-center gap-3", className)} aria-label="Al-Maidah Café home">
      <img
        src={logo}
        alt="Al-Maidah Café logo"
        width={size}
        height={size}
        className="rounded-md object-cover"
        style={{ width: size, height: size }}
      />
      <span className="hidden sm:block leading-none">
        <span className="block font-display text-xl tracking-wide">AL-MAIDAH</span>
        <span className="block eyebrow text-[0.58rem] text-muted-foreground">Café · Peshawar</span>
      </span>
    </Link>
  );
}

export function Sunburst({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute size-64 rounded-full brand-sunburst opacity-[0.06]",
        className,
      )}
    />
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  invert = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  invert?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p className={cn("eyebrow mb-3", invert ? "text-brand" : "text-brand-deep")}>{eyebrow}</p>
      )}
      <h2 className={cn("display-lg", invert ? "text-cream" : "text-foreground")}>{title}</h2>
      {subtitle && (
        <p className={cn("mt-3 text-base", invert ? "text-cream/70" : "text-muted-foreground")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
