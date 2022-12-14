const hre = require("hardhat");
const abi = require("../artifacts/contracts/BuySudeepADrink.sol/BuySudeepADrink.json");

async function getBalance(provider, address) {
  const balanceBigInt = await provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

async function main() {

  const contractAddress="0xDAA150478C3Ca092527C662D966F62aabDB435A3";
  const contractABI = abi.abi;

  const provider = new hre.ethers.providers.AlchemyProvider("maticmum", process.env.ALCHEMY_PRIVATE_KEY);

  const signer = new hre.ethers.Wallet(process.env.POLYGON_WALLET_PRIVATE_KEY, provider);

  const BuySudeepADrink = new hre.ethers.Contract(contractAddress, contractABI, signer);

  console.log("current balance of owner: ", await getBalance(provider, signer.address), "Matic");
  const contractBalance = await getBalance(provider, BuySudeepADrink.address);
  console.log("current balance of contract: ", await getBalance(provider, BuySudeepADrink.address), "Matic");

  // Withdraw funds if there are funds to withdraw.
  if (contractBalance !== "0.0") {
    console.log("withdrawing funds..")
    const withdrawMatic = await BuySudeepADrink.withDraw();
    await withdrawMatic.wait();
  } else {
    console.log("no funds to withdraw!");
  }

  console.log("current balance of owner: ", await getBalance(provider, signer.address), "Matic");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });