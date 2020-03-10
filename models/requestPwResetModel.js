// Imports
const moment = require("moment");
const randtoken = require('rand-token');

// Local imports
const knex = require("../db/db");

const requestReset = async (email) => {

    let emailExists = false; // flag to check if the user with the email exists
    let resetToken = '', userId;

    // check if the user with the email exists
    await knex("users")
        .where({
            email: email
        })
        .then(async(result) => {
            
            if(result.length > 0) {
                userId = result[0].id;
                // if exists, set the flag to true
                emailExists = true;
                // set the reset token
                resetToken = randtoken.generate(16); 
                
                await knex("users")
                    .where({
                        id: userId
                    })
                    .update({
                        resetToken: resetToken,
                        resetStatus: true,
                        resetReq_at: moment().format("YYYY-MM-DD HH:mm:ss")
                    })
                    .then (() => console.log("Password Reset Request Granted."))
                    .catch (() => console.log("requestPwResetModel : error", err))
            }

        })
        .catch(err => console.log("requestPwResetModel : error", err));

    return { emailExists, resetToken, userId };

};

module.exports = {
    requestReset
};

