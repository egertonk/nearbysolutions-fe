// import React, { useCallback, useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   EmbeddedCheckoutProvider,
//   EmbeddedCheckout,
// } from "@stripe/react-stripe-js";
// import { useSearchParams, Navigate } from "react-router-dom";

// const stripePromise = loadStripe(
//   "pk_test_51QunGcRtjXEeB6YFs9RoRRiN5r7PoFjwXqV49PHtp0p7C4fkdaiWlcqlN2NYwJO0ql7BANPsqjCXEjtmwYqH9epv00dliCwwBU"
// );

// export const StripePayment: React.FC = () => {
//   const [clientSecret, setClientSecret] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchClientSecret = useCallback(async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:8080/api/stripe/create-payment-intent",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ amount: 2000 }), // Amount in cents ($20)
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to create payment intent");
//       }

//       const data = await response.json();
//       setClientSecret(data.clientSecret);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Unknown error");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchClientSecret();
//   }, [fetchClientSecret]);

//   if (loading) return <p>Loading payment...</p>;
//   if (error) return <p>Error: {error}</p>;

//   // return clientSecret ? (
//   //   <div id="checkout">
//   //     <EmbeddedCheckoutProvider
//   //       stripe={stripePromise}
//   //       options={{ clientSecret }}
//   //     >
//   //       <EmbeddedCheckout />
//   //     </EmbeddedCheckoutProvider>
//   //   </div>
//   // ) : null;
//   return (
//     <div id="checkout">
//       <EmbeddedCheckoutProvider
//         stripe={stripePromise}
//         options={{ clientSecret }}
//       >
//         <EmbeddedCheckout />
//       </EmbeddedCheckoutProvider>
//     </div>
//   );
// };

// export const Return: React.FC = () => {
//   const [status, setStatus] = useState<string | null>(null);
//   const [customerEmail, setCustomerEmail] = useState<string | null>(null);
//   const [searchParams] = useSearchParams();
//   const sessionId = searchParams.get("session_id");

//   useEffect(() => {
//     if (sessionId) {
//       fetch(
//         `http://localhost:8080/api/stripe/session-status?session_id=${sessionId}`
//       )
//         .then((res) => res.json())
//         .then((data) => {
//           setStatus(data.status);
//           setCustomerEmail(data.customer_email);
//         })
//         .catch(() => setStatus("error"));
//     }
//   }, [sessionId]);

//   if (!sessionId) return <Navigate to="/" />;

//   if (status === "open") return <Navigate to="/checkout" />;
//   if (status === "complete")
//     return (
//       <section id="success">
//         <p>
//           Payment successful! A confirmation email was sent to{" "}
//           <strong>{customerEmail}</strong>. If you have any questions, email{" "}
//           <a href="mailto:orders@example.com">orders@example.com</a>.
//         </p>
//       </section>
//     );

//   return <p>Processing payment...</p>;
// };

import React, { useCallback, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// This is your test secret API key.
const stripePromise = loadStripe(
  "pk_test_51QunGcRtjXEeB6YFs9RoRRiN5r7PoFjwXqV49PHtp0p7C4fkdaiWlcqlN2NYwJO0ql7BANPsqjCXEjtmwYqH9epv00dliCwwBU"
);

export const StripePayment = () => {
  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch("http://localhost:8080/api/stripe/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 2000 }), // Amount in cents ($20)
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");

    fetch(`/session-status?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
      });
  }, []);

  if (status === "open") {
    return <Navigate to="/checkout" />;
  }

  if (status === "complete") {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to{" "}
          {customerEmail}. If you have any questions, please email{" "}
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    );
  }

  return null;
};
