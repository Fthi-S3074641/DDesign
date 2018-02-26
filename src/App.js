import React, { Component } from "react";
import Web3 from "web3";
import MainPage from "./components/mainPage";
// import abi from "../build/contracts/DecentralizedDesign.json";

class App extends Component {
  constructor(probs) {
    super(probs);
		this.VoteClicked = this.VoteClicked.bind(this);
		this.ShowEvolution = this.ShowEvolution.bind(this);
		// this.getCurrentEvolution = this.getCurrentEvolution.bind(this);
		
  }

  count = 0;
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  contract = "0x2e8811fdd4d5063ec78185026fe9edbd5e470e34";
	
abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_mutationRate",
				"type": "uint256"
			}
		],
		"name": "setMutationRate",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "isRoundOver",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_aMultiplier",
				"type": "uint256"
			}
		],
		"name": "setMatingMultiplier",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_faceId",
				"type": "uint256"
			}
		],
		"name": "castVote",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "permutationsVote",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_faceId",
				"type": "uint256"
			}
		],
		"name": "getCurrentEvolution",
		"outputs": [
			{
				"name": "",
				"type": "uint256[6]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getTotalEvolutions",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "Testevent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"components": [
					{
						"name": "faceId",
						"type": "uint256"
					},
					{
						"name": "dna",
						"type": "uint256[6]"
					},
					{
						"name": "fitness",
						"type": "uint256"
					}
				],
				"indexed": false,
				"name": "",
				"type": "tuple[]"
			}
		],
		"name": "EvolutionFinished",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "nextRoundClosingTime",
				"type": "uint256"
			}
		],
		"name": "VotingFinished",
		"type": "event"
	}
];
  MyContract = this.web3.eth.contract(this.abi);
	myContractInstance = this.MyContract.at(this.contract);
	// myContractInstance = this.myContractInstance.new({ from: this.web3.eth.accounts[0] });

	// helloContract = this.web3.eth.contract(this.abi);
	// myContractInstance = this.helloContract.new(this.contract, {from:this.web3.eth.accounts[0], gas:3000000});

	// watcher = this.myContractInstance.Testevent();
	// watcher = (error,result) => {
	// 	console.log("fdsafsdf Received");
	// }

	ShowEvolution = (idd) => {
		// alert(idd);
		console.log("ss" , this.myContractInstance.getCurrentEvolution(idd,{ from: this.web3.eth.accounts[0] }));
		return this.myContractInstance.getCurrentEvolution(idd,{ from: this.web3.eth.accounts[0] });
	}

  VoteClicked = (idd, e) => {
    console.log("this is:", idd);
    console.log(this.web3.version.api);
		console.log(this.web3.eth.accounts);
    this.myContractInstance.castVote(idd,{ from: this.web3.eth.accounts[0] });
    //console.log("tust",this.myContractInstance.getTotalEvolutions());
		// this.count = idd;
		
  };

	// getCount = () => {
	// 	 this.myContractInstance.getCount;
  // };
  render() {
		return <MainPage 
			VoteClicked={this.VoteClicked}
			ShowEvolution={this.ShowEvolution} 
			// getCurrentEvolution={this.myContractInstance.getCurrentEvolution(0,{ from: this.web3.eth.accounts[0] }).bind(this)} 
			// getCount={1}																																																																																																																																																																																																																																																																								
		/>;
  }
}

export default App;
