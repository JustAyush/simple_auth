// Local imports
const { requestPwResetService } = require("../services");

const requestReset = async (req, res, next) => {
  // separate out email from request body
  const { email } = req.body;

  try {
    await requestPwResetService
      .requestReset(email)
      .then((emailExists) => {

        if(emailExists) {
          res.json({
            status: "success",
            message: "Please check your inbox."
          })
        } else {
          res.json({
            status: "error",
            message: "Oops. We don't have that email."
          })
        }

      })
      .catch(err => console.log("requestPwResetController: Error", err));
  } catch (e) {
    console.log("requestPwResetController: Error", e);
  }
};

module.exports = {
  requestReset
};
