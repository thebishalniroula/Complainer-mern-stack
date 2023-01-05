import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/authToken";
import User from "../Models/User";
export const authenticate = async (
  req: Request & { user?: { username: string; role: string } },
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.cookies["accessToken"];
    if (!accessToken) return res.sendStatus(401);
    const decoded = verifyAccessToken(accessToken.split(" ")[1]) as {
      username: string;
      role: string;
    };
    if (!decoded) {
      return res.sendStatus(403);
    }
    const user = await User.findOne({ username: decoded.username }).populate(
      "forms",
      "title"
    );
    if (user) {
      req.user = user;
      return next();
    }
    return res.sendStatus(403);
  } catch (error) {
    return res.sendStatus(402);
  }
};
