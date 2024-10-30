import { FC, createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useShoppingCart } from "./CartContext";
import { apiUrl } from "./Helpers";

const CartDataContext = createContext<{
  products: any[];
}>({
  products: [],
});

export const useCartDataContext = () => useContext(CartDataContext);

export const CartDataProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { cartItems } = useShoppingCart();

  const [products, setProducts] = useState<any[]>([]);
  const productIds: any[] = [];

  cartItems.map((i: any) => {
    if (i.itemType === "product") {
      productIds.push(i.product);
    }
  });

  console.log(productIds);
  


  const fetchCartData = async () => {
    try {
      if (productIds.length > 0) {
        const response = await axios.post(
          `${apiUrl}/products-by-ids`,
          productIds
        );

        console.log(( response).data);
        

        if (( response).status === 200) {
          setProducts(response.data);
        }
      }
    } catch (error) {
      // console.error(error);
    }
  };


  useEffect(() => {
    fetchCartData();
  }, [cartItems]);

  return (
    <>
      <CartDataContext.Provider value={{ products }}>
        {children}
      </CartDataContext.Provider>
    </>
  );
};
