const mongoose = require("mongoose");

var UsageSchema = new mongoose.Schema({
  year: String,
  totalUsage: Number,
});

const Usage = mongoose.model("Usage", UsageSchema);
module.exports = Usage;
