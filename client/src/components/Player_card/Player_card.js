import React from 'react'
import './Player_card.css';

const Player_card = ({address}) => {
  return (
    <>
        <div className="card">{address}</div>
    </>
  )
}

export default Player_card
