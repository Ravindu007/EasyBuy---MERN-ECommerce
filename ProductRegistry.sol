// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProductRegistry {
    address public owner;
    
    struct Product {
        bytes32 hashValue;
        bool isRegistered;
    }
    
    mapping(uint256 => Product) public productHashes;
    uint256 public productCount;
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    event ProductRegistered(uint256 productId, bytes32 hashValue);
    
  
   function registerProduct(uint256 productId, bytes32 hashValue) external onlyOwner {
        require(!productHashes[productId].isRegistered, "Product is already registered");
        productHashes[productId] = Product(hashValue, true);
        productCount++;
        emit ProductRegistered(productId, hashValue);
    }
    
   function verifyProduct(uint256 productId, bytes32 scannedHashValue) external view returns (bool) {
        require(productHashes[productId].isRegistered, "Product is not registered");
        return productHashes[productId].hashValue == scannedHashValue;
    }
}
