import React from "react";

const Collection = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-row h-full w-full mt-8 justify-center">
        <input
          type="search"
          className="h-[50px] w-[300px] border-2 rounded-md"
          placeholder="  search collections..."
        />
        <p className="text-[20px] text-gray-800 pt-3 ml-4 font-bold">
          247 results
        </p>
      </div>
      <div className="flex flex-wrap w-12/2 gap-4 m-8">
        {[...Array(247)].map((item, index) => {
          return (
            <>
              <div className="flex flex-col">
                <p className="text-[15px] text-gray-800 pt-3 ml-4 font-bold">
                  My Collection
                </p>
                <img
                  className="w-32 h-32 object-center pt-5 rounded-full"
                  src="images/nft2.jpg"
                  alt="nft"
                />
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Collection;
