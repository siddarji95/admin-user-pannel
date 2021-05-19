const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function loginInputValidate(input) {
  let errors = {};

  input.email = !isEmpty(input.email) ? input.email : "";
  input.password = !isEmpty(input.password) ? input.password : "";

  if (!Validator.isEmail(input.email)) {
    errors.email = "Incorrect Email";
  }
  if (Validator.isEmpty(input.email)) {
    errors.email = "Empty email field";
  }
  if (Validator.isEmpty(input.password)) {
    errors.password = "Empty password field";
  }
  if (!Validator.isLength(input.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
