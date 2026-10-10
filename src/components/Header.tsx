import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Search, ShoppingBag, User, X, Instagram, Facebook, Bike, Store } from "lucide-react";
import { Logo } from "@/components/Brand";
import { SearchDialog } from "@/components/SearchDialog";
import { useStore } from "@/lib/store";
import { SOCIAL } from "@/data/config";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/deals", label: "Deals" },
  { to: "/naan-stop", label: "Naan Stop" },
  { to: "/branches", label: "Branches" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { itemCount, setCartOpen, orderType, setOrderType } = useStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b border-border/60 transition-all duration-300",
          scrolled
            ? "bg-cream/85 shadow-[0_8px_24px_-18px_rgba(0,0,0,0.6)] backdrop-blur-md"
            : "bg-cream",
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-7xl items-center gap-4 px-4 transition-all duration-300 sm:px-6",
            scrolled ? "h-14" : "h-[72px]",
          )}
        >
          <Logo size={scrolled ? 34 : 40} />

          <nav aria-label="Main" className="mx-auto hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "relative px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors after:absolute after:inset-x-3 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:bg-brand after:transition-transform hover:text-foreground hover:after:scale-x-100",
                    isActive && "text-foreground after:scale-x-100",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1.5">
            <div className="hidden items-center rounded-full bg-sand p-1 md:flex">
              <button
                type="button"
                onClick={() => setOrderType("delivery")}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-colors",
                  orderType === "delivery" ? "bg-ink text-cream" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Bike className="size-3.5" /> Delivery
              </button>
              <button
                type="button"
                onClick={() => setOrderType("pickup")}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-colors",
                  orderType === "pickup" ? "bg-ink text-cream" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Store className="size-3.5" /> Pick Up
              </button>
            </div>

            <button
              type="button"
              aria-label="Search the menu"
              onClick={() => setSearchOpen(true)}
              className="grid size-10 place-items-center rounded-full text-foreground transition-colors hover:bg-sand"
            >
              <Search className="size-5" />
            </button>

            <button
              type="button"
              aria-label={`Open cart, ${itemCount} items`}
              onClick={() => setCartOpen(true)}
              className="relative grid size-10 place-items-center rounded-full text-foreground transition-colors hover:bg-sand"
            >
              <ShoppingBag className="size-5" />
              {itemCount > 0 && (
                <motion.span
                  key={itemCount}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-0.5 -top-0.5 grid min-w-5 place-items-center rounded-full bg-brand px-1 text-[0.65rem] font-bold text-ink"
                >
                  {itemCount}
                </motion.span>
              )}
            </button>

            <Link
              to="/admin"
              aria-label="Account and admin"
              className="hidden size-10 place-items-center rounded-full text-foreground transition-colors hover:bg-sand lg:grid"
            >
              <User className="size-5" />
            </Link>

            <Link
              to="/menu"
              className="hidden rounded-full bg-ink px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-cream transition-transform hover:scale-[1.03] sm:inline-flex"
            >
              Order Now
            </Link>

            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setDrawer(true)}
              className="grid size-10 place-items-center rounded-full text-foreground transition-colors hover:bg-sand lg:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {drawer && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawer(false)}
              className="fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-[61] flex w-[86%] max-w-sm flex-col bg-charcoal text-cream lg:hidden"
              role="dialog"
              aria-label="Site menu"
            >
              <div className="flex items-center justify-between border-b border-white/10 p-4">
                <span className="font-display text-2xl">MENU</span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setDrawer(false)}
                  className="grid size-10 place-items-center rounded-full hover:bg-white/10"
                >
                  <X className="size-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-1">
                  {NAV.map((item, i) => (
                    <motion.li
                      key={item.to}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i }}
                    >
                      <Link
                        to={item.to}
                        onClick={() => setDrawer(false)}
                        className="block rounded-lg px-3 py-3 font-display text-2xl tracking-wide hover:bg-white/10"
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-6 space-y-2 border-t border-white/10 pt-6">
                  <a
                    href={SOCIAL.instagram}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold hover:bg-white/10"
                  >
                    <Instagram className="size-4 text-brand" /> Instagram
                  </a>
                  <a
                    href={SOCIAL.facebook}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold hover:bg-white/10"
                  >
                    <Facebook className="size-4 text-brand" /> Facebook
                  </a>
                </div>
              </nav>
              <div className="border-t border-white/10 p-4">
                <Link
                  to="/menu"
                  onClick={() => setDrawer(false)}
                  className="block rounded-full bg-brand py-3.5 text-center text-sm font-bold uppercase tracking-widest text-ink"
                >
                  Order Now
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
