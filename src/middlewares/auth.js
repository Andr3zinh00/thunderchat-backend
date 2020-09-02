const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    if (!req.headers.authorization) throw "Acesso Probido"
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const payload = jwt.verify(token, process.env.SECRET);
    next();
  } catch (error) {
    res.status(401).json({
      message: "Acesso Proibido"
    })
  }
}