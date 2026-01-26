import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SummaryApi from "../commen";
import VerticalCard from "../component/VerticalCard";
import { Context } from "../App";
import { toast } from "react-toastify";

function ProductDetail() {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: 0,
    sellingPrice: 0,
    sizes: [],
  });
  const [activeImg, setActiveImg] = useState("");
  const [selectedSize, setSelectedSize] = useState(null); // ✅ selected size
  const { fetchCount } = useContext(Context);
  const params = useParams();
  const navigate = useNavigate();

  const fetchdata = async () => {
    const getDetail = await fetch(SummaryApi.getProductDetail.url, {
      method: SummaryApi.getProductDetail.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: params.id,
      }),
    });
    const response = await getDetail.json();
    if (response.success) {
      setData(response.data);
      setActiveImg(response.data.productImage[0]);
    }
  };

  const addToCart = async () => {
    try {
      // agar product me size hain to aur user ne select nahi kiya
      if (data?.sizes?.length > 0 && !selectedSize) {
        alert("Please select a size first!");
        return;
      }
  
      const payload = {
        productId: data._id,
      };
  
      // sirf tab size bhejo jab product me size available ho
      if (data?.sizes?.length > 0) {
        payload.size = selectedSize;
      }
  
      const res = await fetch(SummaryApi.addToCart.url, {
        method: SummaryApi.addToCart.method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });
  
      const resData = await res.json();
      if (resData.success) {
        toast.success("Product added to cart!");
        fetchCount(); // ✅ cart counter update
      } else {
        toast.error(resData.message);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  
  

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Please select a size first!");
      return;
    }
    // ✅ Navigate to checkout with selected size
    navigate("/cart", {
      state: {
        product: data,
        selectedSize: selectedSize,
      },
    });
  };

  useEffect(() => {
    fetchdata();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [params.id]);

  const handleMouseEnter = (img) => {
    setActiveImg(img);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-6 sm:py-10">
      {/* Product Info Section */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Image Section */}
        <div className="flex flex-col lg:flex-row-reverse gap-6 w-full lg:w-1/2">
          <div className="border rounded-2xl overflow-hidden w-full h-80 sm:h-96">
            {data?.productImage.length > 0 ? (
              <img
                src={activeImg}
                alt="Product"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            ) : (
              <p className="flex items-center justify-center h-full">No image available</p>
            )}
          </div>

          <div className="flex lg:flex-col lg:flex-wrap gap-3">
            {data?.productImage.map((img, index) => (
              <div
                key={index}
                className="border rounded-md w-20 h-20 sm:w-24 sm:h-24 cursor-pointer overflow-hidden"
                onMouseEnter={() => handleMouseEnter(img)}
              >
                <img
                  src={img}
                  alt={`Product ${index}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Text Info */}
        <div className="flex flex-col gap-4 w-full lg:w-1/2">
          <p className="inline-block bg-amber-100 text-amber-800 font-medium px-3 py-1 rounded-lg text-sm sm:text-base">
            {data?.brandName}
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            {data?.productName}
          </h2>
          <p className="capitalize text-slate-500 text-sm sm:text-base">{data?.category}</p>

          {/* Pricing */}
          <div className="flex items-center gap-4 text-xl sm:text-2xl my-2">
            <p className="text-red-500 font-semibold">Rs {data?.sellingPrice}</p>
            <p className="text-slate-400 line-through">Rs {data?.price}</p>
          </div>

          {/* Sizes Section */}
          {data?.sizes && data.sizes.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Available Sizes:</h3>
              <div className="flex flex-wrap gap-3">
                {data.sizes.map((item, index) => (
                  <button
                    key={index}
                    disabled={item.inventory === 0}
                    onClick={() => setSelectedSize(item.size)}
                    className={`px-4 py-2 rounded-md border text-sm sm:text-base transition 
                      ${selectedSize === item.size
                        ? "bg-blue-500 text-white border-blue-600"
                        : item.inventory > 0
                          ? "bg-green-100 border-green-400 text-green-800 hover:bg-green-200"
                          : "bg-gray-200 border-gray-400 text-gray-600 line-through cursor-not-allowed"
                      }`}
                  >
                    {item.size}
                    {item.inventory === 0 && " (Out)"}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
            {data?.description}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-4">
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md px-6 py-2 text-sm sm:text-base transition-colors"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
            <button
              className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-semibold rounded-md px-6 py-2 text-sm sm:text-base transition-colors"
              onClick={addToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {data?.category && (
        <div className="mt-12">
          <VerticalCard category={data?.category} heading="Recommended Products" />
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
