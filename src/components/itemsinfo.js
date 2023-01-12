import React from "react";
const ItemsInfo = () => {
  return (
    <div className="h-full -w-full">
      <div className="flex flex-col max-w-[1240px] h-full mx-auto bg-white">
      <div className="flex flex-row max-w-[1240px] h-full mx-auto bg-white justify-center gap-8">
        <div className="flex flex-col mt-8">
          <img className="h-[270px] w-[400px]" src="images/nft.jpg" alt="nft" />
          <div className="flex flex-col w-full h-full mt-16">
            <span className="text-black text-[15px] font-bold pl-2 pt-4 h-[55px] w-[400px] bg-white border-2 mt-2 rounded-md">
              Properties
            </span>
            <span className="text-black text-[15px] font-bold pl-2 pt-4 h-[55px] w-[400px] bg-white border-2 rounded-md">
              About Hexa Wlof Game L2
            </span>
            <span className="text-black text-[15px] font-bold pl-2 pt-4 h-[55px] w-[400px] bg-white border-2 rounded-md">
              Chain Info
            </span>
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
          <div className="flex w-[600px] h-[60px] mt-16 ml-2 border-2 rounded-md items-center">
          <p className="flex h-10 w-[120px] ml-4 text-black items-center justify-center">Price History</p>
          </div>
          <div className="flex w-[600px] h-[60px] mt-4 ml-2 border-2 rounded-md items-center">
          <p className="flex h-10 w-[120px] ml-4 text-black items-center justify-center">Attributes</p>
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
