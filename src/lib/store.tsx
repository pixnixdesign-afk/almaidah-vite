import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import type { Product } from "@/data/menu";

export type OrderType = "delivery" | "pickup";

export type CartItem = {
  key: string;
  productId: string;
  name: string;
  image: string;
  variant: string | null;
  unitPrice: number;
  quantity: number;
  instructions?: string | undefined;
};

export type CustomerInfo = {
  name: string;
  phone: string;
  address?: string | undefined;
  area?: string | undefined;
  instructions?: string | undefined;
};

export type Order = {
  id: string;
  branchId: string | null;
  customer: CustomerInfo;
  items: CartItem[];
  orderType: OrderType;
  subtotal: number;
  deliveryFee: number | null;
  discount: number;
  total: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
};

type StoreValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  orderType: OrderType | null;
  branchId: string | null;
  cartOpen: boolean;
  hydrated: boolean;
  lastOrder: Order | null;
  setOrderType: (t: OrderType) => void;
  setBranchId: (id: string | null) => void;
  setCartOpen: (open: boolean) => void;
  addItem: (product: Product, opts?: { variant?: string | null; quantity?: number; unitPrice?: number; instructions?: string }) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  placeOrder: (order: Order) => void;
};

const StoreContext = createContext<StoreValue | null>(null);

const STORAGE_KEY = "almaidah.state.v1";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [orderType, setOrderTypeState] = useState<OrderType | null>(null);
  const [branchId, setBranchId] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setItems(parsed.items ?? []);
        setOrderTypeState(parsed.orderType ?? null);
        setBranchId(parsed.branchId ?? null);
        setLastOrder(parsed.lastOrder ?? null);
      }
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ items, orderType, branchId, lastOrder }),
      );
    } catch {
      /* storage unavailable */
    }
  }, [items, orderType, branchId, lastOrder, hydrated]);

  const addItem: StoreValue["addItem"] = useCallback((product, opts = {}) => {
    const variant = opts.variant ?? null;
    const unitPrice = opts.unitPrice ?? product.price ?? 0;
    const quantity = opts.quantity ?? 1;
    if (!unitPrice) {
      toast.error("Price coming soon", {
        description: "This item isn't available for online ordering yet.",
      });
      return;
    }
    const key = `${product.id}::${variant ?? "default"}`;
    setItems((prev) => {
      const found = prev.find((i) => i.key === key);
      if (found) {
        return prev.map((i) => (i.key === key ? { ...i, quantity: i.quantity + quantity } : i));
      }
      return [
        ...prev,
        {
          key,
          productId: product.id,
          name: product.name,
          image: product.image,
          variant,
          unitPrice,
          quantity,
          instructions: opts.instructions,
        },
      ];
    });
    toast.success("Added to your cravings 😋", { description: product.name });
  }, []);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.key !== key)
        : prev.map((i) => (i.key === key ? { ...i, quantity } : i)),
    );
  }, []);

  const removeItem = useCallback(
    (key: string) => setItems((prev) => prev.filter((i) => i.key !== key)),
    [],
  );

  const setOrderType = useCallback((t: OrderType) => setOrderTypeState(t), []);

  const placeOrder = useCallback((order: Order) => {
    setLastOrder(order);
    setItems([]);
  }, []);

  const value = useMemo<StoreValue>(() => {
    const subtotal = items.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
    return {
      items,
      itemCount: items.reduce((s, i) => s + i.quantity, 0),
      subtotal,
      orderType,
      branchId,
      cartOpen,
      hydrated,
      lastOrder,
      setOrderType,
      setBranchId,
      setCartOpen,
      addItem,
      updateQuantity,
      removeItem,
      clearCart: () => setItems([]),
      placeOrder,
    };
  }, [items, orderType, branchId, cartOpen, hydrated, lastOrder, setOrderType, addItem, updateQuantity, removeItem, placeOrder]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
