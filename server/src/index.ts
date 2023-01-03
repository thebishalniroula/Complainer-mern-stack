import express from "express";
import fileUpload from "express-fileupload";
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import complainsRouter from "./routes/complains.routes";
import { connectToDb } from "./config/db.config";
import { configureCloudinary } from "./config/cloudinary.config";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser());
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
app.use("/api/complains", complainsRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
