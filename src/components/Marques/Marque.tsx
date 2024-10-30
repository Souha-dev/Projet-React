// import React, { useEffect, useState } from "react";

// import axios from "axios";

// import "../../App.css";
// import { Marque } from "../../Utils/Props";
// import { apiUrl, marqueImgUrl } from "../../Utils/Helpers";

// const MarqueComponent: React.FC = () => {
//   const [marques, setMarques] = useState<Marque[]>([]);

//   useEffect(() => {
//     axios
//       .get(`${apiUrl}/marques`)
//       .then((response) => {
//         const data = response.data["hydra:member"];
//         setMarques(data);
//       })
//       .catch((error) =>
//         console.error("Erreur lors de la récupération des marques :", error)
//       );
//   }, []);

//   return (
//     <>
//       <div className="roww align-items-center">
//         <div className="col-md-12 col-lg-12 mb-5 text-center justify-content-center">
//           <div className="d-inline">
//             <h2 className=" fw-bold fs-37px ff-outfit-semi">NOS MARQUES</h2>
//           </div>
//         </div>
//       </div>
//       {marques.map((marque) => (
//         <div
//           data-aos="fade-up"
//           data-aos-duration="2000"
//           className="aos-init aos-animate"
//         >
//           <div className="marques-container my-5">
//             <div className="container">
//               <div className="row d-flex-center">
//                 <div className="a1 col-xl-3 col-lg-3 col-md-6 col-6">
//                   <div className="marque-card my-2">
//                     <div className="marque-card-image d-flex-center">
//                       <a
//                         className="nav-link w-100 h-100"
//                         href="/boutique/marque/absolute-new-york"
//                       >
//                         <div className="d-flex-center w-100">

//                           <img
//                             src="https://api.beautyhub.ma/uploads/marque_logos/absolute-newyork-65772c182faf1567775259.webp"
//                             className="marque-card-logo"
//                             alt="Absolute New York"
//                           />
//                         </div>
//                         <img
//                           className="marque-card-img"
//                           src={`${marqueImgUrl}/${marque.image}`}
//                           width="50"
//                           height="50"
//                         />
//                       </a>
//                     </div>

//                     <div className="marque-card-desc text-center mt-2">
//                       <span className="ff-outfit-m fs-20px">
//                         {marque.title}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };

// export default MarqueComponent;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiUrl, marqueImgUrl } from "../../Utils/Helpers";
import { Marque } from "../../Utils/Props";
import './Marque.css';
import '../../App.css';

const MarqueComponent: React.FC = () => {
  const [marques, setMarques] = useState<Marque[]>([]);

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
      <div className="roww align-items-center">
        <div className="col-md-12 col-lg-12 mb-5 text-center justify-content-center">
          <div className="d-inline">
            <h2 className=" fw-bold fs-37px ff-outfit-semi">NOS MARQUES</h2>
          </div>
        </div>
      </div>
      <div className="row d-flex-center">
        {marques.map((marque) => (
          <div className="col-xl-2 col-lg-2 col-md-3 col-3">
            <div className="marque-card my-2">
              <div className="marque-card-image d-flex-center">
                <a
                  className="nav-link w-100 h-100"
                  href="/boutique/marque/absolute-new-york"
                >
                  <div className="d-flex-center w-100"></div>
                  <img
                    className="marque-card-img"
                    src={`${marqueImgUrl}/${marque.image}`}
                  />
                  <div className="marque-card-overlay d-flex-center c-pointer text-center"></div>
                  <div className="marque-card-overlay-before d-flex-center c-pointer text-center"></div>
                </a>
              </div>
              <div className="marque-card-desc text-center mt-2">
                <span className="ff-outfit-m fs-20px">{marque.title}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MarqueComponent;
