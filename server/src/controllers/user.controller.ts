import { Request, Response, NextFunction } from "express";
import { UploadedFile } from "express-fileupload";
import {
  validateExistingUser,
  validateNewUser,
} from "../utils/validators/user";
import { createUser, findByEmailOrPassword } from "../services/user.services";
import User, { UserType } from "../Models/User";
import { compareHash } from "../utils/hashString";
import { Types } from "mongoose";
import * as token from "../utils/authToken";
interface RequestWithFile extends Request {
  files: {
    [key: string]: UploadedFile;
  };
}
export interface RequestWithUser extends Request {
  user?: UserType & {
    _id: Types.ObjectId;
  };
}

export const registerUser = async (req: RequestWithFile, res: Response) => {
  const { value, error } = validateNewUser(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0] });
  }
  const userExist = await User.findOne({
    $or: [{ username: value.username }, { email: value.email }],
  });
  if (userExist) {
    if (userExist.username === value.username) {
      return res.json({ success: false, message: "Username already exists." });
    } else
      return res.json({ success: false, message: "Email already exists." });
  }
  if (!req.files.avatar.mimetype.includes("image")) {
    return res
      .status(400)
      .json({ success: false, message: "Profile picture must be an image." });
  }
  try {
    const user = await createUser(req.body, req.files.avatar);
    return res.status(200).json({
      success: true,
      user: {
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        complains: user.complains,
        role: user.role,
      },
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error });
  }
};
