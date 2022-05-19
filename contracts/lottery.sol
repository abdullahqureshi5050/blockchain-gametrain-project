// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";

contract Lottery {
    address public owner;
    address payable[] public players;
    uint public lotteryId;
    address public Jtoken;
    uint public poolAmount;
    uint public winner;
    mapping (uint => address payable) public lotteryHistory;
    mapping (uint256=>address) private _idToUser; 


    constructor(address token_) {
        owner = msg.sender;
        lotteryId = 1;
        poolAmount = 0;
        Jtoken = token_;
    }

//get balance
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

//get entire pool amount
    function getPoolAmount() public view returns (uint) {
        return poolAmount;
    }

//getplayers
    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

//enter and participate
     function enterJackpot(uint amount) public payable {
        IERC20(Jtoken).transfer(address(this), amount);
        poolAmount += amount;
        players.push(payable(msg.sender));
  }

//getRandomNumber
    function getRandomNumber() public view returns (uint) {
        return uint(keccak256(abi.encodePacked(owner, block.timestamp)));
    }
    
//get 1 random winner
    function pickWinner() public  {
        require(msg.sender==owner);
        uint index = getRandomNumber() % players.length;
        IERC20(Jtoken).transferFrom(owner, players[index], poolAmount);
        players = new address payable[](0);
    }
}
