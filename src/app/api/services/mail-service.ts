import { createTransport, SendMailOptions } from "nodemailer";

export interface MailService {
  sendMail: (from: string, text: string, subject: string) => Promise<void>;
}

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_ACCOUNT,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export const mail: MailService = {
  sendMail: async (from, text, subject) => {
    const mailOptions: SendMailOptions = {
      to: process.env.GMAIL_ACCOUNT,
      from,
      subject,
      text,
    };

    transporter.sendMail(mailOptions);
  },
};
