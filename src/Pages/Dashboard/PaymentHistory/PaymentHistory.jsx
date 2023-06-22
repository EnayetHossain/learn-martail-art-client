import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useRole from "../../../Hooks/useRole";
import DynamicTitle from "../../../Routes/DynamicTitle";
import { AuthContext } from "../../../provider/AuthProvider";
import "./PaymentHistory.css";

const PaymentHistory = () => {
  const navigate = useNavigate();
  const role = useRole();
  const isStudent = role?.role === "student";

  if (!isStudent) {
    navigate("/");
  }

  DynamicTitle("Payment History");
  const token = localStorage.getItem("access-token");
  const { user } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetch(
      `https://learn-martial-server.vercel.app/payment-history?email=${user.email}`,
      {
        headers: {
          authorization: `bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setPayments(data);
      });
  }, [user, token]);

  const formateDate = (date) => {
    const newDate = new Date(date);
    const paymentDate = newDate.getDate();
    const month = newDate.getMonth();
    const year = newDate.getFullYear();
    const day = newDate.toLocaleDateString("en-us", {
      weekday: "long",
    });
    const formattedDate = `${paymentDate}-${month + 1}-${year}-${day}`;
    return formattedDate;
  };

  return (
    <div className="overflow-x-auto classes">
      <div className="pay-info">
        <h1 className="total-price">Payment History:</h1>
      </div>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Transaction Id</th>
            <th>Payment Date</th>
            <th>Payment Amount</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id}>
              <td>{payment.transactionId}</td>
              <td>{formateDate(payment.date)}</td>
              <td>{payment.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
