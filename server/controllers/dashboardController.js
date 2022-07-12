const Dashboard = require("../models/Dashboard");
const { successResponse } = require("../utils/response");

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
