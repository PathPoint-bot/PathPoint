import cloudinary from "../config/cloudinary.js";
import type { UploadApiResponse } from "cloudinary";

export interface UploadResult {
    url: string;
    publicId: string;
}

export const uploadToCloudinary = async (
    fileBuffer: Buffer,
    folder: string
): Promise<UploadResult> => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: "auto",
            },
            (error, result) => {
                if (error || !result) {
                    return reject(error || new Error("Upload failed"));
                }
                resolve({
                    url: result.secure_url,
                    publicId: result.public_id,
                });
            }
        );
        uploadStream.end(fileBuffer);
    });
};

export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
    if (!publicId) return;
    await cloudinary.uploader.destroy(publicId);
};
