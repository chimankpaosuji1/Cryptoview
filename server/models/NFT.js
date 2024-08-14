const mongoose = require('mongoose');

const nftSchema = new mongoose.Schema({
  contractAddress: String,
  tokenId: String,
  name: String,
  description: String,
  imageUrl: String,
});

module.exports = mongoose.model('NFT', nftSchema);