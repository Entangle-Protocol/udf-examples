# Solana. Sample client for fetching data via PULL MODEL

This project includes a sample script that interacts with the [udf_solana](https://github.com/Entangle-Protocol/udf-price-oracle-solana/tree/master/programs/udf-solana) program, utilizing a predefined data feed typically obtained from [pricefeed.entangle.fi](https://pricefeed.entangle.fi/).

The PULL model is designed for publishing assets not already available through the PUSH model. In this context, a sample client like the one provided here should first fetch the necessary data from [pricefeed.entangle.fi](https://pricefeed.entangle.fi/) and then interact with the price oracle program to verify whether the price feed is signed by certified transmitters. It's important to note that once the price feed is verified, it becomes available on-chain.

Key Steps of the Script:

- Fetching the IDL: The script first retrieves the predefined IDL stored on-chain, which remains synchronized with the udf_solana program from which it is derived.
- Deriving UDF Config and Protocol Info Account Addresses: The UDF configuration and protocol information account addresses are derived from the UDF program and the Photon CCM program addresses, respectively. These program-derived addresses are included in the accounts section of the Solana transaction to locate the appropriate data feed accounts and the protocol ID. The protocol ID is necessary to identify the correct transmitters for verifying the validity of the feeds.
- Determining the Latest Update Address: The latest update address, derived in a similar manner, is used to store the updated data and corresponds to the "NGL/USD" data feed, which is embedded in the code.
- Preparing and Sending the getLastPrice Transaction: Next, the getLastPrice transaction is prepared and sent to the Solana network. The latest update address is included in the remaining accounts section of the transaction. The publisher, acting as the signer, covers the transaction fees and allocates space for the price feed account if it does not already exist and requires allocation.
- Validating the Return Data: Finally, the return data is checked to ensure it contains the expected price, confirming that the transaction has been successfully completed. Once validated, the data is ready for on-chain use.

This process ensures the integrity and availability of price data on-chain, following proper verification procedures using the PULL model of the UDF protocol.

### Initialize project

To make script be able to run the node environment is to be set up. It installs the dependencies are listed in the `package.json`

```shell
yarn install
yarn install v1.22.22
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
Done in 3.62s.
```

### Running the script

```shell
ANCHOR_WALLET=owner.json ANCHOR_PROVIDER_URL=http://localhost:8899  yarn ts-node src/main.ts 
Data feed pda 9RD6d4hnShVGP3DA73DviceLe8JLp53BB3rBZeuFnWKy
Get last price transaction signature edSQTo1AEnpEuPXYxqS3QtrNzknkpANWsS4Ae93YM4tvgGy4bFLThWBbbgfBBqU2EBei9SmRfKfrmpP3XZsQ1NJ
Last NGL/USD price is: 0.1298982833830552
```

The output in this certain case shows the "NGL/USD" data feed is written at the `9RD6d4hnShVGP3DA73DviceLe8JLp53BB3rBZeuFnWKy` address within the transaction `edSQTo1AEnpEuPXYxqS3QtrNzknkpANWsS4Ae93YM4tvgGy4bFLThWBbbgfBBqU2EBei9SmRfKfrmpP3XZsQ1NJ`.
