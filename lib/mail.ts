import nodemailer from "nodemailer";

export async function sendOTPEmail(email: string, otp: string) {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER!,
            pass: process.env.EMAIL_PASS!,
        },
    });

    await transporter.sendMail({
        to: email,
        subject: "Your verification code",
        html: `<p>Your verification code is: <strong>${otp}</strong>. It will expire in 10 minutes.</p>`,
    });
}
