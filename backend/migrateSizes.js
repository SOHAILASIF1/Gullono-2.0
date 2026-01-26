import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/productModel.js";

dotenv.config(); // .env load karega

const MONGODB_URI = process.env.MONGODB_URI;

const migrateSizes = async () => {
  try {
    if (!MONGODB_URI) {
      throw new Error("❌ MONGODB_URI not found in .env file");
    }

    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
    console.log("✅ Database connected");

    const products = await Product.find({});

    for (let product of products) {
      if (typeof product.size === "string") {
        product.size = [product.size]; // string → array
        await product.save();
        console.log(`✅ Updated product: ${product.name}`);
      }
    }

    console.log("🎉 Migration completed successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Migration error:", err.message);
    process.exit(1);
  }
};

migrateSizes();
