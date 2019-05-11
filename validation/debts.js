const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateDebtInput(data) {
  let errors = {};

  data.description = !isEmpty(data.description) ? data.description : "";
  data.qfatura = !isEmpty(data.qfatura) ? data.qfatura : 0;
  data.vfatura = !isEmpty(data.vfatura) ? data.vfatura : "";
  data.value = !isEmpty(data.value) ? data.value : 0;

  // Validação da Descrição
  if (!validator.isLength(data.description, { min: 3, max: 20 })) {
    errors.description = "A Descrição deve ser maior que 2 e menor que 20";
  }
  if (validator.isEmpty(data.description)) {
    errors.description = "O campo categoria é obrigatório";
  }

  // Validação da Quantidade de Faturas
  if (data.qfatura <= 0) {
    errors.qfatura = "O campo valor deve ser maior que zero";
  }
  if (!validator.isNumeric(data.qfatura.toString())) {
    errors.qfatura = "O campo quantidade de faturas é inválido";
  }

  // Validação do Vencimento da Fatura
  if (validator.isEmpty(data.vfatura.toString())) {
    errors.vfatura = "O campo vencimento da fatura é obrigatório";
  }

  // Validação do valor
  if (data.value <= 0) {
    errors.value = "O campo valor deve ser maior que zero";
  }
  if (!validator.isNumeric(data.value.toString())) {
    errors.value = "O campo valor é inválido";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
