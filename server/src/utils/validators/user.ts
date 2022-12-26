import Joi from "joi";

export interface User {
  [key: string]: string;
}

const userSchema = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(5)
    .max(64)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
  repeat_password: Joi.any().equal(Joi.ref("password")).required(),
  role: Joi.string().valid("organization", "user").required(),
  complains: [String],
});
interface ValidationError extends Error {
  details: [
    {
      message: string;
      [key: string]: string;
    }
  ];
}
export const validateNewUser = (
  user: User
): { value: User; error: null | ValidationError } => {
  return userSchema.validate(user) as unknown as {
    value: User;
    error: null | ValidationError;
  };
};
