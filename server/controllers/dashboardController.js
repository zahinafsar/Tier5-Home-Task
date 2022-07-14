const Usage = require("../models/Usage");
const Dashboard = require("../models/Dashboard");
const { generateUsage } = require("../utils/generateData");
const { successResponse, errorResponse } = require("../utils/response");

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
    const { dashboard, name, id } = req.body;

    const dashboard_data = {};
    dashboard && (dashboard_data.dashboard = dashboard);
    name && (dashboard_data.name = name);

    if (name) {
      const existing = await Dashboard.findOne({ name });
      if (existing && existing._id != id) {
        res.status(400).send(errorResponse(`Dashboard name already exists!`));
        return;
      }
    }

    if (id) {
      const data = await Dashboard.findOneAndUpdate(
        { _id: id },
        dashboard_data,
        {
          new: true,
        }
      );
      res.send(
        successResponse(`Dashboard updated successfully`, {
          ...data._doc,
          new: false,
        })
      );
    } else {
      const newDashboard = new Dashboard({
        name,
        dashboard,
      });
      const data = await newDashboard.save();
      res.status(201).send(
        successResponse(`Dashboard added successfully`, {
          ...data._doc,
          new: true,
        })
      );
    }
  } catch (err) {
    next(err);
  }
};

exports.get_dashboard = async (req, res, next) => {
  try {
    const id = req.params.id;
    const dashboards = await Dashboard.find({ _id: id });
    res.send(successResponse(`Dashboard fetched!`, dashboards[0]));
  } catch (err) {
    next(err);
  }
};

exports.get_all_dashboard = async (req, res, next) => {
  try {
    // get all dashboard withour name

    const dashboards = await Dashboard.find({}).select("-dashboard");
    res.send(successResponse(`Dashboards fetched!`, dashboards));
  } catch (err) {
    next(err);
  }
};
