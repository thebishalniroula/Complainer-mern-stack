import mongoose from "mongoose";
interface IToken {
  refreshToken: string;
}
const tokenSchema = new mongoose.Schema<IToken>({
  refreshToken: {
    type: String,
    required: true,
  },
});

export default mongoose.model("RefreshToken", tokenSchema);
