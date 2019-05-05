const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let billSchema = new Schema({
  description: {type: String},
  dueDate: {type: Date},
  paymentDate: {type: Date},
  value: {type: Number},
});

module.exports = mongoose.model("bill", billSchema);
