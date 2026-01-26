import React, { useContext } from "react";
import addCart from "../helper/addToCart";
import { Link } from "react-router-dom";
import { Context } from "../App";

function SearchProduct({ data = [] }) {
  const { fetchCount } = useContext(Context);

  const handleCart = async (e, id) => {
    e.preventDefault(); // prevent Link navigation on button click
    await addCart(e, id);
    fetchCount();
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
      {data.map((product, index) => (
        <Link
          key={product?._id || index}
          to={`/product-detail/${product?._id}`}
          className="bg-white rounded-md shadow-md transition hover:shadow-lg flex flex-col"
        >
          <div className="bg-slate-200 flex justify-center items-center h-48 p-4">
            <img
              src={product?.productImage?.[0] || "/placeholder.png"}
              alt={product?.productName || "Product"}
              className="object-contain h-full w-full"
            />
          </div>

          <div className="p-3 flex flex-col gap-2 flex-grow">
            <h2 className="text-base font-semibold line-clamp-1">
              {product?.productName}
            </h2>
            <p className="capitalize text-sm text-gray-500">
              {product?.category}
            </p>

            <div className="flex justify-between items-center">
              <p className="text-red-500 text-sm font-medium">
                RS: {product?.sellingPrice}
              </p>
              <p className="text-gray-400 text-sm line-through">
                RS: {product?.price}
              </p>
            </div>

            <button
              className="bg-red-500 text-white text-sm p-2 rounded-full mt-auto hover:bg-red-600"
              onClick={(e) => handleCart(e, product?._id)}
            >
              Add To Cart
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default SearchProduct;
