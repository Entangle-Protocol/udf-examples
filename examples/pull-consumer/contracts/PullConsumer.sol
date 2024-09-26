// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

interface IPullOracle {
    /// @dev Represents a digital signature
    struct Signature {
        bytes32 r; // The first 32 bytes of the signature
        bytes32 s; // The second 32 bytes of the signature
        uint8 v; // The recovery byte
    }

    // @notice Verifies that the update was emitted on EOB. It does so by checking
    // @dev following properties:
    // * Calculated merkle root of (Update + merkle proofs) is equal to the provided merkle root
    // * Validate the signatures of EOB agents on the Merkle root to ensure
    //   merkle root integrity. The consensus check passes only if the number of valid
    //   unique signatures meets or exceeds the protocol's consensus rate threshold.
    function getLastPrice(
        bytes32 merkleRoot,
        bytes32[] calldata merkleProof,
        Signature[] calldata signatures,
        bytes32 dataKey,
        uint256 price,
        uint256 timestamp
    ) external returns (uint256);
}


contract PullConsumer {
    // @notice PullOracle address on specific chain
    IPullOracle public pullOracle;

    constructor(address _pullOracle) {
        pullOracle = IPullOracle(_pullOracle);
    }

    event PriceVerified(bytes32, uint256, uint256);

    // @notice function that verifies the provided update through PullOracle and
    // emits an event if the update is valid, otherwise reverts with a custom error
    function verifyPrice(
        bytes32 merkleRoot,
        bytes32[] calldata merkleProof,
        IPullOracle.Signature[] calldata signatures,
        bytes32 dataKey,
        uint256 updatePrice,
        uint256 updateTimestamp
    ) public {

        // Verify the update through PullOracle
        uint256 verifiedPrice = pullOracle.getLastPrice(
            merkleRoot,
            merkleProof,
            signatures,
            dataKey,
            updatePrice,
            updateTimestamp
        );

        emit PriceVerified(dataKey, verifiedPrice, updateTimestamp);
    }
}
