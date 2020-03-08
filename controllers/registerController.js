// Local imports
const { registerService } = require("../services");

const register = async (req, res, next) => {
  // separate out email and password from request body
  const { email, password } = req.body;

  try {
    await registerService
      .register(email, password)
      .then(emailExist => {

        // if the email is in use
        if (emailExist) {
          res.json({
            status: "error",
            message: "Email already in use."
          });
        } else {
          // send success response when the new user is created
          res.json({
            status: "success",
            message: "Successfully registered."
          });
        }
      })
      .catch(err => {
        res.json({
          status: "error",
          message: "Couldn't register"
        });
        console.log("Error at registerController", err);
      });
  } catch (e) {
    console.log(e.message);
    res.json({
      status: "error",
      message: "Couldn't register"
    });
  }
};

module.exports = {
  register
};
