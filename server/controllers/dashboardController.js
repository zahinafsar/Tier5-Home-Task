const Usage = require("../models/Usage");
const Dashboard = require("../models/Dashboard");
const { generateUsage } = require("../utils/generateData");
const { successResponse } = require("../utils/response");

exports.add_dummy_usage = async (req, res, next) => {
  try {
    const dummy_data = await generateUsage();
    await Usage.deleteMany({});
    await Usage.insertMany(dummy_data);
    res.send(successResponse(`dummy usage has been added successfully`));
  } catch (err) {
    next(err);
  }
};

exports.get_usage_table = async (req, res, next) => {
  try {
    const usage = await Usage.find({});
    res.send(successResponse(`Usage fetched!`, { usage }));
  } catch (err) {
    next(err);
  }
};

exports.update_dashboard = async (req, res, next) => {
  try {
    const { data } = req.body;
    const dashboard = await Dashboard.find({});
    if (dashboard.length === 0) {
      const newDashboard = new Dashboard({ dashboard: data });
      await newDashboard.save();
    } else {
      await Dashboard.findOneAndUpdate(
        { _id: dashboard[0]._id },
        { dashboard: data }
      );
    }
    res.send(successResponse(`Dashboard updated!`));
  } catch (err) {
    next(err);
  }
};

exports.get_dashboard = async (req, res, next) => {
  try {
    const dashboard = await Dashboard.find({});
    res.send(successResponse(`Dashboard fetched!`, dashboard[0]));
  } catch (err) {
    next(err);
  }
};

exports.get_usage_data = async (req, res, next) => {
  try {
    const dashboard = await Dashboard.find({});
    res.send(successResponse(`Dashboard fetched!`, dashboard[0]));
  } catch (err) {
    next(err);
  }
};
