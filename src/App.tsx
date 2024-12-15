import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { NearBySolutionsHeader } from "./web/components/Header/NearBySolutionsHeader";

import { Login } from "./web/components/Login/login";
import { Register } from "./web/components/Register/register";
import { Solutionist } from "./web/components/solutionist/Solutionist";
import { Footer } from "./web/components/Footer/footer";
import { Review } from "./web/components/Reviews/Review";
import { Favorite } from "./web/components/Favorite/Favorite";
import { OrderSumary } from "./web/components/Order-History/OrderSumary";
import { DateTimeSelection } from "./web/components/customer-calender-time/DateTimeSelection";
import { CalenderForm } from "./web/components/customer-calender-time/calenderForm";
import { Provider } from "react-redux";
import store from "./store";
import { Payment } from "./web/components/Payment-Process/Payment";
import { EditOrder } from "./web/components/Order-History/EditOrder";
import { ContactUs } from "./web/components/Contact-US/ContactUs";
import { FindWorkPostAJob } from "./web/components/Find-Work-Post-A-Job/FindWorkPostAJob";
import { PostAJobForm } from "./web/components/Find-Work-Post-A-Job/PostAJobForm";
import { HomeIndex } from "./web/components/Home/HomeIndex";
import { CustomerJobListings } from "./web/components/Find-Work-Post-A-Job/CustomerJobListings";
import { CustomerToolListings } from "./web/components/DIY-Tool-Rentals/CustomerToolListings";
import { RentYourTools } from "./web/components/Rent-Tools/RentYourTools";
import { TalentDetailPage } from "./web/components/customer-calender-time/calenderPage";
import { ThankYouMessage } from "./web/components/thank-you/ThankYouMessage";
import { RentTools } from "./web/components/Rent-Tools/RentTools";
import { RentOrderDetails } from "./web/components/Rent-Tools/RentOrderDetails";
import { ToolsOrderHistory } from "./web/components/Order-History/ToolsOrderHistory";

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
          <Route path="/reviews" element={<Review />} />
          <Route path="/register" element={<Register />} />

          {/* Hire A Talent */}
          <Route path="/hire-a-talent" element={<Solutionist />} />
          <Route path="/talent-detail-page" element={<TalentDetailPage />} />
          {/* <Route path="date-time-selection" element={<DateTimeSelection />} /> */}
          <Route path="/customer-form" element={<CalenderForm />} />
          <Route path="/order-summary" element={<OrderSumary />} />

          {/* Hire A Talent */}
          <Route path="/gift-a-solution" element={<Solutionist />} />

          {/*Find Work / Post a Job */}
          <Route path="/find-work-post-a-job" element={<FindWorkPostAJob />} />
          <Route path="/post-a-job" element={<PostAJobForm />} />
          <Route path="/job-accepted" element={<ThankYouMessage />} />

          {/*Rent Tools and List Tools*/}
          <Route path="/DIY-tools-rental" element={<RentTools />} />
          <Route path="/rent-your-home-tools" element={<RentYourTools />} />
          <Route path="/rent-order-details" element={<RentOrderDetails />} />

          {/* Payment */}
          <Route path="/payment" element={<Payment />} />

          {/* Customer History */}
          <Route
            path="/DIY-tools-order-rental-history"
            element={<ToolsOrderHistory />}
          />
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
