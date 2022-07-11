const mongoose = require("mongoose");

var UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
    },
    gender: {
      type: Number,
      enum: [1, 2, 3], // 1->Male | 2->Female | 3->Trans
      required: [true, "Gender is required"],
    },
    devices: {
      type: Number,
      enum: [1, 2, 3, 4, 5], // 1->Android | 2->IOS | 3->Windows | 4->Mac | 5->Linux
      required: [true, "Gender is required"],
    },
    activeHours: {
      today: Number,
      thisWeek: Number,
      thisMonth: Number,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
