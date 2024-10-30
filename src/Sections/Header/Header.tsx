// src/components/Header.tsx
import React, { useState, useEffect } from "react";
import Logo from "../../assets/Images/logoBeauty.png";
import axios from "axios";
import { Link } from "react-router-dom";

import MarqueComponent from "../../components/Marques/Marque";
import { MdOutlineShoppingCart } from "react-icons/md";
import "./Header.css";
import { Category } from "../../Utils/Props";
import { apiUrl } from "../../Utils/Helpers";
import { useShoppingCart } from "../../Utils/CartContext";
import { BsCart3 } from "react-icons/bs";

// import { useShoppingCart } from "../../Utils/CartContext";
// import { useCart } from "../../components/context/CartContext";

const Header: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { getItemQuantity ,cartItems} = useShoppingCart();

  // console.log(cartItems);
  

  useEffect(() => {
    axios
      .get(`${apiUrl}/categories`)
      .then((response) => {
        const data = response.data["hydra:member"];
        setCategories(data.slice(0, 8));
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des catégories :", error)
      );
  }, []);
   const [panier, setPanier] = useState(0);























































   
   // const { getItemQuantity } = useShoppingCart();

  //  useEffect(() => {
  //    axios
  //      .get(`${apiUrl}/packs`)
  //      .then((response) => {
  //        const data = response.data["hydra:member"];
  //       //  setCategories(data.slice(0, 8));
  //      setPanier(data.length)
  //      console.log(data.length)
  //      })
  //      .catch((error) =>
  //        console.error("Erreur lors de la récupération des catégories :", error)
  //      );
  //  }, []);


  return (
    <div>
      <div className="top-header-container d-flex justify-content-between align-items-center main-menu-two__btn text-white">
        <div className="containerr top-container w-100 mx5">
          <div className="row align-items-center mx-3">
            <div className="col-lg-3 col-md-3 col-sm-7 col-6 align-items-center text-start d-inline-flex ps-4">
              0600456348
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-7 align-items-center text-center d-inline-fle ps4">
              Livraison gratuite à partir de 300 DH
            </div>
            <div className="col-lg-3 col-md-3 col-sm-5 col-6 mt-2 align-items-right time">
              <div className="row">
                <div className="col-12 text-end d-flex-end">
                  <Link to="/panier" className="panier-link">
                    <BsCart3 className="panier" />
                    {cartItems.length > 0 && (
                      <div className="cart-count">{cartItems.length}</div>
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/boutique/best-seller" className="container-fluid">
            Best Sellers
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/boutique/latest" className="nav-link">
                  Nouveautés
                </Link>
              </li>

              <Link to="/boutique/promotion" className="nav-link">
                Promotions
              </Link>

              <li>
                <Link to="/boutique" className="nav-link">
                  Boutique
                </Link>
              </li>
              <li className="nav-item dropdown toTheFront">
                <Link
                  className="nav-link dropdown-toggle"
                  to=""
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  NOS MARQUES
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <MarqueComponent />
                  </li>
                </ul>
              </li>
            </ul>

            <div className="img justify-content-end align-items-center">
              <img src={Logo} alt="Header Image" className="centered-image" />
            </div>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {categories.map((category) => (
                <li
                  className="nav-item ps-0 dropdown toTheFront"
                  key={category.id}
                >
                  <Link
                    className="nav-link navbar-link dropdown-toggle"
                    to={`/boutique/categorie/${category.slug}`}
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {category.title}
                  </Link>
                  {category.subCategory && (
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      {category.subCategory.map((subcategory) => (
                        <li key={subcategory.id}>
                          <Link
                            className="dropdown-item"
                            to={`/boutique/categorie/${subcategory.slug}`}
                          >
                            {subcategory.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
