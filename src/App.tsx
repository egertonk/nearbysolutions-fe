import React, { lazy } from "react";
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
import { TalentDetailPage } from "./web/components/Hire-A-Talent/talentDetailPage";
import { DateTimeSelection } from "./web/components/Hire-A-Talent/DateTimeSelection";
import { CalenderForm } from "./web/components/common-sections/calenderForm";
import { Provider } from "react-redux";
import store from "./store";
import { Payment } from "./web/components/Payment-Process/Payment";
import { EditOrder } from "./web/components/Orders/EditOrder";
import { ContactUs } from "./web/components/contact-us/ContactUs";
import { FindWorkPostAJob } from "./web/components/Find-Work-Post-A-Job/FindWorkPostAJob";
import { PostAJobForm } from "./web/components/Find-Work-Post-A-Job/PostAJobForm";
import { HomeIndex } from "./web/components/Home/HomeIndex";
import { CustomerJobListings } from "./web/components/Find-Work-Post-A-Job/CustomerJobListings";
import { CustomerToolListings } from "./web/components/DIY-Tool-Rentals/CustomerToolListings";
import { UserHistory } from "./web/components/Orders/UserHistory";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <NearBySolutionsHeader />
        </header>

        <Routes>
          <Route path="/home" element={<HomeIndex />} />

          <Route path="home/">
            <Route path="login" element={<Login />} />
            <Route path="contact-us" element={<ContactUs />} />
          </Route>

          <Route path="/favorite" element={<Favorite />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/register" element={<Register />} />

          {/* Hire A Talent */}
          <Route path="/hire-a-talent" element={<Talent />} />
          <Route path="/talent-detail-page" element={<TalentDetailPage />} />
          <Route path="date-time-selection" element={<DateTimeSelection />} />
          <Route path="/customer-form" element={<CalenderForm />} />
          <Route path="/order-summary" element={<OrderSumary />} />

          {/* Hire A Talent */}
          <Route path="/gift-a-solution" element={<Talent />} />

          {/*Find Work / Post a Job */}
          <Route path="/find-work-post-a-job" element={<FindWorkPostAJob />} />
          <Route path="/post-a-job" element={<PostAJobForm />} />

          {/* Payment */}
          <Route path="/payment" element={<Payment />} />

          {/* Customer History */}
          <Route path="/user-history" element={<UserHistory />} />
          <Route path="/job-listings" element={<CustomerJobListings />} />
          <Route path="/tool-listings" element={<CustomerToolListings />} />

          {/* Edit Order */}
          <Route path="/edit-order" element={<EditOrder />} />

          {/*Contact US */}
          {/* <Route path="/contact-us" element={<ContactUs />} /> */}
        </Routes>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
