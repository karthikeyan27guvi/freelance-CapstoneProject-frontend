import React, { useEffect, useState } from 'react';
import './Pay.css';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newReqest from "../../utils/newRequest.js";
import { useParams } from "react-router-dom";
import CheckoutForm from '../../componets/checkoutForm/CheckoutForm.jsx';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51QABC2P0hvARDsuOPsQ57nkRURIWeQeYDW8MGoDT6R7yISOSH2zbBTeh1lGE6DJYFvVA3MoOlfjAToIYTKsXwtIN00ahpn5rox");

const Pay = () => {

  const [clientSecret, setClientSecret] = useState("");

  const {id} = useParams()

  useEffect(()=>{
    const makeRequest = async ()=>{
      try {
        const res = await newReqest.post(
          `/orders/create-payment-intent/${id}`
        );
        setClientSecret(res.data.clientSecret)
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  },[]);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className='pay'>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
        <CheckoutForm/>
      </Elements>
      )}
    </div>
  )   
};

export default Pay
