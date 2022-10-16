// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract BuySudeepADrink {
    event NewMemo(
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );

    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    address payable sudeep;

    Memo [] memos;

    constructor () {
        sudeep = payable(msg.sender);
    }

    function buyADrink(string memory _name, string memory _message)  payable public returns(string memory) {
        require(msg.value > 0, "Sorry Buddy Can't Buy A Drink with 0 Eth");
        memos.push(Memo(
            msg.sender,
            block.timestamp,
            _name,
            _message
        ));
        emit NewMemo(msg.sender, block.timestamp, _name, _message);
        return string("Thank you so much, i am able to buy a coffee");
    }

    function withDraw() public payable {
        require(msg.sender == sudeep);
        sudeep.transfer(address(this).balance);
    }

    function memes() public view returns(Memo[] memory) {
        return memos;
    }
}

// This contract is deployed in Polygon mumbai test network and the contract address is 0xC4Eb4b747bd5f09E49717FE8B3aec4386DEf3D7b