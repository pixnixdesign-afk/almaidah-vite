import { NavLink } from "react-router-dom";
import { Home, UtensilsCrossed, Tag, ShoppingBag, User } from "lucide-react";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const { itemCount, setCartOpen } = useStore();

  const linkClass =
    "flex flex-1 flex-col items-center gap-1 py-2 text-[0.62rem] font-bold uppercase tracking-wider text-muted-foreground";

  return (
    <nav
      aria-label="Quick navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-cream/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
    >
      <div className="mx-auto flex max-w-md items-stretch px-2">
        <NavLink to="/" end className={({ isActive }) => cn(linkClass, isActive && "!text-ink")}>
          <Home className="size-5" /> Home
        </NavLink>
        <NavLink to="/menu" className={({ isActive }) => cn(linkClass, isActive && "!text-ink")}>
          <UtensilsCrossed className="size-5" /> Menu
        </NavLink>
        <NavLink to="/deals" className={({ isActive }) => cn(linkClass, isActive && "!text-ink")}>
          <Tag className="size-5" /> Deals
        </NavLink>
        <button type="button" onClick={() => setCartOpen(true)} className={linkClass}>
          <span className="relative">
            <ShoppingBag className="size-5" />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-1.5 grid min-w-4 place-items-center rounded-full bg-brand px-1 text-[0.55rem] text-ink">
                {itemCount}
              </span>
            )}
          </span>
          Cart
        </button>
        <NavLink to="/admin" className={({ isActive }) => cn(linkClass, isActive && "!text-ink")}>
          <User className="size-5" /> Account
        </NavLink>
      </div>
    </nav>
  );
}
