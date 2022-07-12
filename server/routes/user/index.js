const express = require("express");
const {
  add_dummy_users,
  get_active_users,
  get_user_segmentation_by_country,
  get_user_segmentation_by_gender,
  get_user_segmentation_by_device,
  add_dummy_usage,
} = require("../../controllers/userController");

const router = express.Router();

router
  .get("/dummy-user", add_dummy_users)
  .get("/active-users", get_active_users)
  .get("/users-country/:country", get_user_segmentation_by_country)
  .get("/users-gender/:gender", get_user_segmentation_by_gender)
  .get("/users-device/:device", get_user_segmentation_by_device);

module.exports = router;
