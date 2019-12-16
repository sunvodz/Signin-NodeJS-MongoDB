const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    const token = req
      .get("Cookie")
      .split("token=")[1]
      .trim();
    jwt.verify(token, "SECRETKEY");
    next();
  } catch (error) {
    res.status(201).render("login", {
      data: {
        pageName: "Login",
        message: "กรุณาล็อกอินก่อนเข้า Profile",
        class: "alert alert-warning"
      }
    });
  }
};
