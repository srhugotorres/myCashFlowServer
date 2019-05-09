const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateBillInput(data) {
    let errors = {};

    data.description = !isEmpty(data.description) ? data.description : "";
    data.dueDate = !isEmpty(data.dueDate) ? data.dueDate: "";
    data.value = !isEmpty(data.value) ? data.value: "";

    // Validação da descrição
    if (!validator.isLength(data.description, { min: 3, max: 20 })) {
        errors.description = "A descrição deve ser maior que 2 e menor que 100";
    }
    
    if (validator.isEmpty(data.description)) {
        errors.description = "O campo descrição é obrigatório";
    }
    // Validação da descrição

    // Validação da Data de vencimento
    if (validator.isEmpty(data.dueDate.toString())) {
        errors.dueDate = "O campo data de vencimento é obrigatório";
    }
    // Validação da Data de vencimento

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
}