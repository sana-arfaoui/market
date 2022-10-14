const nodemailer = require("nodemailer");

module.exports.sendMail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.TRANSPORTER_HOST,
      service: process.env.SERVICE,
      post: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.TRANSPORTER_MAIL,
        pass: process.env.PASS,
      },
    });
   
  
    const test = await transporter.sendMail({
      from: process.env.TRANSPORTER_MAIL,
      to: email,
      subject: subject,
      text: text,
    });
    console.log(test);
    console.log("Email sent Successfully");
  } catch (err) {
    console.log("Email not sent");
    console.log(err);
  }
};
