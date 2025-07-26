import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { ChatAppAddress, ChatAppABI } from "../Context/constants";

// ✅ Check if wallet is already connected
export const checkIfWalletIsConnected = async () => {
  try {
    if (!window.ethereum) {
      console.log("Install Metamask");
      return null;
    }

    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    return accounts.length > 0 ? accounts[0] : null;
  } catch (error) {
    console.error("Error checking wallet:", error);
  }
};

// ✅ Connect to MetaMask wallet
export const connectWallet = async () => {
  try {
    if (!window.ethereum) {
      console.log("Install Metamask");
      return null;
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    return accounts[0];
  } catch (error) {
    if (error.code === 4001) {
      console.log("User rejected connection request");
    } else {
      console.error("Wallet connection error:", error);
    }
    return null;
  }
};

// ✅ Internal: create contract instance
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(ChatAppAddress, ChatAppABI, signerOrProvider);

// ✅ Connect to the smart contract
export const connectingWithContract = async () => {
  if (!window.ethereum) {
    throw new Error("MetaMask not found");
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(ChatAppAddress, ChatAppABI, signer);

  return contract;
};


// ✅ Convert timestamp to readable format
export const converTime = (time) => {
  const newTime = new Date(time.toNumber());
  const realTime =
    newTime.getHours() +
    ":" +
    newTime.getMinutes() +
    ":" +
    newTime.getSeconds() +
    " Date: " +
    newTime.getDate() +
    "/" +
    (newTime.getMonth() + 1) +
    "/" +
    newTime.getFullYear();

  return realTime;
};
