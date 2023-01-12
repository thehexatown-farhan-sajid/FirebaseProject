import React from "react";
import {useEffect, useState} from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import {
    hexanftAddress,hexaMarketplaceAddress
  } from "../utils/options";
import connect from "../utils/auth";
import HexaNFTs from "../Abis/contracts/HexaNFTs.sol/HexaNFTs.json";
import HexaMarketplace from "../Abis/contracts/HexaMarketplace.sol/HexaMarketplace.json";
import { useSelector, useDispatch } from "react-redux";


const ItemsList = () => {
    const [price, setPrice] = useState(null);
    const [time, setTime] = useState(null);
    const { cardid } = useSelector((state) => state.counter);
    console.log(cardid)
    useEffect(()=> {
        // listing()
      }, [])
    async function listing() {
        const { account, web3 } = await connect();
        const nftContract = new web3.eth.Contract(HexaNFTs.abi, hexanftAddress);
        await nftContract.methods.setApprovalForAll(hexaMarketplaceAddress, true).send({ from: account})
        await nftContract.methods.approve(hexaMarketplaceAddress, cardid).send({ from: account})
        const marketplaceContract = new web3.eth.Contract(HexaMarketplace.abi, hexaMarketplaceAddress);
        let Fee =  await marketplaceContract.methods.platformFee().call();
        Fee = Fee.toString();
        console.log(Fee);
        // let startTime = 1673434920;
        // let Price = ethers.utils.formatUnits(
        //   price.toString(),
        //   "ether"
        // );
        const tokenUri = await nftContract.methods.tokenURI(cardid).call();
        const meta = await axios.get(tokenUri);
        const royalty = meta.data.royalty
        console.log("royalty",royalty)
        await marketplaceContract.methods.listItem(hexanftAddress, cardid, 1, price, time).send({ from: account, value: Fee })
        await marketplaceContract.methods.registerRoyalty(hexanftAddress, cardid, royalty)
        // let listings = await marketplaceContract.methods.listings(hexanftAddress, 2, account).call();
        // console.log(listings)
    }
  return (
    <div className="flex flex-col w-full h-full mt-8">
      <div className="flex flex-row items-center justify-center">
        <p className="font-bold text-[25px]">Listing for Sale </p>
      </div>
      <div className="flex flex-row mt-4 ml-80 mr-80 justify-between">
        <div className="flex flex-col">
          <p className="flex-row ml-32 text-[20px] font-bold">
            Chose a type of sale
          </p>
          <div className="flex w-full h-[60px] mt-4 ml-8 border-2 rounded-md items-center">
            <p className="flex h-10 w-[400px] text-black font-bold items-center pl-4">
              Fixed Price
            </p>
          </div>
          <div className="flex w-full h-[60px] mt-4 ml-8 border-2 rounded-md items-center">
            <p className="flex h-10 w-[400px] text-black font-bold items-center pl-4">
              Timed Auction
            </p>
          </div>
          <p className="flex-row ml-16 mt-4 text-[17px] font-bold">
            Set a Price in Ether
          </p>
          <input
            placeholder="Item Price"
            type={"number"}
            className="mt-2 ml-8 w-full h-[60px] border-2 rounded-md items-center pl-4 pr-4"
            onChange={(e) =>
              setPrice(e.target.value )
            }
          />
          <p className="flex-row ml-16 mt-4 text-[17px] font-bold">
            Set a Start Time Stemp
          </p>
          <input
            placeholder="Time Stemp"
            type={"number"}
            className="mt-2 ml-8 w-full h-[60px] border-2 rounded-md items-center pl-4 pr-4"
            onChange={(e) =>
              setTime(e.target.value )
            }
          />
          <p className="flex-row ml-16 mt-4 text-[17px] font-bold">
            Set Duration
          </p>
          <div className="flex w-full h-[60px] mt-4 ml-8 border-2 rounded-md items-center">
            <p className="flex h-10 w-[400px] text-black font-bold items-center pl-4">
              Time duration
            </p>
          </div>
          <p className="flex-row ml-16 mt-4 text-[17px] font-bold">
            More Options
          </p>
          <p className="flex-row ml-16 mt-4 text-[17px] font-bold">Summery</p>
          <div className="flex flex-col ml-8 mt-4">
            <div className="flex flex-row justify-between">
              <p className="text-[20px] text-black">Listing Price</p>
              <p className="text-[20px] text-black">--ETH</p>
            </div>
            <div className="flex flex-row mt-2 justify-between">
              <p className="text-[20px] text-black">Service Fee</p>
              <p className="text-[20px] text-black">2.5%</p>
            </div>
            <div className="flex flex-row mt-2 justify-between">
              <p className="text-[20px] text-black">Creator Fee</p>
              <p className="text-[20px] text-black">0%</p>
            </div>
            <div className="flex flex-row mt-4 border-t-2 pt-4 justify-between">
              <p className="text-[25px] text-black">Potential Earning</p>
              <p className="text-[25px] text-black">--ETH</p>
            </div>
            <div className="flex flex-row h-full -full justify-center mt-4" onClick={listing}>
              <button className="flex items-center h-[60px] w-full bg-blue-500 font-bold text-white border-2 rounded-md justify-center hover:bg-white hover:text-black">
                Complete Listing
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <img
            className="h-[350px] w-full mr-32 mt-8"
            src="images/nft.jpg"
            alt="nft"
          />
          <div className="flex flex-col  h-[100px] bg-white border-2 ">
            <span className="text-gray-500 text-20px pt-4 ml-8 ">
              My NFT Collection #7865381
            </span>
            <span className="text-gray-800 text-20px pt-2 font-bold ml-8">
              --ETH
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ItemsList;
