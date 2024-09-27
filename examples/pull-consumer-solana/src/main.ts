import { base64 } from "ethers/lib/utils";
import * as anchor from "@coral-xyz/anchor";
import { BN, Program, web3 } from "@coral-xyz/anchor";
import { utf8 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";

import solana from '@solana/web3.js';

const UDF_ROOT = utf8.encode("UDF0");
const PHOTON_ROOT = utf8.encode("r0");
const UDF_PROTOCOL_ID = Buffer.from(
    utf8.encode(
        "universal-data-feeds3\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
    )
);

async function main() {
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider)
    const udfProgramId = new web3.PublicKey("7HramSnctpbXqZ4SEzqvqteZdMdj3tEB2c9NT7egPQi7");
    const udfProgramIdl = await anchor.Program.fetchIdl(udfProgramId, provider);
    const udfProgram = new Program(udfProgramIdl!, udfProgramId, provider);
    const ccmProgramId = new solana.PublicKey('pccm961CjaR7T7Hcht9omrXQb9w54ntJo95FFT7N9AJ')

    const publisher = anchor.web3.Keypair.fromSecretKey(Uint8Array.from(require("../publisher.json")));

    const udfConfig = web3.PublicKey.findProgramAddressSync([UDF_ROOT, utf8.encode("CONFIG")], udfProgramId)[0];
    const udfProtocolInfo = web3.PublicKey.findProgramAddressSync([PHOTON_ROOT, utf8.encode("PROTOCOL"), UDF_PROTOCOL_ID], ccmProgramId)[0];


    let utf8Encode = new TextEncoder();

    const dataKey = new Uint8Array(32);
    dataKey.set(utf8Encode.encode("NGL/USD"));

    let latestUpdatePda = web3.PublicKey.findProgramAddressSync(
        [UDF_ROOT, utf8.encode("LAST_UPDATE"), UDF_PROTOCOL_ID, dataKey],
        udfProgramId
    )[0];
    console.log("Data feed pda", latestUpdatePda.toBase58());

    const data = Array.from(Buffer.from("00000000000000000000000000000000000000000000000001cd7dccedfae367", "hex"));
    const timestamp = new anchor.BN(1723502724);
    let dataFeed = {
        timestamp: timestamp,
        dataKey: Array.from(dataKey),
        data: data,
        merkleProof: [
            Array.from(Buffer.from("387d19e56e66e06b0b7209189a1a66dfbb2b87a4fe56f9cb9f6e4b813a01e821", "hex")),
            Array.from(Buffer.from("f839cf170d834cb6312691d75ce378149a2b9a0b9d7a5c7c07c3ca6a66286b4b", "hex"))
        ],
    };
    let lastPriceData = {
        dataFeed: dataFeed,
        signatures: [{
            v: 28,
            r: Buffer.from("5116c928d3a13a47d2f1c055e57564280f2f455a433d9360292bd8a57f428155", "hex"),
            s: Buffer.from("13df35b89f982306fc42f4e2f074880bc7b5e9d2df6febc6bd7e38e3f8d1b831", "hex"),
        }, {
            v: 28,
            r: Buffer.from("0d09f78606915f60531f3a45b1bb62b75755254eedb58291d4a7805248f2e723", "hex"),
            s: Buffer.from("0cccc0bed37328faa9e6e0a35a63164ef248c785fb58595fe629cac54b1ab08c", "hex"),
        }, {
            v: 27,
            r: Buffer.from("025aa961b80bdec312a87d48c9e084bb5427316c7b0cbd7c79f8fc9f75aced82", "hex"),
            s: Buffer.from("029a25af80fff863a390bcbc967e2e8b17d0aa6da90098577192a3ed4e767d1d", "hex"),
        }],
        merkleRoot: Array.from(Buffer.from("9572fbbba8b66755f38c81e65ae0d13b087f31d86d5e746ca17e27bf2da38d06", "hex"))
    }

    const computeBudgetIx = web3.ComputeBudgetProgram.setComputeUnitLimit({ units: 400000 });
    let getLastPriceTx = new web3.Transaction();
    getLastPriceTx.add(computeBudgetIx);

    const getLastPriceIx = await udfProgram.methods.getLastPrice(lastPriceData)
        .accounts({
            publisher: publisher.publicKey,
            config: udfConfig,
            protocolInfo: udfProtocolInfo,
            systemProgram: web3.SystemProgram.programId
        })
        .remainingAccounts([{ pubkey: latestUpdatePda, isSigner: false, isWritable: true }])
        .signers([publisher]).instruction();
    getLastPriceTx.add(getLastPriceIx);

    const signature = await provider.sendAndConfirm(getLastPriceTx, [publisher]);
    console.log("Get last price transaction signature", signature);
    const result = await provider.simulate(getLastPriceTx);

    if (result?.returnData?.data && result.returnData.data.length > 0) {
        const resultNum = new BN(base64.decode(result.returnData.data[0]), 10, "be");
        const divisor = new BN("1000000000000000000", 10);
        const int = parseFloat(resultNum.div(divisor).toString());
        const reminder = parseFloat(resultNum.mod(divisor).toString(10)) / parseFloat(divisor.toString(10));
        console.log("Last NGL/USDT price is:", int + reminder);
    } else {
        console.error("No return data found in the result.");
    }
}

main().catch((err) => {
    console.error(err);
});
