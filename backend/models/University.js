const mongoose = require("mongoose");

const universitySchema = new mongoose.Schema({
  name: String,
  city: String,
  programs: [String],
  fees: String,
  lastDate: String
});

module.exports = mongoose.model("University", universitySchema);