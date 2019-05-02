const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bill = new Schema({
  description: String,
  dueDate: Date,
  paymentDate: Date,
  value: Number,
});

module.exports = mongoose.model("bill", bill);
