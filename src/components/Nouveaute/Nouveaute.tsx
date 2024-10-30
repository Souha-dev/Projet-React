import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import SwiperCore from "swiper";
import axios from "axios";
import "./Nouveaute.css";
import { Product } from "../../Utils/Props";
import { apiUrl, productImgUrl } from "../../Utils/Helpers";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";

const Nouveaute = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const progressCircle = useRef<SVGSVGElement>(null);
  const progressContent = useRef<HTMLSpanElement>(null);

  const handleSwiper = (swiper: SwiperCore) => {
    console.log(swiper); // Maintenant, swiper est correctement typé
  };



  

  const onAutoplayTimeLeft = (
    s: SwiperCore,
    time: number,
    progress: number
  ) => {
    if (progressCircle.current && progressContent.current) {
      progressCircle.current.style.setProperty("--progress", `${1 - progress}`);
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };
  

  const fetchProducts = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get(`${apiUrl}/products.json`, {
        params: {
          disponibilite: "enstock",
          latest: "enable",
          page: 1,
          itemsPerPage: 8,
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

  return (
    <>
      <div className="container roww align-items-center">
        <div className="container col-md-12 col-lg-12 mb-5 text-center justify-content-center">
          <div className="container d-inline">
            <h2 className=" fw-bold fs-37px ff-outfit-semi">NOS NOUVEAUTES</h2>
          </div>
        </div>
      </div>
      <div>
        <Swiper
          modules={[Navigation, Pagination, A11y, Autoplay]}
          spaceBetween={50}
          slidesPerView={4}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          onSlideChange={() => console.log("slide change")}
          onSwiper={handleSwiper}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
        >
          {products.map((product) => (
            <SwiperSlide
              style={{ width: 200, height: 350 }}
              key={product.image}
            >
              <div className="container row">
                <div className="clstyle col m-3" style={{height: 250, width:"100%"}}>
                  <div className="img-container">
                    <img
                      className="product-img center"
                      src={`${productImgUrl}/${product.image}`}
                      alt=""
                    />
                  </div>
                  <p>{product.title}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Nouveaute;
