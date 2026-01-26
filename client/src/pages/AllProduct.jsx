import React, { useEffect, useState } from 'react';
import UploadProduct from '../component/UploadProduct';
import SummaryApi from '../commen';
import AdminProduct from '../component/AdminProduct';
import { toast } from 'react-toastify';

function AllProduct() {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchAllProduct = async () => {
    const fetchProduct = await fetch(SummaryApi.getAllProduct.url, {  
      method: SummaryApi.getAllProduct.method,
    });
    const response = await fetchProduct.json();
    if(response.success) {
      setProducts(response?.data || []);
    }
    if (response.error) {
      toast.error(response.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div className="bg-cyan-100 min-h-screen max-h-screen overflow-y-auto">
      <div className="flex justify-between py-2 px-4 items-center">
        <h2 className="text-bold text-2xl">All Product</h2>
        <button
          className="px-4 py-2 rounded-lg bg-amber-600 text-white"
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>
      <div className="flex items-center flex-wrap px-4 gap-10 py-4">
        {products.map((product, index) => (
          <AdminProduct key={product._id} data={product} fetchData={fetchAllProduct} />
        ))}
      </div>

      {openUploadProduct && (
        <UploadProduct
          fetchData={fetchAllProduct}
          onClose={() => setOpenUploadProduct(false)}
        />
      )}
    </div>
  );
}

export default AllProduct;
