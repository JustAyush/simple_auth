// Imports
const moment = require("moment");

// Local imports
const knex = require("../db/db");

const register = async (email, password) => {
  var emailExist = false; // flag to check if the email already exists

  // check if the users table contains entry with the mentioned email
  await knex("users")
    .where({
      email: email
    })
    .then(result => {
      console.log(result);
      // if the user with the same email exists
      if (result.length !== 0) {
        emailExist = true; // set the flag to true
      } else {
        // if there is no user with the same email
        // insert the new user to the database
        knex("users")
          .insert({
            email: email,
            password: password,
            created_at: moment().format("YYYY-MM-DD hh:mm:ss")
          })
          .then(data => console.log("Success"))
          .catch(err => console.log("Error while creating new user:registerModel", err));
      }
    })
    .catch(err =>   console.log("Error while trying to find user with same email: registerModel", err));

  return emailExist; // return the flag (the controller will send the appropriate response based on this flag)
};

module.exports = {
  register
};
