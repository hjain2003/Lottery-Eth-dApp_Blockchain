import LotteryABI from './build/Lottery.json'


const abi = LotteryABI.abi;
const contractAdd = "0x8Ef4B51fAAe13e32632205c40FFf4e87dAE59681"

const lotteryContract = web3 =>{
    return new web3.eth.Contract(abi,contractAdd);
}

export default lotteryContract;