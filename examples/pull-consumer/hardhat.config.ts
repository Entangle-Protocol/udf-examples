import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    eth_sepolia: {
        chainId: 11155111,
        url: process.env.ETH_SEPOLIA_URL || "",
        accounts: [ process.env.ETH_SEPOLIA_DEPLOYER! ],
    },
  },
};

export default config;
