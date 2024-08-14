const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  address: String,
  blockNumber: String,
  timeStamp: String,
  hash: String,
  from: String,
  to: String,
   value: String,
   gas: String,
   gasPrice: String,

});

module.exports = mongoose.model("Transaction", TransactionSchema);