import Web3 from "web3";
import VoteSecureABI from "./VoteSecure.json";

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    window.addEventListener("load", async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      } else if (window.web3) {
        resolve(window.web3);
      } else {
        reject(new Error("Must install MetaMask"));
      }
    });
  });

const getContract = async (web3) => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = VoteSecureABI.networks[networkId];
  const contract = new web3.eth.Contract(
    VoteSecureABI.abi,
    deployedNetwork && deployedNetwork.address
  );
  return contract;
};

export { getWeb3, getContract };
