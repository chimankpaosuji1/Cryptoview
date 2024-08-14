const express = require('express');

const {
  getTransactions,
  queryTransactions,
} = require("../controllers/transactionController");

const router = express.Router();

// GET all transactions

router.get('/:address', getTransactions);

// GET transactions by query

router.get('/:address/:startDate/:endDate', queryTransactions);

module.exports = router;

// End of Transactions.js file  