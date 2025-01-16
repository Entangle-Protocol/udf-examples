// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

interface IUDFOracle {
    /// @notice mapping of dataKey to the latest update
    function latestUpdate(bytes32 dataKey) external view returns (uint256,uint256);
}

contract PushConsumer {
    // @notice DataKey for NGL/USD asset
    bytes32 constant public NGL_DATAKEY = 0x4e474c2f55534400000000000000000000000000000000000000000000000000;

    // @notice PullOracle address on specific chain
    IUDFOracle public udfOracle;

    constructor(address _udfOracle) {
        udfOracle = IUDFOracle(_udfOracle);
    }

    event PriceConsumed(bytes32 feedKey, uint256 price, uint256 timestamp);

    // @notice function that reads and uses update from PullOracle
    function consumePrice() public {

        // Read latest update from PullOracle contract
        uint256 latestPrice; uint256 latestTimestamp;
        (latestPrice, latestTimestamp) = udfOracle.latestUpdate(NGL_DATAKEY);

        // Emit an event with the latest update
        emit PriceConsumed(NGL_DATAKEY, latestPrice, latestTimestamp);
    }
}
