import nodemailer from "nodemailer";

export const sendVerificationEmail = async (toEmail: string, link: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Blood Bank" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Verify your email",
    html: `
    <div style="font-family: sans-serif; text-align: center;">
      <h3>Welcome to Blood Bank</h3>
      <p>Please verify your email by clicking the link below:</p>
      <a href="${link}" style="display: inline-block; padding: 12px 24px; background-color: #d62828; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 10px;">Verify Email</a>
      </div>
    `,
  });
};
