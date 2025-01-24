import { ethers } from "hardhat";
import { UdfSdk } from '@entangle-labs/udf-sdk';

// PullConsumer contract address on ETH Sepolia
const PullConsumerAddress = "0x06fAdf55c689Da5d17472FE604302e595Bd257c0";

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
    updateData
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
