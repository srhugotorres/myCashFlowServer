const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateIncomeInput(data) {
  let errors = {};

  data.origin = !isEmpty(data.origin) ? data.origin : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.value = !isEmpty(data.value) ? data.value : 0;

  // Validação da origem
  if (!validator.isLength(data.origin, { min: 3, max: 20 })) {
    errors.origin = "A origem deve ser maior que 2 e menor que 20";
  }

  if (validator.isEmpty(data.origin)) {
    errors.origin = "O campo origem é obrigatório";
  }
  // Validação da origem

  // Validação da descrição
  if (!validator.isLength(data.description, { min: 3, max: 20 })) {
    errors.description = "A descrição deve ser maior que 2 e menor que 100";
  }

  if (validator.isEmpty(data.description)) {
    errors.description = "O campo descrição é obrigatório";
  }
  // Validação da descrição

  // Validação do valor
  if (data.value <= 0) {
    errors.value = "O campo valor deve ser maior que zero";
  }

  if (!validator.isNumeric(data.value.toString())) {
    errors.value = "O campo valor é inválido";
  }
  // Validação do valor

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
