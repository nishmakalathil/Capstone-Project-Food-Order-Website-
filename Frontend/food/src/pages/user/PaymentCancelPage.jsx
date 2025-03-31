import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentCancelPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/"); 
    }, 5000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100">
      <h1 className="text-3xl font-bold text-red-600">Payment Canceled ❌</h1>
      <p className="text-lg text-gray-700 mt-2">Your payment was not completed.</p>
      <p className="text-gray-500 mt-4">Redirecting you to the homepage...</p>
    </div>
  );
};

export default PaymentCancelPage;
