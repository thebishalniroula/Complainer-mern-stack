import bcrypt from "bcryptjs";

export const hashString = async (plainString: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(plainString, salt);
};
