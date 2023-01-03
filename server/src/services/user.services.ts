import { Document, HydratedDocument, Types } from "mongoose";
import User, { UserType } from "../Models/User";
import saveFileToCloudinary from "../utils/saveFileToCloudinary";
import { UploadedFile } from "express-fileupload";
import { hashString } from "../utils/hashString";

export const createUser = async (
  userDetails: UserType,
  avatar: UploadedFile | null
): Promise<
  Document<unknown, any, UserType> &
    UserType & {
      _id: Types.ObjectId;
    }
> => {
  const result =
    avatar && (await saveFileToCloudinary(avatar, userDetails.username));
  const user: HydratedDocument<UserType> = new User({
    ...userDetails,
    password: await hashString(userDetails.password),
    avatar: result && result.secure_url,
  });
  try {
    return await user.save();
  } catch (error: any) {
    console.log("user.services.ts", error);

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
