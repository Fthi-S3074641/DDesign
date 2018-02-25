pragma solidity ^0.4.18;

import "./FaceFactory.sol";

// inherits from face factory
// handles the IGA 
contract InteractiveGeneticAlgo is FaceFactory {
    uint256 mutationRate; // the mutation rate 
    uint256 currentGeneration; // the current generation 
    uint256 populationSize; // the population size 
    
    address creator; // this will be the address of SecondContract.

    // Arbitrary multiplier this is used in the generate matting pool 
    // the higher it is the bigger the mating pool but it will also cost more gas
    // by default set to 1
    uint256 aMultiplier; 
    uint256 maxFitness; // maximum fitness 
    
    // since storage is a problem restrict the mating pool to by normalizing values
    // also another optimization is to keep track of the index only 
    uint256[] private mattingPool; // faces which will be used for our mating pool  
    
    // this is used so we dont clear the array all the time the mating pool is generated
    uint256 curMaxMatePool;

    // CTOR 
    function InteractiveGeneticAlgo(uint256 _populationSize) public FaceFactory() {
        mutationRate = 5; 
        currentGeneration = 0;
        aMultiplier = 1; 
        //populationSize = _populationSize;
        creator = msg.sender; // set the owner to the contract creator

        // init population for IGA 
        for (uint256 i = 0; i < _populationSize; i++) {
            createFace(i);
        }
    }

    // only changed by creator
    modifier onlyCreator() {
        require(msg.sender == creator);
        _;
    }

    // TODO: This should be handled by DecentralizedDesign contract as it will affect the Voting.sol too
    // set the population size, only can be changed by the creator of the contract
    /*function setPopulationSize(uint256 _populationSize) public onlyCreator() {
        populationSize = _populationSize;
    }*/ 

    // set the mutation rate, only can be changed by the creator of the contract
    function setMutationRate(uint256 _mutationRate) public onlyCreator() {
        mutationRate = _mutationRate;
    }

    // set the multiplier rate, only can be changed by the creator of the contract
    function setMatingMultiplier(uint256 _aMultiplier) public onlyCreator() {
        aMultiplier = _aMultiplier; 
    } 

    // starts a new evolution
    function startNewEvolution() internal {
        // reset evolution properties
        currentGeneration = 0; 
        maxFitness = 0; 
        curMaxMatePool = 0; 

        for (uint256 i = 0; i < populationSize; i++) {
            population[i].dna = generateRandomDna();
            population[i].fitness = 0;
        }
    }
    
    // A higher fitness = more entries to mating pool = more likely to be picked as a parent
    // A lower fitness = fewer entries to mating pool = less likely to be picked as a parent
    // generates the new generation 'offsprings' 
    function reproduce() internal {
        // matting pool selection
        curMaxMatePool = 0; // reset max mating pool size
        for (uint i = 0; i < population.length; i++) {
            // normalizes from 0 to 5 (since 0 is minimum for both ranges - simplify)
            // then multiply buy an arbitrary multiplier, can be set by creator
            uint256 fitnessNormalize = ((population[i].fitness * 5) / maxFitness) * 4;
            for (uint256 j = 0; j < fitnessNormalize; j++) {
                mattingPool[curMaxMatePool] = i;
                curMaxMatePool++;
            }
        }
    
        // reproduce
        for (i = 0; i < population.length; i++) {
            // pick to random parents only from the current max mate pool length reference 
            // this is done as we dont clear the matting pool itself
            uint256 mother = mattingPool[generateRandomNumber(curMaxMatePool)];
            uint256 father = mattingPool[generateRandomNumber(curMaxMatePool)];
            
            uint256[6] memory mumGenes = population[mother].dna;
            uint256[6] memory dadGenes = population[father].dna;

            population[i].fitness = 0;  // reset fitness since new permutations are produced 
            population[i].dna = dnaCrossover(mumGenes, dadGenes); 
        }

        maxFitness = 0; // reset max fitness now 
        currentGeneration ++; // increment the generation
    }
    
    // does a dna crossover between mum and dad
    function dnaCrossover(uint256[6] _dnaA, uint256[6] _dnaB) private view returns (uint256[6]) {
        uint256[6] memory childDna; 
        uint256 crossover = generateRandomNumber(6);
        
        for (uint256 i = 0; i < childDna.length; i++) {
            // since we have small pool make mutation rate a bit higher
            // to get variey
            var random = generateRandomNumber(50);

            if (random <= mutationRate) { // mutate using mutation probability
                childDna[i] = _dnaA[i];
            } else if (i > crossover) {
                childDna[i] = _dnaA[i];
            } else {
                childDna[i] = _dnaB[i];
            }
        }

        return childDna;
    }

    // returns the current permutation 
    /*function getCurrentPermutation() public view returns(Face[]) {
       return population;
    }*/

    // returns the first id and the size, count, we are assuming ids are incremental 
    // we need to do this as we cannot send an array of struct 
    // web3 does not support that yet
    /*function getPermutationView() public view returns (uint256, uint256) {
        return (population[0].faceId, populationSize);
    }

    // TODO -> DO A CHECK TO MAKE SURE THE ID IS VALID 
    
    // returns face, this will be called by the client to get all the faces in the 
    // current generation
    function getFace(uint256 _faceId) public view returns (uint256, uint256[6]) {
        return (population[_faceId].faceId, population[_faceId].dna);
    }
    */
    
    // update the fitness for a particular configuration
    function updateFaceFitness(uint _faceId) internal {
        population[_faceId].fitness += 1; // increments fitness 
        if (population[_faceId].fitness > maxFitness) {
            maxFitness = population[_faceId].fitness; // set the new maximum fitness  
        }
    }
}