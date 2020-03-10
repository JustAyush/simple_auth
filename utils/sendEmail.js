// Local Imports
const nodemailer = require("nodemailer");

async function sendEmail(email, subject, body) {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "najikaikopasal@gmail.com",
        pass: "n@jik@iko1234"
      }
    });

    let info = await transporter.sendMail({
      from: '"RoomMate" <info@roommate.com>',
      to: email,
      subject: subject,
      html: body,
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }

  module.exports = {
      sendEmail
  }