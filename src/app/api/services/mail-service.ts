import { createTransport, SendMailOptions } from "nodemailer";

interface MailService {
  sendMail: (from: string, text: string, subject: string) => Promise<void>;
}

const mail: MailService = {
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

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_ACCOUNT,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export type { MailService };

export { mail };
