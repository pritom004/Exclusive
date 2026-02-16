import { verifyToken } from "../services/auth.service.js";
export const auth = async (req, res, next) => {

  let token = req.headers.authorization;
  
    
  try {
    if (!token || !token.startsWith("Bearer")) {
    return res.status(401).json({
        message: "Unauthorized!",
      });
    }

    token = token.split(" ")[1];

    const decoded = await verifyToken(token)

    if (!decoded) {
     return res.status(401).json({
        message: "Unauthorized!",
      });
    }

     req.userId = decoded.id;
   next()
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message
    })
  }
};
