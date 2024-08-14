const axios = require('axios');
// const Transaction = require("../models/Transaction");
const Transaction = require("../models/transaction");

const getTransaction = async(req, res) => {
  try {
    const { address } = req.params;
    // const response = await axios.get(`https://api.binance.com/api/v3/account/transactions?address=${address}`);
    const response = await axios.get(`https://api-goerli.etherscan.io/api`, {
      params: {
        module: 'account',
        action: 'txlist',
        address,
        startblock: 0,
        endblock: 'latest',
        sort: 'desc',
       apikey: process.env.ETHERSCAN_API_KEY,
      },
    });

    const transactions = response.data.result.slice(0, 5);

    for (const tx of transactions ) {
      const existingTx = await Transaction.findOne({ hash: tx.hash});
      if (!existingTx) {
        const newTx = new Transaction({
          address,
          blockNumber: tx.blockNumber,
          gas: tx.gas,
          gasPrice: tx.gasPrice,
          hash: tx.hash,
          from: tx.from,
          to: tx.to,
          value: tx.value,
          timeStamp: new Date(tx.timeStamp * 1000),
        });

        await newTx.save();
  
    }}
    
    res.send(transactions);
  }
 catch (error) {
   console.error(error);
   res.status(500).json({ error: 'Failed to retrieve transaction'})
  };

}


const queryTransactions = async (req, res) => {
  try {
    const { address, startDate, endDate } = req.params;

    const transactions = await Transaction.find({
      address,
      timeStamp: { $gte: new Date(startDate), $lte: new Date(endDate) },

    }).sort({timeStapm: -1});
    
    res.json(transactions);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to query transaction'})
  };

}


module.exports = { getTransaction, queryTransactions };
