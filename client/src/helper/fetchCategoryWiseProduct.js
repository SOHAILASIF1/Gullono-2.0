import SummaryApi from "../commen";
import { toast } from 'react-toastify';

const fetchCategoryWiseProduct=async(category)=>{
    try {
        const fetchData=await fetch(SummaryApi.categoryWiseProduct.url, {
        
            method: SummaryApi.categoryWiseProduct.method,
            headers: {
                "Content-Type": "application/json",
                
            },
            credentials: "include",
            body: JSON.stringify({
                category:category
                // You can pass any required data here, if needed
            })

        });
        const response=await fetchData.json();
        return response;
        
    } catch (error) {
        toast.error(error.message);
        
    }
}
export default fetchCategoryWiseProduct;