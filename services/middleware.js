const jwt = require("jsonwebtoken");
const secretKey = "your_secret_key";

const authenticate = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), secretKey);
    req.user = decoded; 
    next(); 
  } catch (error) {
    return res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = authenticate;
