import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: "home/avatars",
    allowed_formats: ["jpg", "jpeg", "png"],
  }),
});

export const upload = multer({ storage });
