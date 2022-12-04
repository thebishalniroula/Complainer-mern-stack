const mongoose = require("mongoose");
const hash = require("../utils/hash");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["admin", "student", "guardian"],
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  let user = this;
  if (!user.isModified) return next();
  user.password = await hash.generate(user.password);
  next();
});

userSchema.methods.comparePassword = hash.compare;

userSchema.methods.createToken = async (user) => {
  const token = await jwt.sign(
    { _id: user._id, username: user.username, role: user.role },
    process.env.JWTPRIVATEKEY
  );
  return await token;
};
module.exports = mongoose.model("user", userSchema);
