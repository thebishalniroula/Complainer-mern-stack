import express from "express";
const userRouter = express.Router();
import { registerUser } from "../controllers/user.controller";

userRouter.post("/register", registerUser as any);

export default userRouter;
