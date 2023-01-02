import { Request, Response } from "express";
import { findByEmailOrPassword } from "../services/user.services";
import { compareHash } from "../utils/hashString";
import { validateExistingUser } from "../utils/validators/user";
import { RequestWithUser } from "./user.controller";
import { findRefreshToken, storeRefreshToken } from "../services/auth.services";
import {
  generateAccessToken,
  generateRefreshToken,
  ParamType,
  verifyRefreshToken,
} from "../utils/authToken";

export const login = async (req: RequestWithUser, res: Response) => {
  //input validation
  const { value, error } = validateExistingUser(req.body);
  if (error) {
    return res.json({ success: false, message: error.details[0].message });
  }

  try {
    const userExist = await findByEmailOrPassword(value.usernameOrEmail);
    if (!userExist)
      return res.status(403).json({
        success: false,
        message: "Please recheck your credentials.",
      });

    const checkPassword = await compareHash(value.password, userExist.password);

    if (checkPassword) {
      const accessToken = generateAccessToken({
        username: userExist.username,
        role: userExist.role,
      });

      const refreshToken = generateRefreshToken({
        username: userExist.username,
        role: userExist.role,
      });
      try {
        await storeRefreshToken(refreshToken);
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Could not generate/store refresh token",
        });
      }
      res.cookie("accessToken", `Bearer ${accessToken}`, {
        httpOnly: true,
        maxAge: 1000 * 60 * 5,
      });
      res.cookie("refreshToken", `Bearer ${refreshToken}`, { httpOnly: true });

      return res.status(200).json({
        sucess: true,
        message: "User found",
        user: {
          username: userExist.username,
          email: userExist.email,
          avatar: userExist.avatar,
          complains: userExist.complains,
          role: userExist.role,
        },
      });
    } else
      return res
        .status(403)
        .json({ message: "Please recheck your credentials." });
  } catch (error: any) {
    return res
      .status(500)
      .json({ success: false, message: "Could not read database.", error });
  }
};

export const token = async (req: Request, res: Response) => {
  const refreshToken: string | null = req.cookies["accessToken"];
  if (refreshToken === null) {
    return res.sendStatus(402);
  }
  const decoded = verifyRefreshToken(refreshToken);
  if (!decoded) return res.sendStatus(403);
  const accessToken = generateAccessToken(decoded as ParamType);
  res.cookie("accessToken", accessToken);
  res.sendStatus(200);
};
