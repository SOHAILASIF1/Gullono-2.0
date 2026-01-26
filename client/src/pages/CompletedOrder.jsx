import React, { useEffect, useState } from "react";
import SummaryApi from "../commen";


function CompletedOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    
      const response = await fetch(SummaryApi.allDileverdOrder.url, {
        method: SummaryApi.allDileverdOrder.method,
        credentials: "include",
      });

      const data = await response.json();
      if (data.success) {
        setOrders(data.data);
      } else {
        console.log("Failed to fetch orders");
      }
   
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <div className="p-4">Loading orders...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="overflow-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">Customer</th>
                <th className="border border-gray-300 px-4 py-2">Phone</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Address</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <tr key={order._id} className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">{i + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.fullName}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.phone}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.address}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.status}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CompletedOrder;
