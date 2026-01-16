import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

export interface CartItem {
  id: string;
  type: "course" | "topic";
  courseId: string;
  courseTitle: string;
  topicId?: string;
  topicTitle?: string;
  price: number;
  originalPrice?: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
  totalPrice: number;
  originalTotalPrice: number;
  itemCount: number;
  bundleDiscount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "elearn_cart";
const BUNDLE_DISCOUNT_THRESHOLD = 3;
const BUNDLE_DISCOUNT_PERCENT = 10;

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (item: CartItem) => {
    if (items.find(i => i.id === item.id)) {
      toast.info("Item already in cart");
      return;
    }
    setItems(prev => [...prev, item]);
    toast.success(`Added "${item.topicTitle || item.courseTitle}" to cart`);
  };

  const removeFromCart = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    toast.success("Item removed from cart");
  };

  const clearCart = () => {
    setItems([]);
  };

  const isInCart = (id: string) => items.some(item => item.id === id);

  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const originalTotalPrice = items.reduce((sum, item) => sum + (item.originalPrice || item.price), 0);

  // Bundle discount: 10% off when 3+ items
  const bundleDiscount = items.length >= BUNDLE_DISCOUNT_THRESHOLD
    ? Math.round(subtotal * BUNDLE_DISCOUNT_PERCENT / 100)
    : 0;

  const totalPrice = subtotal - bundleDiscount;
  const itemCount = items.length;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        totalPrice,
        originalTotalPrice,
        itemCount,
        bundleDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
