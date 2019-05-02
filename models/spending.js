const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spending = new Schema({
  description: String,
  dueDate: String,
  value: String
});


module.exports = mongoose.model("spending", spendig);
