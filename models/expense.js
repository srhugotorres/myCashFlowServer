const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ExpenseSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true
  },
  paymentDate: {
    type: Date,
    required: true
  },
  payment: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
});

module.exports = Expense = mongoose.model("expense", ExpenseSchema);
