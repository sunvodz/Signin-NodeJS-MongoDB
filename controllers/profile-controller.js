const jwt = require("jsonwebtoken");
const profile = (req, res, next) => {
  try {
    const token = req.get("Cookie").split("token=")[1].trim();
    const user = jwt.verify(token, "SECRETKEY");
    res.render("profile", {
      data: {
        pageName: "Profile",
        message: "",
        class: "alert alert-primary",
        username: user.username,
        loginStatus: user.loginStatus
      }
    });
  } catch (error) {
    res.render("login", {
      data: {
        pageName: "Login",
        message: "กรุณาล็อกอินก่อนเข้า Profile",
        class: "alert alert-warning"
      }
    });
  }
};
module.exports = profile;
