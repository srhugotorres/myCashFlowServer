const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gastos = new Schema({
  descricao: String,
  dataPagamento: String,
  valor: String
});
