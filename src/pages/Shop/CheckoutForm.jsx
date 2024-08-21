import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";
import { FaPaypal } from "react-icons/fa";

const CheckoutForm = ({ price, cart }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {};

  return (
    <div className="flex flex-col sm:flex-row justify-start items-start gap-8">
      {/* left site */}
      <div className="md:w-1/2 w-full space-y-3">
        <h4 className="text-lg font-semibold">Order Summary</h4>
        <p>Total price: ${price}</p>
        <p>Number of Items: {cart.length}</p>
      </div>
      {/* right side  */}
      <div className="md:w-1/3 w-full space-y-6 card bg-base-100 max-w-sm shrink-0 shadow-2xl px-4 py-8">
        <h4 className="text-lg font-semibold">Process Your Payment</h4>
        <p className="font-medium">Debit/Credit Cart</p>

        {/* stripe form  */}
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            className="btn btn-sm bg-primary w-full font-semibold text-white rounded-full shadow-lg my-6"
            disabled={!stripe}
          >
            Pay Now
          </button>
        </form>

        {/* paypal option  */}
        <div className="mt-5 text-center">
            <hr />
            <button
            className="btn btn-sm bg-green font-semibold text-white rounded-full shadow-lg my-6"
          >
            <FaPaypal size={25}/> Pay with Paypal
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
