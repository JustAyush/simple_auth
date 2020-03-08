// Local imports
const knex = require("../db/db");

const login = async (email, password) => {

    let user, userFound = false;

    // check if the user with the provided email exists
    // if exists get the user (both email and password) by email
    await knex("users")
    .where({
      email: email
    })
    .then(result => {
      if(result.length == 0) 
        userFound = false; // set the flag to false if not found
      else {
        userFound = true;
        user = result[0]; // the query results in array 
      }
    })
    .catch(err => {
      console.log("Error while trying to find user with provided email: loginModel", err);
    })
    
    return { userFound, user };

};

module.exports = {
  login
};
