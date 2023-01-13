import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-full -w-full">
      <div className="flex flex-row max-w-[1240px] h-full mx-auto bg-white justify-between">
        <div className=" flex font-bold items-center mt-64">
          <div className="text-center w-[420px] h-full ">
            <p className="font-bold text-2xl sm:text-3xl lg:text-3xl text-gray-700">
              Trade without platform fees on Hexa
            </p>
            <p className="text-15px pt-3 text-gray-400">
              Hexa is an NFT marketplace built on Ethereum. Create and trade
              NFTs instantly with low listing costs.
            </p>
            
            <div className="flex flex-row justify-center gap-2 pt-5 pb-3">
            <Link className="Explore" to="/explore" >
              <button className="bg-blue-500 text-white px-5 py-1 ml-2 h-10 w-[150px] rounded-md">
                Explore
              </button>
              </Link>
              <Link className="Create" to="/create">
              <button className=" text-blue-500 px-5 py-1 ml-2 h-10 w-[150px] rounded-md border-2 border-blue-500">
                Create
              </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <img
            className="h-[446px] w-full mr-32 mt-32"
            src="images/nft.jpg"
            alt="nft"
          />
          <div className="flex flex-col  h-[100px] bg-white border-2 ">
            <span className="text-gray-500 text-20px pt-4 ml-8 ">
              Ancestral Uman
            </span>
            <span className="text-gray-800 text-20px pt-2 font-bold ml-8">
              World of Umans
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col pt-32 mt-[100px] w-full h-full bg-[#f9f9ff] ">
        <h1 className="text-black text-5xl font-bold text-center">
          Why Hexa
        </h1>
        <div className="flex flex-row gap-8 mr-64 ml-64 mt-8 pt-10 justify-center">
          <div className="flex flex-col w-[300px] h-[300px] gap-4 bg-white border-2 rounded-2xl text-center">
            <div className="ml-[90px] pt-4">
              <img
                className="w-24 h-24 object-center"
                src="images/connect.svg"
                alt="connect"
              />
            </div>
            <div className="text-2xl font-bold pt-4">Easy Connect</div>
            <div className="pt-4 text-[15px] text-gray-500 pb-10">
              Using Metamask or CoinBase Wallet. Just click 'Connect Wallet' on
              the top right to start.
            </div>
          </div>
          <div className="flex flex-col w-[300px] h-[300px] gap-4 bg-white border-2 rounded-2xl text-center">
            <div className="ml-[90px] pt-4">
              <img
                className="w-24 h-24 object-center"
                src="images/fast.svg"
                alt="fast"
              />
            </div>
            <div className="text-2xl font-bold pt-4">Super Fast</div>
            <div className="pt-4 text-[15px] text-gray-500 pb-10">
              Since Hexa runs on the Ethereum ETH Network, transactions are
              usually confirmed within 10-15 seconds.
            </div>
          </div>
          <div className="flex flex-col w-[300px] h-[300px] gap-4 bg-white border-2 rounded-2xl text-center">
            <div className="ml-[90px] pt-4">
              <img
                className="w-24 h-24 object-center"
                src="images/low.svg"
                alt="low"
              />
            </div>
            <div className="text-2xl font-bold pt-4">Low Transaction Fees</div>
            <div className="pt-4 text-[15px] text-gray-500 pb-10">
              Transactions are usually just a few cents, allowing users to
              create and trade many NFTs without prohibitively high network
              fees.
            </div>
          </div>
          <div className="flex flex-col w-[300px] h-[300px] gap-4 bg-white border-2 rounded-2xl text-center">
            <div className="ml-[90px] pt-4">
              <img
                className="w-24 h-24 object-center"
                src="images/zero.svg"
                alt="zero"
              />
            </div>
            <div className="text-2xl font-bold pt-4">Zero Platform Fees</div>
            <div className="pt-4 text-[15px] text-gray-500 pb-10">
              Trade NFTs via auction or direct offer without any fees taken by
              Artion.
            </div>
          </div>
        </div>
        <div className="flex flex-col pt-16 mt-[100px]">
          <h1 className="text-black text-5xl font-bold text-center">
            Browse by category
          </h1>
          <div className="flex flex-row max-w-[1240px] h-full mx-auto justify-between mt-16 gap-4">
            <div className="flex flex-col w-[400px] h-[300px] gap-4 bg-white border-2 rounded-2xl text-center">
              <img
                className="w-32 h-32 object-center ml-[130px] pt-16"
                src="images/art.svg"
                alt="art"
              />
              <div className="flex flex-row pt-8 justify-between pb-6 w-[350px] h-[50px] bg-[#f5f5f5] items-center text-center m-6">
                <div className="ml-4 font-bold text-2xl">Art</div>
                <div className="mr-4">
                  <img
                    className="w-12 h-16 object-center"
                    src="images/greater.svg"
                    alt="greater"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col w-[400px] h-[300px] gap-4 bg-white border-2 rounded-2xl text-center">
              <img
                className="w-32 h-32 object-center ml-[130px] pt-16"
                src="images/collection.svg"
                alt="collection"
              />
              <div className="flex flex-row pt-8 justify-between pb-6 w-[350px] h-[50px] bg-[#f5f5f5] items-center text-center m-6">
                <div className="ml-4 font-bold text-2xl">Collectibles</div>
                <div className="mr-4">
                  <img
                    className="w-12 h-16 object-center"
                    src="images/greater.svg"
                    alt="greater"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col w-[400px] h-[300px] gap-4 bg-white border-2 rounded-2xl text-center">
              <img
                className="w-32 h-32 object-center ml-[130px] pt-16"
                src="images/sports.svg"
                alt="sports"
              />
              <div className="flex flex-row pt-8 justify-between pb-6 w-[350px] h-[50px] bg-[#f5f5f5] items-center text-center m-6">
                <div className="ml-4 font-bold text-2xl">Sports</div>
                <div className="mr-4">
                  <img
                    className="w-12 h-16 object-center"
                    src="images/greater.svg"
                    alt="greater"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row max-w-[1240px] h-full mx-auto justify-between mt-16 gap-4">
            <div className="flex flex-col w-[400px] h-[300px] gap-4 bg-white border-2 rounded-2xl text-center">
              <img
                className="w-32 h-32 object-center ml-[130px] pt-16"
                src="images/utility.svg"
                alt="utility"
              />
              <div className="flex flex-row pt-8 justify-between pb-6 w-[350px] h-[50px] bg-[#f5f5f5] items-center text-center m-6">
                <div className="ml-4 font-bold text-2xl">Utility</div>
                <div className="mr-4">
                  <img
                    className="w-12 h-16 object-center"
                    src="images/greater.svg"
                    alt="greater"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col w-[400px] h-[300px] gap-4 bg-white border-2 rounded-2xl text-center">
              <img
                className="w-32 h-32 object-center ml-[130px] pt-16"
                src="images/trading.svg"
                alt="trading"
              />
              <div className="flex flex-row pt-8 justify-between pb-6 w-[350px] h-[50px] bg-[#f5f5f5] items-center text-center m-6">
                <div className="ml-4 font-bold text-2xl">Trading Card</div>
                <div className="mr-4">
                  <img
                    className="w-12 h-16 object-center"
                    src="images/greater.svg"
                    alt="greater"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col w-[400px] h-[300px] gap-4 bg-white border-2 rounded-2xl text-center">
              <img
                className="w-32 h-32 object-center ml-[130px] pt-16"
                src="images/virtual.svg"
                alt="virtual"
              />
              <div className="flex flex-row pt-8 justify-between pb-6 w-[350px] h-[50px] bg-[#f5f5f5] items-center text-center m-6">
                <div className="ml-4 font-bold text-2xl">Virtual Worlds</div>
                <div className="mr-4">
                  <img
                    className="w-12 h-16 object-center"
                    src="images/greater.svg"
                    alt="greater"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row max-w-[1240px] h-full mx-auto justify-between mt-16 gap-4">
          <div className="flex flex-col w-[400px] h-[300px] gap-4 bg-white border-2 rounded-2xl text-center">
            <img
              className="w-32 h-32 object-center ml-[130px] pt-16"
              src="images/domain.svg"
              alt="domain"
            />
            <div className="flex flex-row pt-8 justify-between pb-6 w-[350px] h-[50px] bg-[#f5f5f5] items-center text-center m-6">
              <div className="ml-4 font-bold text-2xl">Domain Names</div>
              <div className="mr-4">
                <img
                  className="w-12 h-16 object-center"
                  src="images/greater.svg"
                  alt="greater"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-[400px] h-[300px] gap-4 bg-white border-2 rounded-2xl text-center">
            <img
              className="w-32 h-32 object-center ml-[130px] pt-16"
              src="images/search.svg"
              alt="search"
            />
            <div className="flex flex-row pt-8 justify-between pb-6 w-[350px] h-[50px] bg-[#f5f5f5] items-center text-center m-6">
              <div className="ml-4 font-bold text-2xl">Explore NFTs</div>
              <div className="mr-4">
                <img
                  className="w-12 h-16 object-center"
                  src="images/greater.svg"
                  alt="greater"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row h-16 items-center bg-[#1a6aff] justify-between mt-10 mb-10">
          <div className="text-xl text-white font-bold pl-8">Hexa.io</div>
          <div className="text-xl text-white font-bold">Privacy Policy</div>
          <div className="text-xl text-white font-bold">Cookie Policy</div>
          <div className="text-xl text-white font-bold">Terms of Service</div>
          <div className="text-xl text-white font-bold pr-8">
            NFTs Marketplace
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
