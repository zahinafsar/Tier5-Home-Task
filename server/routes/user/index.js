const express = require("express");
const { get_user } = require("../../controllers/userController");

const router = express.Router();

router.get("/:id", get_user);

module.exports = router;
