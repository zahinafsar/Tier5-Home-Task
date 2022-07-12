const User = require("../models/Users");
const { successResponse, errorResponse } = require("../utils/response");
const { generateUsers } = require("../utils/generateUser");
const { GENDER, DEVICES } = require("../enums/user");

exports.add_dummy_users = async (req, res, next) => {
  try {
    const dataLimit = 100000;
    const dummy_users = await generateUsers(dataLimit);
    await User.deleteMany({});
    await User.insertMany(dummy_users);
    res.send(
      successResponse(`${dataLimit} dummy data has been added successfully`)
    );
  } catch (err) {
    next(err);
  }
};

exports.get_active_users = async (req, res, next) => {
  try {
    const dailyActiveUser = await User.find({})
      .sort({ "activeHours.today": -1 })
      .limit(15);
    const weeklyActiveUser = await User.find({})
      .sort({ "activeHours.thisWeek": -1 })
      .limit(15);
    const monthlyActiveUser = await User.find({})
      .sort({ "activeHours.thisMonth": -1 })
      .limit(15);
    res.send(
      successResponse("Top 15 users by usage time", {
        dailyActiveUser,
        weeklyActiveUser,
        monthlyActiveUser,
      })
    );
  } catch (err) {
    next(err);
  }
};

exports.get_user_segmentation_by_country = async (req, res, next) => {
  try {
    const { country } = req.params;
    const count = await User.countDocuments({
      country: { $regex: country, $options: "i" },
    });
    res.send(
      successResponse(`Total number of user for country ${country}`, {
        count,
      })
    );
  } catch (err) {
    next(err);
  }
};

exports.get_user_segmentation_by_gender = async (req, res, next) => {
  try {
    const { gender } = req.params;
    if (!GENDER[gender]) {
      res.send(errorResponse("Invalid gender"));
    }
    const count = await User.countDocuments({
      gender,
    });
    res.send(
      successResponse(`Total number of user for gender ${GENDER[gender]}`, {
        count,
      })
    );
  } catch (err) {
    next(err);
  }
};

exports.get_user_segmentation_by_device = async (req, res, next) => {
  try {
    const { device } = req.params;
    if (!DEVICES[device]) {
      res.send(errorResponse("Invalid device"));
    }
    const count = await User.countDocuments({
      devices: device,
    });
    res.send(
      successResponse(`Total number of user for device ${DEVICES[device]}`, {
        count,
      })
    );
  } catch (err) {
    next(err);
  }
};
