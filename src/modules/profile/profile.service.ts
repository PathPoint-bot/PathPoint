import Profile from "./profile.model.js";
import ApiError from "../../utils/ApiError.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../../utils/cloudinaryUpload.js";
import type { Request } from "express";
import type mongoose from "mongoose";
import type { ProfileType, UpdateUserProfileInput, UpdateHRProfileInput } from "./profile.types.js";
import { mapProfileResponse } from "./profile.mapper.js";

export const checkProfile = async (userId: string | mongoose.Types.ObjectId) => {
    const profile = await Profile.findOne({ userId });
    return profile;
}

const deleteOldAvatar = async (existingProfile: any): Promise<void> => {
    if (existingProfile?.avatar?.publicId) {
        await deleteFromCloudinary(existingProfile.avatar.publicId);
    }
};

const deleteOldResume = async (existingProfile: any): Promise<void> => {
    if (existingProfile?.resume?.publicId) {
        await deleteFromCloudinary(existingProfile.resume.publicId);
    }
};

export const getProfileByUserId = async (userId: string, currentUserId?: string | mongoose.Types.ObjectId) => {
    const profile = await Profile.findOne({ userId }).populate("userId", "name email role");
    if (!profile) {
        throw ApiError.notFound("Profile not found");
    }
    const mappedProfile = mapProfileResponse(profile);
    const isOwner = currentUserId ? profile.userId._id.toString() === currentUserId.toString() : false;

    return {
        ...mappedProfile,
        isOwner,
    };
}

export const createProfile = async (
    userId: string | mongoose.Types.ObjectId,
    profileType: ProfileType,
) => {
    const existingProfile = await checkProfile(userId);
    if (existingProfile) {
        throw ApiError.conflict("Profile already exists");
    }

    const profile = await Profile.create({
        userId,
        profileType
    });
}

export const updateUserProfile = async (
    userId: string | mongoose.Types.ObjectId,
    updateData: UpdateUserProfileInput,
    avatarFile?: Express.Multer.File
) => {
    const existingProfile = await checkProfile(userId);
    if (!existingProfile) {
        throw ApiError.notFound("Profile not found");
    }

    if (existingProfile.profileType !== "user") {
        throw ApiError.badRequest("This is not a user profile");
    }

    // Delete old avatar if exists, then upload new one
    if (avatarFile) {
        await deleteOldAvatar(existingProfile);
        const uploadResult = await uploadToCloudinary(avatarFile.buffer, "profiles/avatars");
        updateData.avatar = {
            url: uploadResult.url,
            publicId: uploadResult.publicId,
        };
    }

    const profile = await Profile.findOneAndUpdate(
        { userId },
        { $set: updateData },
        { new: true, runValidators: true }
    ).populate("userId", "name email role");
    if (!profile) {
        throw ApiError.serverError("Failed to update profile");
    }
    return mapProfileResponse(profile);
}

export const updateHRProfile = async (
    userId: string | mongoose.Types.ObjectId,
    updateData: UpdateHRProfileInput,
    avatarFile?: Express.Multer.File,
    resumeFile?: Express.Multer.File
) => {
    const existingProfile = await checkProfile(userId);
    if (!existingProfile) {
        throw ApiError.notFound("Profile not found");
    }

    if (existingProfile.profileType !== "hr") {
        throw ApiError.badRequest("This is not an HR profile");
    }

    // Delete old avatar if exists, then upload new one
    if (avatarFile) {
        await deleteOldAvatar(existingProfile);
        const uploadResult = await uploadToCloudinary(avatarFile.buffer, "profiles/avatars");
        updateData.avatar = {
            url: uploadResult.url,
            publicId: uploadResult.publicId,
        };
    }

    // Delete old resume if exists, then upload new one (HR only)
    if (resumeFile) {
        await deleteOldResume(existingProfile);
        const uploadResult = await uploadToCloudinary(resumeFile.buffer, "profiles/resumes");
        updateData.resume = {
            url: uploadResult.url,
            publicId: uploadResult.publicId,
        };
    }

    const profile = await Profile.findOneAndUpdate(
        { userId },
        { $set: updateData },
        { new: true, runValidators: true }
    ).populate("userId", "name email role");

    return mapProfileResponse(profile);
}



export const updateProfileHR = async (userId: string | mongoose.Types.ObjectId) => {
    const existingProfile = await checkProfile(userId);
    if (!existingProfile) {
        throw ApiError.notFound("Profile not found");
    }

    if (existingProfile.profileType !== "user") {
        throw ApiError.badRequest("This is not a user profile");
    }

    const profile = await Profile.findOneAndUpdate(
        { userId },
        { $set: { profileType: "hr" } },
        { new: true, runValidators: true }
    )

    if (!profile) {
        throw ApiError.serverError("Failed to update profile type");
    }
}


export const updateProfileRating = async (userId: string | mongoose.Types.ObjectId, action: "add" | "remove" | "update" , ratingNumber : number , oldRatingNumber?: number) => {
    let profile = await Profile.findOne({ userId });
    if (!profile) {
        throw ApiError.notFound("Profile not found");
    }
    if (profile.profileType !== "hr") {
        throw ApiError.badRequest("This is not an HR profile");
    }
    if (profile.totalRatings <= 0 && action === "remove") {
        throw ApiError.badRequest("Rating cannot be negative");
    }
    const previousTotalRatings = profile.totalRatings;
    const previousAverageRating = profile.averageRating;
    let averageRating;
    if (action === "add") {
        profile.totalRatings = previousTotalRatings + 1;
        averageRating = (previousAverageRating * previousTotalRatings  + ratingNumber) / profile.totalRatings;
    } else if (action === "remove") {
        profile.totalRatings = previousTotalRatings - 1;
        averageRating = profile.totalRatings > 0 ? (previousAverageRating * previousTotalRatings - ratingNumber) / profile.totalRatings : 0;
    } else {
        averageRating = (previousAverageRating * previousTotalRatings   + ratingNumber - (oldRatingNumber || 0)) / previousTotalRatings;
    }
    profile.averageRating = averageRating;
    await profile.save();
    return {
        averageRating: profile.averageRating,
        totalRatings: profile.totalRatings,
    };
};
















