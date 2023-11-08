const ProductRegistry = artifacts.require("ProductRegistry");
const fs = require('fs');

async function deployProductRegistry() {
  try {
    const instance = await ProductRegistry.deployed();
    const contractAddress = instance.address;
    console.log("ProductRegistry contract deployed at address:", contractAddress);

    const contractData = {
      address: contractAddress,
    };

    const jsonData = JSON.stringify(contractData, null, 2);

    fs.writeFileSync('ProductRegistry.json', jsonData);

    console.log("Contract address saved in 'ProductRegistry.json'");
  } catch (error) {
    console.error('Error deploying contract and saving address:', error);
  }
}


async function readContractAddress() {
  try {
    // Read the 'ProductRegistry.json' file and parse its content
    const jsonData = fs.readFileSync('ProductRegistry.json', 'utf8');
    const contractData = JSON.parse(jsonData);

    if (contractData && contractData.address) {
      return contractData.address;
    } else {
      console.error('Contract address not found in JSON file');
      return null;
    }
  } catch (error) {
    console.error('Error reading contract address from JSON file:', error);
    return null;
  }
}

module.exports = {
  deployProductRegistry,
  readContractAddress,
};
