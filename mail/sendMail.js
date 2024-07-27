const nodemailer = require("nodemailer");
require('dotenv').config()

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    // secure:true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAILPASS
    }
});

const main =async (otp,email,type) => {

    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: `${email}`, 
      subject: `One time otp for ${type} `, 
      text: `Your one time otp:${otp}`,
    });
    return info.messageId
  }

module.exports = main