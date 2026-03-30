import mongoose from "mongoose";

// Common interfaces for both User and HR profiles
export interface IExperience {
    title: string;
    company: string;
    location?: string;
    from: Date;
    to?: Date;
    current: boolean;
    description?: string;
}

export interface IEducation {
    school: string;
    degree: string;
    fieldOfStudy: string;
    from: Date;
    to?: Date;
    current: boolean;
    description?: string;
}

export interface ISocial {
    youtube?: string;
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    instagram?: string;
    github?: string;
    website?: string;
}

export interface IFileUpload {
    url: string;
    publicId: string;
}

// Base Profile Interface
export interface IBaseProfile {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    bio?: string;
    location?: string;
    social: ISocial;
    avatar?: IFileUpload;
    jobTitles?: string[];
    createdAt: Date;
    updatedAt: Date;
}

// User Profile (Job Seeker) - Simple profile
export interface IUserProfile extends IBaseProfile {
    profileType: "user";
    status?: string;
}

// HR Profile (Recruiter) - has Company data and Rating
export interface IHRProfile extends IBaseProfile {
    profileType: "hr";
    companyName: string;
    companyWebsite?: string;
    companySize?: string;
    industry?: string;
    companyDescription?: string;
    averageRating: number;
    totalRatings: number;
    resume?: IFileUpload;
    experience?: IExperience[];
    education?: IEducation[];
}

export type IProfile = IUserProfile | IHRProfile;

export type ProfileType = "user" | "hr";

// Update inputs
export interface UpdateUserProfileInput {
    bio?: string;
    social?: ISocial;
    location?: string;
    status?: string;
    avatar?: IFileUpload;
    jobTitles?: string[];
}

export interface UpdateHRProfileInput {
    bio?: string;
    companyName?: string;
    companyWebsite?: string;
    companySize?: string;
    industry?: string;
    companyDescription?: string;
    social?: ISocial;
    location?: string;
    avatar?: IFileUpload;
    jobTitles?: string[];
    resume?: IFileUpload;
    experience?: IExperience[];
    education?: IEducation[];
}
