import multer from "multer";
import path from "path";
import { FILE_UPLOAD } from "../constants/upload.js";

const storage = multer.memoryStorage();

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if ((FILE_UPLOAD.MIME_TYPES.ALL as readonly string[]).includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only images (jpeg, jpg, png, webp), PDF, DOC, DOCX, and TXT files are allowed"));
    }
};

// CV upload config - only PDF, DOC, DOCX files
export const cvUpload = multer({
    storage,
    limits: { fileSize: FILE_UPLOAD.LIMITS.DEFAULT },
    fileFilter: (req, file, cb) => {
        if ((FILE_UPLOAD.MIME_TYPES.CV as readonly string[]).includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only PDF, DOC, and DOCX files are allowed for CV upload"));
        }
    },
});

// Profile upload config for HR profiles - validates based on field name
export const profileUpload = multer({
    storage,
    limits: { fileSize: FILE_UPLOAD.LIMITS.DEFAULT },
    fileFilter: (req, file, cb) => {
        if (file.fieldname === FILE_UPLOAD.FIELDS.AVATAR) {
            if ((FILE_UPLOAD.MIME_TYPES.IMAGES as readonly string[]).includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(new Error("Only JPEG, PNG, JPG, and WEBP images are allowed for avatar"));
            }
        } else if (file.fieldname === FILE_UPLOAD.FIELDS.RESUME) {
            if ((FILE_UPLOAD.MIME_TYPES.CV as readonly string[]).includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(new Error("Only PDF, DOC, and DOCX files are allowed for resume"));
            }
        }
    },
});

const upload = multer({
    storage,
    limits: {
        fileSize: FILE_UPLOAD.LIMITS.DEFAULT,
    },
    fileFilter,
});

export default upload;
