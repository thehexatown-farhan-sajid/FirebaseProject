import React from "react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import Web3Modal from "web3modal";
import { hexanftAddress, hexaMarketplaceAddress } from "../utils/options";
import connect from "../utils/auth";
import HexaNFTs from "../Abis/contracts/HexaNFTs.sol/HexaNFTs.json";
import HexaMarketplace from "../Abis/contracts/HexaMarketplace.sol/HexaMarketplace.json";
const ItemsInfo = () => {
  const [properties, setProperties] = useState(false)
  const [collection, setCollection] = useState(false)
  const [chaininfo, setChainInfo] = useState(false)
  const [pricehistory, setPriceHistory] = useState(false)
  const [attributes, setAttributes] = useState(false)


  const handleProperties = () => {
    setProperties(!properties);
  };
  const handleCollection = () => {
    setCollection(!collection);
  };
  const handleChaininfo = ()=>{
    setChainInfo(!chaininfo)
  }
  const handlePriceHistory = ()=>{
    setPriceHistory(!pricehistory)
  }
  const handleAttributes = ()=>{
    setAttributes(!attributes)

  }
  return (
    <div className="h-full -w-full">
      <div className="flex flex-col max-w-[1240px] h-full mx-auto bg-white">
      <div className="flex flex-row max-w-[1240px] h-full mx-auto bg-white justify-center gap-8">
        <div className="flex flex-col mt-8">
          <img className="h-[270px] w-[400px]" src="images/nft.jpg" alt="nft" />
          <div className="flex flex-col w-full h-full mt-16">
            <div className="flex flex-col">
            
            <button className="flex text-black text-[15px] font-bold pl-2 h-[55px] w-[400px] bg-white border-2 rounded-md justify-start items-center" onClick={handleProperties}>
              Properties
            </button>
            {properties? (
              <div className="flex flex-col border-2 h-full w-full">
                <div className="flex flex-row justify-between mt-4">
                  <div className="ml-4 text-[15px] text-black">Symbol</div>
                  <div className="mr-4 text-[15px] text-black">NFT</div>
                </div>
                <div className="flex flex-row justify-between mt-4">
                  <div className="ml-4 text-[15px] text-black">Royalty</div>
                  <div className="mr-4 text-[15px] text-black">4%</div>
                </div>
                <div className="flex flex-row justify-between mt-4">
                  <div className="ml-4 text-[15px] text-black">Chain Info</div>
                  <div className="mr-4 text-[15px] text-black">Ethereum</div>
                </div>
                <div className="flex flex-row justify-between mt-4">
                  <div className="ml-4 text-[15px] text-black">Collection</div>
                  <div className="mr-4 text-[15px] text-blue-500">My Collection</div>
                </div>
              </div>

            ): null}
            </div>
            <div className="flex flex-col">
            <button className="flex text-black text-[15px] font-bold pl-2 h-[55px] w-[400px] bg-white border-2 rounded-md justify-start items-center" onClick={handleCollection}>
              About Hexa Wlof Game L2
            </button>
            {collection? (
              <div className="flex flex-col border-2 h-full w-full">
                <div className="flex flex-row justify-start ml-2 mt-4">
                  <div className="ml-4 text-[15px] text-black">Hexa Wlof Game L2</div>
                </div>
                <div className="flex flex-row justify-start ml-2 mt-4">
                  <div className="ml-4 text-[15px] text-black">Icon</div>
                </div>
                </div>
            ): null}
            </div>
            <div className="flex flex-col">
            
            <button className="flex text-black text-[15px] font-bold pl-2 h-[55px] w-[400px] bg-white border-2 rounded-md justify-start items-center" onClick={handleChaininfo}>
              Chain Info
            </button>
            {chaininfo? (
              <div className="flex flex-col border-2 h-full w-full">
                <div className="flex flex-row justify-between mt-4">
                  <div className="ml-4 text-[15px] text-black">Collection</div>
                  <div className="mr-4 text-[15px] text-blue-500">0x7ej5d3...g5ed5</div>
                </div>
                <div className="flex flex-row justify-between mt-4">
                  <div className="ml-4 text-[15px] text-black">Token Id</div>
                  <div className="mr-4 text-[15px] text-black">#875463</div>
                </div>
                <div className="flex flex-row justify-between mt-4">
                  <div className="ml-4 text-[15px] text-black">Network</div>
                  <div className="mr-4 text-[15px] text-black">Ethereum</div>
                </div>
                <div className="flex flex-row justify-between mt-4">
                  <div className="ml-4 text-[15px] text-black">Chain Id</div>
                  <div className="mr-4 text-[15px] text-blue-500">97</div>
                </div>
              </div>

            ): null}
            </div>
          </div>
        </div>
        <div className=" flex flex-col w-full h-full mt-8">
          <div className="flex flex-row items-center w-[600px] h-full justify-between">
            <div className="flex flex-col">
              <span className="text-blue-500 text-[15px] font-bold pl-2 pt-4 bg-white">
                About Hexa Wlof Game L2
              </span>
              <span className="text-black text-[20px] font-bold pl-2 bg-white">
                Sheep #7903
              </span>
              <span className="text-gray-500 text-[20px] font-bold pl-2 bg-white">
                #7903
              </span>
            </div>
            <div>
              <img
                className="w-12 h-10 pr-2 object-center border-2 hover:border-blue-500 rounded-md"
                src="images/connect.svg"
                alt="connect"
              />
            </div>
          </div>
          <div className="flex w-[580px] h-full mt-4 ml-2">
            <p className="text-[15px] text-black font-bold">
              Thousands of Sheep and Wolves compete on a farm in the metaverse.
              A tempting prize of $WOOL awaits, with deadly high stakes. All the
              metadata and images are generated and stored 100% on-chain. No
              IPFS. NO API. Just the Fantom blockchain.
            </p>
          </div>
          <div className="flex w-[600px] h-full mt-4 ml-2">
            <span className="flex flex-row">Owned by<p className="text-blue-500 ml-2">0xhd44d3...e42n6</p></span>
          </div>
          <div className="flex w-[600px] h-[60px] mt-4 ml-2 border-2 rounded-md items-center">
          <button className="flex h-10 w-[120px] ml-4 bg-blue-500 text-white border-2 rounded-md items-center justify-center hover:bg-white hover:text-black">Make Offer</button>
          </div>
          <div className="flex flex-col w-[600px] h-full mt-16 ml-2 border-2 rounded-md">
          <button className="flex flex-row h-14 w-[120px] ml-6 font-bold text-black items-center" onClick={handlePriceHistory}>Price History</button>
          {pricehistory?(
            <div className="flex w-full h-[300px] border-2"></div>

          ): null}
          </div>
          <div className="flex flex-col w-[600px] h-full mt-6 ml-2 border-2 rounded-md">
          <button className="flex flex-row h-14 w-[120px] ml-6 font-bold text-black items-center" onClick={handleAttributes}>Attributes</button>
          {attributes?(
            <div className="flex flex-col w-full h-full border-2">
              <div className="flex flex-row justify-between items-center p-6 ml-4 mr-4">
                <div className="text-[15px] text-black">Type</div>
                <div className="text-[15px] text-black">Value</div>
                <div className="text-[15px] text-black">Frequency</div>
              </div>
            </div>

          ): null}
          </div>
          <div className="flex w-[600px] h-[60px] mt-4 ml-2 border-2 rounded-md items-center">
          <p className="flex h-10 w-[120px] ml-4 text-black items-center justify-center">Listing</p>
          </div>
          <div className="flex w-[600px] h-[60px] mt-4 ml-2 border-2 rounded-md items-center">
          <p className="flex h-10 w-[120px] ml-4 text-black items-center justify-center">Direct Offer</p>
          </div>
        </div>
      </div>
      <div className="flex w-full h-[60px] mt-4 ml-8 border-2 rounded-md items-center">
          <p className="flex h-10 w-[120px] ml-4 text-black items-center justify-center">Item Activty</p>
          </div>
          <div className="flex w-full h-[60px] mt-4 ml-8 border-2 rounded-md items-center">
          <p className="flex h-10 w-[180px] ml-8 text-black items-center justify-center">More from this collection</p>
          </div>

          </div>
    </div>
  );
};

export default ItemsInfo;
