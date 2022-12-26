import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "",
  },
  complains: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Complain",
    },
  ],
  role: {
    type: String,
    enum: ["organization", "user"],
  },
});
export default mongoose.model("user", userSchema);
