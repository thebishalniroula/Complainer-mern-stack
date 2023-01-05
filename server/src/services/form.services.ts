import Form, { IForm } from "../Models/Form";
import User from "../Models/User";
export const storeFormToDbAndUpdateUser = async (form: IForm) => {
  const newForm = new Form(form);
  console.log(form);

  try {
    const savedForm = await newForm.save();
    await User.findByIdAndUpdate(form.belongsTo, { forms: savedForm._id });
  } catch (error) {
    console.log("form.services.ts", error);
    return null;
  }
};
