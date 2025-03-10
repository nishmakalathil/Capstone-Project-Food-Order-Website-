import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/user/order-display"); // Redirects to homepage after 5 seconds
    }, 5000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful! 🎉</h1>
      <p className="text-lg text-gray-700 mt-2">Thank you for your purchase.</p>
      <p className="text-gray-500 mt-4">Redirecting you to the homepage...</p>
    </div>
  );
};

export default PaymentSuccessPage;
