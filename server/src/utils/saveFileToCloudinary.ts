import { UploadedFile } from "express-fileupload";
import cloudinary, {
  UploadApiErrorResponse,
  UploadApiResponse,
} from "cloudinary";

export default async (avatar: UploadedFile): Promise<UploadApiResponse> => {
  return await cloudinary.v2.uploader.upload(
    avatar.tempFilePath,
    { public_id: "default_name" },
    (err?: UploadApiErrorResponse, result?: UploadApiResponse) => {
      if (err) {
        return err;
      }
      return result;
    }
  );
};
