// Imports
const bcrypt = require("bcryptjs");

// Local imports
const { registerModel } = require("../models");
const { sendEmail } = require("../utils");

const register = async (email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { emailExist, token, userId } = await registerModel.register(
      email,
      hashedPassword
    );

    if (!emailExist) {
      const subject = "Email verification mail";
      const body = `<b>Please click on the link to verify.</b> <br/> http://localhost:3000/api/verify/${userId}/${token} <br /><br/> <i>This token will expire after one day.</i>`;

      // send the verification email
      sendEmail
        .sendEmail(email, subject, body)
        .catch("Error while sending email for password reset", console.error);
    }

    return emailExist;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  register
};
