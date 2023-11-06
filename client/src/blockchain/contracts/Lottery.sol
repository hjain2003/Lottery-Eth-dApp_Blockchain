// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract Lottery {
    address public owner;
    address payable[] public players;
    uint public randomResult;
    uint public entryAmount = 0.01 ether; // Set the entry amount in the constructor

    event PlayerEntered(address indexed player, uint amount);

    constructor() {
        owner = msg.sender;
    }

    function getRandomNumber() public view returns(uint) {
        return uint(keccak256(abi.encodePacked(owner, block.timestamp)));
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

    function enter() public payable {
        require(msg.value >= entryAmount, "Insufficient ETH sent");

        // Address of the player entering the lottery
        players.push(payable(msg.sender));

        // Emit an event to log the player's entry
        emit PlayerEntered(msg.sender, msg.value);
    }

    function pickWinner() public onlyOwner {
        randomResult = getRandomNumber();
    }

    function payWinner() public onlyOwner {
        require(players.length > 0, "No players in the game");

        uint index = randomResult % players.length;
        players[index].transfer(address(this).balance);

        // Reset the state of the contract
        delete players;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }
}
