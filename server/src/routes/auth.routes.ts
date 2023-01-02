import express from "express";
import { login, token } from "../controllers/auth.controllers";
const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/token", token);

export default authRouter;
