import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/authToken";
export const authenticate = (
  req: Request & { user?: { username: string; role: string } },
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.cookies["accessToken"];
    const decoded = verifyAccessToken(accessToken);
    if (!decoded) {
      return res.sendStatus(403);
    }
    req.user = decoded as { username: string; role: string };
    next();
  } catch (error) {
    return res.sendStatus(402);
  }
};
