import React, { useEffect, useState } from "react";
import "./Boutique.css";
import { Category, Marque, Product } from "../../Utils/Props";
import axios from "axios";
import { apiUrl, marqueImgUrl, productImgUrl } from "../../Utils/Helpers";
import MarqueComponent from "../../components/Marques/Marque";
import Header from "../../Sections/Header/Header";
import { FaStar } from "react-icons/fa";
import { IoBag } from "react-icons/io5";
import prod from "../../assets/Images/prod.png";
import { FormatCurrency } from "../../utilities/FormatCurrency";



const Boutique: React.FC = () => {
  const [marques, setMarques] = useState<Marque[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  // const quantity = 0;
  // const { increaseCartQuantity } = useShoppingCart();

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

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/marques`)
      .then((response) => {
        const data = response.data["hydra:member"];
        setMarques(data);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des marques :", error)
      );
  }, []);


  return (
    <>
      <Header />


      <div className="row d-flex-center">
        
        {marques.map((marque) => (
          <div className="col-xl-2 col-lg-2 col-md-3 col-3" key={marque.id}>
            <div className="marque-card my-2">
              <div className="marque-card-image d-flex-center">
                <a
                  className="nav-link w-100 h-100"
                  href={`/boutique/marque/${marque.title
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  <div className="d-flex-center w-100"></div>
                  <img
                    className="marque-card-img"
                    src={`${marqueImgUrl}/${marque.image}`}
                    alt={marque.title}
                  />
                  <div className="marque-card-overlay d-flex-center c-pointer text-center"></div>
                  <div className="marque-card-overlay-before d-flex-center c-pointer text-center"></div>
                </a>
              </div>
              <div className="marque-card-desc text-center mt-2">
                <div>
                  <ul>
                    <li></li>
                  </ul>
                </div>

                <span className="ff-outfit-m fs-20px">{marque.title}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="container ">
        <div className="row d-flex justify-content-center">
          <div className="col-xl-3 col-lg-4 col-md-4 col-sm-11 col-11 mt-2 mb-4 pb-4 filter">
            <div className="container mt-5">
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                  <div className="filter-title filter-sort">
                    <span className="filter-result">Filtrer le résultat:</span>
                    <select
                      name=""
                      id=""
                      className="form-control select-option"
                    >
                      <option value="" className="l">
                        Defaut
                      </option>
                      <option value="" className="l">
                        Prix croissant
                      </option>
                      <option value="" className="l">
                        Prix décroissant
                      </option>
                      <option value="" className="l">
                        Ancienneté
                      </option>
                    </select>
                  </div>
                  <hr className="hr-tag mt-3" />
                </div>

                <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                  <div className="filter-title filter-sort">
                    <span className="filter-result">Marques:</span>
                    <div className="fil">
                      <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingOne">
                            <button
                              className="accordion-button"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#marquecollapse"
                              // aria-expanded="true"
                              aria-controls="marquecollapse"
                            >
                              Choisir une marque
                            </button>
                          </h2>
                          <div
                            id="marquecollapse"
                            className="accordion-collapse collapse show"
                            aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body accordion-body-marque">
                              <ul className="list-unstyled mb-0">
                                {marques.map((marque, index) => (
                                  <li key={index}>
                                    <a href="" className="nav-link m-2">
                                      {marque.title}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="hr-tag mt-3" />

                <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                  <div className="filter-title filter-sort">
                    <span className="filter-result">Catégorie:</span>
                    <div className="fil">
                      <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingOne">
                            <button
                              className="accordion-button btn btn-outline-primary d-flex align-items-center"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#marquecollapse"
                              // aria-expanded="false"
                              aria-controls="marquecollapse"
                            >
                              <i className="bi bi-chevron-down me-2"></i>
                              Choisir Catégorie
                            </button>
                          </h2>
                          <div
                            id="marquecollapse"
                            className="accordion-collapse collapse show"
                            aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body accordion-body-marque">
                              <ul className="list-unstyled mb-0">
                                {categories.map((category, index) => (
                                  <li key={index}>
                                    <a href="" className="nav-link m-2">
                                      {category.title}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="hr-tag mt-3" />
              </div>
            </div>
          </div>

          <div className="col-xl-9 col-lg-8 col-md-8 col-sm-12 col-12 d-flex flex-wrap justify-content-start">
            {products.map((product) => (
              <section className="card-container">
                <section className="card">
                  <img
                    className="card-img"
                    src={`${productImgUrl}/${product.image}`}
                    alt=""
                  />
                  <div className="card-details">
                    <h3 className="card-title">{product.title}</h3>
                    <section className="card-reviews">
                      <FaStar className="rating-star" />
                      <FaStar className="rating-star" />
                      <FaStar className="rating-star" />
                      <FaStar className="rating-star" />
                    </section>
                    {/* <section className="card-price">
                   
                      <div className="bag">
                        <IoBag />
                      </div>
                    </section> */}
                    <hr className="hr-tag" />
                    <div className="card-price">
                      <div className="price">
                        {FormatCurrency(product.sellingPrice)}
                      </div>
                      <div className="pric">
                        
               
                        <button
                          className="btn "
                       
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
    </>
  );
};

export default Boutique;
