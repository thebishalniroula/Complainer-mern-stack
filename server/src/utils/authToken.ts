import jwt from "jsonwebtoken";
export type ParamType = {
  username: string;
  role: string;
};
export const generateAccessToken = (param: ParamType) => {
  return jwt.sign(param, process.env.JWT_AT_SECRET as string);
};
export const generateRefreshToken = (param: ParamType) => {
  return jwt.sign(param, process.env.JWT_RT_SECRET as string);
};
export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_AT_SECRET as string);
  } catch (error) {
    return null;
  }
};
export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_RT_SECRET as string);
  } catch (error) {
    return null;
  }
};
