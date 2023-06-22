import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import CheckOutForm from "./CheckOutForm";
import "./Payment.css";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  const location = useLocation();

  let price = location.state?.totalPrice;
  let quantity = location.state?.quantity;
  let classNames = location.state?.classNames;
  let classPhotos = location.state?.classPhotos;
  let selectedClassIds = location.state?.selectedClassIds;
  let classIds = location.state?.classIds;

  price = parseFloat(price.toFixed(2));
  console.log(classNames, classPhotos, selectedClassIds, classIds);

  return (
    <div className="payment-container">
      <h1>Provide your credentials to pay</h1>
      <Elements stripe={stripePromise}>
        <CheckOutForm
          quantity={quantity}
          price={price}
          classNames={classNames}
          classPhotos={classPhotos}
          selectedClassIds={selectedClassIds}
          classIds={classIds}
        ></CheckOutForm>
      </Elements>
    </div>
  );
};

export default Payment;
