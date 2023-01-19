import React from "react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setCardId } from "../redux/counterSlice";
// import Web3Modal from "web3modal";
import { hexanftAddress, hexaMarketplaceAddress } from "../utils/options";
import connect from "../utils/auth";
import HexaNFTs from "../Abis/contracts/HexaNFTs.sol/HexaNFTs.json";
import HexaMarketplace from "../Abis/contracts/HexaMarketplace.sol/HexaMarketplace.json";
// import { hasMatchFunction } from "@reduxjs/toolkit/dist/tsHelpers";

const Explore = () => {
  const dispatch = useDispatch();
  const [nfts, setNFts] = useState([]);
  // const [loadingState, setLoadingState] = useState("not-loaded");
  const [status, setStatus] = useState(false);
  const [tokenid, setTokenid] = useState(0);
  const [pricefilter, setPrice] = useState(false);
  const [collection, setCollection] = useState(false);
  const [categories, setCategories] = useState(false);

  useEffect(() => {
    loadNFTs();
  }, []);

  useEffect(() => {
    
    if(tokenid!=0){
      // console.log("tokenid", tokenid);
    Buynft();
    }
  }, [tokenid]);

  async function Buynft() {
    // console.log("first....................");
    const { account, web3 } = await connect();
    const nftContract = new web3.eth.Contract(HexaNFTs.abi, hexanftAddress);
    const marketplaceContract = new web3.eth.Contract(
      HexaMarketplace.abi,
      hexaMarketplaceAddress
    );
    let owner;
    if (tokenid != 0) {
      owner = await nftContract.methods.ownerOf(tokenid).call();
    }
    // console.log("owner:", owner);
    let listings = await marketplaceContract.methods
      .listings(hexanftAddress, tokenid, owner)
      .call();

    let price = listings.pricePerItem;
    // console.log(price);
    await marketplaceContract.methods
      .buyItem(hexanftAddress, tokenid, owner)
      .send({ from: account, value: price });
  }

  async function loadNFTs() {
    const { web3 } = await connect();
    const nftContract = new web3.eth.Contract(HexaNFTs.abi, hexanftAddress);
    const marketplaceContract = new web3.eth.Contract(
      HexaMarketplace.abi,
      hexaMarketplaceAddress
    );

    let pointer = await nftContract.methods.tokenIdPointer().call();
    // console.log("pointer", pointer);
    var ids = [];
    for (let i = 1; i <= pointer; i++) {
      ids.push(i);
    }
    // console.log("ids", ids);
    const items = await Promise.all(
      ids.map(async (i) => {
        const tokenUri = await nftContract.methods.tokenURI(i).call();
        let owner = await nftContract.methods.ownerOf(i).call();
        let listings = await marketplaceContract.methods
          .listings(hexanftAddress, i, owner)
          .call();
        // console.log(ethers.utils.formatUnits(listings.pricePerItem.toString(), "ether"));
        // we want get the token metadata - json
        const meta = await axios.get(tokenUri);
        // console.log(meta)
        let price = ethers.utils.formatUnits(
          listings.pricePerItem.toString(),
          "ether"
        );
        // console.log(price);
        let item = {
          price,
          tokenId: i,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );
    setNFts(items);
    // setLoadingState("loaded");
    // console.log("nfts", nfts);
  }

  const handleStatus = () => {
    setStatus(!status);
  };
  const handlePrice = () => {
    setPrice(!pricefilter);
  };
  const handleCollection = () => {
    setCollection(!collection);
  };
  const handleCategories = () => {
    setCategories(!categories);
  };

  return (
    <div className="flex flex-row h-full w-full ">
      <div className="flex flex-col h-full w-[350px] bg-slate-500 mt-10 ">
        <div className="flex flex-row h-16 w-full bg-white border-2 justify-between">
          <p className="text-black font-bold text-[20px] pl-4 pt-4">Filters</p>
          <img
            className="w-12 h-16 pr-2 object-center"
            src="images/filter.svg"
            alt="filter"
          />
        </div>
        <div className="flex flex-col">
          <button
            className="flex flex-row h-16 w-full bg-white border-2 justify-between"
            onClick={handleStatus}
          >
            <p className="text-black font-bold text-[15px] pl-4 pt-4">Status</p>
            <img
              className="w-10 h-12 pr-2 object-center"
              src="images/next.svg"
              alt="next"
            />
          </button>
          {status ? (
            <div className="flex flex-col h-full w-full bg-white border-2">
              <div className="flex flex-row justify-between ml-8 mr-8 p-2">
                <div className="text-[18px] text-gray-500">Buy Now</div>
                <div className="text-[18px] text-gray-500">Has Bids</div>
              </div>
              <div className="flex flex-row justify-between ml-8 mr-8 p-2">
                <div className="text-[18px] text-gray-500">Has Offer</div>
                <div className="text-[18px] text-gray-500">On Auction</div>
              </div>
            </div>
          ) : null}
        </div>
        <div className="flex flex-col">
          <button
            className="flex flex-row h-16 w-full bg-white border-2 justify-between"
            onClick={handlePrice}
          >
            <p className="text-black font-bold text-[15px] pl-4 pt-4">Price</p>
            <img
              className="w-10 h-12 pr-2 object-center"
              src="images/next.svg"
              alt="next"
            />
          </button>
          {pricefilter ? (
            <div className="flex flex-col h-full w-full bg-white border-2">
              <div className="flex flex-row justify-between ml-8 mr-8 p-2">
                <div className="text-[18px] text-gray-500">Min%</div>
                <p className="text-[18px] text-gray-500">To</p>
                <div className="text-[18px] text-gray-500">Max%</div>
              </div>
              <button className="text-[18px] m-4">Apply</button>
            </div>
          ) : null}
        </div>
        <div className="flex flex-col">
          <button
            className="flex flex-row h-16 w-full bg-white border-2 justify-between"
            onClick={handleCollection}
          >
            <p className="text-black font-bold text-[15px] pl-4 pt-4">
              Collections
            </p>
            <img
              className="w-10 h-12 pr-2 object-center"
              src="images/next.svg"
              alt="next"
            />
          </button>
          {collection ? (
            <div className="flex flex-col h-full w-full bg-white border-2">
              <div className="text-[18px] text-gray-500 p-2">Collection1</div>
              <div className="text-[18px] text-gray-500 p-2">Collection2</div>
              <div className="text-[18px] text-gray-500 p-2">Collection3</div>
            </div>
          ) : null}
        </div>
        <div className="flex flex-col">
          <button
            className="flex flex-row h-16 w-full bg-white border-2 justify-between"
            onClick={handleCategories}
          >
            <p className="text-black font-bold text-[15px] pl-4 pt-4">
              Categories
            </p>
            <img
              className="w-10 h-12 pr-2 object-center"
              src="images/next.svg"
              alt="next"
            />
          </button>
          {categories ? (
            <div className="flex flex-col h-full w-full bg-white border-2">
              <div className="text-[18px] text-gray-500 p-2">Category1</div>
              <div className="text-[18px] text-gray-500 p-2">Category2</div>
              <div className="text-[18px] text-gray-500 p-2">Category3</div>
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex flex-col w-full h-full">
        <div className="flex felx-row h-full w-full mt-12 gap-2 ml-4">
          <div className="flex flex-row h-12 w-[300px] border-2 rounded-md justify-between">
            <p className="text-black font-bold text-[15px] pl-4 pt-2">
              All Items
            </p>
            <img
              className="w-10 h-12 pr-2 pb-1 object-center"
              src="images/next.svg"
              alt="next"
            />
          </div>
          <div className="flex flex-row h-12 w-[300px] border-2 rounded-md justify-between">
            <p className="text-black font-bold text-[15px] pl-4 pt-2">
              Sort By
            </p>
            <img
              className="w-10 h-12 pr-2 pb-1 object-center"
              src="images/next.svg"
              alt="next"
            />
          </div>
          <button className="h-12 w-[50px] border-2 rounded-md hover:bg-blue-500">
            <img
              className="w-10 h-12 pr-2 pl-2 pb-1 object-center"
              src="images/small.svg"
              alt="small"
            />
          </button>
          <button className="h-12 w-[50px] border-2 rounded-md hover:bg-blue-500">
            <img
              className="w-10 h-12 pr-2 pl-2 pb-1 object-center"
              src="images/large.svg"
              alt="large"
            />
          </button>
        </div>
        <div className="flex flex-wrap w-5/2 gap-8 ml-8 mt-2">
          {/* {[...Array(16)].map((item, index) => {
            return (
              <>
                <div className="flex flex-col w-[300px] h-[330px] bg-white border-2 rounded-2xl">
                  <img
                    className="h-[220px] w-[270px] p-2 ml-3"
                    src={nfts.image}
                    alt="nft"
                  />
                  <p className="text-gray-400 pl-6 mt-1">{nfts.name}</p>
                  <p className="text-gray-800 font-bold pl-6 mt-0">
                    Price: {nfts.price}
                  </p>
                  <div className="flex flex-row h-full -full justify-center" onClick={Buynft}>
                    <button className="flex h-10 w-[100px] bg-blue-500 mt-2 pt-1 text-white border-2 rounded-md justify-center hover:bg-white hover:text-black">Buy Now</button>
                    </div>
                </div>
              </>
            );
          })} */}
          {nfts.map((nft, i) => (
            <div key={i} className="border shadow rounded-x1 overflow-hidden">
              <img
                className=" flex h-[220px] w-[270px] p-2 justify-center hover:h-[200px]"
                src={nft.image}
              />
              <div className="p-4">
                <p
                  style={{ height: "64px" }}
                  className="text-3x1 font-semibold"
                >
                  {nft.name}
                </p>
                <div style={{ height: "72px", overflow: "hidden" }}>
                  <p className="text-gray-400">Price: {nft.price}</p>
                </div>
              </div>
              {nft.price> 0? (
              <div className="flex flex-row justify-between">
                <div className="" onClick={() => setTokenid(nft.tokenId)}>
                  <div
                    className="flex p-4 ml-6 mb-2 rounded-lg bg-blue-500 justify-center text-white hover:bg-white hover:text-black"
                    // onClick={Buynft}
                  >
                    <button className="text-3x-1 text-center font-bold">
                      Buy Now
                    </button>
                  </div>
                </div>
                <Link className="ItemInno" to="/itemsinfo">
                  <div className="flex p-4 mr-6 mb-2 rounded-lg bg-blue-500 justify-center text-white hover:bg-white hover:text-black" onClick={() => dispatch(setCardId(nft.tokenId))}>
                    <button className="text-3x-1 text-center font-bold">
                      Item Info
                    </button>
                  </div>
                </Link>
              </div>
               ):
               <div className="flex flex-row justify-center">
               <Link className="ItemInno" to="/itemsinfo">
               <div className="flex p-4 mb-2 rounded-lg bg-blue-500 justify-center text-white hover:bg-white hover:text-black" onClick={() => dispatch(setCardId(nft.tokenId))}>
                 <button className="text-3x-1 text-center font-bold">
                   Item Info
                 </button>
               </div>
             </Link>
             </div>
             }
            
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Explore;
