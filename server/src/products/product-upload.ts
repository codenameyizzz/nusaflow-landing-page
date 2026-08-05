import { BadRequestException } from "@nestjs/common";
import { diskStorage } from "multer";
import { randomUUID } from "node:crypto";
import { extname, join } from "node:path";
import { mkdirSync } from "node:fs";

export const uploadRoot = join(process.cwd(), "uploads");
export const productUploadDir = join(uploadRoot, "products");

mkdirSync(productUploadDir, { recursive: true });

const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export const productImageUploadOptions = {
  storage: diskStorage({
    destination: productUploadDir,
    filename: (_request, file, callback) => {
      const extension = extname(file.originalname).toLowerCase();
      const safeName = `${Date.now()}-${randomUUID()}${extension}`;
      callback(null, safeName);
    },
  }),
  limits: {
    files: 6,
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (
    _request: Express.Request,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    if (!allowedImageTypes.has(file.mimetype)) {
      callback(new BadRequestException("Only jpg, png, webp, and gif images are allowed"), false);
      return;
    }

    callback(null, true);
  },
};
