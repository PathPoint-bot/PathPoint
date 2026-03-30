import type { IProfile } from "./profile.types.js";

export const mapProfileResponse = (profile: IProfile | null) => {
    if (!profile) return null;

    const baseResponse = {
        id: profile._id,
        userId: profile.userId,
        profileType: profile.profileType,
        bio: profile.bio,
        location: profile.location,
        social: profile.social,
        avatar: profile.avatar,
        jobTitles: profile.jobTitles,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
    };

    if (profile.profileType === "user") {
        return {
            ...baseResponse,
            status: profile.status,
        };
    } else {
        return {
            ...baseResponse,
            companyName: profile.companyName,
            companyWebsite: profile.companyWebsite,
            companySize: profile.companySize,
            industry: profile.industry,
            companyDescription: profile.companyDescription,
            averageRating: profile.averageRating,
            totalRatings: profile.totalRatings,
            resume: profile.resume,
            experience: profile.experience,
            education: profile.education,
        };
    }
};
