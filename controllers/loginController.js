
// Imports
const passport = require("passport");

// Local imports
const { loginService } = require("../services");
const initPassport = require("../config/passport");

const login = async (req, res, next) => {
  // separate out email and password from request body
  const { email, password } = req.body;

  try {
    await loginService
      .login(email, password)
      .then(({ userExists, checkPassword, userWithEmail, emailResent }) => {
        
        if (!checkPassword) {

          console.log('User Found', userExists);

          if(userExists) {
            // the email exists but the user has not verified yet
            if(emailResent) {
              // if the token has expired and the verification email has been resent
              res.json({
                status: "error",
                message: `New verification email has been sent to ${email}`
              })
            } else {
              // if the token has not expired
              res.json({
                status: "error",
                message: `Please have a look at the confirmation email sent to ${email}`
              })
            }

          } else {
            // if email doesn't exist
            res.json({
              status: "error",
              message: "No user found with that email"
            });
          }

        } else {
          // if the user with provided email exist and has verified the email
          // check if the password is correct     
          initPassport(passport, userWithEmail);

          passport.authenticate("local", function(err, userWithEmail, info) {
            if (err) {
              return next(err);
            } else {
              return res.json(info); // successfully logged in / incorrect password message 
            }
          })(req, res, next);

        }
      })
      .catch(err => {
        console.log("Error: loginController", err);
      });
  } catch (e) {
    console.log("Error: loginController", err);
  }
};

module.exports = {
  login
};
