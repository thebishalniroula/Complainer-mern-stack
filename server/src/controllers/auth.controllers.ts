import { Request, Response } from "express";
import { findByEmailOrPassword } from "../services/user.services";
import { compareHash } from "../utils/hashString";
import { validateExistingUser } from "../utils/validators/user";
import { RequestWithUser } from "./user.controller";
import { findRefreshToken, storeRefreshToken } from "../services/auth.services";
import {
  generateAccessToken,
  generateRefreshToken,
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

      res.cookie("refreshToken", `Bearer ${refreshToken}`, { httpOnly: true });
      res.cookie("accessToken", `Bearer ${accessToken}`, {
        httpOnly: true,
        maxAge: 1000 * 10,
      });
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
  const refreshToken =
    req.cookies["refreshToken"] && req.cookies["refreshToken"].split(" ")[1];
  if (!refreshToken) {
    return res.sendStatus(401);
  }
  const validatedRefreshToken = await findRefreshToken(refreshToken);
  if (!validatedRefreshToken) return res.sendStatus(403);
  console.log("decoded", verifyRefreshToken(refreshToken));

  const { username, role } = verifyRefreshToken(refreshToken) as any;

  const accessToken = generateAccessToken({ username, role });
  res.cookie("accessToken", `Bearer ${accessToken}`, {
    httpOnly: true,
    maxAge: 1000 * 10,
  });
  res.sendStatus(200);
};
