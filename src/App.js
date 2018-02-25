import React, { Component } from "react";
import Web3 from "web3";
import MainPage from "./components/mainPage";

class App extends Component {
  constructor(probs) {
    super(probs);
    this.VoteClicked = this.VoteClicked.bind(this);
  }

  count = 0;
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  contract = "0xe4ce8fe2ccc4c93eea34e7bc2a2585a169856cd7";

  abi = [
    {
      constant: false,
      inputs: [],
      name: "saveVote",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "getCount",
      outputs: [
        {
          name: "_total",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    }
  ];

  MyContract = this.web3.eth.contract(this.abi);
  myContractInstance = this.MyContract.at(this.contract);

  VoteClicked = (idd, e) => {
    console.log("this is:", idd);
    console.log(this.web3.version.api);
    console.log(this.web3.eth.accounts);
    this.myContractInstance.saveVote({ from: this.web3.eth.accounts[0] });
    this.myContractInstance.saveVote({ from: this.web3.eth.accounts[1] });
    console.log(this.myContractInstance.getCount());
		this.count = this.myContractInstance.getCount();
		
  };

  render() {
    return <MainPage VoteClicked={this.VoteClicked} />;
  }
}

export default App;
