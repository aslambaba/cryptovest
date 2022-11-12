const hre = require("hardhat");

async function main() {
  const TransferFund = await hre.ethers.getContractFactory("TransferFund");
  const TransferFundContract = await TransferFund.deploy();
  await TransferFundContract.deployed();

  console.log(
    `TransferFund Contract deployed to ${TransferFundContract.address}`
  );
}
main().catch((error) => {
  console.error("ERROR",error);
  process.exitCode = 1;
});
