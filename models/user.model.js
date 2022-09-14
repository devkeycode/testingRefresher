//This file contains the logic for  defining the schema for User Resource

const mongoose = require("mongoose");
const { userTypes } = require("../utils/constants");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minLength: 5,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      default: userTypes.customer,
      enum: [userTypes.admin, userTypes.customer],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
