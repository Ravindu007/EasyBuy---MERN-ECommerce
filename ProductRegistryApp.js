import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import ProductRegistry from './contracts/ProductRegistry.json'; // Replace with contract JSON file path
import uniqid from 'uniqid';
import { useQRContext } from './QRContext'; // Import the QR context
import { useQRcodeGeneration } from './useQRcodeGeneration'; // Import the useQRcodeGeneration hook
import { readContractAddress, deployProductRegistry } from './contractReader'; // Import deployProductRegistry function

const ProductRegistryApp = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [productId, setProductId] = useState('');
  const [hashValue, setHashValue] = useState('');
  const [scannedHashValue, setScannedHashValue] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  // Function to generate the blockchain ID
  const generateBlockChainID = (productId, businessId) => {
    return uniqid(String(productId), String(businessId));
  }

  const { generateQR } = useQRcodeGeneration();

  useEffect(() => {
    const initializeWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.enable();
        setWeb3(web3Instance);

        // Read the contract address from the JSON file
        const contractAddress = await readContractAddress();

        if (contractAddress) {
         const contractInstance = new web3Instance.eth.Contract(ProductRegistry.abi, contractAddress);
          setContract(contractInstance);
        } else {
          console.log('Contract not deployed on the current network. Deploying now...');
          await deployProductRegistry(); // Deploy the contract
          const newContractAddress = await readContractAddress(); // Read the new contract address

          if (newContractAddress) {
            const newContractInstance = new web3Instance.eth.Contract(ProductRegistry.abi, newContractAddress);
            setContract(newContractInstance);
          } else {
            console.error('Failed to deploy and obtain contract address.');
          }
        }

        const accounts = await web3Instance.eth.getAccounts();
        setAccounts(accounts);
      } else {
        console.error('Web3 not found. Please install a Web3-enabled browser.');
      }
    };

    initializeWeb3();
  }, []);

 const handleRegisterProduct = async () => {
    if (!contract || !web3 || !productId || !hashValue) return;

    const generatedHashValue = generateBlockChainID(productId, accounts[0]);

    setHashValue(generatedHashValue);

    try {
      await contract.methods.registerProduct(productId, web3.utils.utf8ToHex(generatedHashValue)).send({ from: accounts[0] });

      generateQR(generatedHashValue, product, business);

      alert('Product registered successfully');
    } catch (error) {
      console.error('Error registering the product:', error);
    }
  };

  const handleVerifyProduct = async () => {
    if (!contract || !web3 || !scannedHashValue) return;

    try {
      const result = await contract.methods.verifyProduct(web3.utils.utf8ToHex(scannedHashValue)).call();

      if (result) {
        setIsRegistered(true);
      } else {
        setIsRegistered(false);
      }
    } catch (error) {
      console.error('Error comparing hash values:', error);
    }
  };

  const { scannedQR } = useQRContext();

  useEffect(() => {
    if (scannedQR) {
      setScannedHashValue(scannedQR);
      handleVerifyProduct();
    }
  }, [scannedQR]);

  return (
    <div>
      <h1>Product Registry</h1>
      <div>
        <label>Product ID:</label>
        <input type="number" value={productId} onChange={(e) => setProductId(e.target.value)} />
      </div>
      <div>
        <label>Hash Value:</label>
        <input type="text" value={hashValue} onChange={(e) => setHashValue(e.target.value)} />
      </div>
      <button onClick={handleRegisterProduct} disabled={!contract || !web3 || !productId || !hashValue}>Register Product</button>

      <hr />

      <div>
        <label>Scanned Hash Value:</label>
        <input type="text" value={scannedHashValue} onChange={(e) => setScannedHashValue(e.target.value)} />
      </div>
      <button onClick={handleVerifyProduct} disabled={!contract || !web3 || !scannedHashValue}>Compare Hash Value</button>
      {isRegistered ? <p>The hash values match. Product is registered.</p> : <p>The hash values do not match. Product is not registered.</p>}
    </div>
  );
};


export default ProductRegistryApp;
export { handleRegisterProduct };
