import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

let transporter: nodemailer.Transporter;

const getTransporter = async () => {
    if (transporter) return transporter;

    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (user && pass) {
        // Use real credentials from .env
        transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: false,
            auth: { user, pass },
        });
    } else {
        // Generate a temporary Ethereal test account automatically
        console.log("No SMTP credentials found in .env. Generating a temporary test account...");
        const testAccount = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });
        console.log(`[TEST EMAIL] Account generated: ${testAccount.user}`);
    }
    return transporter;
};

export const sendOtpEmail = async (email: string, otp: string) => {
    try {
        const transport = await getTransporter();
        const info = await transport.sendMail({
            from: `"Dispatchly" <${process.env.SMTP_USER || 'no-reply@dispatchly.com'}>`,
            to: email,
            subject: "Your Dispatchly Login OTP",
            text: `Your OTP for login is: ${otp}. It will expire in 10 minutes.`,
            html: `<div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
              <h2 style="color: #333;">Welcome to Dispatchly</h2>
              <p>Your verification code is:</p>
              <h1 style="color: #4A90E2; letter-spacing: 5px;">${otp}</h1>
              <p>This code will expire in 10 minutes.</p>
              <p style="font-size: 12px; color: #777;">If you didn't request this, please ignore this email.</p>
            </div>`,
        });
        console.log(`[NODEMAILER] Email sent: ${info.messageId}`);
        // If it was an ethereal email, log the URL to view it
        const previewUrl = nodemailer.getTestMessageUrl(info);
        if (previewUrl) {
            console.log(`[NODEMAILER] Preview URL: ${previewUrl}`);
        }
    } catch (error) {
        console.error(`[NODEMAILER ERROR] Failed to send email:`, error);
    }
};
