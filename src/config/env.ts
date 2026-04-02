import Joi from "joi";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, "../../.env") });

const envSchema = Joi.object({
    // App
    PORT: Joi.number()
    .default(3000) ,
    NODE_ENV: Joi.string()
    .valid("development","production","test")
    .default("development") ,
    

    // Database
    MONGO_URI: Joi.string().required()
    .messages({"any.required": "Mongo url is required"}),

    // Client
    CLIENT_URL: Joi.string().required()
    .messages({"any.required":"Client url is required"}),

    // Google OAuth
    GOOGLE_CLIENT_ID: Joi.string().required()
    .messages({"any.required":"Google client id is required"}),
    GOOGLE_CLIENT_SECRET: Joi.string().required()
    .messages({"any.required":"Google client secret is required"}),
    GOOGLE_CALLBACK_URL: Joi.string().required()
    .messages({"any.required":"Google callback url is required"}),
    
    // Facebook OAuth
    FACEBOOK_CLIENT_ID: Joi.string().required()
    .messages({"any.required":"Facebook client id is required"}),
    FACEBOOK_CLIENT_SECRET: Joi.string().required()
    .messages({"any.required":"Facebook client secret is required"}),
    FACEBOOK_CALLBACK_URL: Joi.string().required()
    .messages({"any.required":"Facebook callback url is required"}),

    // JWT
    JWT_SECRET: Joi.string().required()
    .messages({"any.required":"JWT secret is required"}),
    REFRESH_TOKEN_SECRET: Joi.string().required()
    .messages({"any.required":"Refresh token secret is required"}),
    
    // Email
    EMAIL_USER: Joi.string().required()
    .messages({"any.required":"Email user is required"}),
    EMAIL_PASSWORD: Joi.string().required()
    .messages({"any.required":"Email pass is required"}),

    // Bcrypt
    BCRYPT_SALT_ROUNDS: Joi.number().required()
    .messages({"any.required":"Bcrypt salt rounds is required"}),

    // Cloudinary
    CLOUDINARY_CLOUD_NAME: Joi.string().required()
    .messages({"any.required":"Cloudinary cloud name is required"}),
    CLOUDINARY_API_KEY: Joi.string().required()
    .messages({"any.required":"Cloudinary API key is required"}),
    CLOUDINARY_API_SECRET: Joi.string().required()
    .messages({"any.required":"Cloudinary API secret is required"}),

    // Payment
    PAYMOB_API_KEY: Joi.string().required()
    .messages({"any.required":"Paymob API key is required"}),
    PAYMOB_SECERT_KEY: Joi.string().required()
    .messages({"any.required":"Paymob secert key is required"}),
    PAYMOB_PUBLIC_KEY: Joi.string().required()
    .messages({"any.required":"Paymob public key is required"}),
    PAYMOB_URL: Joi.string().required()
    .messages({"any.required":"Paymob url is required"}),
    INTEGRATION_ID: Joi.string().required()
    .messages({"any.required":"Integration id is required"}),
    IFRAME_ID: Joi.string().required()
    .messages({"any.required":"Iframe id is required"}),
    PAYMOB_HMAC: Joi.string().required()
    .messages({"any.required":"Paymob HMAC is required"}),
}).unknown(true)


let {error , value} = envSchema.validate(process.env)


// Stop the app if any required env var is missing
if (error) {
     console.error("❌ Invalid environment variables:", error.message);
     process.exit(1);
}


export const env = {
    app:{
        port: value.PORT,
        nodeEnv: value.NODE_ENV
    },
    db:{
        mongoUrl:value.MONGO_URI
    },
    client: {
        url:value.CLIENT_URL
    },
    Oauth:{
        google:{
            clientId:value.GOOGLE_CLIENT_ID,
            clientSecret:value.GOOGLE_CLIENT_SECRET,
            callbackUrl:value.GOOGLE_CALLBACK_URL
        },
        facebook:{
            clientId:value.FACEBOOK_CLIENT_ID,
            clientSecret:value.FACEBOOK_CLIENT_SECRET,
            callbackUrl:value.FACEBOOK_CALLBACK_URL
        }
    },
    jwt:{
        secret:value.JWT_SECRET,
        refreshTokenSecret:value.REFRESH_TOKEN_SECRET
    },
    email:{
        user:value.EMAIL_USER,
        pass:value.EMAIL_PASSWORD
    },
    bcrypt:{
        saltRounds:value.BCRYPT_SALT_ROUNDS
    },
    cloudinary:{
        cloudName:value.CLOUDINARY_CLOUD_NAME,
        apiKey:value.CLOUDINARY_API_KEY,
        apiSecret:value.CLOUDINARY_API_SECRET
    },
    payment:{
        paymobApiKey:value.PAYMOB_API_KEY,
        paymobSecertKey:value.PAYMOB_SECERT_KEY,
        paymobPublicKey:value.PAYMOB_PUBLIC_KEY,
        paymobUrl:value.PAYMOB_URL,
        integrationId:value.INTEGRATION_ID,
        iframeId:value.IFRAME_ID,
        hmac:value.PAYMOB_HMAC
    }
}
