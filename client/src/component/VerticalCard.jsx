import React, { useContext, useEffect, useState } from "react";
import fetchCategoryWiseProduct from "../helper/fetchCategoryWiseProduct";
import addCart from "../helper/addToCart";
import { Context } from "../App";
import { Link } from "react-router-dom";

function VerticalCard({ category, heading }) {
  const [showAll, setShowAll] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fetchCount } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetchCategoryWiseProduct(category);
      setData(res?.data || []);
      setLoading(false);
    };
    fetchData();
  }, [category]);

  const productsToShow = showAll ? data : data?.slice(0, 8);

  const handleCart = async (e, id) => {
    e.preventDefault();
    await addCart(e, id);
    fetchCount();
  };

  // Skeleton Loader Component
  const SkeletonCard = () => (
    <div className="w-full max-w-[160px] sm:max-w-[180px] md:max-w-[200px] lg:max-w-[200px] bg-white rounded-xl shadow-md p-3 animate-pulse">
      <div className="w-full h-40 sm:h-44 md:h-48 bg-gray-300 rounded-lg mb-4" />
      <div className="h-4 bg-gray-300 rounded mb-2 w-3/4 mx-auto" />
      <div className="h-3 bg-gray-300 rounded mb-2 w-1/2 mx-auto" />
      <div className="h-4 bg-gray-300 rounded mb-3 w-2/3 mx-auto" />
      <div className="h-8 bg-gray-300 rounded w-full" />
    </div>
  );

  return (
    <div className="py-6 px-4 sm:px-6 md:px-12 lg:px-16 bg-gradient-to-b from-gray-100 to-white">
      {/* Heading */}
      <div className="flex items-center justify-center my-8">
        <hr className="flex-grow border-t border-gray-300" />
        <h2 className="mx-4 lg:text-4xl sm:text-2xl md:text-3xl font-bold text-gray-800 uppercase tracking-wider text-center">
          {heading}
        </h2>
        <hr className="flex-grow border-t border-gray-300" />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 sm:gap-8 place-items-center">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : productsToShow?.map((product, i) => (
              <div
                key={product?._id || i}
                className="w-full max-w-[160px] sm:max-w-[180px] md:max-w-[200px] lg:max-w-[200px] bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 group"
              >
                <Link to={`/product-detail/${product?._id}`}>
                  <div className="w-full h-40 sm:h-44 md:h-48 overflow-hidden rounded-t-xl">
                    <img
                      src={product?.productImage[0]}
                      alt={product?.productName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-3 flex flex-col items-center text-center gap-2">
                    <h2 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                      {product?.productName}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 capitalize">
                      {product?.category}
                    </p>
                    <div className="flex justify-between w-full text-xs sm:text-sm font-medium">
                      <p className="text-rose-600">Rs {product?.sellingPrice}</p>
                      <p className="text-gray-400 line-through">
                        Rs {product?.price}
                      </p>
                    </div>
                  </div>
                </Link>

                <div className="w-full px-3 pb-3">
                  <button
                    onClick={(e) => handleCart(e, product?._id)}
                    className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-pink-600 hover:to-rose-600 text-white py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow hover:shadow-lg transition duration-200"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
      </div>

      {/* Show More / Less */}
      {!loading && data?.length > 8 && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold shadow-md transition"
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
}

export default VerticalCard;
