import { Request, Response, NextFunction } from "express";
import { File } from "formidable";
import { parseReq } from "../utils/request-parser";
import { validateNewUser, User } from "../utils/validators/user";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fields, files } = await parseReq(req);
    const { value, error } = validateNewUser(fields as User);
    const avatar = files.avatar as File;
    if (error) {
      return res
        .status(400)
        .json({ success: false, message: error.details[0] });
    }
    if (!avatar.mimetype?.includes("image")) {
      return res.status(400).json({
        success: false,
        message: "Profile picture must be a valid image",
      });
    }
    return res.status(200).json(files);
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};
