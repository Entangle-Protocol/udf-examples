// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

interface IUDFOracle {

    struct LatestUpdate {
        // @notice The price for asset from latest update
        uint256 latestPrice;
        // @notice The timestamp of latest update
        uint256 latestTimestamp;
    }

    // @notice Accept updates encoded to bytes, verifies the updates and returns update from calldata. Reverts if the update is not in message
    // @param updateMsg Encoded message from oracle
    // @param dataFeedId Array of data feed ids
    function getOraclePriceUpdateFromMsg(
        bytes calldata updateMsg,
        bytes32 dataFeedId
    ) external payable returns (LatestUpdate memory update);

    // @notice Returns the necessary fee to be attached to getOraclePriceUpdateFromMsg function
    // @return required fee to verify an update
    function getUpdateFee(uint256 nUpdates) external view returns (uint256);
}

contract PullConsumer {
    bytes32 public constant BTC_KEY = bytes32("BTC/USD");

    // @notice UDFOracle address on specific chain
    IUDFOracle public oracle;

    constructor(address _udfOracle) {
        oracle = IUDFOracle(_udfOracle);
    }

    event PriceVerified(bytes32, uint256, uint256);

    // @notice function that verifies BTC/USD feed from provided update through UDFOracle and
    // emits an event if the update is valid, otherwise reverts with a custom error
    function verifyPrice(
        bytes calldata updateMsg
    ) public {

        // Calculate required fee
        uint256 fee = oracle.getUpdateFee(1);

        // Verify the update through UDFOracle
        IUDFOracle.LatestUpdate memory update = oracle.getOraclePriceUpdateFromMsg{value: fee}(updateMsg, BTC_KEY);

        // Emit event with verified update
        emit PriceVerified(BTC_KEY, update.latestPrice, update.latestTimestamp);
    }

    // @notice deposit native tokens for fee coverage
    receive() payable external {}
}
