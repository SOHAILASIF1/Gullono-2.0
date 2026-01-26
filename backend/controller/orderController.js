import Order from "../models/orderModel.js";

export const orderCreate=async (req, res) => {
    try {
      const { fullName, phone, email, address, paymentMethod, cartItems } = req.body;
  
      if (!cartItems || cartItems.length === 0) {
        return res.status(400).json({ success: false, message: "Cart is empty" });
      }
  
      const order = new Order({
        userId: req?.user?._id, // optional
        fullName,
        phone,
        email,
        address,
        paymentMethod,
        items: cartItems.map(item => ({
          productId: item.productId._id,
          quantity: item.quantity,
          price: item.productId.sellingPrice,
          size:item.size
        })),
      });
  
      await order.save();
  
      res.json({ success: true, message: "Order placed successfully" });
    } catch (error) {
      console.log("Order creation failed", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
  ;

  export const getOrders=async(req,res)=>{
    try {
        const session=req?.userId
        const getOrder=await Order.find({})
        return res.status(200).json({
            message:"ok",
            success:true,
            error:false,
            data:getOrder
        })
        
    } catch (error) {
        return res.status(500).json({
            message:error.message,
            success:false,
            error:true

        })
        
    }
  }

  export const updateOrderStatus = async (req, res) => {
    try {
      const { status } = req.body;
      await Order.findByIdAndUpdate(req.params.orderId, { status });
      return res.json({ success: true, message: "Status updated" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: "Failed to update status" });
    }
  }

  export const deleteOrder = async (req, res) => {
    try {
      const { orderId } = req.params;
      const deletedOrder = await Order.findByIdAndDelete(orderId);
      
      if (!deletedOrder) {
        return res.status(404).json({
          message: "Order not found",
          success: false,
          error: true
        });
      }
      
      return res.status(200).json({
        message: "Order deleted successfully",
        success: true,
        error: false
      });
      
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        success: false,
        error: true
      });
      
    }
  }



  export const allDilveredOrder=async (req,res)=>{
    try {
      const deliveredOrders = await Order.find({ status: "delivered" });
      return res.status(200).json({
        message: "Delivered orders fetched successfully",
        success: true,
        error: false,
        data: deliveredOrders
      })
      
    } catch (error) {
      log.error("Failed to fetch delivered orders and", error);
      return res.status(500).json({
        message:error.message,
        success:false,
        error:true
      })
      
    }
  }