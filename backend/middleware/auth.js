import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {
  const {token} = req.headers;
  if (!token) {
    return res.json({success: false, message: "Couldn't find the token"})
  }
  try {
    const decryptedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decryptedToken.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({success: false, message: "Couldn't decrypt the token"})
  }
}

export default authMiddleware;