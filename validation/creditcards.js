const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCreditcardInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.limit = !isEmpty(data.limit) ? data.limit : 0;
  data.date = !isEmpty(data.date) ? data.date : "";

  // Validação do nome
  if (!validator.isLength(data.name, { min: 3, max: 50 })) {
    errors.name = "O nome deve ser maior que 2 e menor que 50";
  }
  if (validator.isEmpty(data.name)) {
    errors.name = "O campo nome é obrigatório";
  }

  // Validação do limite
  if (data.limit <= 0) {
    errors.limit = "O campo limite deve ser maior que zero";
  }
  if (!validator.isNumeric(data.limit.toString())) {
    errors.limit = "O campo limite é inválido";
  }

  // Validação da data
  if (validator.isEmpty(data.date.toString())) {
    errors.date = "O campo data é obrigatório";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
