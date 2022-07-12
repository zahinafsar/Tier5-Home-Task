const express = require("express");
const {
  update_dashboard,
  get_dashboard,
  add_dummy_usage,
  get_usage_table,
  get_all_dashboard,
} = require("../../controllers/dashboardController");

const router = express.Router();

router
  .get("/dummy-usage", add_dummy_usage)
  .get("/table", get_usage_table)
  .post("/", update_dashboard)
  .get("/", get_all_dashboard)
  .get("/:id", get_dashboard);

module.exports = router;
