// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract Lottery {
    address public manager;
    address[] public players;

    constructor() {
        manager = msg.sender;
    }

    modifier restricted() {
        require(msg.sender == manager, "Only the manager can call this function");
        _;
    }

    function enter() public payable {
        require(msg.value > 0.1 ether, "Minimum entry fee is 0.1 ether");
        require(msg.sender!=manager, "Manager can't enter lottery!");
        players.push(msg.sender);
    }

    function getPlayers() public view returns (address[] memory) {
        return players;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function random() private view returns (uint) {
    return uint(keccak256(abi.encodePacked(block.basefee, block.timestamp, players)));
    }
    
    function pickWinner() public restricted {
        uint index = random() % players.length;
        address winner = players[index];
        address payable winnerPayable = payable(winner);
        winnerPayable.transfer(address(this).balance);
        players = new address[](0);
    }
    
}
