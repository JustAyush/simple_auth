
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
      .then(({ userFound, user }) => {
        // userFound: true/false, user: object
        if (!userFound) {
          res.json({
            status: "error",
            message: "No user found with that email"
          });
        } else {
          // if the user with provided email exist      
          initPassport(passport, user);

          passport.authenticate("local", function(err, user, info) {
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
