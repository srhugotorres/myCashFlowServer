const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const IncomeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    max: 100
  },
  value: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  insertionDate: {
    type: Date,
    default: Date.now
  },
  updatedDate: {
    type: Date,
    required: false
  }
});

module.exports = Income = mongoose.model("income", IncomeSchema);
