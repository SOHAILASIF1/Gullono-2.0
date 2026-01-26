import uploadProductPermission from "../helper/permission.js"
import Product from "../models/productModel.js"


export const uploadProduct=async(req,res)=>{
    try {
        const sessionId=req.userId
        if (!uploadProductPermission(sessionId)) {
            throw new Error("Permission Denied")
            
        }
        const uploadProduct=new Product(req.body)
        const save=await uploadProduct.save()


        return res.status(200).json({
            success:true,
            message:"Product Upload SuccessFully",
            data:save
        })
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            error:true,
            message:error.message

        })
        
    }
}
export const getAllProduct=async(req,res)=>{
    try {
        const allProduct=await Product.find({}).sort({createdAt:-1})
        return res.status(200).json({
            success:true,
            error:false,
            message:"All Product Fetched Successfully",
            data:allProduct
        })
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            error:true,
            message:error.message
        })
        
    }
}
export const deleteProduct=async(req,res)=>{
    try {
        const {id}=req.params;
        const deleteProduct=await Product.findByIdAndDelete(id)
        if (!deleteProduct) {
            return res.status(404).json({
                success:false,
                error:true,
                message:"Product Not Found"
            })
            
        }
        return res.status(200).json({
            success:true,
            error:false,
            message:"Product Deleted Successfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:true,
            message:error.message
        })
        
    }
}
export const updateProduct = async (req, res) => {
    try {
        const sessionId = req.userId;

        // Permission check
        if (!uploadProductPermission(sessionId)) {
            return res.status(403).json({
                success: false,
                error: true,
                message: "Permission Denied"
            });
        }

        // Destructure _id and rest of fields
        const { _id, ...updateFields } = req.body;

        if (!_id) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Product ID is required"
            });
        }

        console.log("Request Body:", req.body);
        console.log("Update Fields:", updateFields);

        // Update product
        const updatedProduct = await Product.findByIdAndUpdate(
            _id,
            { $set: updateFields },
            { new: true, runValidators: true }
          );
          
        console.log(updateProduct);

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Product Not Found"
            });
        }

        return res.status(200).json({
            success: true,
            error: false,
            message: "Product Updated Successfully",
            data: updatedProduct
        });
        console.log(res.json);



    } catch (error) {
        console.error("Update Product Error:", error);
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message
        });
    }
};

export const categoryWiseProduct=async(req,res)=>{
    try {
        const {category}=req?.body;
        const product= await Product.find({category}).sort({createdAt:-1})
        if (!product || product.length === 0) {
            return res.status(404).json({
                success:false,
                error:true,
                message:"No Product Found"
            })
            
        }
        return res.status(200).json({
            success:true,
            error:false,
            message:"Product Fetched Successfully",
            data:product
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:true,
            message:error.message
        })
        
    }
}


export const getCategory = async (req, res) => {
    try {
      // جو unique categories ہیں
      const distinctCategories = await Product.distinct("category");
  
      const categoryWithProduct = [];
  
      for (const category of distinctCategories) {
        const product = await Product.findOne({ category });
  
        if (product) {
          categoryWithProduct.push({
            category: category,
            product: {
              _id: product._id,
              productName: product.productName,
              productImage: product.productImage,
              price: product.price,
              sellingPrice: product.sellingPrice,
            },
          });
        }
      }
  
      return res.json({
        success: true,
        data: categoryWithProduct,
      });
  
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: true,
        message: error.message,
      });
    }
  };
  


  export const getProductDetaial=async(req,res)=>{
    try {
        const {productId}=req.body
        const deatail=await Product.findById(productId)
        return res.status(200).json({
            success:true,
            message:"Product Detail Fetched Successfully",
            data:deatail,
            error:false
        
            
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:true,
            message:error.message
        })
    }}
export const searchProduct=async (req,res)=>{
    try {
        const query=req?.query?.q
        const regex=new RegExp(query,"i","g")
        const product=await Product.find({
            "$or":[
                {
                    productName:regex
                },
                {
                    category:regex
                }
            ]
        })
        return res.status(200).json({
            message:"ok",
            data:product,
            success:true
        })
        
    } catch (error) {
        return res.status(500).json({
            message:error.message,
            success:false,
            error:true
        })
        
    }
}