import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SummaryApi from "../commen";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkedAlt,
  FaCity,
  FaMoneyCheckAlt,
  FaStickyNote,
} from "react-icons/fa";
import { toast } from "react-toastify";

function Order() {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "COD",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
      const res = await fetch(SummaryApi.createOrder.url, {
        method: SummaryApi.createOrder.method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          cartItems,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Order placed successfully!");
        navigate("/orderConfirmation");
      } else {
        toast.error(data.message || "Failed to place order.");
      }
   
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-xl rounded-lg mt-8">
      
      {/* Delivered Orders Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate("/deliveredOrders")}
          type="button"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm shadow-md"
        >
          Delivered Orders
        </button>
      </div>

      <h2 className="text-3xl font-semibold text-blue-700 mb-6 text-center">
        Order Details
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <FaUser />
          </span>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Phone */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <FaPhone />
          </span>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <FaEnvelope />
          </span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Address */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <FaMapMarkedAlt />
          </span>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Full Address"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* City */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <FaCity />
          </span>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Postal Code */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <FaMapMarkedAlt />
          </span>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            placeholder="Postal Code"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Payment Method */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <FaMoneyCheckAlt />
          </span>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Bank">Bank Transfer</option>
          </select>
        </div>

        {/* Note */}
        <div className="relative">
          <span className="absolute left-3 top-3 text-gray-400">
            <FaStickyNote />
          </span>
          <textarea
            name="note"
            rows={3}
            value={formData.note}
            onChange={handleChange}
            placeholder="Additional Note (Optional)"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-lg transition"
        >
          Submit Order
        </button>
      </form>
    </div>
  );
}

export default Order;
