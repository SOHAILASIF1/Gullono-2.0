import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import productCategory from "../helper/productCategory";
import uploadImage from "../helper/uploadImage";
import DisplayImage from "./DisplayImage";
import SummaryApi from "../commen";

function EditProduct({ onClose, productData, fetchData }) {
  const [uploadProduct, setUploadProduct] = useState("");
  const [fullScreenUrl, setFullScreenUrl] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [sizeInput, setSizeInput] = useState("");

  const [data, setData] = useState({
    _id: productData?._id || "",
    productName: productData?.productName || "",
    brandName: productData?.brandName || "",
    genderCategory: productData?.genderCategory || "",
    category: productData?.category || "",
    productImage: productData?.productImage || [],
    price: productData?.price || null,
    sellingPrice: productData?.sellingPrice || null,
    sizes: productData?.sizes || [], // [{ size: "M", inventory: 0 }]
    description: productData?.description || "",
    saleItem: productData?.saleItem || false,
  });
  console.log(data.sizes);

  const [selectedGender, setSelectedGender] = useState(
    productData?.genderCategory || ""
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // 👇 Add this inside your EditProduct component
const handleInventoryChange = (index, value) => {
  const updatedSizes = [...data.sizes];
  updatedSizes[index].inventory = Number(value); // ensure number
  setData((prev) => ({
    ...prev,
    sizes: updatedSizes,
  }));
};


  const handleDelete = (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((prev) => ({
      ...prev,
      productImage: newProductImage,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(SummaryApi.updateProduct.url, {
      method: SummaryApi.updateProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
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
  useEffect(() => {
    if (productData?.sizes?.length) {
      const fixedSizes = productData.sizes.map((s) => {
        if (s.size && typeof s.size === "string") {
          return s;
        } else {
          const sizeStr = Object.values(s)
            .filter((val) => typeof val === "string")
            .join("");
          return { size: sizeStr, inventory: s.inventory || 0 };
        }
      });
  
      setData((prev) => ({
        ...prev,
        sizes: fixedSizes,
      }));
    }
  }, [productData]); // sirf jab productData change ho
  
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

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col p-3 gap-3 overflow-y-auto flex-1"
        >
          {/* Product Name */}
          <div className="flex flex-col">
            <label htmlFor="productName">Product Name:</label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={data.productName}
              onChange={handleChange}
              placeholder="Enter Product Name"
              className="p-1 bg-amber-100 rounded border"
            />
          </div>

          {/* Brand Name */}
          <div className="flex flex-col">
            <label htmlFor="brandName">Brand Name:</label>
            <input
              type="text"
              id="brandName"
              name="brandName"
              value={data.brandName}
              onChange={handleChange}
              placeholder="Enter Brand Name"
              className="p-1 bg-amber-100 rounded border"
            />
          </div>

      

          {/* Category */}
        {/* Gender / Category Group */}
<div className="flex flex-col">
  <label htmlFor="gender">Category Group:</label>
  <select
    id="genderCategory"
    name="genderCategory"
    value={data.genderCategory}
    onChange={(e) => {
      const { value } = e.target;
      setSelectedGender(value);
      setData((prev) => ({
        ...prev,
        genderCategory: value,
        category: "",
      }));
    }}
    className="p-2 bg-slate-50 border rounded outline-none"
  >
    <option value="">-- Select Group --</option>
    <option value="boys">Boys</option>
    <option value="boysSummer">Boys Summer</option>
    <option value="girlsWinter">Girls Winter</option>
    <option value="girlsSummer">Girls Summer</option>
    <option value="newborn">Newborn</option>
    <option value="teen">Teen</option>
  </select>
</div>

{/* Category */}
<div className="flex flex-col">
  <label htmlFor="category">Category:</label>
  <select
    id="category"
    name="category"
    value={data.category}
    onChange={handleChange}
    disabled={!selectedGender}
    className="p-2 bg-slate-50 border rounded outline-none"
  >
    {!selectedGender ? (
      <option value="">-- Select Group First --</option>
    ) : (
      <>
        <option value="">-- Select Category --</option>
        {productCategory[selectedGender]?.map((el) => (
          <option key={el.value} value={el.value}>
            {el.label}
          </option>
        ))}
      </>
    )}
  </select>
</div>

          {/* Product Image */}
          <div className="flex flex-col">
            <label htmlFor="productImage">Product Image:</label>
            <input
              type="file"
              id="productImage"
              name="productImage"
              accept="image/*"
              className="p-1 bg-amber-100 rounded border w-full"
              onChange={async (e) => {
                const file = e.target.files[0];
                setUploadProduct(file.name);
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
              <div className="flex items-center gap-3">
                {data.productImage.map((el, index) => (
                  <div className="relative group" key={index}>
                    <img
                      src={el}
                      alt=""
                      onClick={() => {
                        setFullScreenUrl(el);
                        setIsFullScreen(true);
                      }}
                      width={80}
                      height={80}
                      className="bg-slate-300 border"
                    />
                    <div
                      onClick={() => handleDelete(index)}
                      className="absolute bottom-0 left-0 p-1 bg-amber-300 rounded-full hidden group-hover:block text-white"
                    >
                      <MdDelete />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <p>*Please Upload Image</p>
              </div>
            )}
          </div>

          {/* Sizes with Inventory */}
        {/* Sizes with Inventory */}
<div className="flex flex-col">
  <label htmlFor="sizes">Sizes / Ages:</label>
  <div className="flex gap-2">
    <input
      type="text"
      id="sizes"
      value={sizeInput}
      onChange={(e) => setSizeInput(e.target.value)}
      placeholder="e.g. Small, Medium, Age 2-3"
      className="p-1 bg-amber-100 rounded border flex-1"
    />
    <button
      type="button"
      onClick={() => {
        if (sizeInput.trim() !== "") {
          setData((prev) => ({
            ...prev,
            sizes: [
              ...prev.sizes,
              { size: sizeInput.trim(), inventory: 0 },
            ],
          }));
          setSizeInput("");
        }
      }}
      className="bg-green-500 text-white px-2 rounded"
    >
      Add
    </button>
  </div>

  {/* Display Sizes with Inventory */}
  <div className="flex flex-wrap gap-3 mt-3">
    {data.sizes.map((s, idx) => (
      <div
        key={idx}
        className="flex items-center gap-2 bg-amber-200 px-3 py-2 rounded"
      >
        {/* Size Name (readonly) */}
        <input
          type="text"
          value={s.size}
          readOnly
          className="border px-2 py-1 bg-white rounded w-24 text-center"
        />

        {/* Inventory Input */}
        <input
          type="number"
          min="0"
          value={s.inventory}
          onChange={(e) => handleInventoryChange(idx, e.target.value)}
          className="border px-2 py-1 rounded w-16 text-center"
        />

        {/* Delete Button */}
        <button
          type="button"
          onClick={() => {
            setData((prev) => ({
              ...prev,
              sizes: prev.sizes.filter((_, i) => i !== idx),
            }));
          }}
          className="text-red-500 hover:text-red-700 text-xl"
        >
          <MdDelete />
        </button>
      </div>
    ))}
  </div>
</div>


          {/* Prices */}
          <div className="flex flex-col">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={data.price}
              onChange={handleChange}
              placeholder="Enter Total Price"
              className="p-1 bg-amber-100 rounded border"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="sellingPrice">Selling Price:</label>
            <input
              type="number"
              id="sellingPrice"
              name="sellingPrice"
              value={data.sellingPrice}
              onChange={handleChange}
              placeholder="Enter Selling Price"
              className="p-1 bg-amber-100 rounded border"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label htmlFor="description">Description:</label>
            <textarea
              cols="20"
              rows="10"
              id="description"
              name="description"
              value={data.description}
              onChange={handleChange}
              placeholder="Enter Description"
              className="p-1 bg-amber-100 mb-10 rounded border"
            ></textarea>
          </div>

          {/* Sale Item */}
          <label htmlFor="saleItem" className="flex items-center gap-2">
            <input
              type="checkbox"
              id="saleItem"
              name="saleItem"
              checked={data.saleItem}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  saleItem: e.target.checked,
                }))
              }
            />
            Mark as Sale Item
          </label>

          <button className="px-4 py-2 rounded-lg bg-amber-600 text-white">
            Update Product
          </button>
        </form>
      </div>

      {isFullScreen && (
        <DisplayImage
          imgUrl={fullScreenUrl}
          onClose={() => setIsFullScreen(false)}
        />
      )}
    </div>
  );
}

export default EditProduct;
