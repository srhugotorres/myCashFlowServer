const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contasFaturas = new Schema({
  descricao: String,
  dataVencimento: String,
  DataPagamento: String,
  valor: String,
});

module.exports = mongoose.model("contasFaturas", contasFaturas);
