const Web3 = require("web3");

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

web3.eth.getBalance("0xa35bB568B0848B4DeEA8e878f11b0cdE636A6770").then(function (result) {
    console.log(web3.utils.fromWei(result, "ether"));
});

web3.eth.sendTransaction({ 
    from : "0xa35bB568B0848B4DeEA8e878f11b0cdE636A6770", 
    to: "0xC0748Ac855d9c27Eb064bAb15bA8B1B7d1A749Ee", 
    value: web3.utils.toWei("1", "ether")
})