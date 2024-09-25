import { ethers } from "hardhat";
import { fetchVerifyArgs } from "./utils";

// PullConsumer contract address on ETH Sepolia
const PullConsumerAddress = "0xAf84DEF16E25b6722aE9ADBd29eBf1573b6569e7";

async function main() {

  // Fetch the update data from finalized-data-snap
  const asset = "NGL/USD";
  const verifyArgs = await fetchVerifyArgs(asset);

  // Bind PullConsumer contract on the network
  const consumer = await ethers.getContractAt(
    "PullConsumer",
    PullConsumerAddress
  );

  // Send verify transaction
  let tx = await consumer.verifyPrice(
    verifyArgs.merkleRoot,
    verifyArgs.merkleProof,
    verifyArgs.signatures,
    verifyArgs.dataKey,
    verifyArgs.price,
    verifyArgs.timestamp,
  );
  await tx.wait();
  console.log("sent tx:", tx.hash);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
