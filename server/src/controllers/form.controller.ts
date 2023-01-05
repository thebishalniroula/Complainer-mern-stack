import { Request, Response } from "express";
import { storeFormToDb } from "../services/form.services";
import { UserType } from "../Models/User";
import { ObjectIdType } from "../Models/Form";
export const createForm = async (
  req: Request & {
    user: UserType & { _id: ObjectIdType };
  },
  res: Response
) => {
  const { title, fields } = req.body;
  console.log(req.body.fields);
  try {
    await storeFormToDb({ title, fields, belongsTo: req.user._id });
    res.send("successfull");
  } catch (error) {
    console.log("form.controller.ts", error);
    res.send("unsuccessfull");
  }
};
