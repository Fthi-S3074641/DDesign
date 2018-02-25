pragma solidity ^0.4.18;

contract Voting {
    uint value;
    
    function saveVote() public {
        value = value + 1;
    }
    
    function getCount() public constant returns (uint) {
        return value;
    }
}
