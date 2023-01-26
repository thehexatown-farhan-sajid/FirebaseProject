import React from "react";
import  Web3Modal  from 'web3modal'
import Web3 from "web3"
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDefaultAccount } from "../redux/counterSlice";
import connect from "../utils/auth";

// const modal = new Web3Modal({
//   network: "goerli",
//   theme: "light", // optional, 'dark' / 'light',
//   cacheProvider: false, // optional
//   providerOptions: {}, // required
// })

const provider =
  window.ethereum != null
    ? new ethers.providers.Web3Provider(window.ethereum)
    : ethers.providers.getDefaultProvider();
    console.log("provider",ethers.providers.getDefaultProvider())

const Navbar = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  // const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState("");
  const dispatch = useDispatch();
  const { defaultAccount } = useSelector((state) => state.counter);
  const connectwalletHandl = () => {
    if (window.ethereum) {
      provider.send("eth_requestAccounts", []).then(async () => {
        await accountChangedHandler(provider.getSigner());
      });
    } else {
      setErrorMessage("Please Install Metamask!!!");
    }
  };
  const accountChangedHandler = async (newAccount) => {
    const address = await newAccount.getAddress();
    // setDefaultAccount(address);
    dispatch(setDefaultAccount(address))
    const balance = await newAccount.getBalance();
    setUserBalance(ethers.utils.formatEther(balance));
    await getuserBalance(address);
  };
  const getuserBalance = async (address) => {
    const balance = await provider.getBalance(address, "latest");
    console.log("balance",balance)
  };

  return (
    <div className="flex  w-full ml-5 mr-5 items-center p-4 justify-between">
      <div className="cursor-pointer">
      <Link className="Home" to="/">
        <h1 className="font-bold text-3xl sm:text-4xl lg:text-4xl text-blue-500 ">
          Hexa.io
        </h1>
        </Link>
      </div>
      <div className="flex">
        <div className="flex justify-between bg-gray-200 h-10 rounded-md sm:pl-2 sm:w-[400px] lg:w-[400px] items-center">
          <input
            type="search"
            className="hidden sm:flex bg-transparent p-2 sm:w-full focus:outline-none text-gray-500 "
            placeholder="search.."
          />
          <FiSearch
            size={5}
            className="bg-white border-2 text-black p-[10px] h-10 rounded-md w-10 font-bold hover:bg-blue-500 hover:text-white"
          />
        </div>
        <Link className="Explore" to="/explore">
          <p className=" text-blue-500 px-5 py-1 ml-2 h-10 w-[100px] font-bold">
            Explore
          </p>
        </Link>
        <div className="Collection">
        <Link className="Colletion" to="/collection">
          <p className=" text-blue-500 px-5 py-1 ml-2 h-10 w-[100px] font-bold">
            Collection
          </p>
          </Link>
        </div>
        <div className="Create">
        <Link className="Create" to="/create">
          <p className=" text-blue-500 px-5 py-1 ml-2 h-10 w-[100px] font-bold">
            Create
          </p>
          </Link>
        </div>
        <div className="UserProfile">
        <Link className="UserProfile" to="/userprofile">
          <p className=" text-blue-500 px-5 py-1 ml-2 h-10 w-[100px] font-bold">
            Profile
          </p>
          </Link>
        </div>
        <div className="Connect Wallet" onClick={connectwalletHandl}>
          <button className="border-2 text-black px-5 py-1 ml-2 h-10 w-[160px] rounded-md mr-5 hover:bg-blue-500 hover:text-white">
            {defaultAccount ? userBalance.substring(0, 9) : "Connect Wallet"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
