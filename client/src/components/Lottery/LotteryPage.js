import React from 'react'
import './LotteryPage.css';
import Player_card from '../Player_card/Player_card';

const LotteryPage = () => {
  return (
    <>
        <div className="full_page">
            <nav><h2>Lottery Ticket</h2>
            <button id="connect_wallet">Connect Wallet</button>
            </nav>
            <div className="container">
                <span>Your Balance : </span>
                <br />
                <div className="enter_box">
                    <span>Ticket Cost : 0.1 ETH</span>
                    <br />
                    <span>Current Total Pool : 10 ETH</span>
                    <br />
                    <button id="enter_btn" className='container_btn'>Enter</button>
                     <br />
                     <button className='container_btn' id="winner_btn">Pick Winner</button>
                </div>
                <br />
                <b>Players : </b>
                <div className="players">
                    <Player_card address="0x02328ddn20"/>
                </div>
            </div>
        </div>
    </>
  )
}

export default LotteryPage
