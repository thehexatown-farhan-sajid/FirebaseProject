import React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
    hexanftAddress, hexaMarketplaceAddress, WethAddress
  } from "../utils/options";
import connect from "../utils/auth";
import HexaNFTs from "../Abis/contracts/HexaNFTs.sol/HexaNFTs.json";
import HexaMarketplace from "../Abis/contracts/HexaMarketplace.sol/HexaMarketplace.json";
import Hexatoken from "../Abis/contracts/ERC20.sol/HexaToken.json";
import Weth from "../Abis/contracts/WETH.sol/Weth.json"
import { useSelector, useDispatch } from "react-redux";


const MakeOffer = () =>{
    const [offerPrice, setOfferPrice] = useState('')
    const [timestemp, setTimeStemp] = useState(null)
    const { cardid } = useSelector((state) => state.counter);



    const CreateOffer = async()=>{
        const { account, web3 } = await connect();
        const tokenContract = new web3.eth.Contract(Weth.abi, WethAddress)
        const nftContract = new web3.eth.Contract(HexaNFTs.abi, hexanftAddress);
        const marketplaceContract = new web3.eth.Contract(HexaMarketplace.abi, hexaMarketplaceAddress);
        await tokenContract.methods.approve(hexaMarketplaceAddress ,offerPrice).send({from: account});
        await marketplaceContract.methods.createOffer(hexanftAddress, cardid, WethAddress, 1, offerPrice, timestemp).send({from: account})


        // const offer = await marketplaceContract.methods.offers(hexanftAddress, cardid, account).call()
        // console.log("offer", offer)
        // const tokenApprove =  "100000000000000000000"
        let balance = await tokenContract.methods.balanceOf(account).call()
        // await tokenContract.methods.approve(hexaMarketplaceAddress ,tokenApprove).send({from: account});
        // let allownce = await tokenContract.methods.allowance(account, hexaMarketplaceAddress).call()
        console.log("balance", ethers.utils.formatUnits(
          balance.toString(),
            "ether"
          ))
        // console.log("Balance", Balance)
    }
    return(
        <div className="flex flex- row m-12">
            <div className="flex flex-col items-center justify-center w-full h-full">
            <p className="flex-row ml-16 mt-4 text-[17px] font-bold">
            Set offer Price in Wei
          </p>
          <input
            placeholder="Offer Price"
            type={"number"}
            className="mt-2 ml-8 w-[350px] h-[60px] border-2 rounded-md items-center pl-4 pr-4"
            onChange={(e) =>setOfferPrice(e.target.value )
            }
          />
           <p className="flex-row ml-16 mt-4 text-[17px] font-bold">
            Set offer deadline timestemp 
          </p>
          <input
            placeholder="Offer Deaddline Timestemp"
            type={"number"}
            className="mt-2 ml-8 w-[350px] h-[60px] border-2 rounded-md items-center pl-4 pr-4"
            onChange={(e) =>setTimeStemp(e.target.value )
            }
          />
          <button className="flex items-center mt-4 ml-8 h-[60px] w-[350px] bg-blue-500 font-bold text-white border-2 rounded-md justify-center hover:bg-white hover:text-black" onClick={CreateOffer}>
                Offer Send
              </button>

            </div>
        </div>
    )

}
export default MakeOffer;