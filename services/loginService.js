// Imports
const nodemailer = require("nodemailer");

// Local imports
const { sendEmail } = require("../utils");
const { loginModel } = require("../models");

const login = async (email, password) => {
  let checkPassword = false,
    emailResent = false,
    userExists = false,
    userWithEmail;

  try {
    const {
      userFound,
      user,
      emailVerified,
      resendEmail,
      resendToken
    } = await loginModel.login(email);

    if (userFound) {
      // if the email exists
      userExists = true;
      userWithEmail = user;

      if (emailVerified) {
        // if the email(user) exists and the user has verified the email
        checkPassword = true; // to check if the password matches
        userExists = true;
      } else {
        // if the user exists but has not verified the email
        checkPassword = false;

        if (resendEmail) {
          emailResent = true;
          // resend the email with new token if the token has expired
          const subject = "Email verification mail";
          const body = `<b>Please click on the link to verify.</b> <br/> http://localhost:3000/api/verify/${resendToken} <br /><br/> <i>This token will expire after one day.</i>`;
          sendEmail
            .sendEmail(email, subject, body)
            .catch(
              "Error while sending email for password reset",
              console.error
            );

        } else {
          emailResent = false;
        }
      }
    } else {
      // if the email doesn't exist
      userExists = false;
    }
  } catch (e) {
    throw new Error(e.message);
  }

  return { userExists, checkPassword, userWithEmail, emailResent };
};

module.exports = {
  login
};
