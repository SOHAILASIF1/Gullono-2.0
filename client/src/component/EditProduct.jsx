import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import productCategory from "../helper/productCategory";
import uploadImage from "../helper/uploadImage";
import DisplayImage from "./DisplayImage";
import SummaryApi from "../commen";

function EditProduct({ onClose, productData, fetchData }) {
  const [fullScreenUrl, setFullScreenUrl] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [sizeInput, setSizeInput] = useState("");
  const [colorInput, setColorInput] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedSub, setSelectedSub] = useState("");

  const [data, setData] = useState({
    _id: productData?._id || "",
    productName: productData?.productName || "",
    brandName: productData?.brandName || "",
    genderCategory: productData?.genderCategory || "",
    category: productData?.category || "",
    productImage: productData?.productImage || [],
    price: productData?.price || null,
    sellingPrice: productData?.sellingPrice || null,
    sizes: productData?.sizes || [],
    colors: productData?.colors || [],
    description: productData?.description || "",
    saleItem: productData?.saleItem || false,
  });

  // Sub label mapping
  const subLabels = {
    summer: "Summer",
    winter: "Winter",
    eastern: "Eastern",
    newbornAndToddler: "Newborn & Toddler",
    teen: "Teen",
  };
const mainGroups = Object.keys(productCategory || {});
const isNested = selectedGroup && 
  productCategory[selectedGroup] != null && 
  !Array.isArray(productCategory[selectedGroup]);
const subKeys = isNested && productCategory[selectedGroup] 
  ? Object.keys(productCategory[selectedGroup]) 
  : [];
const categoryItems = isNested
  ? selectedSub && productCategory[selectedGroup]?.[selectedSub]
    ? productCategory[selectedGroup][selectedSub] 
    : []
  : selectedGroup && Array.isArray(productCategory[selectedGroup])
  ? productCategory[selectedGroup]
  : []; 
useEffect(() => {
  if (productData?.genderCategory) {
    const gc = productData.genderCategory;
    if (gc.includes(".")) {
      const [group, sub] = gc.split(".");
      setSelectedGroup(group);
      setSelectedSub(sub);
    } else if (productCategory[gc] && !Array.isArray(productCategory[gc])) {
      // boys ya girls jaisa nested group
      setSelectedGroup(gc);
      setSelectedSub("");
    } else {
      // newborn jaisi flat array
      setSelectedGroup(gc);
      setSelectedSub("");
    }
  }
}, [productData]);

  // Sizes fix useEffect
  useEffect(() => {
    if (productData?.sizes?.length) {
      const fixedSizes = productData.sizes.map((s) => {
        if (s.size && typeof s.size === "string") return s;
        const sizeStr = Object.values(s).filter((val) => typeof val === "string").join("");
        return { size: sizeStr, inventory: s.inventory || 0 };
      });
      setData((prev) => ({ ...prev, sizes: fixedSizes }));
    }
  }, [productData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInventoryChange = (index, value) => {
    const updatedSizes = [...data.sizes];
    updatedSizes[index].inventory = Number(value);
    setData((prev) => ({ ...prev, sizes: updatedSizes }));
  };

  const handleDelete = (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((prev) => ({ ...prev, productImage: newProductImage }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(SummaryApi.updateProduct.url, {
      method: SummaryApi.updateProduct.method,
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.success) {
      toast.success(result.message);
      fetchData();
      onClose();
    } else if (result.error) {
      toast.error(result.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-amber-100 bg-opacity-30 flex justify-center items-center">
      <div className="bg-white w-full h-[90vh] max-w-2xl rounded overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex p-2 justify-between items-center border-b flex-none">
          <h2 className="text-2xl font-bold text-center py-4">Edit Product</h2>
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

          {/* Step 1: Main Group */}
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

          {/* Step 2: Sub Category (only for boys/girls) */}
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

          {/* Step 3: Category */}
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
              {data.sizes.map((s, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-amber-200 px-3 py-2 rounded">
                  <input
                    type="text"
                    value={s.size}
                    readOnly
                    className="border px-2 py-1 bg-white rounded w-24 text-center"
                  />
                  <input
                    type="number"
                    min="0"
                    value={s.inventory}
                    onChange={(e) => handleInventoryChange(idx, e.target.value)}
                    className="border px-2 py-1 rounded w-16 text-center"
                  />
                  <button
                    type="button"
                    onClick={() => setData((prev) => ({ ...prev, sizes: prev.sizes.filter((_, i) => i !== idx) }))}
                    className="text-red-500 hover:text-red-700 text-xl"
                  >
                    <MdDelete />
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
              {data.colors.map((color, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-amber-200 px-3 py-2 rounded">
                  <input
                    type="text"
                    value={color}
                    readOnly
                    className="border px-2 py-1 bg-white rounded w-24 text-center"
                  />
                  <button
                    type="button"
                    onClick={() => setData((prev) => ({ ...prev, colors: prev.colors.filter((_, i) => i !== idx) }))}
                    className="text-red-500 hover:text-red-700 text-xl"
                  >
                    <MdDelete />
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

          {/* Sale Item */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="saleItem"
              checked={data.saleItem}
              onChange={(e) => setData((prev) => ({ ...prev, saleItem: e.target.checked }))}
            />
            Mark as Sale Item
          </label>

          <button className="px-4 py-2 rounded-lg bg-amber-600 text-white">
            Update Product
          </button>
        </form>
      </div>

      {isFullScreen && (
        <DisplayImage imgUrl={fullScreenUrl} onClose={() => setIsFullScreen(false)} />
      )}
    </div>
  );
}

export default EditProduct;