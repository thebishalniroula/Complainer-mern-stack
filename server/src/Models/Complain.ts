const mongoose = require("mongoose");

const complainSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    unique: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
});
module.exports = mongoose.model("complain", complainSchema);
export {};
