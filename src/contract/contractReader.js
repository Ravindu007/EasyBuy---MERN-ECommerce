// contractReader.js

import ProductRegistry from './ProductRegistry'; // Assuming you have this import

export const deployProductRegistry = async () => {
  try {
    const instance = await ProductRegistry.deployed();
    const contractAddress = instance.address;
    console.log("ProductRegistry contract deployed at address:", contractAddress);

    const contractData = {
      address: contractAddress,
    };

    // Save the contract address in localStorage or any other client-side storage solution
    localStorage.setItem('ProductRegistryAddress', JSON.stringify(contractData));

    console.log("Contract address saved in client-side storage");
  } catch (error) {
    console.error('Error deploying contract and saving address:', error);
  }
};

export const readContractAddress = () => {
  try {
    // Read the contract address from client-side storage
    const storedContractData = localStorage.getItem('ProductRegistryAddress');

    if (storedContractData) {
      const contractData = JSON.parse(storedContractData);
      return contractData.address;
    } else {
      console.error('Contract address not found in client-side storage');
      return null;
    }
  } catch (error) {
    console.error('Error reading contract address from client-side storage:', error);
    return null;
  }
};
