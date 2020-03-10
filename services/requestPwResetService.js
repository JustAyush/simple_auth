
// Local imports
const {requestPwResetModel} = require("../models");
const {sendEmail} = require("../utils");

const requestReset = async (email) => {

    try {

        const {emailExists, resetToken, userId} = await requestPwResetModel.requestReset(email);
    
        if(emailExists) {

            const subject = 'Password Request Email';
            const body = `<b>Please click on the link to reset your password.</b> <br/> http://localhost:3000/api/reqPasswordReset/${userId}/${resetToken} <br /><br/> <i>This token will expire after one day.</i>`

            sendEmail.sendEmail(email, subject, body).catch("Error while sending email for password reset", console.error);

        }

        return emailExists;
    } catch (e) {
        throw new Error(e.message);
    }
}

module.exports = {
    requestReset
}