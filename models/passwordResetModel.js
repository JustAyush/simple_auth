// Imports
const moment = require("moment");
const bcrypt = require("bcryptjs");

// Local imports
const knex = require("../db/db");

// for POST: resetting the password
const reset = async (userId, resetToken, newHashedPassword) => {
  let passwordResetDone = false, // flag to check if the password reset is successful
    resetTokenExpired = false; // flag to check if the reset token has expired

  // check if the user with the id and reset token is present
  await knex("users")
    .where({
      id: userId
    })
    .then(async result => {
      if (result.length > 0) {
        // if present
        if (await bcrypt.compare(resetToken, result[0].resetToken)) {
          // if the hash of the reset token taken from params matches the hashed reset token stored in the database.
          if (result[0].resetStatus) {
            // and if the resetStatus has been set to true (the user has requested the password reset)
            const user_id = result[0].id;
            const resetReqDate = moment(result[0].resetReq_at);
            const now = moment(new Date()); //todays date
            const difference = moment.duration(now.diff(resetReqDate)).asDays(); // difference in days

            // reset token expiry period : 1 day
            if (difference < 1) {
              // update the user with new password and reset the resetStatus and resetToken to default
              await knex("users")
                .where({ id: user_id })
                .update({
                  password: newHashedPassword,
                  resetStatus: false,
                  resetToken: null
                })
                .then(() => {
                  passwordResetDone = true;
                });
            } else {
              resetTokenExpired = true;
            }
          }
        }
      }
    })
    .then(() => console.log("User found with the userId and resetToken"))
    .catch(() => console.log("passwordResetModel : error"));

  return { passwordResetDone, resetTokenExpired };
};

// for GET: to check if the userId and resetToken are valid for password reset
const checkReset = async (userId, resetToken) => {
  let eligible = false, // flag to check if the user is eligible to reset the password
    resetTokenExpired = false; // flag to check if the reset token has expired

  // check if the user with the id and reset token is present
  await knex("users")
    .where({
      id: userId
    })
    .then(async result => {
      if (result.length > 0) {
        // if present
        if (await bcrypt.compare(resetToken, result[0].resetToken)) {
           // if the hash of the reset token taken from params matches the hashed reset token stored in the database.
          if (result[0].resetStatus) {
            // and if the resetStatus has been set to true (the user has requested the password reset)
            const resetReqDate = moment(result[0].resetReq_at);
            const now = moment(new Date()); //todays date
            const difference = moment.duration(now.diff(resetReqDate)).asDays(); // difference in days

            // reset token expiry period : 1 day
            if (difference < 1) {
              eligible = true;
            } else {
              resetTokenExpired = true;
            }
          }
        }
      }
    })
    .catch(err => console.log("passwordResetModel GET : error", err));

  return { eligible, resetTokenExpired };
};

module.exports = {
  reset,
  checkReset
};
