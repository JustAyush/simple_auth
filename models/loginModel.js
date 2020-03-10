// Imports
const moment = require("moment");
const randtoken = require("rand-token");

// Local imports
const knex = require("../db/db");

const login = async (email) => {
  let user,
    userFound = false,
    emailVerified = false,
    resendEmail = false,
    resendToken = "";

  // check if the user with the provided email exists
  // if exists get the user (both email and password) by email
  await knex("users")
    .where({
      email: email
    })
    .then(async result => {
      if (result.length == 0) userFound = false;
      // set the flag to false if not found
      else {
        userFound = true;
        // if the user has verified the email
        if (result[0].emailVerified) {
          emailVerified = true;
          user = result[0]; // the query results in array
          resendEmail = false;
        } else {
          // in case not verified the mail (resend if token has expired)
          emailVerified = false;

          const signUpDate = moment(result[0].created_at);
          const now = moment(new Date()); //todays date
          const difference = moment.duration(now.diff(signUpDate)).asDays(); // difference in days

          // token expiry period : 1 day
          if (difference > 1) {
            // flag to resend the verification email
            resendEmail = true;

            // update the database with new token and timestamp
            resendToken = randtoken.generate(16); // generate new token
            await knex("users") // update the database
              .where({ id: result[0].id })
              .update({
                tmpCode: resendToken,
                created_at: moment().format("YYYY-MM-DD HH:mm:ss")
              })
              .then(() => console.log("Updated"));
          } else {
            resendEmail = false;
          }
        }
      }
    })
    .catch(err => {
      console.log(
        "Error while trying to find user with provided email: loginModel",
        err
      );
    });

  return { userFound, user, emailVerified, resendEmail, resendToken };
};

module.exports = {
  login
};
