import SummaryApi from "../commen";
import { toast } from 'react-toastify';

const addCart = async (e, id, size = null, hasSizes = false) => {
  e?.stopPropagation();
  e?.preventDefault();

  try {
    if (hasSizes && !size) {
      const { toast } = await import("react-toastify"); // 👈 dynamic import
      toast.error("Please select a size first!");
      return;
    }

    const payload = { productId: id };
    if (hasSizes) payload.size = size;

    const fetchData = await fetch(SummaryApi.addToCart.url, {
      method: SummaryApi.addToCart.method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const response = await fetchData.json();
    const { toast } = await import("react-toastify"); // 👈 yahan bhi dynamic

    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  } catch (error) {
   toast.error("Error adding to cart:", error.message);
  
  }
};

export default addCart;
