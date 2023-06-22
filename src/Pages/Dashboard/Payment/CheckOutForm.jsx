/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import DynamicTitle from "../../../Routes/DynamicTitle";
import { AuthContext } from "../../../provider/AuthProvider";
import "./CheckOutForm.css";

const CheckOutForm = ({
  quantity,
  price,
  classNames,
  classPhotos,
  selectedClassIds,
  classIds,
}) => {
  DynamicTitle("Pay Your Bill");
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const token = localStorage.getItem("access-token");
  const { user } = useContext(AuthContext);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://learn-martial-server.vercel.app/create-payment-intent", {
      method: "POST",
      headers: {
        authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [token, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
    }

    setProcessing(true);

    const { paymentIntent, err } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      }
    );

    if (err) {
      console.log(err);
    }

    console.log(paymentIntent);
    setProcessing(false);
    if (paymentIntent.status === "succeeded") {
      const payment = {
        email: user?.email,
        transactionId: paymentIntent.id,
        date: new Date(),
        price,
        quantity,
        classNames,
        classPhotos,
        selectedClassIds,
        classIds,
      };

      fetch("https://learn-martial-server.vercel.app/payments", {
        method: "POST",
        headers: {
          authorization: `bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.insertResult.insertedId) {
            toast.success("Payment successful");

            fetch("https://learn-martial-server.vercel.app/payments", {
              method: "PATCH",
              headers: {
                authorization: `bearer, ${token}`,
                "content-type": "application/json",
              },
              body: JSON.stringify(classIds),
            })
              .then((res) => res.json())
              .then((data) => console.log(data));
          }
        });
    }
  };

  return (
    <div className="payment-box">
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#ffffff",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="pay-btn"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>
      <p className="error">{error}</p>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default CheckOutForm;
