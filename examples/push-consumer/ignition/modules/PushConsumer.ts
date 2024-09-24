import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// PullOralce address on Eth Sepolia network
const PullOracleAddress = "0x0b2d8Ef1D9104c4Df5C89F00B645Ce8bAa56DeB5"

const PushConsumerModule = buildModule("PushConsumerModule", (m) => {
  const consumer = m.contract("PushConsumer", [PullOracleAddress]);

  return { consumer };
});

export default PushConsumerModule;
