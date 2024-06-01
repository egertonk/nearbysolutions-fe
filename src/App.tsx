import React from "react";
import { Route, Routes } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { NearBySolutionsHeader } from "./web/components/Header/NearBySolutionsHeader";

import { Login } from "./web/components/Login/login";
import { Register } from "./web/components/Register/register";
import { Talent } from "./web/components/Hire-A-Talent/talents";
import { Footer } from "./web/components/Footer/footer";
import { OrderSumary } from "./web/components/Orders/orderSumary";
import { Reviews } from "./web/components/Reviews/reviews";
import { ViewOrderHistory } from "./web/components/Orders/viewOrderHistory";
import { Favorite } from "./web/components/Favorite/Favorite";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NearBySolutionsHeader />
      </header>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/register" element={<Register />} />
        <Route path="/hire-a-talent" element={<Talent />} />
        <Route path="/order-summary" element={<OrderSumary />} />
        <Route path="/view-order-history" element={<ViewOrderHistory />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
