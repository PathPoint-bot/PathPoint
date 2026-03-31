import type mongoose from "mongoose";
import Resume from "./resume.model.js";
import type { CreateResumeInput, UpdateResumeInput } from "./resume.types.js";
import ApiError from "../../utils/ApiError.js";
import { deleteFromCloudinary, uploadRawToCloudinary } from "../../utils/cloudinaryUpload.js";
import ApiFeatures from "../../utils/ApiFeatures.js";
import { RESUME_ERRORS } from "../../constants/errors.js";
import { FILE_UPLOAD, UPLOAD_TIME } from "../../constants/upload.js";

export const createResume = async (
    userId: string | mongoose.Types.ObjectId,
    file: Express.Multer.File,
    title?: string
) => {
    const uploadResult = await uploadRawToCloudinary(file.buffer, FILE_UPLOAD.FOLDERS.RESUMES, file.originalname);
    
    const input: CreateResumeInput = {
        title: title || file.originalname,
        url: uploadResult.url,
        publicId: uploadResult.publicId,
        fileName: file.originalname,
        fileSize: file.size,
    };

    const resume = await Resume.create({ userId, ...input });
    return resume;
};

export const getAllResumes = async (userId: string | mongoose.Types.ObjectId, query: any) => {
    let resumeQuery = Resume.find({ userId });
    const features = new ApiFeatures(resumeQuery, query).filter().sort().limit().pagination();
    const resumes = await features.query;
    return resumes;
};

export const getResumeById = async (userId: string | mongoose.Types.ObjectId, resumeId: string) => {
    const resume = await Resume.findOne({ _id: resumeId, userId });
    if (!resume) {
        throw ApiError.notFound(RESUME_ERRORS.NOT_FOUND);
    }
    return resume;
};

export const updateResume = async (
    userId: string | mongoose.Types.ObjectId,
    resumeId: string,
    input: UpdateResumeInput,
    file?: Express.Multer.File
) => {
    const existingResume = await Resume.findOne({ _id: resumeId, userId });
    if (!existingResume) {
        throw ApiError.notFound(RESUME_ERRORS.NOT_FOUND);
    }

    const updateData: any = { ...input };

    // If new CV uploaded, upload to Cloudinary and delete old file
    if (file) {
        const uploadResult = await uploadRawToCloudinary(file.buffer, FILE_UPLOAD.FOLDERS.RESUMES, file.originalname);
        updateData.url = uploadResult.url;
        updateData.publicId = uploadResult.publicId;
        updateData.fileName = file.originalname;
        updateData.fileSize = file.size;

        // Delete old file from Cloudinary (raw resource type for PDFs)
        if (existingResume.publicId) {
            await deleteFromCloudinary(existingResume.publicId, FILE_UPLOAD.RESOURCE_TYPES.RAW);
        }
    }

    const updatedResume = await Resume.findOneAndUpdate(
        { _id: resumeId, userId },
        updateData,
        { new: true, runValidators: true }
    );
    return updatedResume;
};

export const deleteResume = async (userId: string | mongoose.Types.ObjectId, resumeId: string) => {
    const resume = await Resume.findOne({ _id: resumeId, userId });
    if (!resume) {
        throw ApiError.notFound(RESUME_ERRORS.NOT_FOUND);
    }

    await deleteFromCloudinary(resume.publicId, FILE_UPLOAD.RESOURCE_TYPES.RAW);
    await Resume.deleteOne({ _id: resumeId });

    return { message: "Resume deleted successfully" };
};

export const countUserResumes = async (userId: string | mongoose.Types.ObjectId, options?: { last24Hours?: boolean }) => {
    const filter: any = { userId };
    
    if (options?.last24Hours) {
        const twentyFourHoursAgo = new Date(Date.now() - UPLOAD_TIME.LAST_24_HOURS);
        filter.createdAt = { $gte: twentyFourHoursAgo };
    }
    
    const count = await Resume.countDocuments(filter);
    return count;
};
