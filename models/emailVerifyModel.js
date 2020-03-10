// Imports
const moment = require("moment");

// Local imports
const knex = require("../db/db");

const verify = async (token, userId) => {
  let verifyComplete = false, tokenExpired = false;

  // check if the user with the verification token exists
  await knex("users")
    .where({
      id: userId,
      tmpCode: token
    })
    .then(async result => {
      // if exists
      if (result.length > 0) {
        const userIdWithToken = result[0].id; // user id with the token

        const signUpDate = moment(result[0].created_at);
        const now = moment(new Date()); //todays date

        const difference = moment.duration(now.diff(signUpDate)).asDays(); // difference in days

        // token expiry period : 1 day
        // verify user only if the duration is less than 1 day
        if (difference < 1) {
          // update the emailVerified field to true and tmpCode to null
          await knex("users")
            .where({ id: userIdWithToken })
            .update({ emailVerified: true, tmpCode: null })
            .then(() => {
              verifyComplete = true;
              tokenExpired = false;
            });
        } else {
            tokenExpired = true;
        }
      }
    })
    .catch(err =>
      console.log("Error while finding user with verfication token", err)
    );

  return {verifyComplete, tokenExpired };
};

module.exports = {
  verify
};
