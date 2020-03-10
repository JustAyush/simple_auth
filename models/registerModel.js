// Imports
const moment = require("moment");
const randtoken = require('rand-token');

// Local imports
const knex = require("../db/db");

const register = async (email, password) => {
  let emailExist = false; // flag to check if the email already exists
  let randomToken = '', userId;


  // check if the users table contains entry with the mentioned email
  await knex("users")
    .where({
      email: email
    })
    .then(async (result) => {
      // if the user with the same email exists
      if (result.length != 0) {
        emailExist = true; // set the flag to true
      } else {
        emailExist = false;
        randomToken = randtoken.generate(16);
        // if there is no user with the same email
        // insert the new user to the database
        await knex.insert({
          email: email,
          password: password,
          tmpCode: randomToken,
          created_at: moment().format("YYYY-MM-DD HH:mm:ss")
        })
        .returning('id')
        .into('users')
        .then((id) => {
          userId = id
        })
        .catch(err => console.log("Error while creating new user:registerModel", err));        
      }
    })
    .catch(err => console.log("Error while trying to find user with same email: registerModel", err));

  console.log('userid from registerModel', userId);    

  return {emailExist, randomToken, userId}; // return the flag (the controller will send the appropriate response based on this flag) and the verification token
};

module.exports = {
  register
};
