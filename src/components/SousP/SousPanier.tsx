import React, { useState } from "react";
import image1 from "../../assets/Images/prod.png";
import "./SousPanier.css";

const SousPanier = () => {
  const [quantity,setQuantity]  = useState(1);
  const handleChange = (x: string) =>{
    if(x=="+"){
      setQuantity(quantity+1)
    }else if(x== "-" && quantity>1){
      setQuantity(quantity - 1);
    }else{
      window.confirm("Voulez-vous vraiment supprimer le produit depuis votre panier ?")
    }
  }
  return (
    <div className="d-flex justify-content-between container">
      <div className="d-flex">
        <img src={image1} alt="" style={{ width: "59px" }} />
        <div className="all4">
          <h3>Crayon Yeux</h3>
          <h4>A11 Rouge</h4>
          <p>29DH</p>
        </div>
      </div>
      <div className="d-flex align-items-center">
        <button className="btn btn-light text-dark mr-2 " onClick={(e)=>handleChange("-")}>
          <i className="fas fa-minus"></i>
        </button>
        <input type="text" className="b1 form-control form-control-sm text-center" value={quantity}/>
        <button className="btn btn-light text-dark mr-2" onClick={(e)=>handleChange("+")}>
          <i className="fas fa-plus"></i>
        </button>
      </div>

    </div>
  );
};

export default SousPanier;
