const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  jwt.verify(req.headers.token, "masai", (err, decoded) => {
    if (err) {
      res.status(400).send({ msg: "Login first" });
    } else {
      req.body.user_id = decoded.user_id;
      next();
    }
  });
};
module.exports = authMiddleware;
