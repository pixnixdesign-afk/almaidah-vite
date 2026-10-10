import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { searchProducts } from "@/data/menu";
import { formatPrice } from "@/data/config";
import { useStore } from "@/lib/store";

export function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [query, setQuery] = useState("");
  const { addItem } = useStore();
  const results = useMemo(() => searchProducts(query).slice(0, 12), [query]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl gap-0 overflow-hidden p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Search the menu</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="size-5 text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pizza, burger, chicken, naan…"
            aria-label="Search the menu"
            className="w-full bg-transparent py-1 text-base outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {query && results.length === 0 && (
            <div className="px-4 py-10 text-center">
              <p className="font-display text-2xl">NO CRAVINGS FOUND</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try searching for pizza, burger, chicken or naan.
              </p>
            </div>
          )}
          {!query && (
            <p className="px-4 py-8 text-center text-sm text-muted-foreground">
              Start typing to find something delicious.
            </p>
          )}
          <ul>
            {results.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => {
                    addItem(item, item.sizes ? { variant: item.sizes[0]!.label, unitPrice: item.sizes[0]!.price } : {});
                    onOpenChange(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-sand"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    width={56}
                    height={56}
                    className="size-14 rounded-md object-cover"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold">{item.name}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {item.description}
                    </span>
                  </span>
                  <span className="text-sm font-bold">
                    {item.price ? formatPrice(item.price) : "—"}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
