import mongoose from "mongoose"

const cartSchema = new mongoose.Schema({
    productId: {
        ref: "Product",
        type: String,
        required: true
    },
    size: {
        type: String,
     
    },
    quantity: {
        type: Number,
        default: 1
    },
    userId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Cart = mongoose.model("Carts", cartSchema)
export default Cart
