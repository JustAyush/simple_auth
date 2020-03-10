
// Local imports
const { emailVerifyService } = require("../services");


const verify = async (req, res, next) => {
  
    // get the token and userId from params
  const token = req.params.token;
  const userId = req.params.userId;

  try {
      await emailVerifyService.verify(token, userId)
      .then(({verifyComplete, tokenExpired}) => {

            if(verifyComplete) {
              res.json({
                status: "success", 
                message: `User with token ${token} has been verified`
              })
            } else {
              // if the token has expired
              if(tokenExpired) {
                res.json({
                  status: "error", 
                  message: `${token} has expired`
                })
              } else {
                res.json({
                  status: "error", 
                  message: `User with token ${token} could not be verified`
                })
              }   
            }
      })
      .catch (err => console.log("emailVerifyController: Error", err));
  } catch (e) {
    console.log("emailVerifyController: Error", e)
  }

};

module.exports = {
  verify
};
