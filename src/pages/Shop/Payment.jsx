import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from './CheckoutForm'
import useCart from "../../hooks/useCart";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {
  const [cart] = useCart();

//calculate the checkout prices
const cartTotal = cart.reduce((sum,item)=>sum + item.price,0)
const totalPrice = parseFloat(cartTotal.toFixed(2))

  console.log(cart)
  return (
    <div className="max-w-screen container mx-auto xl:px-24 px-4 py-24">
      <Elements stripe={stripePromise}>
         <CheckoutForm price={totalPrice} cart={cart}/>
      </Elements>
    </div>
  );
};

export default Payment;
