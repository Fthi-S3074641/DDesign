pragma solidity ^0.4.18;

contract Votingk {
    uint value;
    
    function saveVote(uint _v) public {
        value = _v;
    }
    
    function getCount() public constant returns (uint) {
        return value;
    }
}
