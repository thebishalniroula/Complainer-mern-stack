import express from "express";
import { createForm } from "../controllers/form.controller";
import { authenticate } from "../middlewares/authenticate";
const formRouter = express.Router();

formRouter.post("/", authenticate as any, createForm as any);
export default formRouter;
