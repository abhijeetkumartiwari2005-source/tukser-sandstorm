import jwt from 'jsonwebtoken';
export default (req, res, next) => {
  try {
    console.log("Authorization header:", req.headers.authorization);
    const token = req.headers.authorization?.split(' ')[1];
    console.log("Extracted token:", token);
    if(! token) return res.status(401).json({error:"Token required"});
    const decoded=jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded:", decoded);
    req.user=decoded;
    next();
    
  } catch (error) {
    console.log("Error:", error.message);
    res.status(401).json({ error: "Unauthorized" });
  }
};