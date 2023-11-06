import React, { useEffect, useState } from 'react'
import './LotteryPage.css';
import Web3 from 'web3';
import Player_card from '../Player_card/Player_card';
import lotteryContract from '../../blockchain/lottery.js';

const LotteryPage = () => {


  const [web3, setWeb3] = useState();
  const [balance, setBalance] = useState(0);
  const [players, setPlayers] = useState([]);
  const [address, setAddress] = useState();
  const [ltContract, setLtContract] = useState();

  useEffect(() => {
    if (address) {
      fetchBalance();
      getPlayers();
    }
    // fetchPlayers();
  }, [address]);


  const fetchBalance = async () => {
    if (web3 && address) {
      try {
        const balance = await web3.eth.getBalance(address);
        const etherBalance = web3.utils.fromWei(balance, 'ether');
        setBalance(etherBalance);
      } catch (err) {
        console.log('Error fetching balance:', err);
      }
    }
  }

  const getPlayers = async () => {
    const players = await ltContract.methods.getPlayers().call()
    setPlayers(players)
  }


  const enterLottery = async () => {
    try {
      await ltContract.methods.enter().send({
        from: address,
        value: web3.utils.toWei('0.01', 'ether'),  // Set the value in wei
        gas: 5000000,
      });
    } catch (error) {
      console.log(error);
    }
  }


  
  const connectWallet =async() =>{
    // Check if MetaMask is installed
    if(typeof window !== 'undefined' && typeof window.ethereum !=='undefined'){
       try {
        // request wallet connection
        await window.ethereum.request({method:'eth_requestAccounts'})
        // create web3 instance & set to state
        const web3 =new Web3(window.ethereum)
        // set web3 instance in React state
        setWeb3(web3)
        // get list of accounts
        const accounts =await web3.eth.getAccounts(); 
        // set account 1 to React state
        setAddress(accounts[0])

        const ltContract = lotteryContract(web3)
        setLtContract(ltContract);

        window.ethereum.on('accountsChanged', async () => {
          const accounts = await web3.eth.getAccounts()
          console.log(accounts[0])
          /* set account 1 to React state */
          setAddress(accounts[0])
        })
       } catch (error) {
          console.log(error,'connect wallet');
       }
    }else{
      console.log('Please install Metamask')
    }
  }


  return (
    <>
      <div className="full_page">
        <nav><h2>Lottery Ticket</h2>
          <button id="connect_wallet" onClick={connectWallet}>Connect Wallet</button>
        </nav>
        <div className="container">
          <span>Your Balance : {balance} ETH</span>
          <br />
          <div className="enter_box">
            <span>Ticket Cost : 0.01 ETH</span>
            <br />
            <span>Current Total Pool : </span>
            <br />
            <button id="enter_btn" className='container_btn' onClick={enterLottery}>Enter</button>
            <br />
            <button className='container_btn' id="winner_btn">Pick Winner</button>
          </div>
          <br />
          <b>Players : </b>
          <div className="players">
            {players.map((player, index) => (
              <Player_card key={index} address={player} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default LotteryPage
