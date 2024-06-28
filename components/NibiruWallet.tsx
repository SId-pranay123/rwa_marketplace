'use client';
import React, { useState } from 'react';
import { newRandomWallet, NibiruQuerier, NibiruTxClient, newSignerFromMnemonic, Msg, Testnet } from "@nibiruchain/nibijs";
import { coin } from "@cosmjs/proto-signing";

const CHAIN = Testnet(2);

export default function NibiruWallet() {
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState(null);
  const [blockInfo, setBlockInfo] = useState(null);
  const [perpMarkets, setPerpMarkets] = useState(null);
  const [spotPools, setSpotPools] = useState(null);
  const [txResult, setTxResult] = useState(null);

  async function createWallet() {
    const newWallet = await newRandomWallet();
    const [{ address }] = await newWallet.getAccounts();
    setWallet({ mnemonic: newWallet.mnemonic, address });
  }

  async function getWalletInfo() {
    if (!wallet) {
      alert("Please create a wallet first");
      return;
    }

    const querier = await NibiruQuerier.connect(CHAIN.endptTm);

    // Query balances
    const balances = await querier.getAllBalances(wallet.address);
    setBalance(balances);

    // Query block
    const blockHeight = 8934027;
    // const block = await querier.getBlock(blockHeight);
    // setBlockInfo(block);

    // Query PERP markets
    const markets = await querier.nibiruExtensions?.perp.markets();
    setPerpMarkets(markets);

    // Query SPOT pools
    const pools = await querier.nibiruExtensions.spot.pools();
    setSpotPools(pools);
  }

  async function sendFunds() {
    if (!wallet) {
      alert("Please create a wallet first");
      return;
    }

    const signer = await newSignerFromMnemonic(wallet.mnemonic);
    const txClient = await NibiruTxClient.connectWithSigner(CHAIN.endptTm, signer);

    const exampleAddress = prompt("Enter the Address");
    const tokens = coin(5, "unibi");

    try {
      const txResp = await txClient.sendTokens(
        wallet.address,
        exampleAddress,
        [tokens],
        5000 
      );
      setTxResult(txResp);
    } catch (error) {
      console.error("Error sending funds:", error);
      setTxResult("Error: " + error.message);
    }
  }

  async function performPerpOperation() {
    if (!wallet) {
      alert("Please create a wallet first");
      return;
    }

    const signer = await newSignerFromMnemonic(wallet.mnemonic);
    const txClient = await NibiruTxClient.connectWithSigner(CHAIN.endptTm, signer);
    const pair = "ubtc:unusd";

    const msgs = [
      Msg.perp.openPosition({
        sender: wallet.address,
        pair: pair,
        quoteAssetAmount: 10,
        leverage: 1,
        goLong: true,
        baseAssetAmountLimit: 0,
      }),
      Msg.perp.addMargin({
        sender: wallet.address,
        pair: pair,
        margin: coin("20", "unusd"),
      }),
      Msg.perp.removeMargin({
        sender: wallet.address,
        pair: pair,
        margin: coin("5", "unusd"),
      }),
    ];

    try {
      const txResp = await txClient.signAndBroadcast(wallet.address, msgs, "auto");
      setTxResult(txResp);
    } catch (error) {
      console.error("Error performing PERP operation:", error);
      setTxResult("Error: " + error.message);
    }
  }

  return (
    <div className='flex flex-col gap-5 w-[500px]'>
      <h1>Nibiru Wallet App</h1>
      <button onClick={createWallet} className='border rounded-full'>Create Wallet</button>
      {wallet && (
        <div className='border'>
          <h2>Wallet Info</h2>
          <p>Address: {wallet.address}</p>
          <p>Mnemonic: {wallet.mnemonic}</p>
        </div>
      )}
      <button onClick={getWalletInfo}>Get Wallet Info</button>
      <button onClick={sendFunds}>Send Funds</button>
      <button onClick={performPerpOperation}>Perform PERP Operation</button>
      {balance && (
        <div>
          <h2>Balance</h2>
          <pre>{JSON.stringify(balance, null, 2)}</pre>
        </div>
      )}
      {blockInfo && (
        <div>
          <h2>Block Info</h2>
          <pre>{JSON.stringify(blockInfo, null, 2)}</pre>
        </div>
      )}
      {perpMarkets && (
        <div>
          <h2>PERP Markets</h2>
          <pre>{JSON.stringify(perpMarkets, null, 2)}</pre>
        </div>
      )}
      {spotPools && (
        <div>
          <h2>SPOT Pools</h2>
          <pre>{JSON.stringify(spotPools, null, 2)}</pre>
        </div>
      )}
      {txResult && (
        <div>
          <h2>Transaction Result</h2>
          <pre>{JSON.stringify(txResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}