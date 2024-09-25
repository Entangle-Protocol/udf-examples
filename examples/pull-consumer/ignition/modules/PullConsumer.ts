import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// PullOracle address on Eth Sepolia network
const PullOracleAddress = "0x0b2d8Ef1D9104c4Df5C89F00B645Ce8bAa56DeB5";

const PullConsumerModule = buildModule("PullConsumerModule", (m) => {
	const consumer = m.contract("PullConsumer", [PullOracleAddress]);

	return { consumer };
});

export default PullConsumerModule;
