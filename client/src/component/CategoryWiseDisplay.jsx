import React, { useEffect, useState, useMemo } from 'react';
import fetchCategoryWiseProduct from '../helper/fetchCategoryWiseProduct';
import { Link } from 'react-router-dom';
import addCart from '../helper/addToCart';

function CategoryWiseDisplay({ heading, category, sortOrder }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const fetchData = async () => {
    setLoading(true);
    const getdata = await fetchCategoryWiseProduct(category);
    setData(getdata?.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  const processedData = useMemo(() => {
    let temp = [...data];
    temp = temp.map((item) => ({
      ...item,
      selling: parseInt(item.selling),
    }));
    if (sortOrder === 'low-to-high') {
      temp.sort((a, b) => a.selling - b.selling);
    } else if (sortOrder === 'high-to-low') {
      temp.sort((a, b) => b.selling - a.selling);
    }
    return temp;
  }, [data, sortOrder]);

  const handleAddToCart = async (e, id) => {
    e.preventDefault();
    await addCart(e, id);
  };

  // Skeleton Loader for Product Card
  const SkeletonCard = () => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
      <div className="bg-gray-200 h-56 w-full" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-300 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
        <div className="h-8 bg-gray-300 rounded w-full" />
      </div>
    </div>
  );

  return (
    <div className="p-4 md:px-10 relative my-10 bg-gradient-to-br from-gray-100 to-white">
      {/* Section Heading */}
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 border-b-2 border-red-500 inline-block mb-8">
        {heading}
      </h2>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : processedData.map((product, index) => (
              <Link
                to={`/product-detail/${product?._id}`}
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group"
              >
                {/* Product Image */}
                <div className="bg-gray-100 h-56 flex items-center justify-center overflow-hidden">
                  <img
                    src={product?.productImage[0]}
                    alt={product?.productName}
                    className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Product Details */}
                <div className="p-4 flex flex-col gap-3">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-1">
                    {product?.productName}
                  </h2>
                  <p className="text-sm text-gray-500 capitalize">{product?.category}</p>

                  {/* Pricing */}
                  <div className="flex justify-between items-center">
                    <p className="text-rose-600 font-bold text-sm sm:text-base">Rs {product?.sellingPrice}</p>
                    <p className="text-gray-400 line-through text-xs sm:text-sm">Rs {product?.price}</p>
                  </div>

                  {/* Add to Cart */}
                  <button
                    className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-pink-500 hover:to-red-500 text-white py-2 rounded-full text-xs sm:text-sm font-semibold shadow hover:shadow-md transition"
                    onClick={(e) => handleAddToCart(e, product?._id)}
                  >
                    Add To Cart
                  </button>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}

export default CategoryWiseDisplay;
