const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bills = new Schema({
  description: String,
  dueDate: Date,
  paymentDate: Date,
  value: Number,
});

module.exports = mongoose.model("bills", bills);
