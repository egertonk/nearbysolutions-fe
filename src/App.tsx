import React from "react";
import { Route, Routes } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { NearBySolutionsHeader } from "./web/components/common-sections/NearBySolutionsHeader";

import { Login } from "./web/components/Login/login";
import { Register } from "./web/components/Register/register";
import { Talent } from "./web/components/Hire-A-Talent/talents";
import { Footer } from "./web/components/Footer/footer";
import { WorkOrderList } from "./web/components/common-sections/workOrderList";
import { OrderSumary } from "./web/components/common-sections/orderSumary";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NearBySolutionsHeader />
      </header>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/hire-a-talent" element={<Talent />} />
        <Route path="/order-summary" element={<OrderSumary />} />
        {/* <Route path="/checkout" element={<PaypalPayments />} /> */}
        {/* <Route path="/us-markets" element={<USMarkets />} /> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
