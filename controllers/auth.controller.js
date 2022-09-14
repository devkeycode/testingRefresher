//this file contains the logic for handling the user registration(signUp) and user signIn
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { filterUserResponse } = require("../utils/filterResponses");
const authConfig = require("../configs/auth.config");

//controller function to handle signup
exports.signup = async (req, res) => {
  //User{name,email,userId,password} are required fields
  //for customer,userType is optional
  const { name, email, userId, password, userType } = req.body;
  try {
    const userObject = await User.create({
      name,
      email,
      userId,
      password: bcrypt.hashSync(password, 10),
      userType,
    });

    return res.status(201).json({
      data: filterUserResponse(userObject),
    });
  } catch (error) {
    console.log("Internal error , ", err.message);
    res.status(500).json({
      message: "Some internal server error",
    });
  }
};

//controller function to handle signin
exports.signin = async (req, res) => {
  const { userId, password } = req.body;
  try {
    //check whether user with given userId exists or not
    const user = await User.findOne({ userId });
    if (user == null) {
      return res.status(400).json({
        message: "UserId does not exist.Provide a valid userId to signIn.",
      });
    }

    //check whether the password matches against the password in the database for the user, to validate the user
    const isPasswordMatched = bcrypt.compareSync(password, user.password);
    if (!isPasswordMatched) {
      return res.status(401).json({ message: " Password doesn't matched." });
    }
    //since user is validated,so create access token (using jsonwebtoken library) and send it along with other values in response body
    const token = jwt.sign({ id: user.userId }, authConfig.secret, {
      expiresIn: authConfig.expiryPeriod,
    });
    //send the response
    return res.status(200).json({
      data: { ...filterUserResponse(user), accessToken: token },
    });
  } catch (error) {
    console.log("Internal error -> ", error.message);
    res.status(500).json({
      message: "Some internal server error while signin",
    });
  }
};
