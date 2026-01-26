import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()   // 🔥 SABSE UPAR

const DBConnection = async () => {
    const MONGODB_URI = process.env.MONGODB_URI
    console.log("ENV MONGO_URI =>", MONGODB_URI)   // Check which URI is read

    await mongoose.connect(MONGODB_URI)
    console.log("DB CONNECTED =>", mongoose.connection.name)
}
export default DBConnection
