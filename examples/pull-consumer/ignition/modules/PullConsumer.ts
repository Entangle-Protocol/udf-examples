import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// UDFOracle address on Eth Sepolia network
const UDFOracleAddress = "0xa22Cb39480D660c1C68e3dEa2B9b4e3683773035";

const PullConsumerModule = buildModule("PullConsumerModule", (m) => {
	const consumer = m.contract("PullConsumer", [UDFOracleAddress]);

	return { consumer };
});

export default PullConsumerModule;
