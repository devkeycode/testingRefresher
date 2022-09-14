//This util function used to filter the  object before sending it as a response, in short sending only required values in the user object and excluding the unwanted (like user password) from sending,so filtering the userResponse object.

const { userTypes } = require("./constants");
//filter a single user, to send a single user info as repsonse
const filterUserResponse = (userObj) => {
  //pick up only those properties that are needed from the userObj
  const { name, email, userId, userType, userStatus, createdAt, updatedAt } =
    userObj;
  //return an object of the same extracted properties
  const returnedUserObject = {
    name,
    email,
    userId,
    userType,
    userStatus,
    createdAt,
    updatedAt,
  };

  return returnedUserObject;
};

//filter all users, to send all users info as response
const filterUserSetResponse = (users) => {
  const userSetResponse = [];
  for (let user of users) {
    userSetResponse.push(filterUserResponse(user));
  }
  return userSetResponse;
};

module.exports = { filterUserResponse, filterUserSetResponse };
