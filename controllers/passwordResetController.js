// Local imports
const { passwordResetService } = require("../services");

const reset = async (req, res, next) => {

  // check if eligible to reset the password
  if (req.method == "GET") {
    // get the reset token and userId from params
    const resetToken = req.params.resetToken;
    const userId = req.params.id;

    await passwordResetService
      .checkReset(userId, resetToken)
      .then(({eligible, resetTokenExpired}) => {

        if (eligible) {
          // if eligible (userId and reset token are valid)
          res.json({
            status: "success",
            message:
              "Eligible to reset password"
          });
        } else {
          if(resetTokenExpired) {
            // if the reset token has expired
            res.json({
              status: "error",
              message:
                "Reset Token has been expired. Try resetting the password again."
            });
          } else {
            res.json({
              status: "error",
              message:
                "Not eligible to reset the password."
            });
          }
        }
      })
      .catch(err => console.log("PasswordResetController GET : error", err));
  }

  // reset the password
  if(req.method == "POST") {

       // get the reset token and userId from params
       const resetToken = req.params.resetToken;
       const userId = req.params.id;
      // get the new password from body
      const { password } = req.body;

  
    try {
        await passwordResetService.reset(userId, resetToken, password)
        .then(({passwordResetDone, resetTokenExpired}) => {
          if(!resetTokenExpired) {
            // if the reset token has not expired
            if(passwordResetDone) {
              // if the password has been changed successfully
              res.json({
                status: "success",
                message: "Your password has been changed successfully."
              })
            } else {
              res.json({
                status: "error",
                message: "Sth went wrong. Couldn't reset your password."
              })
            }
  
          } else {
            res.json({
              status: "error",
              message: "Reset token has been expired. Try password reset again."
            })
          }
  
        })
        .catch (err => console.log("passwordResetController: Error 1", err));
    } catch (e) {
      console.log("passwordResetController: Error", e)
    }

  }

  
};

module.exports = {
  reset
};
