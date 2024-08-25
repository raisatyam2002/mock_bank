import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // Use Gmail's service
  auth: {
    user: "", // Your Gmail address
    pass: "", // Your App Password (or Gmail password if less secure apps are enabled)
  },
});
export const sendEmail = async (email: string, Otp: string) => {
  try {
    console.log(process.env.email);
    console.log(process.env.password);

    const info = await transporter.sendMail({
      from: '"Your Name" <your-email@gmail.com>', // Sender address
      to: email, // List of receivers
      subject: "Hdfc Bank OTP", // Subject line
      text: "Hdfc Bank OTP", // Plain text body
      html: `<b>${Otp}</b>`, // HTML body
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
