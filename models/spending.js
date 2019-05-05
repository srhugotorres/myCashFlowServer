const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spendingSchema = new Schema({
  description: {type: String},
  paymentDate: {type: Date},
  value: {type: Number}
});



module.exports = mongoose.model('spending', spendingSchema);