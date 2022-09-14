//This middleware file handle logic to validate the params passed in User request

const User = require("../../models/user.model");
//to check whether the ValidUserId passed as request parameter
const isValidUserIdInReqParam = async (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json({
      message: "No UserId passed as parameter.",
    });
  }
  try {
    const user = await User.findOne({ userId: req.params.id });
    if (!user) {
      return res.status(400).json({
        message: "UserId passed,doesn't exist.",
      });
    }
    //add the user details to req.user,so no need to query back the user again in db
    req.user = user;
    //userId exists,pass the control to next
    next();
  } catch (error) {
    console.log("Error while accessing the data", error.message);
    return res.status(500).send({
      message: "Internal server error while reading the data",
    });
  }
};

module.exports = {
  isValidUserIdInReqParam,
};
