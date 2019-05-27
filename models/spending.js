const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SpendingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  spending: {
    type: String,
    required: true
  },
  currentBill: {
    type: Number,
    default: 1
  },
  totalBills: {
    type: Number,
    default: 1
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
  description: {
    type: String,
    max: 100
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

module.exports = Spending = mongoose.model("spending", SpendingSchema);
