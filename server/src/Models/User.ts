import mongoose, { Types } from "mongoose";

export interface UserType {
  name: string;
  username: string;
  email: string;
  password: string;
  avatar?: string;
  complains?: Types.ObjectId[];
  role: "organization" | "user";
}

const userSchema = new mongoose.Schema<UserType>({
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

export default mongoose.model<UserType>("user", userSchema);
