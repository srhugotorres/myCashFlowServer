const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCreditcardInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.targetValue = !isEmpty(data.targetValue) ? data.targetValue : 0;
  data.targetDate = !isEmpty(data.targetDate) ? data.targetDate : "";

  // Validação da Meta
  if (!validator.isLength(data.name, { min: 3, max: 50 })) {
    errors.name = "O meta deve ser maior que 2 e menor que 50";
  }
  if (validator.isEmpty(data.name)) {
    errors.name = "O campo meta é obrigatório";
  }

  // Validação do valor alvo
  if (data.targetValue <= 0) {
    errors.targetValue = "O campo valor alvo deve ser maior que zero";
  }
  if (!validator.isNumeric(data.targetValue.toString())) {
    errors.targetValue = "O campo valor alvo é inválido";
  }

  // Validação da data
  if (validator.isEmpty(data.targetDate.toString())) {
    errors.targetDate = "O campo data é obrigatório";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
