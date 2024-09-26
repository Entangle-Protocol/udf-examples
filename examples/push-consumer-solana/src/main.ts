import * as anchor from "@coral-xyz/anchor";
import { Program, web3 } from "@coral-xyz/anchor";
import { utf8 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";

import solana from '@solana/web3.js';

const UDF_ROOT = utf8.encode("UDF0");

const UDF_PROTOCOL_ID = Buffer.from(
    utf8.encode(
        "universal-data-feeds3\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
    )
);

async function main() {
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider)
    const consumerProgramAddress = new solana.PublicKey('3r5ixGQu8DRmJWgFEjwnDUQ6yasfYFXDsUbqkA6gkRtv')
    const idl = await anchor.Program.fetchIdl(consumerProgramAddress, provider);
    const consumerProgram = new Program(idl!, consumerProgramAddress, provider);
    const udf_program_id = new web3.PublicKey("7HramSnctpbXqZ4SEzqvqteZdMdj3tEB2c9NT7egPQi7");

    let utf8Encode = new TextEncoder();
    const dataKey = new Uint8Array(32);
    dataKey.set(utf8Encode.encode("NGL/USD"));

    let latestUpdatePda = web3.PublicKey.findProgramAddressSync(
        [UDF_ROOT, utf8.encode("LAST_UPDATE"), UDF_PROTOCOL_ID, dataKey],
        udf_program_id
    )[0];

    let getLastPriceTx = await consumerProgram.methods
        .consumePrice(dataKey)
        .accounts({
            signer: provider.publicKey,
            priceOracle: udf_program_id,
            latestUpdate: latestUpdatePda,
        })
         .rpc();
    console.log("Consume tx signature", getLastPriceTx);
}

main().catch((err) => {
    console.error(err);
});