import express, { NextFunction, Request, Response } from "express";
const complainsRouter = express.Router();
import { registerUser, loginUser } from "../controllers/user.controller";
import { RequestWithUser } from "../controllers/user.controller";

const checkUser = (req: RequestWithUser, res: Response, next: NextFunction) => {
  if (req.user) {
    return next();
  }
  return res
    .status(400)
    .json({ success: false, message: "Unauthorized user." });
};

complainsRouter.get("/", checkUser, (req: Request, res: Response) => {
  return res.status(200).json({
    success: false,
    message:
      "Protected content. You are seeing this because you are logged in.",
  });
});

export default complainsRouter;
