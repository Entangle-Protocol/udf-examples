import { ethers } from "hardhat";

// PullConsumer contract address on ETH Sepolia
const PullConsumerAddress = "0x06fAdf55c689Da5d17472FE604302e595Bd257c0";

async function main() {

  // Use default hardhat signer to fund the PullConsumer contract
  const [funder] = await ethers.getSigners();

  // 1e-15 is the exact cost for 10 updates on eth_seoplia
  const depositAmount = ethers.parseEther("0.000000000000001");

  // Send funding transaction
  const tx = await funder.sendTransaction({
    to: PullConsumerAddress,
    value: depositAmount
  });
  await tx.wait();

  console.log(`sent ${depositAmount} to PullConsumer, tx: ${tx.hash}`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
