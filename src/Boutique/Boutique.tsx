import React, { useEffect, useState } from "react";

import { HomeSliderProps } from "../Utils/Props";
import { apiUrl } from "../Utils/Helpers";
import axios from "axios";
import Header from "../Sections/Header/Header";
import NavBar from "../components/NavBar/NavBar";
import Card from "../Card/Card";
import './Boutique.css'

import Marque from "../components/Marques/Marque";

const Boutique: React.FC = () => {
  return (
    <div>
      <Header />
     <Marque/>
      

      <div className="container">
        <NavBar />
        <Card />
      </div>
    </div>
  );
};

export default Boutique;
