import React from "react";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { SliderProps } from "../../Utils/Props";
import { sliderImgUrl } from "../../Utils/Helpers";
import './HomeCarouselStyle.css'

const HomeCarousel: React.FC<SliderProps> = ({ items, isLoading }) => {
  return (

    <>
   
      {!isLoading ? (
        <div className="slider-container home-slider">
          {items.length > 0 && (
            <Carousel

              infiniteLoop
              autoPlay
              interval={5000}
              showIndicators
              showThumbs={false}
              transitionTime={600}
              emulateTouch
              swipeScrollTolerance={100}
              verticalSwipe={"natural"}
              preventMovementUntilSwipeScrollTolerance={true}
              showStatus
              showArrows={true}
              renderIndicator={(clickHandler, isSelected, index) => (
                <div
                  className={`my-indicator ${
                    isSelected ? "selected bg-pink" : ""
                  }`}
                  onClick={clickHandler}
                  key={index}
                ></div>
              )}
            >
              {items.map((item) => (
                <Link
                  key={item.id}
                  to={`/produit/${item.slug}`}
                  
                >
                  <div className="sliderImg">
                    <img
                      alt={item.title}
                      src={`${sliderImgUrl}/${item.image}`}
                     
                    />
                  </div>
                </Link>
              ))}
            </Carousel>
          )}
        </div>
      ) : null}
    </>
  );
};

export default HomeCarousel;
