pragma solidity ^0.4.18;

import "./InteractiveGenticAlgo.sol";
import "./Voting.sol";

/*
    REACT STEPS 
    1. Add js in ui folder:
*/

// TODO -> Gamify the process and give rewards 
// TODO -> Be able to set different population size
// TODO -> population size thingy and how things child classes uses the same prop needs to be done correctly
// refer one reference to population size

// In this implementation the time checks are done on vote, 
// in reality these could be handled by a centralized server 
// or having a client in charge pinging the contract 

// a high level contract handling calls to child contracts
contract DecentralizedDesign is Voting, InteractiveGeneticAlgo {

    // the current evolution, how many evolutions of decentralized design where made
    uint256 currentEvolution; 
    uint internal evolutionClosingTime;  // evolution closing time  
    uint populationSize;
    event Testevent();
    event EvolutionFinished(Face[]); // fittest survivors, maybe show them on client when finished

    // CTOR, for now im just passing the population to 4, for now it could not be set 
    function DecentralizedDesign () public Voting(4) InteractiveGeneticAlgo(4) {
        currentEvolution = 0;
        populationSize = 4;
        Testevent();
    }

    // resets evolution timer (Evolution = 20 minutes)
    function resetEvolutionTimer() private {
        evolutionClosingTime = now + 20 minutes;
    }

    // casting a vote to a particular face
    function castVote(uint _faceId) public {
        // same issue here as explained in the Voting.sol in the voteForFace function
        if ((now > evolutionClosingTime)) {  
            resetEvolutionTimer();

            // had to make a copy of the array in memory before passing it to event
            // https://github.com/ethereum/solidity/issues/3199
            Face[] memory eventPopulation = population; 
            EvolutionFinished(eventPopulation);
            startNewEvolution(); // starts a new evolution 
            resetVoting(populationSize);
        }

        bool isVotingStillOpen = voteForFace(_faceId);
        if (isVotingStillOpen == true) {
            updateFaceFitness(_faceId);
        } else {
            reproduce(); // make offsprings for next round
        }
    }

    // gets current evolution, total number of games/evolution done since contract deployed
    function getTotalEvolutions() public view returns (uint256) {
        return currentEvolution;
    }

    // this gets the current evo, pleb function
    function getCurrentEvolution(uint256 _faceId) public view returns (uint256[6]) {      
        return population[_faceId].dna;
    }
}