import nodemailer from "nodemailer";

export const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
    pass: process.env.NODE_CODE_SENDING_EMAIL_PASSWORD,
  },
});

transport.verify((err) => {
  if (err) console.error("SMTP ERROR:", err);
  else console.log("SMTP ready!");
});
