import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// UDFOracle address on Eth Sepolia network
// TODO: Change address
const UDFOracleAddress = "0x0b2d8Ef1D9104c4Df5C89F00B645Ce8bAa56DeB5";

const PullConsumerModule = buildModule("PullConsumerModule", (m) => {
	const consumer = m.contract("PullConsumer", [UDFOracleAddress]);

	return { consumer };
});

export default PullConsumerModule;
