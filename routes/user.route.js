//this file contains the logic for addressing the request related to User Resource

const {
  findAllUsers,
  findUserByUserId,
  updateUser,
} = require("../controllers/user.controller");
const {
  verifyToken,
  isAdmin,
  isAdminOrOwner,
  isValidUserIdInReqParam,
  validateUserUpdateRequestBody,
} = require("../middlewares");

module.exports = (app) => {
  //get all the users
  app.get("/testService/api/v1/users", [verifyToken, isAdmin], findAllUsers);

  //get a single user by id
  app.get(
    "/testService/api/v1/users/:id",
    [verifyToken, isValidUserIdInReqParam, isAdminOrOwner],
    findUserByUserId
  );

  //update user
  app.put(
    "/testService/api/v1/users/:id",
    [
      verifyToken,
      isValidUserIdInReqParam,
      isAdminOrOwner,
      validateUserUpdateRequestBody,
    ],
    updateUser
  );
};
