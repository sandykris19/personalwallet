const mongoose = require("mongoose");

const tranSchema = new mongoose.Schema({
  userID: String,
  name: String,
  transactionDate: { type: String, default: new Date().toLocaleString() },
  transValue: String,
  balance: String,
});

const Transc = mongoose.model("transaction", tranSchema);
module.exports = Transc;
