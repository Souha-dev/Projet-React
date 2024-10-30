import React, { useEffect, useState } from "react";
import HomeCarousel from "./components/Slider/HomeCarousel";
import { HomeSliderProps } from "./Utils/Props";
import { apiUrl } from "./Utils/Helpers";
import axios from "axios";
import Header from "./Sections/Header/Header";
import MarqueComponent from "./components/Marques/Marque";
import Nouveaute from "./components/Nouveaute/Nouveaute";
import VenteProduct from "./components/VenteProduct/VenteProduct";






const Home: React.FC = () => {
   
     const [sliders, setSliders] = useState<HomeSliderProps[]>([]);
     const [isFetching, setIsFetching] = useState<boolean>(false);

     const fetchSlider = async () => {
       setIsFetching(true);
       const response = await axios.get(`${apiUrl}/sliders.json`);
       

       if (response.status === 200) {
         setSliders(response.data);
         setIsFetching(false);
       }
     };

    
     useEffect(() => {
       fetchSlider();
     }, []);

  return (
    <div>
      <Header/>
      <HomeCarousel items={sliders} isLoading={isFetching} />
  
   
      

      <MarqueComponent/> 
     

      <Nouveaute/>
       <VenteProduct/>
    </div>
  );
};

export default Home;
