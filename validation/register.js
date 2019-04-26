const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "O nome deve ter entre 2 e 30 caracteres";
  }

  if (validator.isEmpty(data.name)) {
    errors.name = "O campo nome é obrigatório";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "O campo e-mail é obrigatório";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "O campo e-mail é inválido";
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "A senha deve ter entre 6 e 30 caracteres";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "O campo senha é obrigatório";
  }

  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "As senhas informadas devem ser iguais";
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = "O campo senha de confirmação é obrigatório";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
