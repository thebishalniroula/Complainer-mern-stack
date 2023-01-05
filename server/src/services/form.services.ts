import Form, { IForm } from "../Models/Form";

export const storeFormToDb = async (form: IForm) => {
  const newForm = new Form(form);
  console.log(form);

  try {
    return await newForm.save();
  } catch (error) {
    console.log("form.services.ts", error);
    return null;
  }
};
