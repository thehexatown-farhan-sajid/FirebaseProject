import  Web3Modal  from 'web3modal'
import Web3 from "web3"
// import { useDispatch, useSelector } from "react-redux";

    export default async function connect(){
        // const { defaultAccount } = useSelector((state) => state.counter);

        const modal = new Web3Modal()
        
        const provider = await modal.connect()

        let connection = {
            account:undefined,
            web3: undefined
        }
        if(provider){
            const web3 = new Web3(provider)
        
            const accounts = await web3.eth.getAccounts()
            connection = {
                account: accounts[0],
                web3
            }
        
        }
        
        return connection
    }