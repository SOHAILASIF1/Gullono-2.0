import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import productCategory from "../helper/productCategory";
import uploadImage from "../helper/uploadImage";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../commen";
import { toast } from "react-toastify";
import DisplayImage from "./DisplayImage";

function UploadProduct({ onClose, fetchData }) {
  const [fullScreenUrl, setFullScreenUrl] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [sizeInput, setSizeInput] = useState("");
  const [colorInput, setColorInput] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(""); // boys / girls / newborn
  const [selectedSub, setSelectedSub] = useState("");     // summer / winter / eastern etc

  const [data, setData] = useState({
    productName: "",
    brandName: "",
    genderCategory: "",
    category: "",
    productImage: [],
    price: null,
    sellingPrice: null,
    sizes: [],
    colors: [],
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((prev) => ({ ...prev, productImage: newProductImage }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fetchData1 = await fetch(SummaryApi.uploadProduct.url, {
      method: SummaryApi.uploadProduct.method,
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    const response = await fetchData1.json();
    if (response.success) {
      toast.success(response.message);
      onClose();
      fetchData();
    }
    if (response.error) toast.error(response?.message);
  };

  // Main groups: boys, girls, newborn
  const mainGroups = Object.keys(productCategory); // ["boys", "girls", "newborn"]

  // Sub categories: agar boys/girls hain to unke keys (summer/winter etc), warna null
  const isNested = selectedGroup && !Array.isArray(productCategory[selectedGroup]);
  const subKeys = isNested ? Object.keys(productCategory[selectedGroup]) : [];

  // Final category items
  const categoryItems = isNested
    ? selectedSub
      ? productCategory[selectedGroup][selectedSub]
      : []
    : selectedGroup
    ? productCategory[selectedGroup]
    : [];

  // Sub label mapping
  const subLabels = {
    summer: "Summer",
    winter: "Winter",
    eastern: "Eastern",
    newbornAndToddler: "Newborn & Toddler",
    teen: "Teen",
  };

  return (
    <div className="fixed inset-0 bg-amber-100 bg-opacity-30 flex justify-center items-center">
      <div className="bg-white w-full h-[90vh] max-w-2xl rounded overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex p-2 justify-between items-center border-b flex-none">
          <h2 className="text-2xl font-bold text-center py-4">Upload Product</h2>
          <div className="w-fit ml-auto">
            <IoIosClose onClick={onClose} className="text-2xl cursor-pointer" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col p-3 gap-3 overflow-y-auto flex-1">

          {/* Product Name */}
          <div className="flex flex-col">
            <label>Product Name:</label>
            <input
              type="text"
              name="productName"
              value={data.productName}
              onChange={handleChange}
              placeholder="Enter Product Name"
              className="p-1 bg-amber-100 rounded border"
            />
          </div>

          {/* Brand Name */}
          <div className="flex flex-col">
            <label>Brand Name:</label>
            <input
              type="text"
              name="brandName"
              value={data.brandName}
              onChange={handleChange}
              placeholder="Enter Brand Name"
              className="p-1 bg-amber-100 rounded border"
            />
          </div>

          {/* Step 1: Main Group (boys / girls / newborn) */}
          <div className="flex flex-col">
            <label>Category Group:</label>
            <select
              value={selectedGroup}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedGroup(val);
                setSelectedSub("");
                setData((prev) => ({ ...prev, genderCategory: val, category: "" }));
              }}
              className="p-2 bg-slate-50 border rounded outline-none capitalize"
            >
              <option value="">-- Select Group --</option>
              {mainGroups.map((group) => (
                <option key={group} value={group} className="capitalize">
                  {group.charAt(0).toUpperCase() + group.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Step 2: Sub Category (summer / winter etc) — only for boys/girls */}
          {isNested && (
            <div className="flex flex-col">
              <label>Sub Category:</label>
              <select
                value={selectedSub}
                onChange={(e) => {
                  setSelectedSub(e.target.value);
                  setData((prev) => ({ ...prev, category: "" }));
                }}
                className="p-2 bg-slate-50 border rounded outline-none"
              >
                <option value="">-- Select Sub Category --</option>
                {subKeys.map((key) => (
                  <option key={key} value={key}>
                    {subLabels[key] || key}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Step 3: Category items */}
          <div className="flex flex-col">
            <label>Category:</label>
            <select
              name="category"
              value={data.category}
              onChange={handleChange}
              disabled={categoryItems.length === 0}
              className="p-2 bg-slate-50 border rounded outline-none"
            >
              <option value="">
                {categoryItems.length === 0 ? "-- Select Group First --" : "-- Select Category --"}
              </option>
              {categoryItems.map((el) => (
                <option key={el.value} value={el.value}>
                  {el.label}
                </option>
              ))}
            </select>
          </div>

          {/* Product Image */}
          <div className="flex flex-col">
            <label>Product Image:</label>
            <input
              type="file"
              accept="image/*"
              className="p-1 bg-amber-100 rounded border w-full"
              onChange={async (e) => {
                const file = e.target.files[0];
                const uploadImageOnCloudinary = await uploadImage(file);
                setData((prev) => ({
                  ...prev,
                  productImage: [...prev.productImage, uploadImageOnCloudinary.url],
                }));
              }}
            />
          </div>

          <div>
            {data?.productImage[0] ? (
              <div className="flex items-center gap-3 flex-wrap">
                {data.productImage.map((el, index) => (
                  <div className="relative group" key={index}>
                    <img
                      src={el}
                      alt=""
                      onClick={() => { setFullScreenUrl(el); setIsFullScreen(true); }}
                      width={80}
                      height={80}
                      className="bg-slate-300 border cursor-pointer"
                    />
                    <div
                      onClick={() => handleDelete(index)}
                      className="absolute bottom-0 left-0 p-1 bg-amber-300 rounded-full hidden group-hover:block text-white cursor-pointer"
                    >
                      <MdDelete />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">*Please Upload Image</p>
            )}
          </div>

          {/* Sizes with Inventory */}
          <div className="flex flex-col">
            <label>Sizes / Ages:</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={sizeInput}
                onChange={(e) => setSizeInput(e.target.value)}
                placeholder="e.g. Small, Medium, Age 2-3"
                className="p-1 bg-amber-100 rounded border flex-1"
              />
              <button
                type="button"
                onClick={() => {
                  if (sizeInput.trim()) {
                    setData((prev) => ({
                      ...prev,
                      sizes: [...prev.sizes, { size: sizeInput.trim(), inventory: 0 }],
                    }));
                    setSizeInput("");
                  }
                }}
                className="bg-green-500 text-white px-2 rounded"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-3 mt-3">
              {data.sizes.map((item, index) => (
                <div key={index} className="bg-amber-200 px-3 py-2 rounded flex items-center gap-2">
                  <span className="font-semibold">{item.size}</span>
                  <input
                    type="number"
                    min="0"
                    value={item.inventory}
                    onChange={(e) => {
                      const newSizes = [...data.sizes];
                      newSizes[index].inventory = Number(e.target.value);
                      setData((prev) => ({ ...prev, sizes: newSizes }));
                    }}
                    className="w-16 p-1 text-center border rounded bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setData((prev) => ({ ...prev, sizes: prev.sizes.filter((_, i) => i !== index) }))}
                    className="text-red-500 font-bold"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="flex flex-col">
            <label>Colors:</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={colorInput}
                onChange={(e) => setColorInput(e.target.value)}
                placeholder="e.g. Red, Blue, Black"
                className="p-1 bg-amber-100 rounded border flex-1"
              />
              <button
                type="button"
                onClick={() => {
                  if (colorInput.trim()) {
                    setData((prev) => ({ ...prev, colors: [...prev.colors, colorInput.trim()] }));
                    setColorInput("");
                  }
                }}
                className="bg-green-500 text-white px-2 rounded"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-3 mt-3">
              {data.colors.map((color, index) => (
                <div key={index} className="bg-amber-200 px-3 py-2 rounded flex items-center gap-2">
                  <span className="font-semibold">{color}</span>
                  <button
                    type="button"
                    onClick={() => setData((prev) => ({ ...prev, colors: prev.colors.filter((_, i) => i !== index) }))}
                    className="text-red-500 font-bold"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={handleChange}
              placeholder="Enter Total Price"
              className="p-1 bg-amber-100 rounded border"
            />
          </div>

          {/* Selling Price */}
          <div className="flex flex-col">
            <label>Selling Price:</label>
            <input
              type="number"
              name="sellingPrice"
              value={data.sellingPrice}
              onChange={handleChange}
              placeholder="Enter Selling Price"
              className="p-1 bg-amber-100 rounded border"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label>Description:</label>
            <textarea
              rows="6"
              name="description"
              value={data.description}
              onChange={handleChange}
              placeholder="Enter Description"
              className="p-1 bg-amber-100 mb-10 rounded border"
            ></textarea>
          </div>

          <button className="px-4 py-2 rounded-lg bg-amber-600 text-white">
            Upload Product
          </button>
        </form>
      </div>

      {isFullScreen && (
        <DisplayImage imgUrl={fullScreenUrl} onClose={() => setIsFullScreen(false)} />
      )}
    </div>
  );
}

export default UploadProduct;