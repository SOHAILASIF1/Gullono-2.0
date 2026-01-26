// migrateInventory.js
import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "./models/productModel.js";

dotenv.config();

const migrateInventory = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
    console.log("✅ DB connected for Inventory Migration...");

    const products = await Product.find();

    for (const product of products) {
      // --- Safe fixes ---
      if (!product.category || product.category.trim() === "") {
        product.category = "uncategorized";
      }

      if (Array.isArray(product.sizes)) {
        product.sizes = product.sizes
          .map((s) => {
            // Case 1: Agar string hai
            if (typeof s === "string" && s.trim() !== "") {
              return { size: s.trim(), inventory: 0 };
            }

            // Case 2: Agar object hai {0:"3",1:"-",2:"4"}
            if (typeof s === "object" && s !== null) {
              const sizeString = Object.values(s)
                .filter((v) => typeof v === "string" && v.trim() !== "")
                .join("");
              if (sizeString !== "") {
                return { size: sizeString, inventory: s.inventory ?? 0 };
              }
            }

            // Agar valid nahin mila to null return
            return null;
          })
          .filter(Boolean); // null remove karega
      } else {
        product.sizes = [];
      }

      await product.save();
      console.log(`✅ Migrated product: ${product.productName}`);
    }

    console.log("🎉 Inventory Migration Done!");
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Migration error:", err);
    mongoose.disconnect();
  }
};

migrateInventory();
