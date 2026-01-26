import React, { useEffect, useState } from 'react';
import SummaryApi from '../commen';
import { Link } from 'react-router-dom';

function CategoryMyPage() {
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true); // loading state

  const fetchData = async () => {
    setLoading(true);
    const fetchData1 = await fetch(SummaryApi.getCategory.url, {
      method: SummaryApi.getCategory.method,
    });
    const response = await fetchData1.json();
    if (response.success) {
      setCategoryList(response?.data.slice(0, 8)); // Only 8 categories
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const colorClasses = [
    'from-pink-500 to-yellow-500',
    'from-blue-500 to-green-400',
    'from-purple-500 to-indigo-500',
    'from-orange-400 to-red-500',
    'from-teal-400 to-cyan-500',
    'from-red-400 to-pink-500',
    'from-yellow-500 to-orange-400',
    'from-green-400 to-lime-500',
  ];

  // Skeleton card (for loading)
  const SkeletonCard = () => (
    <div className="w-full max-w-xs h-48 rounded-xl bg-gray-300 animate-pulse shadow-xl" />
  );

  return (
    <div className="w-full min-h-screen p-8 bg-gradient-to-br from-gray-100 to-gray-300">
      {/* Title */}
      <div className="flex items-center justify-center w-full my-10">
        <hr className="flex-grow border-t border-4 border-gray-400" />
        <h2 className="mx-6 lg:text-4xl text-xl font-bold text-gray-800 text-center uppercase tracking-wide whitespace-nowrap">
          Top Categories
        </h2>
        <hr className="flex-grow border-4 border-t border-gray-400" />
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
        {loading ? (
          // Show 8 skeletons while loading
          Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
        ) : categoryList.length > 0 ? (
          categoryList.map((product, index) => (
            <Link key={index} to={`/category-product/${product?.category}`} className="w-full max-w-xs">
              <div
                className={`group relative w-full h-36 lg:h-48 rounded-xl overflow-hidden shadow-xl bg-gradient-to-br ${colorClasses[index % colorClasses.length]} hover:scale-105 transform transition duration-300`}
              >
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition duration-300 z-10" />
                <div className="z-20 relative flex items-center justify-center h-full w-full">
                  <p className="lg:text-2xl text-lg font-bold text-white capitalize tracking-wide group-hover:scale-105 transition duration-300">
                    {product?.category}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-xl font-medium text-gray-600 col-span-full mt-20">No categories found.</p>
        )}
      </div>
    </div>
  );
}

export default CategoryMyPage;
