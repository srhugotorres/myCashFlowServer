const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CreditcardSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    required: true,
    max: 100
  },
  limit: {
    type: Number,
    required: true,
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

module.exports = Creditcard = mongoose.model("creditcard", CreditcardSchema);
