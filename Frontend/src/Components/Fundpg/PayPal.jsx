import React, { useRef, useEffect } from "react";

export default function Paypal({ amount, description, onClose }) {
  const paypal = useRef();

  useEffect(() => {
    // Clear previous buttons before rendering again
    paypal.current.innerHTML = "";

    if (!window.paypal) return;

    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description,
                amount: {
                  currency_code: "USD",
                  value: amount,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log("Order approved:", order);
          onClose();
        },
        onError: (err) => {
          console.error("PayPal error:", err);
          onClose();
        },
      })
      .render(paypal.current);
  }, [amount, description, onClose]);

  return <div ref={paypal}></div>;
}
