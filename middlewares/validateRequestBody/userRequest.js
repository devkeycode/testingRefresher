//this file contains the logic for handling the update operations on User resource

const User = require("../../models/user.model");
const { userTypes } = require("../../utils/constants");
const { trimValuesInRequestBody } = require("../../utils/trimRequestBody");
const { isValueUnique } = require("../../utils/checkUniqueValueInModelDoc");
exports.validateUserUpdateRequestBody = async (req, res, next) => {
  trimValuesInRequestBody(req); //to remove unwanted spaces
  //User REQUEST BODY required properties{name,email,password,userId}
  const { name, email, password, userId, userType } = req.body;
  if (name == "") {
    return res.status(400).json({
      message: "Name can't be empty.",
    });
  }
  if (email == "") {
    return res.status(400).json({
      message: "Email can't be empty.",
    });
  }
  if (password == "") {
    return res.status(400).json({
      message: "Password can't be empty.",
    });
  }
  if (userId == "") {
    return res.status(400).json({
      message: "UserId can't be empty.",
    });
  }
  if (userType == "") {
    return res.status(400).json({
      message: "UserType can't be empty.",
    });
  }
  if (email) {
    if (!isValidEmail(email)) {
      return res.status(400).json({
        message: "Email provided is invalid.",
      });
    }

    //check whether the email(provided in request body) is available to take or not
    const isAvailableToTake = await isValueUnique(User, { email });

    if (isAvailableToTake instanceof Error) {
      return res.status(500).json({
        message: "Internal server error while validating the request",
      });
    } else if (isAvailableToTake == false) {
      return res.status(400).json({
        message: "Email is already taken.",
      });
    }
  }

  if (userId) {
    //check whether the userId(provided in request body) is unique or not.
    const isAvailableToTake = await isValueUnique(User, { userId });
    if (isAvailableToTake instanceof Error) {
      return res.status(500).json({
        message: "Internal server error while validating the request",
      });
    } else if (isAvailableToTake == false) {
      return res.status(400).json({
        message: "User Id is already taken.",
      });
    }
  }

  if (userType) {
    if (
      userType !== userTypes.customer &&
      req.user.userType !== userTypes.admin
    ) {
      return res.status(400).json({
        message:
          "User updation as CUSTOMER userType only allowed.No other updation allowed.Only Admin can do the update.",
      });
    }
  }
  //if all the validation passed on request body , pass the control to next function in pipeline
  next();
};

/**
 *
 * @param {String} email
 * @returns {Boolean} true or false
 * @Description To check email is in valid email format or not
 */

function isValidEmail(email) {
  const regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regExp.test(email);
}
