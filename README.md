<img src="doc/entangle.avif" alt="Entangle" style="width:100%;"/>

# Entangle Universal Data Feeds guidance through examples

This repository provides a set of examples to help developers integrate with Entangle Universal Data Feeds (UDF). 
It includes sample client projects demonstrating how to implement the Entangle UDF protocol's PULL and PUSH models 
across various blockchains supported by Entangle.

It offers practical, chain-specific guides to help developers implement client contracts and backend services for both 
the PULL and PUSH models.

For detailed information about the UDF protocol, refer to the Universal Data Feeds Guide on the 
[Entangle documentation website](https://docs.entangle.fi/universal-data-feeds-guides/how-to-integrate).
This guide provides an in-depth overview of UDF and its integration methods.

The examples in this repository allow for a deep dive into the implementation of PULL and PUSH models on supported networks. 
This list will grow as new chains are added to the protocol.


## Table of Contents

- [EVM. Sample client for fetching data via the PUSH model](./examples/push-consumer)
- [EVM. Sample client for fetching data via the PULL model](./examples/pull-consumer)
- [Solana. Sample client for fetching data via the PUSH model](./examples/push-consumer-solana)
- [Solana. Sample client for fetching data via the PULL model](./examples/pull-consumer-solana)
- [Changelog](CHANGELOG.md)
- [Contributing](CONTRIBUTING.md)
- [License](LICENSE)
