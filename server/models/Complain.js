const mongoose = require("mongoose");

const complainSchema = new mongoose.Schema({
  title: {
    type: String,
    maxLength: 100,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  submittedBy: {
    type: String,
  },
  role: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("complain", complainSchema);
