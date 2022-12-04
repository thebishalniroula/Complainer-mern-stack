const jwt = require("jsonwebtoken");

function authoriseUser(req, res, next) {
  const token = req.header("x-auth-token");
  console.log(token);
  if (!token) return res.status(401).send("Unauthorised request");
  try {
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send("Unauthorised request.");
  }
}

module.exports = authoriseUser;
