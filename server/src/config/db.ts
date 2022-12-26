const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
module.exports = (conn_string: String) =>
  mongoose.connect(conn_string, (err: Error) => {
    if (err) {
      return console.error("Connection to db failed.", err);
    }
    console.log("Connected to db.");
  });
