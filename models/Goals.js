const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const GoalSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  goal: {
    type: String,
    required: true,
    max: 100
  },
  date: {
    type: Date,
    required: true
  },
  value: {
    type: Number,
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

module.exports = Goal = mongoose.model("goal", GoalSchema);
