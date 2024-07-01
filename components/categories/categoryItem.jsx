import React, { useEffect, useState } from "react";
// import Image from "next/image";
import Link from "next/link";
// import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
// import Likes from "../likes";
// import Auctions_dropdown from "../dropdown/Auctions_dropdown";
import { useDispatch, useSelector } from "react-redux";
import { NibiruQuerier, Testnet, newSignerFromMnemonic,Msg } from '@nibiruchain/nibijs';
import { buyModalShow } from "../../redux/counterSlice";
// import {listing_nft} from "../../utils/nibis"
import axios from "axios";
import Item from "../Item";

// async function getData() {

//   const mnemonic = "soup junior noble awesome hobby proud elevator lyrics faith stereo kidney seek minimum wool use digital involve stick olive smoke intact chef mobile alcohol"
//   const CHAIN = Testnet(1);
//   const signer = await newSignerFromMnemonic(mnemonic);
//   const querier = await NibiruQuerier.connect(CHAIN.endptTm);
//   const txClient = await NibiruTxClient.connectWithSigner(CHAIN.endptTm, signer)

//   const msg = Msg.contract.ExecuteMsg({
//     contract: contractAddress,
//     msg: JSON.stringify({
//       exampleFunction: functionParams,
//     }),
//   });

//   const queryMsg = {
//     listings_by_contract_address: {
//       contract_address: "nibi1gu49g3vndt6ued4k329j83xvkf4nk236vqm6zsxattztwxqnztfqnpu6p7"
//     }
//   };

//   const response = await que({
//     contractAddress: "nibi1j65ycuzrawuyntjmgkl26qv3hy4y93xexjuyelrvv9q6n8smvh5sg9jrx6",
//     queryMsg
//   });
//   console.log("Listings: %o", response);
//   return response;
// }

const CategoryItem = () => {
  const { sortedtrendingCategoryItemData } = useSelector(
    (state) => state.counter
  );
  const dispatch = useDispatch();

  const [nftssData, setNftssData] = useState([]);
  const [loader, setLoader] = useState(true);
  
  const nftsData = []  

  const API_BASE_URL = 'https://niburublockchain.chainbros.xyz'; // Replace with your backend server URL


  const fetchData = async (token_uri) => {
    try {
      const {
        data: {name, description, image, document},
      } = await axios.get(token_uri);
      console.log("name: ", name, "description: ", description, "image: ", image, "document: ", document);
      return image;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const func = async (token_id) => {
    let data = JSON.stringify({
      "contractAddress": "nibi1gu49g3vndt6ued4k329j83xvkf4nk236vqm6zsxattztwxqnztfqnpu6p7",
      "token_id": `${token_id}`,
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://niburublockchain.chainbros.xyz/nft_info',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    }
  

    const res = await axios.request(config)
    console.log("res: ", res.data.data.info.token_uri);
    if(res.data.data.info.token_uri[0]!=='i'){
      const imge = await fetchData(res.data.data.info.token_uri)
      console.log("img: ", imge);
      return imge
    }
    // axios.request(config)
    // .then(async (response) => {
    //   const token_uri = response.data.data.info.token_uri
    //   if(token_uri[0]!=='i'){
    //     const imge = await fetchData(token_uri)
    //     // console.log("img: ", img);
    //     img = imge
    //     return imge
    //   }
    // })
    // .catch((error) => {
    //   console.log(error);
    // });

  }



  const mintNft = async (nftData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/listings-by-contract`, nftData);
      // console.log('Minted NFT:', response.data.data.listings);
      // setNftsData()
      const listings = response.data.data.listings
      for(let i = 0; i < listings.length; i++) {
        const item = listings[i]
        const token_id = item.token_id
        const seller = item.seller
        const price = item.auction_config.fixed_price.price.amount
        const denom = item.auction_config.fixed_price.price.denom

        const img = await func(token_id)
        nftsData.push({token_id, seller, price, denom, img})
      }
    } catch (error) {
      console.error('Error minting NFT:', error);
      throw error;
    }
  };

  

  const shortenAddress = (address) => (
    `${address.slice(0,5)}...${address.slice(address.length-4)}`
  )
  

  useEffect(()=> {
    setLoader(true)
    const nftData = {
      "contractAddress": "nibi1j65ycuzrawuyntjmgkl26qv3hy4y93xexjuyelrvv9q6n8smvh5sg9jrx6",
      "collectionAddress": "nibi1gu49g3vndt6ued4k329j83xvkf4nk236vqm6zsxattztwxqnztfqnpu6p7"
    }

    const tempFunc = async ()=>{
      console.log("nftData: ", nftData);
      await mintNft(nftData)
      console.log("nftsData: ", nftsData);
      setNftssData(nftsData)
      if(nftsData.length>0){
        setLoader(false)
      }
    }

    tempFunc()
    
    
  },[])

  return (
  <>
    <div className="flex justify-center items-center">

          {loader && 
            <div className=" flex justify-center items-center h-screen">
              <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20"></div>
            </div>
          }
    </div>
    <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4 ">

      {nftssData.map((item) => {
        // console.log(item)
        const { token_id, seller, price, denom, img} = item
        if(token_id === "2" || token_id === "3" || token_id === "4" || token_id ==="5"){
          return null
        }
        // console.log("token_id: ", token_id, "seller: ", seller, "price: ", price, "denom: ", denom, "img: ", img);
                // console.log("img: ",img);
        
        return (
          <article key={token_id}>
            <div className="dark:bg-jacarta-700  dark:border-jacarta-700 border-jacarta-100 rounded-2.5xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg">
              <figure className="relative">
                <Link href={`/productInfo/${token_id}`}>
                  <span>
                    <img
                      src={img}
                      alt="item image"
                      className="w-full h-[230px] rounded-[0.625rem] object-cover"
                    />
                  </span>
                </Link>
                
              </figure>
              <div className="mt-7 flex items-center justify-between">
                <Link href={`/productInfo/${token_id}`}>
                  <span>
                    <span className="font-display text-jacarta-700 hover:text-accent text-base dark:text-white">
                      Owned By <div className="underline">{shortenAddress(seller)} </div>
                    </span>
                  </span>
                </Link>

                {/* auction dropdown  */}
                {/* <Auctions_dropdown classes="dark:hover:bg-jacarta-600 dropup hover:bg-jacarta-100 rounded-full " /> */}
              </div>
              <div className="mt-2 text-sm">
                <span className="dark:text-jacarta-200 text-jacarta-700 mr-1">
                  {price + " " + denom}
                </span>
                {/* <span className="dark:text-jacarta-300 text-jacarta-500">
                  {bidCount}/{bidLimit}
                </span> */}
              </div>

              <div className="mt-8 flex items-center flex-1 w-full">
                <button
                  className="text-accent font-display text-sm font-semibold"
                  onClick={() => dispatch(buyModalShow())}
                >
                  Buy now
                </button>
                {/* <Link href={`/productInfo`}>
                  <span className="group flex items-center">
                    <svg className="icon icon-history group-hover:fill-accent dark:fill-jacarta-200 fill-jacarta-500 mr-1 mb-[3px] h-4 w-4">
                      <use xlinkHref="/icons.svg#icon-history"></use>
                    </svg>
                    <span className="group-hover:text-accent font-display dark:text-jacarta-200 text-sm font-semibold">
                      View History
                    </span>
                  </span>
                </Link> */}
              </div>
            </div>
          </article>
          
        );
      })}
    </div>
    </>
  );
};

export default CategoryItem;


// <div className="absolute left-3 -bottom-3">
//                   <div className="flex -space-x-2">
//                     <Link href={`/productInfo`}>
//                       <span>
//                         <Tippy content={<span>creator: {creator.name}</span>}>
//                           <img
//                             src={creator.image}
//                             alt="creator"
//                             className="dark:border-jacarta-600 hover:border-accent dark:hover:border-accent h-6 w-6 rounded-full border-2 border-white"
//                           />
//                         </Tippy>
//                       </span>
//                     </Link>
//                     <Link href={`/productInfo`}>
//                       <span>
//                         <Tippy content={<span>creator: {owner.name}</span>}>
//                           <img
//                             src={owner.image}
//                             alt="owner"
//                             layout="fill"
//                             className="dark:border-jacarta-600 hover:border-accent dark:hover:border-accent h-6 w-6 rounded-full border-2 border-white"
//                           />
//                         </Tippy>
//                       </span>
//                     </Link>
//                   </div>
//                 </div>