import React from "react";
import {
  Auctions_categories,
  Feature_collections,
  NewseLatter,
  Partners,
  Top_collection,
} from "../components/component";
import Meta from "../components/Meta";
import Hero_4 from "../components/hero_4";
import CoverflowCarousel from "../components/coverflowCarousel";
import Header01 from "../components/header/Header01";
import Footer from '../components/footer'
import Collection_items from "../components/collectrions/Collection_items";

const Home_4 = () => {
  return (
    <>
      <Header01 />
      {/* <Hero_4 /> */}
      {/* <CoverflowCarousel /> */}
      {/* <Top_collection /> */}
      {/* <Feature_collections /> */}


      <section className="relative mt-20">
            {/* <picture className="pointer-events-none absolute inset-x-0 top-0 -z-10 dark:hidden">
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
            </picture> */}
      <div className="container py-20">
        <h1 className="font-display text-jacarta-700  text-center text-4xl font-medium dark:text-white">
          Marketplace
        </h1>
        <div className="mx-auto max-w-[25rem] my-5">
          {/* <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
            placeholder="Search by seller address"
          /> */}
        </div>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {filteredNFTs.map((nft) => (
            <div key={nft.id} className="border rounded-lg p-4 dark:bg-jacarta-700 border-jacarta-100 dark:border-jacarta-600">
              <img src={nft.image} alt={`NFT ${nft.id}`} className="w-full h-64 object-cover rounded-lg mb-4" />
              <div className="text-lg font-semibold dark:text-white">{nft.price}</div>
              <div className="text-sm text-gray-500 dark:text-gray-300">
                {nft.seller}
              </div>
            </div>
          ))}
        </div> */}
        <Collection_items />
      </div>
    </section>


      {/* <Footer/> */}
    </>
  );
};

export default Home_4;
