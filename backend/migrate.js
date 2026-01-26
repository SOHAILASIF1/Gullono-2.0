// migrateSizesWithInventory.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/productModel.js";

dotenv.config(); // .env se MONGODB_URI uthayega

const MONGODB_URI = process.env.MONGODB_URI;

const migrateSizesWithInventory = async () => {
  try {
    if (!MONGODB_URI) {
      throw new Error("❌ MONGODB_URI not found in .env file");
    }

    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
    console.log("✅ Database connected");

    // Fetch all products
    const products = await Product.find({});

    for (let product of products) {
      if (
        Array.isArray(product.sizes) &&
        product.sizes.length > 0 &&
        typeof product.sizes[0] === "string" // sirf string wale hi update hon
      ) {
        product.sizes = product.sizes.map((s) => ({
          size: s,
          inventory: 0, // default 0
        }));

        await product.save();
        console.log(`✅ Updated product: ${product.productName}`);
      }
    }

    console.log("🎉 Migration completed successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Migration error:", err.message);
    process.exit(1);
  }
};

migrateSizesWithInventory();
