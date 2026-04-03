import EmailService from "../../services/email.js";
import { env } from "../../config/env.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function sendPaymentConfirmationEmail(
    username: string,
    userEmail: string,
    transactionId: string,
    serviceName: string,
    amount: string,
    currency: string,
    paymentDate: string
) {
    try {
        const templatePath = path.join(__dirname, "../../templates/payment-confirmation.html");
        let htmlTemplate = fs.readFileSync(templatePath, "utf8");
        
        htmlTemplate = htmlTemplate.replace(/{{transactionId}}/g, transactionId);
        htmlTemplate = htmlTemplate.replace(/{{serviceName}}/g, serviceName);
        htmlTemplate = htmlTemplate.replace(/{{amount}}/g, amount);
        htmlTemplate = htmlTemplate.replace(/{{currency}}/g, currency);
        htmlTemplate = htmlTemplate.replace(/{{paymentDate}}/g, paymentDate);
        
        const emailService = new EmailService(env.email.user, env.email.pass);
        
        await emailService.sendEmail(
            userEmail,
            "Payment Confirmation - PathPoint AI 💳",
            htmlTemplate
        );
        
        console.log(`Payment confirmation email sent to ${userEmail}`);
    } catch (error) {
        console.error("Error sending payment confirmation email:", error);
    }
}

export async function sendHRReservationEmail(
    username: string,
    userEmail: string,
    mentorName: string,
    sessionDate: string,
    sessionTime: string
) {
    try {
        const templatePath = path.join(__dirname, "../../templates/hr-reservation.html");
        let htmlTemplate = fs.readFileSync(templatePath, "utf8");
        
        htmlTemplate = htmlTemplate.replace(/{{username}}/g, username);
        htmlTemplate = htmlTemplate.replace(/{{mentorName}}/g, mentorName);
        htmlTemplate = htmlTemplate.replace(/{{sessionDate}}/g, sessionDate);
        htmlTemplate = htmlTemplate.replace(/{{sessionTime}}/g, sessionTime);
        
        const emailService = new EmailService(env.email.user, env.email.pass);
        
        await emailService.sendEmail(
            userEmail,
            "Session Confirmed - PathPoint AI 📅",
            htmlTemplate
        );
        
        console.log(`HR reservation email sent to ${userEmail}`);
    } catch (error) {
        console.error("Error sending HR reservation email:", error);
    }
}
