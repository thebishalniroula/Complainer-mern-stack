import Joi from "joi";
import { UserType } from "../../Models/User";

type NewUserType = Omit<UserType, "avatar"> & { repeat_password: string };

type ExistingUserType = {
  usernameOrEmail: string;
  password: string;
};

const newUserSchema = Joi.object<NewUserType>({
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
  complains: Joi.array().items(Joi.string()),
});

const existingUserSchema = Joi.object<ExistingUserType>({
  usernameOrEmail: Joi.string().min(3).max(30).required(),
  password: Joi.string()
    .min(5)
    .max(64)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
});

export const validateNewUser = (
  user: NewUserType
): Joi.ValidationResult<NewUserType> => {
  return newUserSchema.validate(user);
};
export const validateExistingUser = (
  user: ExistingUserType
): Joi.ValidationResult<ExistingUserType> => {
  return existingUserSchema.validate(user);
};
