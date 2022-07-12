const express = require("express");
const {
  update_dashboard,
  get_dashboard,
  add_dummy_usage,
  get_usage_table
} = require("../../controllers/dashboardController");

const router = express.Router();

router
  .get("/dummy-usage", add_dummy_usage)
  .get("/table", get_usage_table)
  .post("/", update_dashboard)
  .get("/", get_dashboard);

module.exports = router;
