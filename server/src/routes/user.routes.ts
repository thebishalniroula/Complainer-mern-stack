import express from "express";
const userRouter = express.Router();
import { registerUser, loginUser } from "../controllers/user.controller";

userRouter.post("/register", registerUser as any);
userRouter.post("/login", loginUser as any);

export default userRouter;
