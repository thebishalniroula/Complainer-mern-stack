import { Request, Response, NextFunction } from "express";
import { UploadedFile } from "express-fileupload";
import {
  validateExistingUser,
  validateNewUser,
} from "../utils/validators/user";
import { createUser, findByEmailOrPassword } from "../services/user.services";
import User from "../Models/User";

interface RequestWithFile extends Request {
  files: {
    [key: string]: UploadedFile;
  };
}

export const registerUser = async (
  req: RequestWithFile,
  res: Response,
  next: NextFunction
) => {
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
    return res.status(200).json({ success: true, user });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error });
  }
};

export const loginUser = async (
  req: RequestWithFile,
  res: Response,
  next: NextFunction
) => {
  const { value, error } = validateExistingUser(req.body);
  if (error) {
    return res.json({ success: false, message: error.details[0].message });
  }
  try {
    const userExist = await findByEmailOrPassword(value.usernameOrEmail);
    if (userExist) {
      if (userExist.password === value.password) {
        return res.status(200).json(userExist);
      } else return res.status(200).json({ message: "pw doesnt match" });
    }
    return res.status(200).json({ message: "User doesnt exist" });
  } catch (error: any) {
    return res
      .status(500)
      .json({ success: false, message: "Could not read database.", error });
  }
};
