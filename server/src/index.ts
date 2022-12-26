const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
import userRouter from "./routes/user.route";
//Configuring env vars for developement
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config();
}
//Connection to database
require("./config/db")(process.env.DB_CONNECTION_STRING);

app.use("/api/user", userRouter);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
