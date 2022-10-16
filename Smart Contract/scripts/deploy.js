const hardhat = require("hardhat");

async function main() {
    const BuySudeepADrink = await hardhat.ethers.getContractFactory("BuySudeepADrink");
    const buySudeepADrink = await BuySudeepADrink.deploy();
    await buySudeepADrink.deployed();
    console.log("BuySudeepADrink contract deployed and the contract address is ", buySudeepADrink.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
   });
  