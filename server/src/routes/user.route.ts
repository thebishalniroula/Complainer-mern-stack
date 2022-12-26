const express = require("express");
const userRouter = express.Router();
const { registerUser } = require("../controllers/user.controller");

userRouter.post("/", registerUser);

export default userRouter;
export {};
