import React from "react";
import { ethers } from "ethers";
// import Web3 from "web3";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SimpleDateTime  from 'react-simple-timestamp-to-date';

// import Web3Modal from "web3modal";
import { hexanftAddress, hexaMarketplaceAddress, hexanAuctionAddress, WethAddress } from "../utils/options";
import connect from "../utils/auth";
import HexaNFTs from "../Abis/contracts/HexaNFTs.sol/HexaNFTs.json";
// import Hexatoken from "../Abis/contracts/ERC20.sol/HexaToken.json";
import HexaMarketplace from "../Abis/contracts/HexaMarketplace.sol/HexaMarketplace.json";
import HexamAuction from "../Abis/contracts/HexaAuction.sol/HexamAuction.json"
import Weth from "../Abis/contracts/WETH.sol/Weth.json"
const ItemsInfo = () => {
  const [properties, setProperties] = useState(false);
  const [useraccount, setUserAccount] = useState('')
  const [collection, setCollection] = useState(false);
  const [chaininfo, setChainInfo] = useState(false);
  const [pricehistory, setPriceHistory] = useState(false);
  const [attributes, setAttributes] = useState(false);
  const [listing, setListing] = useState(false);
  const [offer, setOffer] = useState(false);
  const [activity, setActivity] = useState(false);
  const { cardid } = useSelector((state) => state.counter);
  const [cardinfo, setCardInfo] = useState([]);
  const [doffer, setDoffer] = useState([]);
  const [getauction, setGetAuction] = useState([]);
  const [gethighestbidder, setGetHighestBidder] = useState([])
  const [show, setShow] = useState(false);
  const [cancelshow, setCancelShow] = useState(false);
  const [price, setPrice] = useState(0)
  const [bidsection, setBidSection] = useState(false)
  const newtime = new Date()
  const currentTime = newtime.getTime()/1000

  const handleProperties = () => {
    setProperties(!properties);
  };
  const handleCollection = () => {
    setCollection(!collection);
  };
  const handleChaininfo = () => {
    setChainInfo(!chaininfo);
  };
  const handlePriceHistory = () => {
    setPriceHistory(!pricehistory);
  };
  const handleAttributes = () => {
    setAttributes(!attributes);
  };
  const handleListing = () => {
    setListing(!listing);
  };
  const handleOffer = () => {
    setOffer(!offer);
  };
  const handleItemActivity = () => {
    setActivity(!activity);
  };
  useEffect(() => {
    loadImage();
  }, []);

  // console.log("cardsymbol", cardinfo.symbol);
  async function cancelOffer() {
    const { account, web3 } = await connect();
    // const nftContract = new web3.eth.Contract(HexaNFTs.abi, hexanftAddress);
    const marketplaceContract = new web3.eth.Contract(
      HexaMarketplace.abi,
      hexaMarketplaceAddress
    );
     await marketplaceContract.methods.cancelOffer(hexanftAddress, cardid).send({from: account})
  }
  async function acceptOffer() {
    const { web3 } = await connect();
    // const tokenContract = new web3.eth.Contract(Hexatoken.abi, hexaTokenAddress)
    // const tokenContract = new web3.eth.Contract(Weth.abi, WethAddress)

    const nftContract = new web3.eth.Contract(HexaNFTs.abi, hexanftAddress);
    const marketplaceContract = new web3.eth.Contract(
      HexaMarketplace.abi,
      hexaMarketplaceAddress
    );
    const owner = await nftContract.methods.ownerOf(cardid).call()
    // console.log("owner",owner)
    const approved = await nftContract.methods.isApprovedForAll(owner, hexaMarketplaceAddress).call()
    if(approved === false){
      await nftContract.methods.setApprovalForAll(hexaMarketplaceAddress, true).send({ from: owner})
    }
    
     await marketplaceContract.methods.acceptOffer(hexanftAddress, cardid, doffer.offerer).send({from: owner})
  }

  async function placeBid(){
    const { account, web3 } = await connect();
    // const nftContract = new web3.eth.Contract(HexaNFTs.abi, hexanftAddress)
    const auctionContract = new web3.eth.Contract(HexamAuction.abi, hexanAuctionAddress)
    let cardPrice = ethers.utils.parseUnits(price.toString(), "wei")
    await auctionContract.methods.placeBid(hexanftAddress, cardid).send({from: account, value: cardPrice})
  }


  async function loadImage() {
    const { account, web3 } = await connect();
    setUserAccount(account)
    // const  web3 = new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/a40778806c9e4d0f962550277a5babed"));
    // const accounts = await web3.eth.getAccounts()
    // console.log(accounts)
    const nftContract = new web3.eth.Contract(HexaNFTs.abi, hexanftAddress);
    const marketplaceContract = new web3.eth.Contract(
      HexaMarketplace.abi,
      hexaMarketplaceAddress
    );
    const auctionContract = new web3.eth.Contract(HexamAuction.abi, hexanAuctionAddress)
    const getAuctionval = await auctionContract.methods.getAuction(hexanftAddress, cardid).call()
    if(getAuctionval._reservePrice > 0){
      setBidSection(true)
    }
    setGetAuction(getAuctionval)
    const highbider = await auctionContract.methods.getHighestBidder(hexanftAddress, cardid).call()
    // console.log(highbider._bid)
    setGetHighestBidder(highbider)
    const dOffer = await marketplaceContract.methods.directoffer(cardid).call()
    setDoffer(dOffer)

    const tokenUri = await nftContract.methods.tokenURI(cardid).call();
    const owner = await nftContract.methods.ownerOf(cardid).call();
    
    let listings = await marketplaceContract.methods
      .listings(hexanftAddress, cardid, owner)
      .call();
    let price = ethers.utils.formatUnits(
      listings.pricePerItem.toString(),
      "ether"
    );
    const currentDateTime = new Date();
    if (account === owner&& dOffer.pricePerItem>0 && dOffer.deadline > currentDateTime.getTime() / 1000){
      setShow(true)
    }
    if (account === dOffer.offerer  && dOffer.deadline > currentDateTime.getTime() / 1000){
      setCancelShow(true)
    }
    const meta = await axios.get(tokenUri);
    let item = {
      price: price,
      owner: owner,
      tokenId: cardid,
      image: meta.data.image,
      name: meta.data.name,
      symbol: meta.data.symbol,
      description: meta.data.description,
      royalty: meta.data.royalty,
    };

    setCardInfo(item);
  }
  return (
    <div className="h-full -w-full">
      <div className="flex flex-col max-w-[1240px] h-full mx-auto bg-white">
        <div className="flex flex-row max-w-[1240px] h-full mx-auto bg-white justify-center gap-8">
          <div className="flex flex-col mt-8">
            <img
              className="h-[270px] w-[400px]"
              src={cardinfo.image}
              alt="nft"
            />
            <div className="flex flex-col w-full h-full mt-16">
              <div className="flex flex-col">
                <button
                  className="flex text-black text-[15px] font-bold pl-2 h-[55px] w-[400px] bg-white border-2 rounded-md justify-start items-center"
                  onClick={handleProperties}
                >
                  Properties
                </button>
                {properties ? (
                  <div className="flex flex-col border-2 h-full w-full">
                    <div className="flex flex-row justify-between mt-4">
                      <div className="ml-4 text-[15px] text-black">Symbol</div>
                      <div className="mr-4 text-[15px] text-black">
                        {cardinfo.symbol}
                      </div>
                    </div>
                    <div className="flex flex-row justify-between mt-4">
                      <div className="ml-4 text-[15px] text-black">Royalty</div>
                      <div className="mr-4 text-[15px] text-black">
                        {cardinfo.royalty}%
                      </div>
                    </div>
                    <div className="flex flex-row justify-between mt-4">
                      <div className="ml-4 text-[15px] text-black">
                        Chain Info
                      </div>
                      <div className="mr-4 text-[15px] text-black">
                        Ethereum
                      </div>
                    </div>
                    <div className="flex flex-row justify-between mt-4">
                      <div className="ml-4 text-[15px] text-black">
                        Collection
                      </div>
                      <div className="mr-4 text-[15px] text-blue-500">
                        My Collection
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col">
                <button
                  className="flex text-black text-[15px] font-bold pl-2 h-[55px] w-[400px] bg-white border-2 rounded-md justify-start items-center"
                  onClick={handleCollection}
                >
                  About Hexa Wlof Game L2
                </button>
                {collection ? (
                  <div className="flex flex-col border-2 h-full w-full">
                    <div className="flex flex-row justify-start ml-2 mt-4">
                      <div className="ml-4 text-[15px] text-black">
                        Hexa Wlof Game L2
                      </div>
                    </div>
                    <div className="flex flex-row justify-start ml-2 mt-4">
                      <div className="ml-4 text-[15px] text-black">Icon</div>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col">
                <button
                  className="flex text-black text-[15px] font-bold pl-2 h-[55px] w-[400px] bg-white border-2 rounded-md justify-start items-center"
                  onClick={handleChaininfo}
                >
                  Chain Info
                </button>
                {chaininfo ? (
                  <div className="flex flex-col border-2 h-full w-full">
                    <div className="flex flex-row justify-between mt-4">
                      <div className="ml-4 text-[15px] text-black">
                        Collection
                      </div>
                      <div className="mr-4 text-[15px] text-blue-500">
                        {cardinfo.owner.substring(0, 12)}
                      </div>
                    </div>
                    <div className="flex flex-row justify-between mt-4">
                      <div className="ml-4 text-[15px] text-black">
                        Token Id
                      </div>
                      <div className="mr-4 text-[15px] text-black">
                        #000{cardinfo.tokenId}
                      </div>
                    </div>
                    <div className="flex flex-row justify-between mt-4">
                      <div className="ml-4 text-[15px] text-black">Network</div>
                      <div className="mr-4 text-[15px] text-black">
                        Ethereum
                      </div>
                    </div>
                    <div className="flex flex-row justify-between mt-4">
                      <div className="ml-4 text-[15px] text-black">
                        Chain Id
                      </div>
                      <div className="mr-4 text-[15px] text-blue-500">97</div>
                    </div>
                  </div>
                ) : null}
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
                  {cardinfo.name} #000{cardinfo.tokenId}
                </span>
                <span className="text-gray-500 text-[20px] font-bold pl-2 bg-white">
                  #000{cardinfo.tokenId}
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
                {cardinfo.description}
              </p>
            </div>
            <div className="flex w-[600px] h-full mt-4 ml-2">
              <span className="flex flex-row">
                Owned by<p className="text-blue-500 ml-2">{cardinfo.owner}</p>
              </span>
            </div>
            
            <div className="flex w-[600px] h-[60px] mt-4 ml-2 border-2 rounded-md items-center justify-between">
              {cardinfo.owner === useraccount?(
                <Link className="Profile" to="/userprofile" >
                <button className="flex h-10 w-[120px] ml-4 bg-blue-500 text-white border-2 rounded-md items-center justify-center hover:bg-white hover:text-black">
                  Profile
                </button>
                </Link>
              ):<Link className="Makeoffer" to="/makeoffer" >
              <button className="flex h-10 w-[120px] ml-4 bg-blue-500 text-white border-2 rounded-md items-center justify-center hover:bg-white hover:text-black">
                Make Offer
              </button>
              </Link>}
            
              
                {show ?( 
                  <div className="flex flex-row w-full h-full mt-4">
              <button className="flex h-10 w-[120px] ml-4 bg-blue-500 text-white border-2 rounded-md items-center justify-center hover:bg-white hover:text-black" onClick={acceptOffer}>
                Accept Offer
              </button>
              <p className="flex flex-row pl-4 h-10 w-[250px] items-center text-center font-bold text-[20px] text-black">{ethers.utils.formatUnits(doffer.pricePerItem?doffer.pricePerItem.toString():0,"ether")} WETH</p>
              </div>
              ): null}
              {cancelshow ?( 
                  <div className="flex flex-row w-full h-full mt-4">
              <button className="flex h-10 w-[120px] ml-4 bg-blue-500 text-white border-2 rounded-md items-center justify-center hover:bg-white hover:text-black"onClick={cancelOffer}>
                Cancel Offer
              </button>
              <p className="flex flex-row pl-4 h-10 w-[250px] items-center text-center font-bold text-[20px] text-black">{ethers.utils.formatUnits(doffer.pricePerItem?doffer.pricePerItem.toString():0,"ether")} WETH</p>
              </div>
              ): null}
              
            </div>
            {bidsection ?(
            <div className="flex flex-col h-full w-full mt-8 ml-2 ">
            <div className="flex flex-row w-[600px] h-16 items-center mt-8 ml-2 border-2 rounded-md justify-between">
              <button className="flex flex-row w-[75px] ml-4 h-10 pl-5 text-white font-bold bg-blue-500 items-center border-2 rounded-md text-[15px]" onClick={placeBid}>Bid</button>
              <input placeholder="Bid Price" type={"number"} className = "w-[250px] h-10 border-2"  onChange={(e) =>setPrice(e.target.value )}/>
              <p className="mr-2 font-bold text-[15px]">Reserve Price : {ethers.utils.formatUnits(getauction._reservePrice?getauction._reservePrice.toString():0,"ether")} ETH</p>
            </div>
            <div className="flex flex-row w-[600px] h-16 items-center mt-[-2px] ml-2 border-2 rounded-md justify-between">
            <p className="ml-2 font-bold text-[12px]">End Time: {new Date(getauction._endTime*1000).toLocaleString()}</p>
              <p className="font-bold text-[12px]">Top Bid : {ethers.utils.formatUnits(gethighestbidder._bid?gethighestbidder._bid.toString():0,"ether")} ETH</p>
              <p className="mr-2 font-bold text-[12px]">Start Time :{new Date(getauction._startTime*1000).toLocaleString()}</p>
            </div>
            </div>
              ):null}
             
            <div className="flex flex-col w-[600px] h-full mt-16 ml-2 border-2 rounded-md">
              <button
                className="flex flex-row h-14 w-[120px] ml-6 font-bold text-black items-center"
                onClick={handlePriceHistory}
              >
                Price History
              </button>
              {pricehistory ? (
                <div className="flex w-full h-[300px] border-2"></div>
              ) : null}
            </div>
            <div className="flex flex-col w-[600px] h-full mt-6 ml-2 border-2 rounded-md">
              <button
                className="flex flex-row h-14 w-[120px] ml-6 font-bold text-black items-center"
                onClick={handleAttributes}
              >
                Attributes
              </button>
              {attributes ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Value
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Frequency
                      </th>
                    </tr>
                  </thead>
                  </table>
              ) : null}
            </div>
            <div className="flex flex-col w-[600px] h-full mt-6 ml-2 border-2 rounded-md">
              <button
                className="flex flex-row h-14 w-[120px] ml-6 font-bold text-black items-center"
                onClick={handleListing}
              >
                Listings
              </button>
              {listing ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        From
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                        <span className="text-blue-500">{cardinfo.owner.substring(0, 12)}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {cardinfo.price} ETH
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        <span className="text-blue-500">true</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : null}
            </div>
            <div className="flex flex-col w-[600px] h-full mt-6 ml-2 border-2 rounded-md">
              <button
                className="flex flex-row h-14 w-[120px] ml-6 font-bold text-black items-center"
                onClick={handleOffer}
              >
                Direct Offer
              </button>
              {offer ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        From
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Expires
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                        {doffer.offerer.substring(0,12)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {ethers.utils.formatUnits(doffer.pricePerItem.toString(),"ether")} WETH
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {new Date(doffer.deadline*1000).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {doffer.deadline > currentTime ? (
                          <span className="text-blue-500">True</span>
                        ):<span className="text-blue-500">false</span>}
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full h-full mt-4 ml-8 border-2">
          <button
            className="flex h-16 w-[120px] ml-4 text-black font-bold items-center justify-center"
            onClick={handleItemActivity}
          >
            Item Activty
          </button>
          {activity ? (
            <div className="flex flex-col w-full h-full border-2">
              <div className="flex flex-row justify-between items-center p-6 ml-4 mr-4">
                <div className="text-[15px] text-black">Event</div>
                <div className="text-[15px] text-black">Price</div>
                <div className="text-[15px] text-black">From</div>
                <div className="text-[15px] text-black">To</div>
                <div className="text-[15px] text-black">Data</div>
              </div>
            </div>
          ) : null}
        </div>
        {/* <div className="flex w-full h-[60px] mt-4 ml-8 border-2 rounded-md items-center">
          <p className="flex h-10 w-[180px] ml-8 text-black items-center justify-center">More from this collection</p>
          </div> */}
      </div>
    </div>
  );
};

export default ItemsInfo;
