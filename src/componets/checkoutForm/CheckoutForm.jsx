import React, { useEffect, useState } from "react"; // Import necessary components and hooks from React and Stripe.
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js"; // Import required Stripe components and hooks

const CheckoutForm = () => {

  const stripe = useStripe(); // Initialize Stripe for payment processing.
  const elements = useElements(); // Initialize Elements for UI components.

  const [email, setEmail] = useState(''); // State to store the user's email.
  const [message, setMessage] = useState(null); // State to display status messages.
  const [isLoading, setIsLoading] = useState(false); // State to indicate loading status.

  useEffect(() => {
    if (!stripe) {
      return; // Exit early if Stripe hasn't loaded yet.
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );  // Get the payment intent client secret from the URL.


    if (!clientSecret) {
      return;  // Exit if there's no client secret.
    }

    // Retrieve the payment intent to check its status.
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) =>{
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment Succedeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.")
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again")
          break;
        default:
          setMessage("Something went wrong");
          break;
      }
    });
  },[stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    // Confirm the payment and redirect to a completion page on success.
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "https://freelance-capstoneproject-backend.onrender.com/success",  // Redirect URL after successful payment.
      },
    });

    // Handle errors if the payment fails immediately.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement
      id="link-authentication-element"
      onChange={(e) => setEmail(e.target.value)} 
      />  
      <PaymentElement id="payment-element" options={paymentElementOptions}/>
      <button disabled={isLoading || !stripe || !elements} id="submit">
      <span id="button-text">
      {isLoading ? <div className="spinner" id="spinner"></div>: "Pay Now"}
      </span>
      </button>
      {/*show any error or success message */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default CheckoutForm


