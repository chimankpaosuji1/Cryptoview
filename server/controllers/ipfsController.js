/* eslint-disable no-undef */
const TextData = require("../models/TextData");
const { create } = require("ipfs-http-client");
// import { CID } from "multiformats/cid";

const ipfs = create({url: "https://ipfs.infura.io:5001/api/v0"});
// const ipfs = ipfsHttpClient(helia);

const storeData = async(req, res ) => {
  try{
    const content = req.body;
    const cid = await ipfs.add(content);

    const textData = new TextData({
      content,
      ipfsHash: cid.toString(),
    });
    await textData.save();
   
    res.status(200).json({ipfsHash: textData.ipfsHash });
  } catch (error) {
   console.error(error);
   res.status(500).json({ error: 'Failed to store data on IPFS'})
  }
};


const retrieveData = async (req, res ) => {
  try{
    const { hash } = req.params;

    const textData = await TextData.findOne({ ipfsHash: hash });
    if(!textData) return res.status(404).json({ error: 'No data found with this hash'});
   
    res.status(200).json({content: textData.content});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve data from IPFS'})
  }
};

module.exports = { storeData, retrieveData };
