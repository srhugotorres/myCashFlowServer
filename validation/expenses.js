const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExpenseInput(data) {
  let errors = {};

  data.description = !isEmpty(data.description) ? data.description : "";
  data.category = !isEmpty(data.category) ? data.category : "";
  data.paymentDate = !isEmpty(data.paymentDate) ? data.paymentDate : "";
  data.payment = !isEmpty(data.payment) ? data.payment : "";
  data.value = !isEmpty(data.value) ? data.value : 0;

  // Validação da Descrição
  if (!validator.isLength(data.description, { min: 3, max: 20 })) {
    errors.description = "A descrição deve ser maior que 2 e menor que 100";
  }
  if (validator.isEmpty(data.description)) {
    errors.description = "O campo descrição é obrigatório";
  }

  // Validação da Categoria
  if (!validator.isLength(data.category, { min: 3, max: 20 })) {
    errors.category = "A categoria deve ser maior que 2 e menor que 20";
  }
  if (validator.isEmpty(data.category)) {
    errors.category = "O campo categoria é obrigatório";
  }

  // Validação da Data de Pagamento
  if (validator.isEmpty(data.paymentDate.toString())) {
    errors.date = "O campo Data de Pagamento é obrigatório";
  }

  // Validação do Meio de Pagamento
  if (!validator.isLength(data.payment, { min: 3, max: 20 })) {
    errors.category = "O meio de pagamento deve ser maior que 2 e menor que 20";
  }
  if (validator.isEmpty(data.payment)) {
    errors.category = "O campo meio de pagamento é obrigatório";
  }

  // Validação do Valor
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
