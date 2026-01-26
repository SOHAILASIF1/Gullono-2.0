import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../commen";
import { FaDeleteLeft } from "react-icons/fa6";
import { Context } from "../App";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { fetchCount } = useContext(Context);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch all cart products
  const fetchAllCartProduct = async () => {
    try {
      const fetchCart = await fetch(SummaryApi.allCartProduct.url, {
        method: SummaryApi.allCartProduct.method,
        credentials: "include",
      });
      const response = await fetchCart.json();
      if (response.success) {
        setData(response?.data || []);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // ✅ Increase Quantity
  const increseCart = async (id, qty) => {
    const dataRes = await fetch(SummaryApi.updateCart.url, {
      method: SummaryApi.updateCart.method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ _id: id, quantity: qty + 1 }),
    });
    const response = await dataRes.json();
    if (response.success) {
      fetchAllCartProduct();
    }
  };

  // ✅ Decrease Quantity
  const decreaseCart = async (id, qty) => {
    if (qty >= 2) {
      const dataRes = await fetch(SummaryApi.updateCart.url, {
        method: SummaryApi.updateCart.method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ _id: id, quantity: qty - 1 }),
      });
      const response = await dataRes.json();
      if (response.success) {
        fetchAllCartProduct();
      }
    }
  };

  // ✅ Delete Cart Item
  const deleteCart = async (cartId) => {
    const deleteFetch = await fetch(SummaryApi.deleteCart.url, {
      method: SummaryApi.deleteCart.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: cartId }),
    });
    const response = await deleteFetch.json();
    if (response.success) {
      fetchAllCartProduct();
      fetchCount();
    }
  };

  // ✅ Totals
  const totalQuantity = data.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = data.reduce(
    (acc, item) => acc + item.quantity * item.productId?.sellingPrice,
    0
  );

  useEffect(() => {
    fetchAllCartProduct();
  }, []);

  return (
    <div className="mx-auto">
      <div className="text-lg text-center my-6">
        {data.length === 0 && <p className="py-3">No Data</p>}
      </div>
      <div className="flex flex-col lg:flex-row justify-between p-4 gap-4">
        {/* ✅ Left Section - Cart Products */}
        <div className="w-full max-w-3xl flex flex-col">
          {data?.map((product) => (
            <div
              key={product?._id}
              className="w-full bg-slate-100 h-48 my-2 border border-slate-400 flex relative"
            >
              {/* Product Image */}
              <div className="w-28 h-32 bg-slate-400">
                <img
                  src={product?.productId?.productImage[0]}
                  alt={product?.productId?.productName}
                  className="w-full h-full mix-blend-multiply object-scale-down object-center"
                />
              </div>

              {/* Delete Button */}
              <div
                className="absolute right-2 top-2 p-1 text-xl cursor-pointer rounded hover:bg-red-200"
                onClick={() => deleteCart(product?._id)}
                title="Remove from cart"
              >
                <FaDeleteLeft />
              </div>

              {/* Product Info */}
              <div className="p-4 flex-1">
                <h2 className="text-lg lg:text-2xl truncate">
                  {product?.productId?.productName}
                </h2>
                <p className="capitalize">{product?.productId?.category}</p>

                {/* ✅ Selected Size */}
                {product?.size && (
                  <p className="text-sm text-gray-600 mt-1">
                    Size: <span className="font-medium">{product.size}</span>
                  </p>
                )}

                {/* Price Info */}
                <div className="flex items-center justify-between gap-4 mt-1">
                  <p className="font-bold text-red-600">
                    RS: {product?.productId?.sellingPrice}
                  </p>
                  <p className="font-bold">
                    RS: {product?.productId?.sellingPrice * product?.quantity}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    className="w-6 h-6 border border-red-600 text-red-600 flex justify-center items-center rounded"
                    onClick={() => decreaseCart(product?._id, product?.quantity)}
                  >
                    -
                  </button>
                  <span>{product?.quantity}</span>
                  <button
                    className="w-6 h-6 border border-red-600 text-red-600 flex justify-center items-center rounded"
                    onClick={() => increseCart(product?._id, product?.quantity)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Right Section - Summary */}
        <div className="mt-2 lg:mt-0 w-full max-w-sm">
          <div className="h-44 bg-slate-200 relative rounded">
            <h2 className="px-4 py-1 bg-red-600 text-white">Summary</h2>
            <div className="px-4 py-1 flex items-center justify-between">
              <p>Total Quantity</p>
              <p>{totalQuantity}</p>
            </div>
            <div className="px-4 py-1 flex items-center justify-between">
              <p>Total Price</p>
              <p>RS: {totalPrice}</p>
            </div>
            <button
              onClick={() => {
                navigate("/order", { state: { cartItems: data } });
              }}
              className="absolute w-full bottom-0 py-2 bg-blue-600 text-white"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
