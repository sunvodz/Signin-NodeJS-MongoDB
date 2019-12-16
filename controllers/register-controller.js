const bcrypt = require("bcryptjs");
const User = require("../models/user");
const createUser = async userObj => {
  const hash = await bcrypt.hash(userObj.password, 10);
  const user = new User({
    username: userObj.username,
    password: hash
  });
  const data = await user.save();
  return data;
};
const register = (req, res, next) => {
  res.render("register", {
    data: {
      pageName: "Register",
      message: "กรอกข้อมูลเพื่อลงทะเบียนผู้ใช้",
      class: "alert alert-primary"
    }
  });
};
module.exports.register = register;
const postRegister = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const userObj = {
    username: username,
    password: password
  };
  createUser(userObj)
    .then(() => {
      const success = `ลงทะเบียน ${userObj.username} เรียบร้อยแล้ว`;
      res.render("login", {
        data: {
          pageName: "Login",
          message: success,
          class: "alert alert-primary"
        }
      });
    })
    .catch(err => {
      res.status(401).render("register", {
        data: {
          pageName: "Error",
          message: err,
          class: "alert alert-danger"
        }
      });
    });
};
module.exports.postRegister = postRegister;
