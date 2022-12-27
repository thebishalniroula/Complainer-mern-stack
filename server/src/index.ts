import express from "express";
import fileUpload from "express-fileupload";
import userRouter from "./routes/user.route";
import { connectToDb } from "./config/db.config";
import { configureCloudinary } from "./config/cloudinary.config";
const app = express();
const PORT = process.env.PORT || 5000;
//Configuring env vars for developement
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config();
}

//Configuring cloudinary
configureCloudinary();
//Connection to database
connectToDb(process.env.DB_CONNECTION_STRING as string);

//file upload middleware
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./temp/",
  })
);

//Routes
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
