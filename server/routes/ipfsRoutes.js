const express = require('express');

const { storeData, retrieveData }  = require('../controllers/ipfsController');

const router = express.Router();

// Store data in IPFS

router.post('/store', storeData);

// Retrieve data from IPFS

router.get('/retrieve/:hash', retrieveData);

module.exports = router;