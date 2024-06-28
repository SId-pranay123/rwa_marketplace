// import React, { useState } from 'react';
// import { newRandomWallet } from '@nibiruchain/nibijs';
// import { WalletStatus } from "@cosmos-kit/core";
// import { useChain } from "@cosmos-kit/react";
// import { chain } from "../config";

// const Button = ({ onClick, text }) => (
//   <button
//     onClick={onClick}
//     className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
//   >
//     {text}
//   </button>
// );

// const LoaderCircles = ({ count }) => (
//   <div className="flex space-x-1">
//     {[...Array(count)].map((_, i) => (
//       <div key={i} className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" />
//     ))}
//   </div>
// );

// export default function CreateWallet() {
//   const handleWalletCreated = (address: string, mnemonic: string) => {
//     console.log('Wallet created:', address, mnemonic);
//     // You can handle the created wallet here, like saving to secure storage
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <CreateWalletComponent onWalletCreated={handleWalletCreated} />
//     </div>
//   );
// }

// interface CreateWalletComponentProps {
//   onWalletCreated?: (address: string, mnemonic: string) => void;
// }

// const CreateWalletComponent: React.FC<CreateWalletComponentProps> = ({ onWalletCreated }) => {
//   const [walletName, setWalletName] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [mnemonic, setMnemonic] = useState<string>('');
//   const [address, setAddress] = useState<string>('');
//   const { connect, status, openView } = useChain(chain.chainName);

//   const handleCreateWallet = async () => {
//     try {
//       const wallet = await newRandomWallet();
//       const [{ address }] = await wallet.getAccounts();
//       setMnemonic(wallet.mnemonic);
//       setAddress(address);

//       if (onWalletCreated) {
//         onWalletCreated(address, wallet.mnemonic);
//       }

//       console.log("Mnemonic:", wallet.mnemonic);
//       console.log("Address:", address);
//     } catch (error) {
//       console.error('Error creating wallet:', error);
//     }
//   };

//   const renderConnectButton = () => {
//     switch (status) {
//       case WalletStatus.Disconnected:
//         return <Button onClick={() => connect()} text="Connect Wallet" />;
//       case WalletStatus.Connecting:
//         return (
//           <div className="w-full flex justify-center">
//             <LoaderCircles count={5} />
//           </div>
//         );
//       case WalletStatus.Connected:
//         return <Button onClick={() => openView()} text={address ?? "Connected"} />;
//       case WalletStatus.Rejected:
//         return <Button onClick={() => connect()} text="Try Again" />;
//       case WalletStatus.Error:
//         return <Button onClick={() => openView()} text="Change Wallet" />;
//       case WalletStatus.NotExist:
//         return <Button onClick={() => openView()} text="Install Wallet" />;
//       default:
//         return <Button onClick={() => openView()} text="Connect Wallet" />;
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto p-4 border rounded-lg shadow-md bg-white">
//       <h2 className="text-2xl font-bold mb-4">Create or Connect Wallet</h2>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">Wallet Name</label>
//         <input
//           type="text"
//           value={walletName}
//           onChange={(e) => setWalletName(e.target.value)}
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">Password</label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//         />
//       </div>
//       <div className="flex space-x-2 mb-4">
//         <Button onClick={handleCreateWallet} text="Create New Wallet" />
//         {renderConnectButton()}
//       </div>
//       {mnemonic && (
//         <div className="mt-6 p-4 bg-gray-50 border rounded-md">
//           <h3 className="text-lg font-semibold mb-2">Mnemonic Phrase</h3>
//           <p className="text-red-600 mb-2">
//             Please write down this mnemonic phrase and keep it safe. It is essential for recovering your wallet.
//           </p>
//           <p className="break-words font-mono">{mnemonic}</p>
//         </div>
//       )}
//       {address && (
//         <div className="mt-4">
//           <h3 className="text-lg font-semibold mb-1">Wallet Address</h3>
//           <p className="break-words font-mono">{address}</p>
//         </div>
//       )}
//     </div>
//   );
// };