const express = require("express");
const userRouter = express.Router();
const {signUP,loginUser } = require("../controller/userController/userController")

userRouter.route("/sign-up").post(signUP);
userRouter.route("/login").post(loginUser)


module.exports = userRouter