import React from "react";
import { Route, Routes } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { NearBySolutionsHeader } from "./web/components/Header/NearBySolutionsHeader";

import { Login } from "./web/components/Login/login";
import { Register } from "./web/components/Register/register";
import { Talent } from "./web/components/Hire-A-Talent/talents";
import { Footer } from "./web/components/Footer/footer";
import { Reviews } from "./web/components/Reviews/reviews";
import { Favorite } from "./web/components/Favorite/Favorite";
import { OrderSumary } from "./web/components/Orders/OrderSumary";
import { ViewOrderHistory } from "./web/components/Orders/ViewOrderHistory";
import { TalentDetailPage } from "./web/components/Hire-A-Talent/talentDetailPage";
import { DateTimeSelection } from "./web/components/Hire-A-Talent/DateTimeSelection";
import { CalenderForm } from "./web/components/common-sections/calenderForm";
import { Provider } from "react-redux";
import store from "./store";
import { Payment } from "./web/components/Payment-Process/Payment";
import { EditOrder } from "./web/components/Orders/EditOrder";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <NearBySolutionsHeader />
        </header>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/register" element={<Register />} />

          {/* Hire A Talent */}
          <Route path="/hire-a-talent" element={<Talent />} />
          <Route path="/talent-detail-page" element={<TalentDetailPage />} />
          <Route path="date-time-selection" element={<DateTimeSelection />} />
          <Route path="/customer-form" element={<CalenderForm />} />
          <Route path="/order-summary" element={<OrderSumary />} />

          {/* Payment */}
          <Route path="/payment" element={<Payment />} />

          {/* Cutomer History */}
          <Route path="/view-order-history" element={<ViewOrderHistory />} />

          {/* Edit Order */}
          <Route path="/edit-order" element={<EditOrder />} />
        </Routes>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
