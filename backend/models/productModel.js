import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema({
  size: { type: String, required: true },
  inventory: { type: Number, required: true, default: 0 }
});

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true
    },
    brandName: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    genderCategory: {
      type: String,
      required: true
    },
    sizes: [
        {
          size: { type: String, required: true },
          inventory: { type: Number, default: 0 },
        }
      ],
      
    description: {
      type: String,
      required: true
    },
    productImage: [String],
    price: {
      type: Number,
      required: true
    },
    sellingPrice: {
      type: Number
    },
    saleItem: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
