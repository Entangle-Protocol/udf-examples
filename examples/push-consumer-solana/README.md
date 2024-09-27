# Solana. Sample client for fetching data via the PUSH model  

This project includes a sample script that interacts with the udf_solana program to retrieve the latest price of "NGL/USD."

First of all, the script fetches the predefined IDL stored on-chain, which is kept in sync with the [price consumer program]() it is derived from.
Then it derives an address of the "NGL/USD" data feed to let solana know what data account is due to be fetched when 
the `udf_solana` is invoked from the `price_consumer`. It constructs and sends a transaction to the solana localnet.

It's important to note that before running the script, the programs must be deployed on the local Solana network, 
and tests should be executed to initialize the state, ensuring the data feeds are properly distributed in the accounts. 
Detailed instructions can be found in the guide at the [udf-price-oracle-solana repository](https://github.com/Entangle-Protocol/udf-price-oracle-solana) 

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
yarn run v1.22.22
$ .../udf-examples/examples/push-consumer-solana/node_modules/.bin/ts-node src/main.ts
Consume tx signature pn1GEwYcr338xm8XTFbWPWeS3FV23Wff69J1HUX2MRExhg3VHMQpAxRhmm2vXhMXJQTBLFbPhd1Esgcg5afrtxy
Done in 1.88s.
```

It's possible to review the transaction data using the transaction ID provided in the script's logs, as shown in the following sample:

```
> Program logged: "Instruction: ConsumePrice"
> Program invoked: Unknown Program (7HramSnctpbXqZ4SEzqvqteZdMdj3tEB2c9NT7egPQi7)  
> Program logged: "Instruction: LastPrice"  
> Program consumed: 5014 of 192696 compute units  
> Program return: 7HramSnctpbXqZ4SEzqvqteZdMdj3tEB2c9NT7egPQi7 AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAc19zO3642eEkLpmAAAAAA==  
> Program returned success
> Program logged: "Price of: NGL/USD is: 129898283383055207 at: 1723502724"
> Program consumed: 14134 of 200000 compute units
> Program return: 3r5ixGQu8DRmJWgFEjwnDUQ6yasfYFXDsUbqkA6gkRtv AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAc19zO3642eEkLpmAAAAAA==
> Program returned success
```

The logs eventually confirm that the Universal Data Feeds protocol's PUSH model is working as expected.
