const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateSpendingInput(data) {
  let errors = {};

  data.spending = !isEmpty(data.spending) ? data.spending : "";
  data.currentBill = !isEmpty(data.currentBill) ? data.currentBill : 0;
  data.totalBills = !isEmpty(data.totalBills) ? data.totalBills : 0;
  data.category = !isEmpty(data.category) ? data.category : "";
  data.paymentDate = !isEmpty(data.paymentDate) ? data.paymentDate : "";
  data.payment = !isEmpty(data.payment) ? data.payment : "";
  data.value = !isEmpty(data.value) ? data.value : 0;

  // Validação da Gasto
  if (!validator.isLength(data.spending, { min: 3, max: 20 })) {
    errors.spending = "A descrição deve ser maior que 2 e menor que 100";
  }
  if (validator.isEmpty(data.spending)) {
    errors.spending = "O campo descrição é obrigatório";
  }
  // Validação da Gasto

  // Validação da Parcela Atual
  if (data.value <= 1) {
    errors.value = "O campo valor deve ser maior que 1";
  }
  if (!validator.isNumeric(data.value.toString())) {
    errors.value = "O campo valor é inválido";
  }
  // Validação da Parcela Atual

  // Validação do Total de Parcelas
  if (data.value <= 1) {
    errors.value = "O campo valor deve ser maior que 1";
  }
  if (!validator.isNumeric(data.value.toString())) {
    errors.value = "O campo valor é inválido";
  }
  // Validação do Total de Parcelas
  
  

  // Validação da Categoria
  if (!validator.isLength(data.category, { min: 3, max: 20 })) {
    errors.category = "A categoria deve ser maior que 2 e menor que 20";
  }
  if (validator.isEmpty(data.category)) {
    errors.category = "O campo categoria é obrigatório";
  }
  // Validação da Categoria

  // Validação da Data de Pagamento
  if (validator.isEmpty(data.paymentDate.toString())) {
    errors.date = "O campo Data de Pagamento é obrigatório";
  }
  // Validação da Data de Pagamento

  // Validação do Meio de Pagamento
  if (!validator.isLength(data.payment, { min: 3, max: 20 })) {
    errors.category = "O meio de pagamento deve ser maior que 2 e menor que 20";
  }
  if (validator.isEmpty(data.payment)) {
    errors.category = "O campo meio de pagamento é obrigatório";
  }
  // Validação do Meio de Pagamento

  // Validação do Valor
  if (data.value <= 0) {
    errors.value = "O campo valor deve ser maior que zero";
  }
  if (!validator.isNumeric(data.value.toString())) {
    errors.value = "O campo valor é inválido";
  }
  // Validação do Valor

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
