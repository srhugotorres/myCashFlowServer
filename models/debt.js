const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const debt = new Schema({
    description: String,
    dayOfDue: Date,
    totalDebt: Number,
});

module.exports = mongoose.model("debt", debt);
