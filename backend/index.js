console.log("🔥 RUNNING THIS INDEX FILE 🔥")


import express from 'express'


import DBConnection from './db/db.js'
import userRouter from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import productRouter from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'




const app=express()

DBConnection()
app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://gullono-2-0.vercel.app/"
  ],
  credentials: true,
}));



app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/order',orderRoutes)





app.listen(process.env.PORT,()=>{
    console.log(`Port is run at ${process.env.PORT}`);
})