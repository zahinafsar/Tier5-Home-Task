const mongoose = require("mongoose");

var DashboardSchema = new mongoose.Schema({
  name: String,
  dashboard: [],
});

const Dashboard = mongoose.model("Dashboard", DashboardSchema);
module.exports = Dashboard;
