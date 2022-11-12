require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()
/** @type import('hardhat/config').HardhatUserConfig */
let ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
let GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY;

module.exports = {
  solidity: "0.8.17",
  networks: {
    localganache: {
      url: 'HTTP://127.0.0.1:7545',
      accounts: [`0x5cd57d550c134502750d9f5e9f44fdcbb6d07022208bd0359e225165d82ce1e7`]
    },
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY]
    }
  }
};
