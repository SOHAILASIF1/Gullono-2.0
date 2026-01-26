import jwt from 'jsonwebtoken'
export const authToken=async(req,res,next)=>{
    try {
        const token=req?.cookies?.token
        if (!token) {
            return res.status(402).json({
                success:false,
                error:true,
                message:"Login First"
            })
            
        }
        jwt.verify(token,process.env.SECRET,(err,decoded)=>{
            if (err) {
                console.log(err.message);
                return res.status(403).json({
                    success:false,
                    error:true,
                    message:"Invalid token"
                })
                
            }
            req.userId=decoded?._id
            console.log("Decoded user ID:", req.userId);
            next()
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            error:true,
            message:error.message
        })
        
    }
}