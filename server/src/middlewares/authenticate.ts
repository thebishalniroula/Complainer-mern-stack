import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/authToken";
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies["accessToken"];
  if (!accessToken) {
    return res.sendStatus(402);
  }
  const decoded = verifyAccessToken(accessToken);
  if (!decoded) {
  }
};
