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

const Home_4 = () => {
  return (
    <>
      <Header01 />
      <Hero_4 />
      <CoverflowCarousel />
      <Top_collection />
      <Feature_collections />
      <Footer />
    </>
  );
};

export default Home_4;
