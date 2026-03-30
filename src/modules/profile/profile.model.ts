import mongoose, { Schema } from "mongoose";
import type { IProfile, ISocial, IExperience, IEducation } from "./profile.types.js";

const socialSchema = new Schema<ISocial>({
    youtube: { type: String },
    twitter: { type: String },
    facebook: { type: String },
    linkedin: { type: String },
    instagram: { type: String },
    github: { type: String },
    website: { type: String },
}, { _id: false });

const experienceSchema = new Schema<IExperience>({
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String },
    from: { type: Date, required: true },
    to: { type: Date },
    current: { type: Boolean, default: false },
    description: { type: String },
}, { _id: false });

const educationSchema = new Schema<IEducation>({
    school: { type: String, required: true },
    degree: { type: String, required: true },
    fieldOfStudy: { type: String, required: true },
    from: { type: Date, required: true },
    to: { type: Date },
    current: { type: Boolean, default: false },
    description: { type: String },
}, { _id: false });

const profileSchema = new Schema<IProfile>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    profileType: {
        type: String,
        enum: ["user", "hr"],
        required: true,
    },
    bio: {
        type: String,
        maxlength: 500,
    },
    location: {
        type: String,
    },
    social: {
        type: socialSchema,
        default: {},
    },
    avatar: {
        url: { type: String },
        publicId: { type: String },
    },
    status: {
        type: String,
    },
    jobTitles: {
        type: [String],
        default: [],
    },
    // HR-specific fields (Company data + Rating)
    companyName: {
        type: String,
    },
    companyWebsite: {
        type: String,
    },
    companySize: {
        type: String,
    },
    industry: {
        type: String,
    },
    companyDescription: {
        type: String,
    },
    averageRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    totalRatings: {
        type: Number,
        default: 0,
    },
    resume: {
        url: { type: String },
        publicId: { type: String },
    },
    experience: {
        type: [experienceSchema],
        default: [],
    },
    education: {
        type: [educationSchema],
        default: [],
    },
}, {
    timestamps: true,
});

const Profile = mongoose.model<IProfile>("Profile", profileSchema);
export default Profile;
