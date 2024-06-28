import { NibiruTxClient, newSignerFromMnemonic, Msg, TxMessage, Localnet, Testnet } from "@nibiruchain/nibijs";

// Step 1: Define the chain and endpoint
export const CHAIN = Testnet(1);  // You can replace this with the appropriate chain environment

// Step 2: Create a signer from your mnemonic
async function executeBuyTransaction() {
  const mnemonic = "soup junior noble awesome hobby proud elevator lyrics faith stereo kidney seek minimum wool use digital involve stick olive smoke intact chef mobile alcohol"; // Replace with your actual mnemonic
  const signer = await newSignerFromMnemonic(mnemonic);
  const [{ address: fromAddr }] = await signer.getAccounts();

  // Step 3: Connect to the transaction client
  const txClient = await NibiruTxClient.connectWithSigner(CHAIN.endptTm, signer);

  // Step 4: Construct the transaction message
  // const nftId = "your-nft-id"; // Replace with the ID of the NFT you want to buy
  // const paymentAmount = coin("1000", "unusd"); // Replace with the amount and currency you need to pay

  const buyMsg: TxMessage = {
    typeUrl: "/nibiru.nft-marketplace.listings_by_contract_address",  // Replace with the actual type URL for the buy function in your NFT contract
    value: {
      contract_address: "nibi1gu49g3vndt6ued4k329j83xvkf4nk236vqm6zsxattztwxqnztfqnpu6p7"
    },
  };

  // Step 5: Broadcast the transaction
  const txResponse = await txClient.signAndBroadcast(fromAddr, [buyMsg], "auto");

  console.log("Transaction response:", txResponse);
}

executeBuyTransaction();
