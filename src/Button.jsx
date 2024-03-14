import React, { useState } from "react";
import "./App.css";
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}
const Button = () => {
  const [amount, setAmount] = useState();
  async function displayRazorpay(event) {
    event.preventDefault();
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const data = await fetch(
      "https://v9cuhyxhs3.execute-api.ap-south-1.amazonaws.com/dev/payment/razorpay/",
      { method: "POST", body: JSON.stringify({ amount }) }
    ).then((t) => t.json());

    console.log(data);

    const options = {
      key: "rzp_test_Zwqj0pDtOxIsfY",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      name: "Donation",
      description: "Thank you for nothing. Please give us some money",
      // image: 'http://localhost:1337/logo.svg',
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: "deep",
        email: "sdfdsjfh2@ndsfdf.com",
        phone_number: "9899999999",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  async function Click() {
    const data = await fetch(
      "https://v9cuhyxhs3.execute-api.ap-south-1.amazonaws.com/dev/payment/razorpay/",
      { method: "POST" }
    ).then((t) => t.json());
    console.log(data);
  }
  return (
    <div>
      <form onSubmit={displayRazorpay}>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          required
        />
        <button type="submit">Pay</button>
      </form>
    </div>
  );
};

export default Button;
