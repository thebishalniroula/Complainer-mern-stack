const express = require("express");
const users = require("./routes/users");
const auth = require("./routes/auth");
const complains = require("./routes/complains");
const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);
require("dotenv").config();

require("./config/dbconnection")();

app.use(express.json());

app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/complains", complains);

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
