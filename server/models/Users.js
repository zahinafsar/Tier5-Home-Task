const mongoose = require("mongoose");

var UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
    },
    roles: {
      type: Array,
      default: ["user"],
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "Email can't be blank"],
      match: [/\S+@\S+\.\S+/, "Email is invalid"],
      index: true,
    },
    profileImage: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
