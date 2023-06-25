import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_ACCOUNT,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export async function sendMail(email: string, question: string) {
  const mailOptions = {
    from: email,
    to: process.env.GMAIL_ACCOUNT,
    subject: "New contact form submission",
    text: `From: ${email}\n\nQuestion: ${question}`,
  };

  return transporter.sendMail(mailOptions);
}
