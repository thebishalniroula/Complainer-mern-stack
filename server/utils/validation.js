const Joi = require("joi");
function validateNewUser(user) {
  const newUserSchema = Joi.object({
    role: Joi.string().valid("admin", "student", "guardian"),
    username: Joi.string().min(3).max(24).required(),
    password: Joi.string().min(5).max(50).required(),
    email: Joi.string().email().required(),
  });
  return newUserSchema.validate(user);
}
function validateExistingUser(user) {
  const newUserSchema = Joi.object({
    username: Joi.string().min(3).max(24).required(),
    password: Joi.string().min(5).max(50).required(),
  });
  return newUserSchema.validate(user);
}
module.exports.validateNewUser = validateNewUser;
module.exports.validateExistingUser = validateExistingUser;
