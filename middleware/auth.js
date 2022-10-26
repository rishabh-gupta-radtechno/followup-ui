const jwt = require("jsonwebtoken");

function verifyjwt(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json("Unauthorize user");

  try {
    const decoded = jwt.verify(token, "secretKey");
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json("Token not valid");
  }
}

module.exports = verifyjwt;
