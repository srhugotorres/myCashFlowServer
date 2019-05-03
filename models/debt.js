const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let debtSchema = new Schema({
    description: {type: String},
    dueDay: {type: Number},
    totalDebt: {type: Number}
});

module.exports = mongoose.model("debt", debtSchema);
