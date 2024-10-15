import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Boutique from "./Boutique/Boutique";
import { ShoppingCartProvider } from "./Utils/CartContext";
import Panier from "./components/Panier/Panier";
import SousPanier from "./components/SousP/SousPanier";
import { CartDataProvider } from "./Utils/CartDataContext";

// Assurez-vous que le chemin est correct

function App() {
  return (
    <ShoppingCartProvider>
      <CartDataProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/boutique" element={<Boutique />} />
              <Route path="/panier" element={<Panier />} />
              <Route path="/sous" element={<SousPanier />} />
            </Routes>
          </div>
        </Router>
      </CartDataProvider>
    </ShoppingCartProvider>
  );
}

export default App;
