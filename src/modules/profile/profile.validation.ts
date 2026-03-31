import Joi from "joi";

const socialSchema = Joi.object({
    youtube: Joi.string().uri().allow(""),
    twitter: Joi.string().uri().allow(""),
    facebook: Joi.string().uri().allow(""),
    linkedin: Joi.string().uri().allow(""),
    instagram: Joi.string().uri().allow(""),
    github: Joi.string().uri().allow(""),
    website: Joi.string().uri().allow(""),
});

const experienceSchema = Joi.object({
    title: Joi.string().required(),
    company: Joi.string().required(),
    location: Joi.string().allow(""),
    from: Joi.date().required(),
    to: Joi.date(),
    current: Joi.boolean().default(false),
    description: Joi.string().allow(""),
});

const educationSchema = Joi.object({
    school: Joi.string().required(),
    degree: Joi.string().required(),
    fieldOfStudy: Joi.string().required(),
    from: Joi.date().required(),
    to: Joi.date(),
    current: Joi.boolean().default(false),
    description: Joi.string().allow(""),
});

export const updateUserProfileValidation = Joi.object({
    bio: Joi.string().max(500).allow(""),
    social: socialSchema,
    location: Joi.string().allow(""),
    status: Joi.string().allow(""),
    jobTitles: Joi.array().items(Joi.string()).max(3),
    removeAvatar: Joi.boolean(),
});

// Validation for HR Profile (company data)
export const updateHRProfileValidation = Joi.object({
    bio: Joi.string().max(500).allow(""),
    companyName: Joi.string(),
    companyWebsite: Joi.string().uri().allow(""),
    companySize: Joi.string().allow(""),
    industry: Joi.string().allow(""),
    companyDescription: Joi.string().allow(""),
    social: socialSchema,
    location: Joi.string().allow(""),
    jobTitles: Joi.array().items(Joi.string()).max(3),
    experience: Joi.array().items(experienceSchema).max(3),
    education: Joi.array().items(educationSchema).max(3),
    removeAvatar: Joi.boolean(),
    removeResume: Joi.boolean(),
});

