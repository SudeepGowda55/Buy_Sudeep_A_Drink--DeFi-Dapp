const hre = require("hardhat");
const abi = require("../artifacts/contracts/BuySudeepADrink.sol/BuySudeepADrink.json");

async function getBalance(provider, address) {
  const balanceBigInt = await provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

async function main() {

  const contractAddress="0xC4Eb4b747bd5f09E49717FE8B3aec4386DEf3D7b";
  const contractABI = abi.abi;

  const provider = new hre.ethers.providers.AlchemyProvider("maticmum", process.env.ALCHEMY_PRIVATE_KEY);

  const signer = new hre.ethers.Wallet(process.env.POLYGON_WALLET_PRIVATE_KEY, provider);

  const BuySudeepADrink = new hre.ethers.Contract(contractAddress, contractABI, signer);

  console.log("current balance of owner: ", await getBalance(provider, signer.address), "ETH");
  const contractBalance = await getBalance(provider, BuySudeepADrink.address);
  console.log("current balance of contract: ", await getBalance(provider, BuySudeepADrink.address), "ETH");

  // Withdraw funds if there are funds to withdraw.
  if (contractBalance !== "0.0") {
    console.log("withdrawing funds..")
    const withdrawEth = await BuySudeepADrink.withDraw();
    await withdrawEth.wait();
  } else {
    console.log("no funds to withdraw!");
  }

  console.log("current balance of owner: ", await getBalance(provider, signer.address), "ETH");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });