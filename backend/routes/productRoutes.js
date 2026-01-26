import express from 'express'
import { authToken } from '../middleware/authToken.js'
import { categoryWiseProduct, deleteProduct, getAllProduct, getCategory, getProductDetaial, searchProduct, updateProduct, uploadProduct } from '../controller/productController.js'

const router=express.Router()
  
router.post('/uploadProduct',authToken,uploadProduct)
router.get('/allProduct',getAllProduct)
router.delete('/deleteProduct/:id',authToken,deleteProduct)
router.post("/updateProduct",authToken,updateProduct)
router.post('/categoryWiseProduct',categoryWiseProduct)
router.get('/getCategory',getCategory)
router.post("/getProductDetails",getProductDetaial )
router.get("/search",searchProduct)


export default router
