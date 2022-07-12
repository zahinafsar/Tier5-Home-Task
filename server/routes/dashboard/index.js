const express = require("express");
const {
  update_dashboard,
  get_dashboard,
} = require("../../controllers/dashboardController");

const router = express.Router();

router.post("/", update_dashboard).get("/", get_dashboard);

module.exports = router;
