import { Document, HydratedDocument, Types } from "mongoose";
import User, { UserType } from "../Models/User";
import saveFileToCloudinary from "../utils/saveFileToCloudinary";
import { UploadedFile } from "express-fileupload";
import { hashString } from "../utils/hashString";

export const createUser = async (
  userDetails: UserType,
  avatar: UploadedFile
): Promise<
  Document<unknown, any, UserType> &
    UserType & {
      _id: Types.ObjectId;
    }
> => {
  try {
    const result = await saveFileToCloudinary(avatar, userDetails.username);
    const user: HydratedDocument<UserType> = new User({
      ...userDetails,
      password: await hashString(userDetails.password),
      avatar: result.secure_url,
    });
    try {
      return await user.save();
    } catch (error: any) {
      return error;
    }
  } catch (error: any) {
    return error;
  }
};

export const findByEmailOrPassword = async (
  usernameOrEmail: string
): Promise<HydratedDocument<UserType> | null> => {
  try {
    return await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });
  } catch (error: any) {
    return error;
  }
};
