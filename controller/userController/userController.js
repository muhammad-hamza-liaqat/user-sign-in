const userModel = require("../../model/user/userModel");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const signUP = async (req, res) => {
  const { firstName, lastName, email } = req.body;
  if (!firstName || !lastName || !email) {
    return res
      .status(400)
      .json({ message: "all fields required", status: 400 });
  }
  try {
    const randomPassword = uuidv4();
    console.log("random password", randomPassword);
    const hashedPassword = await bcrypt.hash(randomPassword, 10);
    const newUser = await userModel.create({
      ...req.body,
      password: hashedPassword,
    });
    console.log(newUser);
    return res
      .status(201)
      .json({ status: 201, message: "user created", data: newUser });
  } catch (error) {
    console.log("error:", error);
    return res
      .status(500)
      .json({ message: "internal server error", status: 500 });
  }
};

const loginUser = async (req, res) => {
  // res.end("hello from login user")
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      statusCode: 400,
      message: "all fields required",
      error: "email and password required",
    });
  }
  try {
    // finding the user exists or not
    const userToFind = await userModel.findOne({
      where: {
        email: email,
      },
    });
    // if user doesnot exist
    if (!userToFind) {
      return res.status(400).json({
        statusCode: 400,
        message: "invalid email or password",
        error: "invalid email or password",
      });
    }
    // comparing the hashed password with the user's password in the req.body
    const validatePassword = await bcrypt.compare(
      password,
      userToFind.password
    );
    // if error in the password
    if (!validatePassword) {
      return res.status(400).json({
        statusCode: 400,
        message: "invalid email or password",
        error: "invalid email or password",
      });
    }

    return res.status(201).json({
      statusCode: 201,
      message: "user successfully login",
    });
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json({
      statusCode: 500,
      message: "internal server error",
      error: error,
    });
  }
};
module.exports = { signUP, loginUser };
