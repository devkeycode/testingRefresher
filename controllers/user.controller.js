//this file contains the logic for handling the User Resource

const User = require("../models/user.model");

const {
  filterUserSetResponse,
  filterUserResponse,
} = require("../utils/filterResponses");

//get all the list of the users
exports.findAllUsers = async (req, res) => {
  const queryObj = {};
  //if optional queryParam passed along with the request,then add them to the queryObj

  if (req.query.userType) {
    queryObj.userType = req.query.userType;
  }

  try {
    const users = await User.find(queryObj);
    return res.status(200).json({
      documentResultsCount: users.length,
      data: filterUserSetResponse(users),
    });
  } catch (error) {
    console.error("Error while fetching all the users", error.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

//get a single user based on userId
exports.findUserByUserId = async (req, res) => {
  try {
    // user validation would have happened in the middleware itself
    return res.status(200).json({
      data: filterUserResponse(req.user),
    });
  } catch (error) {
    console.error("Error while searching the user ", error.message);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//update specific user
exports.updateUser = async (req, res) => {
  try {
    req.user.name = req.body.name !== undefined ? req.body.name : req.user.name;
    req.user.userId =
      req.body.userId !== undefined ? req.body.userId : req.user.userId;
    req.user.email =
      req.body.email !== undefined ? req.body.email : req.user.email;
    req.user.password =
      req.body.password !== undefined ? req.body.password : req.user.password;
    req.user.userType =
      req.body.userType !== undefined ? req.body.userType : req.user.userType;

    await req.user.save();
    return res.status(200).json({
      data: filterUserResponse(req.user),
      message: "User updated successfully.",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
