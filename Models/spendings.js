const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spendings = new Schema({
  descriptions: String,
  dueDate: String,
  value: String
});


module.exports = mongoose.model("spendings", spendigs);
