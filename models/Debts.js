const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const debts = new Schema({
    description: String,
    dayOfDue: Date,
    totalDebt: Number,
});

module.exports = mongoose.model("debts", debts);
