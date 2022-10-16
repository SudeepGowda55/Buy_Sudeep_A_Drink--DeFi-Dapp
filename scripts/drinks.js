const hardhat = require("hardhat");

async function getBalance(address) {
  const BigInt = await hardhat.waffle.provider.getBalance(address)
  return hardhat.ethers.utils.formatEther(BigInt);
}

async function printBalances(userAddresses){
  let id = 0;
  for(const address of userAddresses){
    console.log(`Address no ${id} has a balance of `, await getBalance(address))
    id++;
  }
}

async function printMemos(memos) {
  for (const memo of memos){
    const timestamp = memo.timestamp;
    const tipper = memo.name;
    const tipperAddress = memo.from;
    const messsage = memo.messsage;
    console.log(`At ${timestamp}, ${tipper} (${tipperAddress}) said: "${messsage}"`)
  }
}

async function main(){

  const [owner, tipper1, tipper2] = await hardhat.ethers.getSigners();

  const BuySudeepADrink = await hardhat.ethers.getContractFactory('BuySudeepADrink');

  const buySudeepADrink = await BuySudeepADrink.deploy();
  await buySudeepADrink.deployed();
  console.log("BuySudeepADrink contract has been deployed and the address is ", buySudeepADrink.address);

  const userAddresses = [owner.address, tipper1.address, tipper2.address, buySudeepADrink.address]
  await printBalances(userAddresses);

  const tip = {value : hardhat.ethers.utils.parseEther("1000")};
  console.log(await buySudeepADrink.connect(tipper1).buyADrink("monisha", "hi bae", tip));
  console.log(await buySudeepADrink.connect(tipper2).buyADrink("saketh", "hai macchi", tip));

  await printBalances(userAddresses);

  console.log(await buySudeepADrink.connect(owner).withDraw())
  await printBalances(userAddresses);

  const memes = await buySudeepADrink.connect(owner).memes();
  console.log(memes);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
