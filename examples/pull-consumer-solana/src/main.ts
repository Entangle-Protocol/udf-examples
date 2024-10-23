import * as anchor from "@coral-xyz/anchor";
import { BN, Program, web3 } from "@coral-xyz/anchor";
import { utf8 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import solana from '@solana/web3.js';

import { fetchPriceFeed} from "./fetch_udf"
import { base64 } from "ethers/lib/utils";


const UDF_ROOT = utf8.encode("UDF0");
const PHOTON_ROOT = utf8.encode("r0");
const UDF_PROTOCOL_ID = Buffer.from(
    utf8.encode(
        "universal-data-feeds3\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
    )
);

const FinalizedSnapUrl = "https://pricefeed.entangle.fi";
const FinalizedSourceID = "prices-feed1";
let utf8Encode = new TextEncoder();

async function fetch_last_price(asset: string) {

    const url = new URL(`${FinalizedSnapUrl}/spotters/${FinalizedSourceID}`);
    url.searchParams.append('assets', asset);
    console.log("Fetch data feed from the", url.toString());
    const updateRes = await fetchPriceFeed(url.toString());
    if (updateRes.calldata.feeds.length === 0) {
        throw new Error('No feeds found');
    }

    let origin_feed = updateRes.calldata.feeds[0];

    const dataKey1 = new Uint8Array(32);
    dataKey1.set(utf8Encode.encode(origin_feed.key));


    let timestamp = new anchor.BN(origin_feed.value.timestamp);
    let dataFeed1 = {
        timestamp: timestamp,
        dataKey: Array.from(dataKey1),
        data: Array.from(Buffer.from(origin_feed.value.data, 'base64')),
        merkleProof: origin_feed.merkleProofs.map(proof => {
            return Array.from(Buffer.from(proof, 'base64'));
        })
    };

    let signatures = updateRes.calldata.signatures.map(signature => {
        return {
            v: signature.V,
            r: Buffer.from(signature.R.substring(2), "hex"),
            s: Buffer.from(signature.S.substring(2), "hex")
        };
    });

    let merkleRoot = Array.from(Buffer.from(updateRes.calldata.merkleRoot.substring(2), "hex"));
    return {
        dataFeed: dataFeed1,
        signatures: signatures,
        merkleRoot: merkleRoot
    }
}

async function main() {

    const args = process.argv.slice(2);
    const asset = args[0];
    console.log("Asset is being requested:", asset)

    let lastPriceData = await fetch_last_price(asset);

    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider)
    const consumerProgramId = new web3.PublicKey("GHzaqPXQUSQ4AD9c7w7dgA3LR4ztZYTDGKqs5E2JZTwJ");
    const consumerProgramIdl = await anchor.Program.fetchIdl(consumerProgramId, provider);
    const consumerProgram = new Program(consumerProgramIdl!, consumerProgramId, provider);
    const publisher = anchor.web3.Keypair.fromSecretKey(Uint8Array.from(require("../publisher.json")));

    const udfProgramId = new web3.PublicKey("7HramSnctpbXqZ4SEzqvqteZdMdj3tEB2c9NT7egPQi7");
    const udfProgramIdl = await anchor.Program.fetchIdl(udfProgramId, provider);
    const udfProgram = new Program(udfProgramIdl!, udfProgramId, provider);
    const ccmProgramId = new solana.PublicKey('pccm961CjaR7T7Hcht9omrXQb9w54ntJo95FFT7N9AJ')

    const computeBudgetIx = web3.ComputeBudgetProgram.setComputeUnitLimit({ units: 400000 });
    let verifyPriceTx = new web3.Transaction();
    verifyPriceTx.add(computeBudgetIx);

    const dataKey = new Uint8Array(32);
    dataKey.set(utf8Encode.encode(asset));

    let latestUpdatePda = web3.PublicKey.findProgramAddressSync(
        [UDF_ROOT, utf8.encode("LAST_UPDATE"), UDF_PROTOCOL_ID, dataKey],
        udfProgram.programId
    )[0];

    const udfConfig = web3.PublicKey.findProgramAddressSync(
        [UDF_ROOT, utf8.encode("CONFIG")],
        udfProgram.programId
    )[0];

    const udfProtocolInfo = web3.PublicKey.findProgramAddressSync(
        [PHOTON_ROOT, utf8.encode("PROTOCOL"),
            UDF_PROTOCOL_ID], ccmProgramId
    )[0];

    console.log("publisher:", publisher.publicKey.toBase58())
    console.log("price oracle:", udfProgram.programId.toBase58())
    console.log("config: ", udfConfig.toBase58())
    console.log("protocol info: ", udfProtocolInfo.toBase58())
    console.log("latest update: ", latestUpdatePda.toBase58())

    const verifyPriceIx = await consumerProgram.methods.verifyPrice(lastPriceData)
        .accounts({
                publisher: publisher.publicKey,
                priceOracle: udfProgramId,
                config: udfConfig,
                protocolInfo: udfProtocolInfo,
                latestUpdate: latestUpdatePda,
                systemProgram: web3.SystemProgram.programId
            }
        )
        .signers([publisher]).instruction();
    verifyPriceTx.add(verifyPriceIx);
    const signature = await provider.sendAndConfirm(verifyPriceTx, [publisher], { skipPreflight: false });
    console.log("Verify price transaction signature", signature);
    const result = await provider.simulate(verifyPriceTx)
    const resultNum = new BN(base64.decode(result.returnData!.data[0]), 10, "be");
    const divisor = new BN("1000000000000000000", 10);
    const int = parseFloat(resultNum.div(divisor).toString())
    const reminder = parseFloat(resultNum.mod(divisor).toString(10)) / parseFloat(divisor.toString(10));
    console.log("Last ", asset, " price is:", int + reminder)
}

main().catch((err) => {
    console.error(err);
});
