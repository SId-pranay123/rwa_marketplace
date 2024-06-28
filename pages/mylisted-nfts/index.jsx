import React, { useState, useEffect } from "react";

const mockListedNFTs = [
  {
    id: 1,
    image: "https://example.com/nft1.jpg",
    price: "2 ETH",
    seller: "0xABC123...DEF456",
  },
  {
    id: 2,
    image: "https://example.com/nft2.jpg",
    price: "3.5 ETH",
    seller: "0xGHI789...JKL012",
  },
  // Add more mock NFT data as needed
];

export default function MyListedNFTs() {
  const [listedNFTs, setListedNFTs] = useState(mockListedNFTs);

  useEffect(() => {
    // Replace with your API call to fetch listed NFTs
    // fetchListedNFTs().then(data => setListedNFTs(data));
  }, []);

  return (
    <section className="relative">
            <picture className="pointer-events-none absolute inset-x-0 top-0 -z-10 dark:hidden">
                <img
                    className="h-full w-full"
                    src="/images/gradient.jpg"
                    alt="gradient"
                />
                </picture>
                <picture className="pointer-events-none absolute inset-x-0 top-0 -z-10 hidden dark:block">
                <img
                    className="h-full w-full"
                    src="/images/gradient_dark.jpg"
                    alt="gradient dark"
                />
            </picture>
      <div className="container  py-20">
        <h1 className="font-display text-jacarta-700 py-10 text-center text-4xl font-medium dark:text-white">
          My Listed NFTs
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {listedNFTs.map((nft) => (
            <div key={nft.id} className="border rounded-lg p-4 dark:bg-jacarta-700 border-jacarta-100 dark:border-jacarta-600">
              <img src={nft.image} alt={`NFT ${nft.id}`} className="w-full h-64 object-cover rounded-lg mb-4" />
              <div className="text-lg font-semibold dark:text-white">{nft.price}</div>
              <div className="text-sm text-gray-500 dark:text-gray-300">
                {nft.seller}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
