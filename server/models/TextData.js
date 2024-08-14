const mongoose = require("mongoose");

const textDataSchema = new mongoose.Schema({
  content: String,
  ipfs: String,
});

module.exports = mongoose.model("TextData", textDataSchema);
