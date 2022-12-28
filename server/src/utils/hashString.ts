import bcrypt from "bcryptjs";

export const hashString = async (plainString: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(plainString, salt);
};
export const compareHash = async (
  plainString: string,
  hashString: string
): Promise<boolean> => {
  return await bcrypt.compare(plainString, hashString);
};
