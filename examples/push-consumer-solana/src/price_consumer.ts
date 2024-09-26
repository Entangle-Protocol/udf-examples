export type PriceConsumer = {
  "version": "0.1.0",
  "name": "price_consumer",
  "instructions": [
    {
      "name": "consumePrice",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "priceOracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "latestUpdate",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "asset",
          "type": "string"
        }
      ]
    }
  ]
};

export const IDL: PriceConsumer = {
  "version": "0.1.0",
  "name": "price_consumer",
  "instructions": [
    {
      "name": "consumePrice",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "priceOracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "latestUpdate",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "asset",
          "type": "string"
        }
      ]
    }
  ]
};
