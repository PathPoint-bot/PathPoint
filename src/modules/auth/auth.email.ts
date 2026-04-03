import EmailService from "../../services/email.js";
import { env } from "../../config/env.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function sendWelcomeEmail(username: string, userEmail: string) {
    try {
        // Read HTML template
        const templatePath = path.join(__dirname, "../../templates/welcome.html");
        let htmlTemplate = fs.readFileSync(templatePath, "utf8");
        
        // Replace placeholders
        htmlTemplate = htmlTemplate.replace("{{username}}", username);
        
        // Initialize email service
        const emailService = new EmailService(env.email.user, env.email.pass);
        
        // Send welcome email
        await emailService.sendEmail(
            userEmail,
            "Welcome to PathPoint AI! 🚀",
            htmlTemplate
        );
        
        console.log(`Welcome email sent to ${userEmail}`);
    } catch (error) {
        console.error("Error sending welcome email:", error);
        // Don't throw error to prevent blocking user registration
    }
}


async function sendResetPasswordEmail(username: string, userEmail: string, verificationCode: string) {
    try {
        // Read HTML template
        const templatePath = path.join(__dirname, "../../templates/reset-password.html");
        let htmlTemplate = fs.readFileSync(templatePath, "utf8");
        
        // Replace placeholders
        htmlTemplate = htmlTemplate.replace("{{username}}", username);
        htmlTemplate = htmlTemplate.replace("{{verificationCode}}", verificationCode);
        
        // Initialize email service
        console.log(env.email.user)
        console.log(env.email.pass)
        const emailService = new EmailService(env.email.user, env.email.pass);
        
        // Send reset password email
        await emailService.sendEmail(
            userEmail,
            "كود استعادة كلمة المرور - PathPoint 🔐",
            htmlTemplate
        );
        
        console.log(`Reset password email sent to ${userEmail}`);
    } catch (error) {
        console.error("Error sending reset password email:");
        // Don't throw error to prevent blocking the flow
    }
}

export { sendWelcomeEmail, sendResetPasswordEmail };


