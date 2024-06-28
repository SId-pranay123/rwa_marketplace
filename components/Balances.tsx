// import React, { useState, useEffect } from 'react';
// import { useChain } from "@cosmos-kit/react";
// import { chain } from "../config";
// import { useNibiruClient } from '../context';
// import { NibiruQuerier, NibiruTxClient } from "@nibiruchain/nibijs";
// import { coin, coins } from "@cosmjs/proto-signing";
// import { SigningStargateClient } from "@cosmjs/stargate";
// import Button from "./Button";

// const CHAIN = {
//   chainId: "nibiru-testnet-2",
//   rpc: "https://rpc.testnet-2.nibiru.fi",
//   rest: "https://lcd.testnet-2.nibiru.fi",
//   denom: "unibi"
// };

// const Balances: React.FC = () => {
//   const bigIntStringify = (key: string, value: any) => {
//     return typeof value === 'bigint' ? value.toString() : value;
//   };
  
//   const { address, getSigningStargateClient } = useChain(chain.chainName);
//   const [balances, setBalances] = useState<coin[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [txResult, setTxResult] = useState(null);
//   const [recipientAddress, setRecipientAddress] = useState<string>("");
//   const [amount, setAmount] = useState<string>("");
//   const [blockInfo, setBlockInfo] = useState(null);

//   useEffect(() => {
//     if (address) {
//       fetchBalances();
//       fetchBlockInfo();
//     }
//   }, [address]);

//   const fetchBalances = async () => {
//     if (!address) {
//       setError("Address is not available");
//       return;
//     }

//     try {
//       const querier = await NibiruQuerier.connect(CHAIN.rpc);
//       const coins = await querier.getAllBalances(address);
//       setBalances(coins);
//       setError(null);
//     } catch (err) {
//       console.error("Error fetching balances:", err);
//       setError("Failed to fetch balances");
//     }
//   };

//   const sendFunds = async () => {
//     if (!address) {
//       setError("Address is not available");
//       return;
//     }

//     if (!recipientAddress || !amount) {
//       setError("Please enter recipient address and amount");
//       return;
//     }

//     try {
//       const stargateClient: SigningStargateClient = await getSigningStargateClient();
//       if (!stargateClient) {
//         throw new Error("Failed to get signing client. Is your wallet connected?");
//       }

//       const txClient = await NibiruTxClient.connectWithSigner(CHAIN.rpc, stargateClient.signer);

//       const amountInUnibi = coins(Math.floor(Number(amount) * 1_000_000), CHAIN.denom);

//       const txResponse = await txClient.sendTokens(
//         address,
//         recipientAddress,
//         amountInUnibi,
//         "auto",
//         "Transaction memo"
//       );

//       setTxResult(txResponse);
//       setError(null);

//       // Clear input fields
//       setRecipientAddress("");
//       setAmount("");

//       // Refresh balances after sending
//       await fetchBalances();
//       await fetchBlockInfo();
//     } catch (err) {
//       console.error("Error sending funds:", err);
//       setError(`Failed to send funds: ${err instanceof Error ? err.message : String(err)}`);
//     }
//   };

//   async function getContract(){
    
//   }

//   const fetchBlockInfo = async () => {
//     try {
//       const querier = await NibiruQuerier.connect(CHAIN.rpc);
//       const latestBlock = await querier.getBlock();
//       setBlockInfo(latestBlock);
//     } catch (err) {
//       console.error("Error fetching block info:", err);
//       setError("Failed to fetch block info");
//     }
//   };

//   return (
//     <div>
//       <Button text="get Balances" onClick={fetchBalances} />
//       {balances.length > 0 && (
//         <div>
//           <h3>Balances:</h3>
//           {balances.map((balance, index) => (
//             <p key={index}>{balance.amount} {balance.denom}</p>
//           ))}
//         </div>
//       )}
//       {balances.length === 0 && !error && <div>No balances to display</div>}
      
//       <h3>Send Funds</h3>
//       <input
//         type="text"
//         placeholder="Recipient Address"
//         value={recipientAddress}
//         onChange={(e) => setRecipientAddress(e.target.value)}
//       />
//       <input
//         type="number"
//         placeholder="Amount (NIBI)"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//       />
//       <Button text="Send Funds" onClick={sendFunds} />
      
//       {error && <div style={{ color: 'red' }}>{error}</div>}
//       {txResult && (
//         <div>
//           <h2>Transaction Result</h2>
//           console.log(JSON.stringify(txResult, bigIntStringify, 2))
//         </div>
//       )}

//       <h3>Latest Block Info (Recent Transactions)</h3>
//       <Button text="Refresh Block Info" onClick={fetchBlockInfo} />
//       {blockInfo && (
//         <div>
//           <pre>{JSON.stringify(blockInfo, bigIntStringify, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// };
// export default Balances;