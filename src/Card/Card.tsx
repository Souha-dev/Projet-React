import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { FormatCurrency } from "../utilities/FormatCurrency";
import { Product } from "../Utils/Props";
import { apiUrl, productImgUrl } from "../Utils/Helpers";
import "./Card.css";
import { useShoppingCart } from "../Utils/CartContext";

const Card: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const { addToCart } = useShoppingCart(); // Import the addToCart function from context

  const fetchProducts = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get(`${apiUrl}/products.json`, {
        params: {
          disponibilite: "enstock",
          latest: "enable",
          page: 1,
          itemsPerPage: 16,
        },
      });
      if (response.status === 200) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Update the addToCard function to convert types as needed
const addToCard = (product: Product) => {
  addToCart(
    product.id, // ID (string or number)
    product.sellingPrice.toString(), // Selling price as string
    // product.title, // Title as string
    // product.image, // Image as string (URL)
    "product", // Item type as string
    1 // Quantity as number
  );
};


  return (
    <div>
      <div className="deuxieme-composant">
        <div className="col-xl-9 col-lg-8 col-md-8 col-sm-12 col-12 d-flex flex-wrap justify-content-start">
          {products.map((product) => (
            <section className="card-container" key={product.id}>
              <section className="card">
                <img
                  className="card-img"
                  src={`${productImgUrl}/${product.image}`}
                  alt={product.title}
                />
                <div className="card-details">
                  <h3 className="card-title">{product.title}</h3>
                  <section className="card-reviews">
                    <FaStar className="rating-star" />
                    <FaStar className="rating-star" />
                    <FaStar className="rating-star" />
                    <FaStar className="rating-star" />
                  </section>
                  <hr className="hr-tag" />
                  <div className="card-price">
                    <div className="price">
                      {FormatCurrency(product.sellingPrice)}
                    </div>
                    <div className="pric">
                      <button
                        className="btn btn-outline-success"
                        onClick={() => addToCard(product)}
                      >
                        Ajouter au panier
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
