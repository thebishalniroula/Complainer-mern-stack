import mongoose from "mongoose";

export type ObjectIdType = typeof mongoose.Schema.Types.ObjectId;
interface IFormField {
  name: string;
  tag: "input" | "textarea";
  placeholder: string;
}
export interface IForm {
  title: string;
  belongsTo: ObjectIdType;
  fields: IFormField[];
}
const formSchema = new mongoose.Schema<IForm>({
  title: {
    type: String,
    required: true,
  },
  belongsTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  fields: [
    {
      name: { type: String, required: true },
      tag: { type: String, enum: ["input", "textarea"], required: true },
      placeholder: {
        type: String,
      },
    },
  ],
});

export default mongoose.model<IForm>("Form", formSchema);
