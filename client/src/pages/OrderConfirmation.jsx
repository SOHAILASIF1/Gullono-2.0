import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

function OrderConfirmation() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-blue-200">
      <div className="bg-white px-30 py-10 rounded-2xl shadow-2xl max-w-md w-full text-center">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4 animate-bounce" />

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Order Confirmed!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        <button
          onClick={handleGoHome}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-300 ease-in-out text-lg font-medium"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default OrderConfirmation;
