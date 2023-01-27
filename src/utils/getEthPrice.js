import Web3 from "web3";
import price from "../Abis/contracts/price.json"

export async function getETHPrice() {
const  web3 = new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/a40778806c9e4d0f962550277a5babed"));

  const addr = "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e";
  // We create an instance of the contract which we can interact with
  const priceFeed = new web3.eth.Contract(price.aggregatorV3InterfaceABI, addr);
  // We get the data from the last round of the contract
  const roundData = await priceFeed.methods.latestRoundData().call();
  
  // Determine how many decimals the price feed has (10**decimals)
  const decimals = await priceFeed.methods.decimals().call();
  // We convert the price to a number and return it
  return Number(
    (roundData.answer.toString() / Math.pow(10, decimals)).toFixed(2)
  );
}
