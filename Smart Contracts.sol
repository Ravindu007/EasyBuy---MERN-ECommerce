// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HashRegistry {
    mapping(uint256 => bytes32) public hashRegistry;
    uint256 public hashCount;

    event HashAdded(uint256 indexed id, bytes32 hash);

    function addHash(bytes32 _hash) public {
        hashRegistry[hashCount] = _hash;
        emit HashAdded(hashCount, _hash);
        hashCount++;
    }
}

contract HashRetriever {
    HashRegistry private hashRegistryContract;

    constructor(address _hashRegistryAddress) {
        hashRegistryContract = HashRegistry(_hashRegistryAddress);
    }

    function getHash(uint256 _id) public view returns (bytes32) {
        return hashRegistryContract.hashRegistry(_id);
    }
}


