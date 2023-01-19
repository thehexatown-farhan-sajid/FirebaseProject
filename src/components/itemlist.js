import React from "react";
import {useEffect, useState} from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import {
    hexanftAddress,hexaMarketplaceAddress,hexanAuctionAddress
  } from "../utils/options";
import connect from "../utils/auth";
import HexaNFTs from "../Abis/contracts/HexaNFTs.sol/HexaNFTs.json";
import HexaMarketplace from "../Abis/contracts/HexaMarketplace.sol/HexaMarketplace.json";
import HexamAuction from "../Abis/contracts/HexaAuction.sol/HexamAuction.json"
import { useSelector, useDispatch } from "react-redux";


const ItemsList = () => {
    const [price, setPrice] = useState(0);
    const [listingprice, setListingPrice] = useState(0);
    const [time, setTime] = useState(null);
    const [endtime, setEndTime] = useState(null);
    const [cardinfo, setCardInfo] = useState([])
    const { cardid } = useSelector((state) => state.counter);
    const [show, setShow] = useState(false)
    // const [show, setShow] = useState()
    

    let Price = ethers.utils.formatUnits((price?price:0).toString(), "ether")
    console.log("Price", Price)
    let finalProfit 
    let potentialPrice 
    if (price>1000) {
      potentialPrice = price/100*(cardinfo.royalty)
    }
    finalProfit= price - potentialPrice
    console.log("finalProfit", finalProfit)
     
    // let profit = ethers.utils.parseUnits(potentialPrice.toString(), "wei")
    
    useEffect(()=> {
        loadImage()
      }, [])
      async function loadImage() {
        const { account, web3 } = await connect();
        const nftContract = new web3.eth.Contract(HexaNFTs.abi, hexanftAddress);
        const marketplaceContract = new web3.eth.Contract(HexaMarketplace.abi, hexaMarketplaceAddress);
        let Fee =  await marketplaceContract.methods.platformFee().call();
        Fee = Fee.toString();
        setListingPrice(Fee)
        let owner = await nftContract.methods.ownerOf(cardid).call();
        let listings = await marketplaceContract.methods
          .listings(hexanftAddress, cardid, owner)
          .call();
          let price = ethers.utils.formatUnits(
            listings.pricePerItem.toString(),
            "ether"
          );
        
        const tokenUri = await nftContract.methods.tokenURI(cardid).call();
        const meta = await axios.get(tokenUri);
        let item = {
          price,
          tokenId: cardid,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
          royalty : meta.data.royalty
        };
        
        setCardInfo(item)

      }

      async function createAuction(){
        const { account, web3 } = await connect();
        const nftContract = new web3.eth.Contract(HexaNFTs.abi, hexanftAddress);
        const auctionContract = new web3.eth.Contract(HexamAuction.abi, hexanAuctionAddress);
        // console.log("auctionContract", auctionContract)
        const approved = await nftContract.methods.isApprovedForAll(account, hexanAuctionAddress).call()
        if(approved == false){
        await nftContract.methods.setApprovalForAll(hexanAuctionAddress, true).send({ from: account})
    }
    let Fee =  await auctionContract.methods.platformFee().call();
    Fee = Fee.toString();
    let cardPrice = ethers.utils.parseUnits(price.toString(), "wei")
        await auctionContract.methods.createAuction(hexanftAddress, cardid, cardPrice, time, false, endtime).send({from: account, value: Fee})
      }

      async function updateListing() {
        const { account, web3 } = await connect();
        const nftContract = new web3.eth.Contract(HexaNFTs.abi, hexanftAddress);
        const marketplaceContract = new web3.eth.Contract(HexaMarketplace.abi, hexaMarketplaceAddress);
        let cardPrice = ethers.utils.parseUnits(price.toString(), "wei")
        await marketplaceContract.methods.updateListing(hexanftAddress, cardid, cardPrice).send({from: account})
      }


    async function listing() {
        const { account, web3 } = await connect();
        const nftContract = new web3.eth.Contract(HexaNFTs.abi, hexanftAddress);
        const marketplaceContract = new web3.eth.Contract(HexaMarketplace.abi, hexaMarketplaceAddress);
        const approved = await nftContract.methods.isApprovedForAll(account, hexaMarketplaceAddress).call()
    if(approved == false){
      await nftContract.methods.setApprovalForAll(hexaMarketplaceAddress, true).send({ from: account})
    }
        // await nftContract.methods.setApprovalForAll(hexaMarketplaceAddress, true).send({ from: account})
        // await nftContract.methods.approve(hexaMarketplaceAddress, cardid).send({ from: account})
       
        let Fee =  await marketplaceContract.methods.platformFee().call();
        Fee = Fee.toString();
        console.log(Fee);
        let cardPrice = ethers.utils.parseUnits(price.toString(), "wei")
        const tokenUri = await nftContract.methods.tokenURI(cardid).call();
        const meta = await axios.get(tokenUri);
        const royalty = meta.data.royalty
        console.log("royalty",royalty)
        await marketplaceContract.methods.listItem(hexanftAddress, cardid, 1, cardPrice, time).send({ from: account, value: Fee })
        await marketplaceContract.methods.registerRoyalty(hexanftAddress, cardid, royalty)
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
          {cardinfo.price> 0 ?(
            null
          ):
          <div className="flex w-full h-[60px] mt-4 ml-8 border-2 rounded-md items-center justify-between">
            <p className="flex items-center font-bold text-[18px] ml-8">Fixed</p>
            <input
            value={"Fixed Price"}
            type={"radio"}
            name = {"Price"}
            className="mt-2 w-full h-[20px] border-2 rounded-md items-center pl-4 pr-4" onClick={() => setShow(false)}/>
             <p className="flex items-center font-bold text-[18px]">Auction</p>
            <input
            value={"Time Auction"}
            type={"radio"}
            name = {"Price"}
            className="mt-2 w-full h-[20px] border-2 rounded-md items-center pl-4 pr-4" onClick={() => setShow(true)}/>
          </div>
          }
          {show ?(
            <div>
            <p className="flex-row ml-16 mt-4 text-[17px] font-bold">
              Set Reserve Price in Wei
            </p>
            <input
              placeholder="Item Price"
              type={"number"}
              className="mt-2 ml-8 w-full h-[60px] border-2 rounded-md items-center pl-4 pr-4"
              onChange={(e) =>setPrice(e.target.value )
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
            Set a End Time Stemp
          </p>
          <input
            placeholder="Time Stemp"
            type={"number"}
            className="mt-2 ml-8 w-full h-[60px] border-2 rounded-md items-center pl-4 pr-4"
            onChange={(e) =>
              setEndTime(e.target.value )
            }
          />
          <div className="flex flex-row h-full w-full justify-center mt-4 ml-8"onClick={createAuction}>
            <button className="flex items-center h-[60px] w-full bg-blue-500 font-bold text-white border-2 rounded-md justify-center hover:bg-white hover:text-black">
              Create Auction
            </button>
          </div>
            </div>
          ):
          <div>
          <p className="flex-row ml-16 mt-4 text-[17px] font-bold">
            Set a Price in Wei
          </p>
          <input
            placeholder="Item Price"
            type={"number"}
            className="mt-2 ml-8 w-full h-[60px] border-2 rounded-md items-center pl-4 pr-4"
            onChange={(e) =>setPrice(e.target.value )
            }
          />
          { cardinfo.price > 0 ?(
           null
          ):
          <div>
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
          </div>
          }
          {/* <p className="flex-row ml-16 mt-4 text-[17px] font-bold">
            Set Duration
          </p>
          <div className="flex w-full h-[60px] mt-4 ml-8 border-2 rounded-md items-center">
            <p className="flex h-10 w-[400px] text-black font-bold items-center pl-4">
              Time duration
            </p>
          </div> */}
          <p className="flex-row ml-16 mt-4 text-[17px] font-bold">
            More Options
          </p>
          <p className="flex-row ml-16 mt-4 text-[17px] font-bold">Summery</p>
          <div className="flex flex-col ml-8 mt-4">
            <div className="flex flex-row justify-between">
              <p className="text-[20px] text-black">Listing Price</p>
              <p className="text-[20px] text-black">{listingprice} WEI</p>
            </div>
            <div className="flex flex-row mt-2 justify-between">
              <p className="text-[20px] text-black">Service Fee</p>
              <p className="text-[20px] text-black">0.0%</p>
            </div>
            <div className="flex flex-row mt-2 justify-between">
              <p className="text-[20px] text-black">Creator Fee</p>
              <p className="text-[20px] text-black">{cardinfo.royalty} %</p>
            </div>
            <div className="flex flex-row mt-4 border-t-2 pt-4 justify-between">
              <p className="text-[25px] text-black">Potential Earning</p>
              <p className="text-[15px] pt-3 text-black">{finalProfit? finalProfit:0} WEI</p>
            </div>
            {cardinfo.price> 0 ?(
            <div className="flex flex-row h-full -full justify-center mt-4">
              <button className="flex items-center h-[60px] w-full bg-blue-500 font-bold text-white border-2 rounded-md justify-center hover:bg-white hover:text-black"onClick={updateListing}>
                Update Price
              </button>
            </div>
            ):<div className="flex flex-row h-full w-full justify-center mt-4" onClick={listing}>
            <button className="flex items-center h-[60px] w-full bg-blue-500 font-bold text-white border-2 rounded-md justify-center hover:bg-white hover:text-black">
              Complete Listing
            </button>
          </div>}
          </div>
          </div>
          }
        </div>
        <div className="flex flex-col">
          <img
            className="h-[350px] w-full mr-32 mt-8"
            src={cardinfo.image}
            alt="nft"
          />
          <div className="flex flex-col  h-[100px] bg-white border-2 ">
            <span className="text-gray-500 text-20px pt-4 ml-8 font-bold">
              {cardinfo.name}: #0000{cardinfo.tokenId}
            </span>
            <span className="text-gray-800 text-20px pt-2 font-bold ml-8">
              {Price} ETH
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ItemsList;
