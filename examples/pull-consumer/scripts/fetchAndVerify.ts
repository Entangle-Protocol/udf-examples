import { ethers } from "hardhat";
import { UdfSdk } from '@entangle-labs/udf-sdk';

// PullConsumer contract address on ETH Sepolia
const PullConsumerAddress = "0xAf84DEF16E25b6722aE9ADBd29eBf1573b6569e7";

async function main() {

  // Fetch the update data from finalized-data-snap
  const sdk = new UdfSdk();
  const updateData = await sdk.getCallData(["BTC/USD"]);

  // Bind PullConsumer contract on the network
  const consumer = await ethers.getContractAt(
    "PullConsumer",
    PullConsumerAddress
  );

  // Send verify transaction
  let tx = await consumer.verifyPrice(
    updateData,
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
