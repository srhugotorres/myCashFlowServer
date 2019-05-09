const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spendingSchema = new Schema({
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
    required: true
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  value: {
    type: Number
  },
  updatedDate: {
    type: Date,
    required: false
  }
});



module.exports = mongoose.model('spending', spendingSchema);