pragma solidity ^0.4.18;

// TODO: Encode dna to use one uint256
// TODO: Create a way to set maximum mapping
// TODO: If you manage to find some time rework random method use as seed
contract FaceFactory {

    // a map with a reference to the maximum values of a specific property in the gene
    mapping(uint => uint) maximumMapping; 
    
    // face for parametric faces 
    struct Face {
        uint256 faceId; 
        uint256[6] dna; // face dna 
        uint256 fitness; // how good is the face based on votes in our case
    }

    // this array could also be changed to dynamic but for a simple implementation it was 
    Face[] internal population; // we will only have a population of 4 

    // CTOR , should max prop be passed as params ?
    function FaceFactory () public {
        // set default maximumMapping 
        maximumMapping[0] = 2;      // has mouth
        maximumMapping[1] = 71;     // eye size
        maximumMapping[2] = 46;     // eye width
        maximumMapping[3] = 171;    // petal length
        maximumMapping[4] = 100;    // petal width 
        maximumMapping[5] = 9;      // petal colour
    }

    // internal, public, private, external 
    function createFace(uint256 _faceId) internal {
        population.push(Face(_faceId,generateRandomDna(), 0));
    }

    // validates DNA values 
    /*modifier validDna(uint256[6] dna) {
        require(dna[1] <= maximumMapping[1]);
        require(dna[2] <= maximumMapping[2]);
        require(dna[3] <= maximumMapping[3]);
        require(dna[4] <= maximumMapping[4]);
        require(dna[5] <= maximumMapping[5]);
        _; // continue exec;
    }*/

    // generates a random number this is not true random
    function generateRandomNumber(uint256 _maxValue) internal view returns (uint256) {
        return uint256(keccak256(block.timestamp, block.difficulty)) % _maxValue;
    }

    // generates a new random DNA, again this is not a true random 
    function generateRandomDna() internal view returns(uint256[6]) {
        uint256[6] memory randomDna; 
        randomDna[0] = generateRandomNumber(maximumMapping[0]);
        randomDna[1] = generateRandomNumber(maximumMapping[1]);
        randomDna[2] = generateRandomNumber(maximumMapping[2]); 
        randomDna[3] = generateRandomNumber(maximumMapping[3]);   
        randomDna[4] = generateRandomNumber(maximumMapping[4]);
        randomDna[5] = generateRandomNumber(maximumMapping[5]);
        return randomDna;
    }  
}
