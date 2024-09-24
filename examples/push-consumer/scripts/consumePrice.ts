import {
  PushConsumer,
} from "../typechain-types";
import { ethers } from "hardhat";

// PushConsumer address we got from the deployment
const PushConsumerAddress = "0x3f724844973A8e5F669499D366943A676F6EF7CE";

async function main() {
  const pushConsumer = await ethers.getContractAt(
    "PushConsumer",
    PushConsumerAddress
  ) as PushConsumer;

  let tx = await pushConsumer.consumePrice();
  await tx.wait();

  console.log("sent PushConsumer.consumePrice tx", tx.hash);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
