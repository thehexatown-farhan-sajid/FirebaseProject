import { ethers } from "ethers";
import Web3 from "web3";
import price from "../Abis/contracts/price.json"

export async function getETHPrice() {
  //     const provider = new
  // ethers.providers.JsonRpcProvider('https://rpc.ankr.com/eth_goerli');
//   const web3 = new Web3("https://rpc.ankr.com/eth_goerli");
const  web3 = new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/a40778806c9e4d0f962550277a5babed"));

  // This constant describes the ABI interface of the contract, which will provide the price of ETH
  // It looks like a lot, and it is, but this information is generated when we compile the contract
  // We need to let ethers know how to interact with this contract.
//   const aggregatorV3InterfaceABI = [
//     {
//       inputs: [],
//       name: "decimals",
//       outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "description",
//       outputs: [{ internalType: "string", name: "", type: "string" }],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }],
//       name: "getRoundData",
//       outputs: [
//         { internalType: "uint80", name: "roundId", type: "uint80" },
//         { internalType: "int256", name: "answer", type: "int256" },
//         { internalType: "uint256", name: "startedAt", type: "uint256" },
//         { internalType: "uint256", name: "updatedAt", type: "uint256" },
//         { internalType: "uint80", name: "answeredInRound", type: "uint80" },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "latestRoundData",
//       outputs: [
//         { internalType: "uint80", name: "roundId", type: "uint80" },
//         { internalType: "int256", name: "answer", type: "int256" },
//         { internalType: "uint256", name: "startedAt", type: "uint256" },
//         { internalType: "uint256", name: "updatedAt", type: "uint256" },
//         { internalType: "uint80", name: "answeredInRound", type: "uint80" },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "version",
//       outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//       stateMutability: "view",
//       type: "function",
//     },
//   ]
  // The address of the contract which will provide the price of ETH
  const addr = "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e";
  // We create an instance of the contract which we can interact with
  const priceFeed = new web3.eth.Contract(price.aggregatorV3InterfaceABI, addr);
  // We get the data from the last round of the contract
 console.log("priceFeed",priceFeed)
  let roundData = await priceFeed.methods.latestRoundData().call();
  console.log("roundData", roundData);
  
  // Determine how many decimals the price feed has (10**decimals)
  let decimals = await priceFeed.methods.decimals().call();
  // We convert the price to a number and return it
  return Number(
    (roundData.answer.toString() / Math.pow(10, decimals)).toFixed(2)
  );
}
