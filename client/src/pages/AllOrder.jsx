import React, { useEffect, useState } from "react";
import SummaryApi from "../commen";
import { toast } from "react-toastify";

function AllOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(null);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editedStatus, setEditedStatus] = useState("");

  const fetchOrders = async () => {
    try {
      const response = await fetch(SummaryApi.getOrder.url, {
        method: SummaryApi.getOrder.method,
        credentials: "include",
      });

      const data = await response.json();
      if (data.success) {
        setOrders(data.data);
      } else {
       toast.error(data.message || "Failed to fetch orders");
      }
    } catch (error) {
    
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (orderId) => {
    const responce=await fetch(SummaryApi.deleteOrder.url(orderId), {
      method: SummaryApi.deleteOrder.method,
      credentials: "include",

    })
    const data=await responce.json();
    if (data.success) {
      setOrders(orders.filter((order) => order._id !== orderId));
      toast.success(data.message || "Order deleted successfully");
      
    }

  }

  const updateOrderStatus = async (orderId) => {
    try {
      const response = await fetch(
        `${SummaryApi.updateOrderStatus.url}/${orderId}`,
        {
          method: SummaryApi.updateOrderStatus.method,
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ status: editedStatus }),
        }
      );

      const data = await response.json();
      if (data.success) {
        const updatedOrders = orders.map((order) =>
          order._id === orderId ? { ...order, status: editedStatus } : order
        );
        setOrders(updatedOrders);
        setEditingOrderId(null);
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
     
      toast.error("Failed to update order status");
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
                <React.Fragment key={order._id}>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-2">
                      {i + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {order.fullName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {order.phone}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {order.email}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {order.address}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {editingOrderId === order._id ? (
                        <select
                          value={editedStatus}
                          onChange={(e) => setEditedStatus(e.target.value)}
                          className="border p-1 rounded"
                        >
                          <option value="pending">Pending</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      ) : (
                        <span
                          className={`px-2 py-1 rounded text-sm font-medium ${
                            order.status === "pending"
                              ? "bg-yellow-200 text-yellow-800"
                              : order.status === "delivered"
                              ? "bg-green-200 text-green-800"
                              : "bg-gray-200 text-gray-800"
                          }`}
                        >
                          {order.status || "pending"}
                        </span>
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 space-x-2">
                      <button
                        onClick={() =>
                          setVisibleItems(
                            visibleItems === order._id ? null : order._id
                          )
                        }
                        className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                      >
                        {visibleItems === order._id
                          ? "Hide Items"
                          : "View Items"}
                      </button>

                      {editingOrderId === order._id ? (
                        <button
                          onClick={() => updateOrderStatus(order._id)}
                          className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setEditingOrderId(order._id);
                            setEditedStatus(order.status || "pending");
                          }}
                          className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                        >
                          Edit
                        </button>
                      )}

                      <button
                        onClick={() => deleteOrder(order._id)}
                        className="px-2 py-1 bg-red-600 text-white rounded hover:bg-green-700 text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>

                  {visibleItems === order._id && (
                    <tr>
                      <td
                        colSpan="7"
                        className="bg-gray-50 border border-gray-300 px-4 py-2"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {order.items.map((item) => (
                            <div
                              key={item.productId._id}
                              className="border p-3 rounded shadow bg-white flex gap-3 items-center"
                            >
                              <img
                                src={item.productId.productImage}
                                alt={item.productId.productName}
                                className="w-16 h-16 object-cover rounded"
                              />
                              <div>
                                <p className="font-semibold">
                                  {item.productId.productName}
                                </p>
                                <p>{item.size}</p>
                                <p>Qty: {item.quantity}</p>
                                <p>Price: Rs {item.price}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AllOrder;
