const NFT= require('../models/NFT');
const Web3 = require('web3');
const process = require('process');
const axios = require('axios');

const web3 = new Web3.providers.HttpProvider(
    `https://goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
  );

  const ERC72_ABI = [
    {
      constant: true,
      inputs: [{ name: '_tokenId', type: 'uint256'}],
      name: "tokenURL",
      outputs: [{ type: "string", name: "" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
  ];

  const getNFTMetadata = async (req, res) => {
    try {
      const {contractAddress, tokenId } = req.params;

      let nft  = await NFT.findOne({contractAddress, tokenId});
      
      if (!nft) {
         const contract = new web3.eth.Contract(ERC72_ABI, contractAddress);
         const TokenURI = await contract.methods.tokenURI(tokenId).call();
         const metadataResponse = await axios.get(TokenURL);
        //  const response = await axios.get(tokenURI);
        const metadata = metadataResponse.data;
        nft = new NFT({ contractAddress, tokenId, name: metadata.name, description: metadata.description, imageUrl: metadata.image });
        await nft.save();
      }
    
      res.status(200).json({
        name: nft.name,
        description: nft.description,
        imageUrl: nft.imageUrl,
        // contractAddress: nft.contractAddress,
        // tokenId: nft.tokenId,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = { getNFTMetadata };
