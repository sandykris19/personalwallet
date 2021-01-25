const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  balance: { type: Number, required: true },
  transactions: [
    {
      transDate: { type: String, default: new Date().toLocaleString() },
      transValue: String,
      ttype: String,
      balance: String,
    },
  ],
});

const User = mongoose.model("user", userSchema);
module.exports = User;
