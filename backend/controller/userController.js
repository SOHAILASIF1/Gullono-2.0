import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer';
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";
export const signup=async(req,res)=>{
    try {
        const {fullName,email,password}=req.body
        console.log(fullName);
        const user=await User.findOne({email})
        if (user) {
            return res.status(401).json({
                success:false,
                error:true,
                message:"User Already Exist"
            })
            
        }
        const hashPass=await bcrypt.hash(password,10)
        const newUser=new User({
            fullName,
            email,
            password:hashPass,
            role:"GENERAL"     })
        await newUser.save()
        return res.status(200).json({
            success:true,
            error:false,
            message:"User Created"
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:true,
            message:error.message
        })
        
    }
}
export const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        const user=await User.findOne({email})
        if (!user) {
            return res.status(404).json({
                success:false,
                error:true,
                message:"User Not Found"
            })
            
            
            
        }
        const isMatched= await bcrypt.compare(password,user?.password)
        if (!isMatched) {
            return res.status(402).json({
                success:false,
                error:true,
                message:"Invalid Password"
            })
            
        }

        const tokenData={
            _id:user._id,
            email:user?.email
        }
        const token= jwt.sign(tokenData,process.env.SECRET,{expiresIn:"1d"})

        return res.cookie("token", token, {
          httpOnly: true,
          maxAge: 864000000,
          path: "/",
          secure: true, // Must be false for local development
          sameSite: "none", // More flexible for development
        })
          .status(200)
          .json({
            success: true,
            message: "User Logged In",
            token,
          });

    } catch (error) {
        return res.status(500).json({
            success:false,
            error:true,
            message:error.message

        })
    }
}
export const userDetail = async (req, res) => {
    try {
      // If req.userId is missing, it means no token or invalid token
      if (!req.userId) {
        return res.status(401).json({
          success: false,
          error: true,
          message: "Unauthorized"
        });
      }
  
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          error: true,
          message: "User Not Found"
        });
      }
  
      return res.status(200).json({
        success: true,
        error: false,
        data: user
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: true,
        message: error.message
      });
    }
  };
  
  export const logout = async (req, res) => {
    try {
      res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        path: "/",
        sameSite: "none",
        secure: true, // HTTPS pe true hota hai
      });
      return res.status(200).json({
        success: true,
        message: "User Logged Out",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


  
  export const allUSer=async(req,res)=>{
    try {
      const users=await User.find({})
      return res.status(200).json({
        success:true,
        error:false,
        data:users
      })
      
    } catch (error) {
      return res.status(500).json({
        success:false,
        error:true,
        message:error.message
      })  
      
    }
  }

  export const updateUser=async(req,res)=>{
    try {
      const session=req?.userId
      const {userId,name,email, role}=req.body;
      const payload={
        ...(email && {email:email}),
        ...(name && {name:name}),
        ...(role && {role:role})

      }
      const user=await User.findById(session)
      console.log(user?.role);
      const updateUser=await User.findByIdAndUpdate(userId, payload)
      return res.status(200).json({
        success:true,
        error:false,
        message:"User Updated Successfully",
        data:updateUser
      })
      
    } catch (error) {
      return res.status(500).json({
        success:false,
        error:true,
        message:error.message
      })
      
    }
  }

 
  
  export const addCart = async (req, res) => {
    try {
      const { productId, size } = req.body;
      const userId = req.userId;
  
      if (!productId) {
        return res.status(400).json({
          success: false,
          error: true,
          message: "ProductId is required",
        });
      }
  
      // ✅ product fetch karo
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          error: true,
          message: "Product not found",
        });
      }
  
      // ✅ check karo agar product me sizes hain to size required hai
      if (product.sizes.length > 0 && !size) {
        return res.status(400).json({
          success: false,
          error: true,
          message: "Size is required for this product",
        });
      }
  
      // ✅ check agar same product + same size already cart me hai
      const query = { productId, userId };
      if (product.sizes.length > 0) {
        query.size = size;
      }
  
      const existingCart = await Cart.findOne(query);
      if (existingCart) {
        return res.status(400).json({
          success: false,
          error: true,
          message: "Already in Cart",
        });
      }
  
      const payload = {
        productId,
        userId,
        quantity: 1,
      };
  
      if (product.sizes.length > 0) {
        payload.size = size;
      }
  
      const cart = new Cart(payload);
      const savedCart = await cart.save();
  
      return res.status(200).json({
        success: true,
        error: false,
        message: "Product Added to Cart Successfully",
        data: savedCart,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        error: true,
        message: error.message,
      });
    }
  };
  
  


  export const countCart=async(req,res)=>{
    try {
      const userId=req?.userId
      console.log("UserId:", req.userId, "Type:", typeof req.userId);
      const allCarts = await Cart.find({});
console.log(allCarts);


      const count=await Cart.countDocuments({
        userId:userId
      })
      return res.status(200).json({
        message:"ok",
        success:true,
        data:{
          count:count
        }
      })
      
    } catch (error) {
      return res.status(500).json({
        message:error.message,
        error:true
      })
      
    }
  }


export const getCartProduct=async(req,res)=>{
  try {
    const currentUser=req?.userId
    const allCartProduct=await Cart.find({
      userId:currentUser
    }).populate('productId')
    return res.status(200).json({
      message:"ok",
      success:true,
      error:false,
      data:allCartProduct
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({

      message:error.message,
      success:false,
      error:true
    })
    
  }
}
export const updateCart=async(req,res)=>{
  try {
    const currentUser=req?.userId
    const id = req?.body?._id
    const qty=req?.body?.quantity
    const updateCart=await Cart.updateOne({_id:id, userId:currentUser}, {
      ...(qty && {quantity:qty})
    })
    return res.status(200).json({
      message:"Cart Updated Successfully",
      success:true,
      error:false,
      data:updateCart
    })


    
  } catch (error) {
    return res.status(500).json({
      message:error.message,
      success:false,
      error:true
    })
    
  }
}

export const deleteCart=async(req,res)=>{
  try {
    const currentUser=req?.userId
    const id=req.body?._id
    const deleteCart=await Cart.deleteOne({_id:id, userId:currentUser})
    return res.status(200).json({
      message:"Cart Deleted Successfully",
      success:true,
      error:false,
      data:deleteCart
    })
    
  } catch (error) {
    return res.status(500).json({
      message:error.message,
      success:false,
      error:true
    })
    
  }
}



export const sendContactEmail = async (req, res) => {
  const { fullName, email, message } = req.body;

  if (!fullName || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    // Create transporter using Gmail or custom SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'alyana998877@gmail.com', // 🔁 Replace with your Gmail
        pass: 'lqcv zubv vwms rngm'      // 🔁 Use App Password (not your Gmail password)
      }
    });

    // Email content
    const mailOptions = {
      from: email,
      to: 'alyana998877@gmail.com', // 🔁 Replace with your email to receive messages
      subject: `New Contact Message from ${fullName}`,
      html: `
        <h3>You received a new message:</h3>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: "Email sent successfully" });

  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).json({ success: false, message: "Failed to send  yes email" });
  }
};




