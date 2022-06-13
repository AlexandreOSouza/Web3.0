const Web3 = require("web3");

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

web3.eth.call({
    from: '0xa35bB568B0848B4DeEA8e878f11b0cdE636A6770',
    to: '0x91307622C07E8aF26D6391bdE8018D11Fc6FE690',
    data: web3.utils.sha3('myUint()').substring(0, 10)
}).then(console.log);

const contract = new web3.eth.Contract([
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_myUint",
				"type": "uint256"
			}
		],
		"name": "setUint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "myUint",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
], "0x91307622C07E8aF26D6391bdE8018D11Fc6FE690");

contract.methods.myUint().call().then(console.log);

contract.methods.setUint(59).send({from: "0xa35bB568B0848B4DeEA8e878f11b0cdE636A6770"}).then(console.log);