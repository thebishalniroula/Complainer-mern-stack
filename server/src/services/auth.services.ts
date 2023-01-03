import RefreshToken from "../Models/RefreshToken";

export const storeRefreshToken = async (refreshToken: string) => {
  const token = new RefreshToken({ refreshToken });
  try {
    return await token.save();
  } catch (error) {
    return null;
  }
};
export const findRefreshToken = async (refreshToken: string) => {
  try {
    const token = await RefreshToken.findOne({ refreshToken });
    return token;
  } catch (error) {
    return null;
  }
};
