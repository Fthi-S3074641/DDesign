pragma solidity ^0.4.18;

// TODO Setter when changin population size (some modications to the voting mapping is needed when this happens)

// handles the voting mechanism 
contract Voting {
    uint minimumVoteCount; // the minum vote count until a round could be closed
    uint currentVoteCount; // the total votes done per evolution

    // time 
    //uint internal roundOpeningTime;  // round opening time 
    uint internal roundClosingTime;  // round closing time  

    //mapping (uint => bool) public validArtFaces;
    mapping (uint256 => uint) public permutationsVote;

    // event which is triggered when the voting is closed 
    // time for voting passed and minimum amount of votes reached
    event VotingFinished(uint nextRoundClosingTime);

    // CTOR
    function Voting(uint256 _populationSize) public {
        for (uint256 i = 0; i < _populationSize; i++) {
            permutationsVote[i] = 0;
        }

        minimumVoteCount = 10; // default minimum vote count set to 10  
        resetRoundTimer(); // set new round timer
    }

    // not used as we assume that we are using an oracle to check for this 
    // in a development environment the isRoundOver must be pinged or use a centralized server to do this process
    // this then should be injected to voteForFace function to make sure no votes are done when round closes 
    modifier onlyWhenVotingOpen() {
        require ((now < roundClosingTime) && currentVoteCount < minimumVoteCount);
        _;
    }

    // resets round timer (Round = 3 minutes)
    function resetRoundTimer() private returns (uint) {
        roundClosingTime = now + 3 minutes;
        return roundClosingTime;
    }

    // a function which checks if a round is finished
    // this will also be pinged by a client to make sure it closes when time has reached
    function isRoundOver() public view returns (bool) {
        bool roundOver = (now > roundClosingTime) && currentVoteCount >= minimumVoteCount;
        return roundOver; 
    }

    // vote for a specific face
    // since we are assuming there is an oracle pining to check for time
    // we need to do a check, to make sure to close the round
    // returns true if finished, false otherwise 
    function voteForFace(uint256 _faceId) internal returns (bool) {
        if ((currentVoteCount >= minimumVoteCount) && (now > (roundClosingTime))) { // if constraints for voting are met 
            uint newRoundClosingTime = resetRoundTimer(); // resets the time to get ready for another round
            VotingFinished(newRoundClosingTime); // trigger event
            return true;
        } else {
            currentVoteCount += 1; // increments the vote count
            permutationsVote[_faceId] += 1; // gives a vote to a face
            return false;
        }
    }

    function resetVoting(uint256 populationSize) internal {    
        for (uint i = 0; i < populationSize; i++) {
            permutationsVote[i] = 0;
        }
    }
}