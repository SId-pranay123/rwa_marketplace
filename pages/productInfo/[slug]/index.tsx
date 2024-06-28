"use client";
import { useEffect, useState } from "react";
import GraphCarousel from "../../../components/GraphCarousel";
import { ItemsTabs } from "../../../components/component";
import axios from "axios";
import { useRouter } from 'next/router';
import Link from "next/link";
import Tippy from "@tippyjs/react";
import Likes from "../../../components/likes";
import Auctions_dropdown from "../../../components/dropdown/Auctions_dropdown";


export default function ProductInfo(){
    const router = useRouter();
    const { slug } = router.query;
    const [data, setData] = useState({});
    const [owner, setOwner] = useState("");

    const fetchData = async (token_uri) => {
        try {
          const {
            data: {name, description, image, document},
          } = await axios.get(token_uri);
        //   console.log("name: ", name, "description: ", description, "image: ", image, "document: ", document);
          return {name, description, image, document};
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
          url: 'http://localhost:3000/nft_info',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        }

        const res = await axios.request(config)
        console.log("res: ", res.data);
        setOwner(res.data.data.access.owner)
        // if(res.data.data.info.token_uri[0]!=='i'){
            // const imge = await fetchData(res.data.data.info.token_uri)
            // console.log("img: ", imge);
            // return imge
        // }
        const daaata = await fetchData(res.data.data.info.token_uri)
        const temp = {
            name: daaata?.name,
            description: daaata?.description,
            image: daaata?.image,
            document: daaata?.document
        }
        setData(temp)
    }
    
    // async function callThis(){
    //     await func(slug)
    // }


    useEffect(() => {
        func(slug)
    },[slug])

        

    return(
        <section className="py-24">
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



            <div className=" flex flex-col gap-10 mt-20 max-w-fit overflow-hidden">
                    <div className="items-center px-10">
                        <div className="flex  flex-1 w-full h-full justify-center items-center p-8 rounded-lg">
                            <img src={data?.image} alt="" className="w-[50%] f-[50%]"/>



                              <div className="md:w-3/5 md:basis-auto md:pl-8 lg:w-1/2 lg:pl-[3.75rem]">
                                  {/* <!-- Collection / Likes / Actions --> */}
                                  <div className="mb-3 flex">
                                    {/* <!-- Collection --> */}
                                    <div className="flex items-center">
                                      <Link href="#">
                                        <div className="text-accent mr-2 text-sm font-bold">{owner}</div>
                                      </Link>
                                      <span
                                        className="dark:border-jacarta-600 bg-green inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white"
                                        data-tippy-content="Verified Collection"
                                      >
                                        <Tippy content={<span>Verified Collection</span>}>
                                          <svg className="icon h-[.875rem] w-[.875rem] fill-white">
                                            <use xlinkHref="/icons.svg#icon-right-sign"></use>
                                          </svg>
                                        </Tippy>
                                      </span>
                                    </div>

                                    {/* <!-- Likes / Actions --> */}
                                    <div className="ml-auto flex items-stretch space-x-2 relative">
                                      {/* <Likes
                                        like={likes}
                                        classes="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 flex items-center space-x-1 rounded-xl border bg-white py-2 px-4"
                                      /> */}

                                      {/* <!-- Actions --> */}
                                      <Auctions_dropdown classes="dark:border-jacarta-600 dark:hover:bg-jacarta-600 border-jacarta-100 dropdown hover:bg-jacarta-100 dark:bg-jacarta-700 rounded-xl border bg-white" />
                                    </div>
                                  </div>

                                  <h1 className="font-display text-jacarta-700 mb-4 text-4xl font-semibold dark:text-white">
                                    {data?.name}
                                  </h1>

                                  <div className="mb-8 flex items-center space-x-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                      
                                      <span className="text-green text-sm font-medium tracking-tight">
                                        10000 Unibi
                                      </span>
                                    </div>
                                    {/* <span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
                                      Highest bid
                                    </span>
                                    <span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
                                      1/1 available
                                    </span> */}
                                  </div>

                                  <p className="dark:text-jacarta-300 mb-10">{data?.description}</p>

                                  {/* <!-- Creator / Owner --> */}
                                  <div className="mb-8 flex flex-wrap">
                                    <div className="mr-8 mb-4 flex">
                                      <figure className="mr-4 shrink-0">
                                        <Link href="/user/avatar_6">
                                          <div className="relative block">
                                            <img
                                              src={data?.image}
                                              alt="creatorname"
                                              className="rounded-2lg h-12 w-12"
                                              loading="lazy"
                                            />
                                            <div
                                              className="dark:border-jacarta-600 bg-green absolute -right-3 top-[60%] flex h-6 w-6 items-center justify-center rounded-full border-2 border-white"
                                              data-tippy-content="Verified Collection"
                                            >
                                              <Tippy content={<span>Verified Collection</span>}>
                                                <svg className="icon h-[.875rem] w-[.875rem] fill-white">
                                                  <use xlinkHref="/icons.svg#icon-right-sign"></use>
                                                </svg>
                                              </Tippy>
                                            </div>
                                          </div>
                                        </Link>
                                      </figure>
                                      <div className="flex flex-col justify-center">
                                        {/* <span className="text-jacarta-400 block text-sm dark:text-white">
                                          Creator <strong>10% royalties</strong>
                                        </span> */}
                                        {/* <Link href="/user/avatar_6">
                                          <div className="text-accent block">
                                            <span className="text-sm font-bold">"creatorname"</span>
                                          </div>
                                        </Link> */}
                                      </div>
                                    </div>

                                    <div className="mb-4 flex">
                                      {/* <figure className="mr-4 shrink-0">
                                        <Link href="/user/avatar_6">
                                          <div className="relative block">
                                            <img
                                              src={data?.image}
                                              alt="ownerName"
                                              className="rounded-2lg h-12 w-12"
                                              loading="lazy"
                                            />
                                            <div
                                              className="dark:border-jacarta-600 bg-green absolute -right-3 top-[60%] flex h-6 w-6 items-center justify-center rounded-full border-2 border-white"
                                              data-tippy-content="Verified Collection"
                                            >
                                              <Tippy content={<span>Verified Collection</span>}>
                                                <svg className="icon h-[.875rem] w-[.875rem] fill-white">
                                                  <use xlinkHref="/icons.svg#icon-right-sign"></use>
                                                </svg>
                                              </Tippy>
                                            </div>
                                          </div>
                                        </Link>
                                      </figure> */}
                                      <div className="flex flex-col justify-center">
                                        <span className="text-jacarta-400 block text-sm dark:text-white">
                                          Owned by
                                        </span>
                                        <Link href="/user/avatar_6">
                                          <div className="text-accent block">
                                            <span className="text-sm font-bold">{owner}</span>
                                          </div>
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                  </div>


                        </div>
                        
                    </div>
                    <div className="px-4 rounded-lg">
                    <ItemsTabs />
                    </div>
                   
                    <GraphCarousel />
                </div>
        </section>
    )
}