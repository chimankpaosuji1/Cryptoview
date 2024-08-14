const express = require('express');
const { getNFTMetadata } = require('../controllers/nftController');

const router = express.Router();

router.get('/:contractAddress/:tokenId', getNFTMetadata);

module.exports = router;