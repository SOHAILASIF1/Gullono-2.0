import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  fullName: String,
  phone: String,
  email: String,
  address: String,
  paymentMethod: String,
  items: [
    {
     productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },  // ✅ "Product" capital P
      quantity: Number,
      price: Number,
      size: String,
      color: String, 
    },
  ],
  status: {
    type: String,
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Order =mongoose.model("orders", orderSchema);

export default Order
