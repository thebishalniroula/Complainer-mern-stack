const mongoose = require("mongoose");

module.exports = () =>
  mongoose.connect(process.env.DB_CONNECTION_STRING, (err) => {
    if (err) console.log("Connection to db failed", err);
    else console.log("Connected to db");
  });
