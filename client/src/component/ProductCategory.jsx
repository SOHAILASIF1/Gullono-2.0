import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productCategory from '../helper/productCategory';
import CategoryWiseDisplay from './CategoryWiseDisplay';
import SummaryApi from '../commen';

function ProductCategory() {
  const params = useParams();
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState("");
  const [activeCategories, setActiveCategories] = useState(new Set());

  const handleSortChange = (e) => setSortOrder(e.target.value);
  const handleCategoryClick = (value) => navigate(`/category-product/${value}`);

  // Nested structure se saare unique categories flat karo
  const getAllCategories = () => {
    const result = [];
    Object.values(productCategory).forEach((groupValue) => {
      if (Array.isArray(groupValue)) {
        groupValue.forEach((item) => result.push(item));
      } else {
        Object.values(groupValue).forEach((subArray) => {
          if (Array.isArray(subArray)) subArray.forEach((item) => result.push(item));
        });
      }
    });
    const seen = new Set();
    return result.filter((item) => {
      if (seen.has(item.value)) return false;
      seen.add(item.value);
      return true;
    });
  };

  const allCategories = getAllCategories();

  // ✅ Ek hi call mein saare products fetch karo
  useEffect(() => {
    const fetchActive = async () => {
      try {
        const res = await fetch(SummaryApi.getAllProduct.url, {
          method: SummaryApi.getAllProduct.method,
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          const cats = new Set(data.data.map((p) => p.category));
          setActiveCategories(cats);
        }
      } catch (e) {
      console.log(e.message);
      
      }
    };
    fetchActive();
  }, []);

  const filteredCategories = allCategories.filter((el) => activeCategories.has(el.value));

  const CategoryList = () => (
    <div className="flex flex-col gap-2 text-sm mt-2">
      {filteredCategories.length === 0 ? (
        <p className="text-gray-400 text-xs px-2">Loading...</p>
      ) : (
        filteredCategories.map((el, i) => (
          <button
            key={i}
            onClick={() => handleCategoryClick(el.value)}
            className={`flex items-center gap-2 px-3 py-1 rounded-md hover:bg-red-50 transition text-left ${
              params.categoryName === el.value ? "bg-red-100 font-semibold" : ""
            }`}
          >
            <input
              type="checkbox"
              checked={params.categoryName === el.value}
              readOnly
              className="accent-red-500 pointer-events-none"
            />
            <span>{el.label}</span>
          </button>
        ))
      )}
    </div>
  );

  const SortOptions = () => (
    <div className="flex flex-col gap-2 text-sm">
      <label className="flex items-center gap-2">
        <input type="radio" name="sort" value="low-to-high"
          checked={sortOrder === "low-to-high"} onChange={handleSortChange}
          className="accent-red-500" />
        <span>Price: Low to High</span>
      </label>
      <label className="flex items-center gap-2">
        <input type="radio" name="sort" value="high-to-low"
          checked={sortOrder === "high-to-low"} onChange={handleSortChange}
          className="accent-red-500" />
        <span>Price: High to Low</span>
      </label>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-12">
      <div className="flex flex-col lg:flex-row gap-6">

        {/* Mobile Sidebar */}
        <div className="lg:hidden bg-white shadow rounded-lg p-4">
          <details className="mb-4">
            <summary className="text-red-700 font-semibold cursor-pointer mb-2">Sort By</summary>
            <SortOptions />
          </details>
          <details>
            <summary className="text-red-700 font-semibold cursor-pointer mb-2">Categories</summary>
            <CategoryList />
          </details>
        </div>

        {/* Desktop Sidebar */}
        <aside className="hidden lg:block bg-white shadow-md rounded-lg p-4 min-w-[240px] h-[calc(100vh-100px)] overflow-y-auto sticky top-[80px]">
          <div className="mb-8">
            <h3 className="text-red-700 border-b border-gray-300 pb-1 mb-2 font-semibold uppercase text-sm">
              Sort By
            </h3>
            <SortOptions />
          </div>
          <div>
            <h3 className="text-red-700 border-b border-gray-300 pb-1 mb-2 font-semibold uppercase text-sm">
              Categories
            </h3>
            <CategoryList />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <CategoryWiseDisplay
            category={params.categoryName}
            heading="Top Products"
            sortOrder={sortOrder}
          />
        </main>
      </div>
    </div>
  );
}

export default ProductCategory;