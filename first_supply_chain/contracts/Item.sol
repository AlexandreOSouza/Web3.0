pragma solidity ^0.8.7;

import "./ItemManager.sol";

contract Item {
    uint public priceInWei;
    uint public pricePaid;
    uint public index;
    ItemManager parentContract;

    constructor(ItemManager _parentContract, uint _priceInwei, uint _index) public {
        priceInWei = _priceInwei;
        index = _index;
        parentContract = _parentContract;
    }

    receive() external payable {
        require(pricePaid == 0, "Item is paid already");
        require(priceInWei == msg.value, "Only full payment allowed ");
        pricePaid += msg.value;
        (bool success, ) = address(parentContract).call{value: msg.value}(abi.encodeWithSignature("triggerPayment(uint256)", index));

        require(success, "The transaction wasn't successful, canceling");

    }

    fallback() external {}
}