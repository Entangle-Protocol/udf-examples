# Solana. Sample client for fetching data via the PULL model

This project includes a sample script that interacts with the `udf_solana` program to verify the latest price of the given asset e.g. "BTC/USD"

First of all, the script fetches the predefined IDL stored on-chain, which is kept in sync with the [price verifier program](https://github.com/Entangle-Protocol/udf-price-oracle-solana/tree/master/programs/price-consumer) it is derived from.
Then it derives an address of the given asset to let solana know what data account is due to be verified when
the `udf_solana` is invoked from the `price_consumer`. It constructs and sends a transaction to the solana localnet.

It's important to note that before running the script, the programs must be deployed on the local Solana network,
and tests should be executed to initialize the state.
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
ANCHOR_WALLET=owner.json ANCHOR_PROVIDER_URL=http://localhost:8899  yarn ts-node src/main.ts "BTC/USD"
publisher: 6BYZbgcD2vfzJuxezN1jKRJZwhLETW95zmQzLKSiP7XK
price oracle: 7HramSnctpbXqZ4SEzqvqteZdMdj3tEB2c9NT7egPQi7
config:  2r6evAGjhh5htsfHZP4hMLv6Ppa1KeY9K34Nz3nAMs5u
protocol info:  3skPHvBJyYRKnJ9MvyD4VJVJRjai3oatCUZEzKzKAzY3
latest update:  FUxQxtbFZ649zyankGucZ7dY2H5csfHyktnvxn7dzAWB
Verify price transaction signature 33kTsu1canzpAUtWooooV1XguqW59GrqyRdF5dyeDat1M5adTpD7LUVZvgu2SdiWehi4F7mByJoWc64UJGb7PLJo
Last  BTC/USD  price is: 66734.13341275767
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

The output in this certain case shows the "NGL/USD" data feed is written at the `FUxQxtbFZ649zyankGucZ7dY2H5csfHyktnvxn7dzAWB` 
address within the transaction `33kTsu1canzpAUtWooooV1XguqW59GrqyRdF5dyeDat1M5adTpD7LUVZvgu2SdiWehi4F7mByJoWc64UJGb7PLJo`.
The logs eventually confirm that the Universal Data Feeds protocol's PULL model is working as expected.


