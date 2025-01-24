import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// UDFOralce address on Eth Sepolia network
const UDFOracleAddress = "0xa22Cb39480D660c1C68e3dEa2B9b4e3683773035"

const PushConsumerModule = buildModule("PushConsumerModule", (m) => {
  const consumer = m.contract("PushConsumer", [UDFOracleAddress]);

  return { consumer };
});

export default PushConsumerModule;
