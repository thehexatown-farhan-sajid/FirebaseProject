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
    let walletofowner = await nftContract.methods.walletOfOwner(account).call();

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
