import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  product: number | string;
  quantity: number;
  price: string;
  ukey: string;
  itemType: string;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (product: number | string) => number;
  total: number;
  addToCart: (
    product: number | string,
    price: string,
    itemType: string,
    quantity?: number
  ) => void;
  removeFromCart: (ukey: string) => void;
  cartQuantity: number;
  cartItems: CartItem[];
  quantities: { [key: string]: number }; // Changed key type to string
  setQuantities: React.Dispatch<
    React.SetStateAction<{ [key: string]: number }>
  >;
  increaseQuantity: (ukey: string) => void; // Adjusted to string type
  decreaseQuantity: (ukey: string) => void; // Adjusted to string type
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({}); // Adjusted to string key type
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = cartItems.reduce(
      (sum, item) => sum + item.quantity * Number(item.price),
      0
    );
    setTotal(newTotal);
  }, [cartItems]);

  function getItemQuantity(product: number | string) {
    return cartItems.find((item) => item.product === product)?.quantity || 0;
  }

  function addToCart(
    product: number | string,
    price: string,
    itemType: string,
    quantity: number = 1
  ) {
    const ukey = `${product}-${itemType}`;
    const id = product;

    setCartItems((currItems) => {
      const existingItem = currItems.find((item) => item.ukey === ukey);

      if (existingItem) {
        return currItems.map((item) =>
          item.ukey === ukey
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );
      } else {
        const total = parseFloat(price) * quantity;
        return [...currItems, { id, product, price, itemType, quantity, ukey }];
      }
    });
  }

const increaseQuantity = (ukey: string) => {
  setCartItems((prevItems) =>
    prevItems.map((item) =>
      item.ukey === ukey ? { ...item, quantity: item.quantity + 1 } : item
    )
  );
};

const decreaseQuantity = (ukey: string) => {
  setCartItems((prevItems) =>
    prevItems.map((item) =>
      item.ukey === ukey
        ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
        : item
    )
  );
};

  function removeFromCart(ukey: string) {
    setCartItems((currItems) => currItems.filter((item) => item.ukey !== ukey));
  }

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => {
      const itemPrice = parseFloat(item.price) || 0;
      return sum + itemPrice * item.quantity;
    }, 0);
    setTotal(total);
  }, [cartItems]);

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        addToCart,
        removeFromCart,
        openCart,
        closeCart,
        total,
        cartItems,
        cartQuantity,
        quantities,
        setQuantities,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
