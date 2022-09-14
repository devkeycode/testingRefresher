//This file storing the constants(common literals) whose value will not be changed during entire lifecycle, so  instead of defining everywhere ,can be defined in single file so later can be used by exporting from this file and later in case literals value need to change,we can just change it in a single file and all changes will reflect everywhere the literals had been used.

module.exports = {
  userTypes: {
    customer: "CUSTOMER",
    admin: "ADMIN",
  },
};
