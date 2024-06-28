// import Link from "next/link";
// import { useDispatch, useSelector } from "react-redux";


// interface Props {
//     id: number;
//     title: string;
//     price: number;
//     denom: string;
//     image: string;
//     token_uri: string;
// }

// const Item = ({ id, title, price, denom, image }: Props) => {
//     // const dispatch = useDispatch();

//     console.log("id: ", id, "title: ", title, "price: ", price, "denom: ", denom, "image: ", image);

//     const shortenAddress = (address: string) => (
//         `${address.slice(0,5)}...${address.slice(address.length-4)}`
//     )


//     return (
//         <article key={id}>
//           <div className="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2.5xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg">
//             <figure className="relative">
//               <Link href={`/productInfo`}>
//                 <span>
//                   <img
//                     src={image}
//                     alt="item image"
//                     className="w-full h-[230px] rounded-[0.625rem] object-cover"
//                   />
//                 </span>
//               </Link>

//               {/* <Likes like={likes} /> */}

              
//             </figure>
//             <div className="mt-7 flex items-center justify-between">
//               <Link href={`/productInfo`}>
//                 <span>
//                   <span className="font-display text-jacarta-700 hover:text-accent text-base dark:text-white">
//                     Owned By <div className="underline">{shortenAddress(title)} </div>
//                   </span>
//                 </span>
//               </Link>

//               {/* auction dropdown  */}
//               {/* <Auctions_dropdown classes="dark:hover:bg-jacarta-600 dropup hover:bg-jacarta-100 rounded-full " /> */}
//             </div>
//             <div className="mt-2 text-sm">
//               <span className="dark:text-jacarta-200 text-jacarta-700 mr-1">
//                 {price + " " + denom}
//               </span>
//               {/* <span className="dark:text-jacarta-300 text-jacarta-500">
//                 {bidCount}/{bidLimit}
//               </span> */}
//             </div>

//             <div className="mt-8 flex items-center flex-1 w-full">
//               <button
//                 className="text-accent font-display text-sm font-semibold"
//                 // onClick={() => dispatch(buyModalShow())}
//               >
//                 Buy now
//               </button>
//               {/* <Link href={`/productInfo`}>
//                 <span className="group flex items-center">
//                   <svg className="icon icon-history group-hover:fill-accent dark:fill-jacarta-200 fill-jacarta-500 mr-1 mb-[3px] h-4 w-4">
//                     <use xlinkHref="/icons.svg#icon-history"></use>
//                   </svg>
//                   <span className="group-hover:text-accent font-display dark:text-jacarta-200 text-sm font-semibold">
//                     View History
//                   </span>
//                 </span>
//               </Link> */}
//             </div>
//           </div>
//         </article>
//       );
// };

// export default Item;