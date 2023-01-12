import React from "react";
import { useEffect, useState } from "react";
// import { ethers } from "ethers";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
// import allActions from "./actions";

import { hexanftAddress } from "../utils/options";
import connect from "../utils/auth";
import HexaNFTs from "../Abis/contracts/HexaNFTs.sol/HexaNFTs.json";
import { setCardId } from "../redux/counterSlice";
const UserProfile = () => {
  const dispatch = useDispatch();

  const [nfts, setNFts] = useState([]);
  // const [cardid, setCardId] = useState(0);
  const [loadingState, setLoadingState] = useState("not-loaded");
 
  useEffect(() => {
    loadNFTs();
  }, []);

  


  async function loadNFTs() {
    const { account, web3 } = await connect();
    const nftContract = new web3.eth.Contract(HexaNFTs.abi, hexanftAddress);
    // let pointer = await nftContract.methods.tokenIdPointer().call();
    let walletofowner = await nftContract.methods.walletOfOwner(account).call();
    // console.log("walletofowner", walletofowner);

    const items = await Promise.all(
      walletofowner.map(async (i) => {
        const tokenUri = await nftContract.methods.tokenURI(i).call();
        // let owner = await nftContract.methods.ownerOf(i).call()
        // we want get the token metadata - json
        const meta = await axios.get(tokenUri);
        // let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
        let item = {
          // owner: owner,
          tokenId: i,
          image: meta.data.image,
          name: meta.data.name,
          royalty: meta.data.royalty,
          description: meta.data.description,
        };
        return item;
      })
    );

    setNFts(items);
    setLoadingState("loaded");
  }

  // console.log(nfts);

  // if(loadingState === 'loaded' && !nfts.length) return (<h1
  //   className='px-20 py-7 text-4x1'>You do not own any NFTs currently :(</h1>)

  // return(
  //     <div className="flex flex-col h-full w-full">
  //         <div className="text-center text-gray-800 font-bold text-[25px] mt-8">My NFTs</div>
  //         <div className="flex flex-wrap w-10/2 gap-4 ml-8 mt-6 justify-start">
  //         {[...Array(16)].map((item, index) => {
  //         return (
  //           <>
  //         <div className="flex flex-col w-[300px] h-[350px] bg-white border-2 rounded-2xl">
  //               <img
  //                 className="h-[220px] w-[270px] p-2 ml-3"
  //                 src={nfts.image}
  //                 alt="nft"
  //               />
  //               <p className="text-gray-400 pl-6 mt-1">{nfts.name}</p>
  //               <p className="text-gray-800 font-bold pl-6 mt-0">
  //                 {nfts.description}
  //               </p>
  //               <div className="flex flex-row h-full -full justify-center">
  //               <Link className="Listing" to="/itemlist">
  //                 <button className="flex h-10 w-[100px] bg-blue-500 mt-5 pt-1 text-white border-2 rounded-md justify-center hover:bg-white hover:text-black">List Now</button>
  //                 </Link>
  //                 </div>
  //             </div>
  //             </>
  //         );
  //       })}
  //         </div>
  //     </div>
  // )
  if (loadingState === "loaded" && !nfts.length)
    return (
      <h1 className="px-20 py-7 text-4x1">You have not any nft minted :</h1>
    );
  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: "1600px" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 pt-4">
          {nfts.map((nft, i) => (
            <div key={i} className="border shadow rounded-x1 overflow-hidden">
              <img
                className=" flex h-[220px] w-[270px] p-2 justify-center hover:h-[200px]"
                src={nft.image}
                alt = "img"
              />
              <div className="p-4">
                <p
                  style={{ height: "64px" }}
                  className="text-3x1 font-semibold"
                >
                  {nft.name}
                </p>
                <div style={{ height: "72px", overflow: "hidden" }}>
                  <p className="text-gray-400">{nft.description}</p>
                </div>
              </div>
              <Link className="Listing" to="/itemlist" >
              <div
                className="flex p-4 bg-blue-500 justify-center text-white hover:bg-white hover:text-black"
                onClick={() => dispatch(setCardId(nft.tokenId))}
              >
                <button className="text-3x-1 text-center font-bold">
                  List Now
                </button>
              </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
