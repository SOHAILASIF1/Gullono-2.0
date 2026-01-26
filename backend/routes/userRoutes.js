import express from 'express'
import { addCart, allUSer, countCart, deleteCart, getCartProduct, login, logout, sendContactEmail, signup, updateCart, updateUser, userDetail } from '../controller/userController.js'
import { authToken } from '../middleware/authToken.js'
// import { getAllProduct } from '../controller/productController.js'

const router=express.Router()
router.post('/signup',signup)
router.post('/login',login)
router.get('/details',authToken,userDetail)
router.get('/logout',logout)
router.get('/allUser',authToken,allUSer)
router.post('/updateUser',authToken,updateUser)
router.post('/addToCart',authToken,addCart)
router.get('/countCart',authToken,countCart)
router.get('/getCartProduct',authToken,getCartProduct)
router.post('/updateCart',authToken,updateCart)
router.post('/deleteCart',authToken,deleteCart)
router.post('/contactUs',sendContactEmail)
export default router