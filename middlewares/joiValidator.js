// Imports
const Joi = require("@hapi/joi");

const validate = (schema, property) => {
  return (req, res, next) => {
    // single middleware for body, query, field and params validation
    const { error } = schema.validate(req[property]);

    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const errorMsg = details.map(i => i.message).join(",");
      console.log("Joi validation error", errorMsg);
      res.json({
        status: "error",
        message: errorMsg
      });
    }
  };
};

module.exports = {
  validate
};
