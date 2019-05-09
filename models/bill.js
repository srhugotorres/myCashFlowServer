const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let billSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  description: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  value: {
    type: Number,
    required: true
  },
  updatedDate: {
    type: Date,
    required: false
  }
});

module.exports = mongoose.model("bill", billSchema);
