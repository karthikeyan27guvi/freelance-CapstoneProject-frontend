import React, { useEffect } from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import newRequest from "../../utils/newRequest.js";


const Success = () => {
  const {search} = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");

  useEffect(()=>{
    const makeRequest = async ()=>{
      try {
        await newRequest.put("/orders",{payment_intent});
        setTimeout(()=>{
          navigate("/orders");
        },3000)
      } catch (err) {
        console.log(err);
        
      }
    };
    makeRequest();
  },[]);

  return (
    <div>
      Payment Successful. You are being redirected to the order page. Please do not closse this tab
    </div>
  )
}

export default Success
