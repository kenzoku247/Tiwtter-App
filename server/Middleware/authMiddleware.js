import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()
const secret = process.env.JWT_KEY;
const authMiddleware = async(req,res,next) => {
    try {
        const token = req.headers.Authorization.split(" ")[1];
        console.log(req.headers.Authorization);
        if(!token) return res.status(400).json({msg: "Invalid Authentication."})

        if (token) {
          const decoded = jwt.verify(token, secret);
          req.body._id = decoded?.id;
        }
        next();
      } catch (error) {
        console.log(error);
      }
    };
    
export default authMiddleware;