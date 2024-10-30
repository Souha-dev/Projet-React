import React, { useEffect } from "react";
import { IoBeerOutline } from "react-icons/io5";
import { useShoppingCart } from "../../Utils/CartContext";
import { useCartDataContext } from "../../Utils/CartDataContext";
import { productImgUrl } from "../../Utils/Helpers";
import { Product } from "../../Utils/Props";

interface CartItemProps {
  product: string | number;
  quantity: number;
  ukey: string;
}

const CartItem: React.FC<CartItemProps> = ({ product, ukey, quantity }) => {
  const {
    cartItems: cart,
    removeFromCart,
    quantities,
    setQuantities,
    increaseQuantity,
    decreaseQuantity,
  } = useShoppingCart();

  const { products } = useCartDataContext();


  const item: Product = products.find((i) => i.id === product);
  console.log(item);

  if (!item) return null; 

  return (
    <>
  
      <div
        className="containerj1 d-flex justify-content-between m-4"
        key={ukey}
      >
        <div className="d-flex">
          <img
            src={`${productImgUrl}/${item.image}`}
            style={{ width: "59px" }}
            alt={item.title}
          />
          <div className="all4">
            <h5 className="font-titel">
              {item.title.split(" ").slice(0, 3).join(" ")}
              <br />
              {item.title.split(" ").slice(3).join(" ")}
            </h5>
            <h3>{item.sellingPrice} DH</h3>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <button
            className="btn btn-light text-dark mr-2"
            onClick={() => decreaseQuantity(ukey)}
          >
            <i className="fas fa-minus"></i>
          </button>
          <span>{quantity}</span>
          <button
            className="btn btn-light text-dark mr-2"
            onClick={() => increaseQuantity(ukey)}
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
        <div className="d-flex align-items-center" style={{ marginLeft: "5%" }}>
          <h2 className="styl">
            {Number(item.sellingPrice) * (quantity)} DH
          </h2>
        </div>
        <div className="d-flex mr-6 align-items-center">
          <IoBeerOutline
            onClick={() => removeFromCart(ukey)}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
 
    </>
  );
};

export default CartItem;
