import React, { useEffect, useState } from 'react'
import { Category, Marque, Product } from '../../Utils/Props';
import { apiUrl } from '../../Utils/Helpers';
import axios from 'axios';
import './NavBar.css';

const NavBar: React.FC = () => {
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
    // console.log(categories);
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
    <div className="premier-composant">
      <div className="col-xl-3 col-lg-4 col-md-4 col-sm-11 col-11 mt-2 mb-4 pb-4 filter">
        <div className="container mt-5">
          <div className="row">
            <div
              className="   col-xl-12 col-lg-12 col-md-12 col-12"
              style={{width: "141%"}}
            >
              <div className="filter-title filter-sort">
                <span className="filter-result">Filtrer le résultat:</span>
                <select name="" id="" className="form-control select-option">
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

            <div
              className="col-xl-12 col-lg-12 col-md-12 col-12"
               style={{width: "141%"}}
            >
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

            <div
              className="col-xl-12 col-lg-12 col-md-12 col-12"
               style={{width: "141%"}}
            >
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
    </div>
  );
}

export default NavBar
