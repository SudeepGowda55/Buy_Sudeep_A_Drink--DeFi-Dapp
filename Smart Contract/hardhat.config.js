// require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
// require("@nomicfoundation/hardhat-network-helpers")
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  // defaultNetwork: "matic",
  networks: {
    maticmum: {
      url: process.env.ALCHEMY_MUMBAI_URL,
      accounts: [process.env.POLYGON_WALLET_PRIVATE_KEY]
    },
  },
};