const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spending = new Schema({
  description: String,
  dueDate: Date,
  value: Number
});


module.exports = mongoose.model("spending", spending);
