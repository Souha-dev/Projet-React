import React, { useState, useEffect } from "react";
import "./Panier.css";
import Header from "../../Sections/Header/Header";
import { useShoppingCart } from "../../Utils/CartContext";
import CartItem from "../CartItem/CartItem";

const Panier: React.FC = () => {
  const {
    cartItems: cart,
   
    setQuantities,

    total,
  } = useShoppingCart();

  const [shippingCost, setShippingCost] = useState(0);

  useEffect(() => {
    const initialQuantities: { [id: number]: number } = {};
    cart.forEach((item: any) => {
      initialQuantities[item.ukey] = 1;
    });
    setQuantities(initialQuantities);
  }, [cart]);

  useEffect(() => {
    setShippingCost(total >= 300 ? 0 : 40);
  }, [total]);

  return (
    <div>
      <Header />
      <h1 className="titre text-center">MON PANIER</h1>
      <div className="con">
        <div className="all">
          <div className="cont1">
            {cart.map((item: any) => (
              <CartItem
                key={item.ukey}
                ukey={item.ukey}
                product={item}
                {...item}
              />
            ))}
          </div>
          <div className="cont2">
            <div>Livraison gratuite à partir de : 300 DH</div>
            <hr className="hr-tag" />
            <div className="totelP">
              <h5>TOTAL PANIER</h5>
            </div>
            <hr className="hr-tag" />
            <div className="all">
              <div className="prixTotal">
                <h6>SOUS-TOTAL</h6>
              </div>
              <div className="prixTotal">
                <h6>{total.toFixed(2)} DH</h6>
              </div>
            </div>
            <hr className="hr-tag" />
            <div className="all">
              <div className="prixTotal">
                <h6>EXPEDITION</h6>
              </div>
              <div>
                <div className="all3">
                  <input
                    type="radio"
                    name="livraison"
                    checked={shippingCost === 40}
                    readOnly
                  />
                  <h5 className="mx-3">Forfait de livraison : 40 DH</h5>
                </div>
                <div className="all3">
                  <input
                    type="radio"
                    name="livraison"
                    checked={shippingCost === 0}
                    readOnly
                  />
                  <h5 className="mx-3">Livraison Gratuite</h5>
                </div>
              </div>
            </div>
            <hr className="hr-tag" />
            <div>
              <p className="text-center">Méthode de paiement</p>
              <div className="all1">
                <input className="text-center" type="radio" name="payment" />
                <h6 className="text-center mx-1">À la Livraison</h6>
              </div>
            </div>
            <hr className="hr-tag" />
            <div className="all">
              <div className="prixTotal">
                <h6>TOTAL</h6>
              </div>
              <div className="prixTotal">
                <h6>{(total + shippingCost).toFixed(2)} DH</h6>
              </div>
            </div>
            <div className="all">
              <button className="button" type="submit">
                SE CONNECTER
              </button>
              <button className="button" type="submit">
                ACHETER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panier;
