const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contasFaturas = new Schema({
  descricao: String,
  dataVencimento: Date,
  DataPagamento: Date,
  valor: Number,
});

module.exports = mongoose.model("contasFaturas", contasFaturas);
