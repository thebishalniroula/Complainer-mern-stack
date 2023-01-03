import express, { NextFunction, Request, Response } from "express";
import { authenticate } from "../middlewares/authenticate";
const complainsRouter = express.Router();

complainsRouter.get("/", authenticate as any, (req: any, res: Response) => {
  return res.status(200).json({
    success: false,
    message:
      "Protected content. You are seeing this because you are logged in as " +
      req.user.username,
  });
});

export default complainsRouter;
