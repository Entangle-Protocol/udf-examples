import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// UDFOralce address on Eth Sepolia network
// TODO: Change address
const UDFOracleAddress = "0x0b2d8Ef1D9104c4Df5C89F00B645Ce8bAa56DeB5"

const PushConsumerModule = buildModule("PushConsumerModule", (m) => {
  const consumer = m.contract("PushConsumer", [UDFOracleAddress]);

  return { consumer };
});

export default PushConsumerModule;
