import { UploadedFile } from "express-fileupload";
import cloudinary, {
  UploadApiErrorResponse,
  UploadApiResponse,
} from "cloudinary";

export default async (
  avatar: UploadedFile,
  username: string
): Promise<UploadApiResponse> => {
  return await cloudinary.v2.uploader.upload(
    avatar.tempFilePath,
    { public_id: username },
    (err?: UploadApiErrorResponse, result?: UploadApiResponse) => {
      if (err) {
        return err;
      }
      return result;
    }
  );
};
