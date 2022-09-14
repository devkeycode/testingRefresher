//this middleware file contains the logic to validate signup request body ,and if request body validated then only pass the control to the next function in the procesing pipeline

const User = require("../../models/user.model");
const { userTypes } = require("../../utils/constants");

const trimValuesInRequestBody = require("../../utils/trimRequestBody");
const { isValueUnique } = require("../../utils/checkUniqueValueInModelDoc");

exports.validateSignUpRequestBody = async (req, res, next) => {
  trimValuesInRequestBody(req); //to remove unwanted spaces
  //User REQUEST BODY required properties{name,email,password,userId}
  const { name, email, password, userId, userType } = req.body;
  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Name is required field and is not provided.",
    });
  }
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required field and is not provided.",
    });
  }
  if (!password) {
    return res.status(400).json({
      success: false,
      message: "Password is required field and is not provided.",
    });
  }
  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "UserId is required field and is not provided.",
    });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Email provided is invalid.",
    });
  }

  //check whether the email(provided in request body) is available to take or not
  let isAvailableToTake = await isValueUnique(User, { email });

  if (isAvailableToTake instanceof Error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error while validating the request",
    });
  } else if (isAvailableToTake == false) {
    return res.status(400).json({
      success: false,
      message: "Email is already taken.",
    });
  }

  //check whether the userId(provided in request body) is unique or not.
  isAvailableToTake = await isValueUnique(User, { userId });
  if (isAvailableToTake instanceof Error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error while validating the request",
    });
  } else if (isAvailableToTake == false) {
    return res.status(400).json({
      success: false,
      message: "User Id is already taken.",
    });
  }

  if (userType) {
    //if userType is provided in request body , then ensure userType provided value is one of those values [CUSTOMER], although by default userType is customer only, since admin registration not allowed, admin account will be created directly in the db.

    if (userType !== userTypes.customer) {
      return res.status(400).json({
        success: false,
        message:
          "User registration as CUSTOMER userType only allowed.No other registration allowed.",
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
