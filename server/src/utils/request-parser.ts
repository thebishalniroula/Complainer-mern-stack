import { Request } from "express";
import formidable, { Fields, Files } from "formidable";
const form = formidable();

export const parseReq = (
  req: Request
): Promise<{
  fields: Fields;
  files: Files;
}> => {
  return new Promise((resolve, reject) => {
    form.parse(req, (err: Error, fields: Fields, files: Files) => {
      if (err) {
        reject(err);
        return;
      }
      return resolve({ fields, files });
    });
  });
};
