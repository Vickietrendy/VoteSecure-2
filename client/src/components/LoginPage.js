import React, { useState, useEffect } from "react";
import Web3 from "web3";
import VoteSecureABI from "./VoteSecure.json";
import "./LoginPage.css";

// Define generateReceipt function
const generateReceipt = (account, candidateId) => {
  // Placeholder logic for generating a receipt
  return `Receipt for vote by ${account} for candidate ${candidateId}`;
};

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

const LoginPage = ({ handleClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      const web3Instance = await getWeb3();

      const accounts = await web3Instance.eth.getAccounts();
      setAccount(accounts[0]);

      const contractInstance = await getContract(web3Instance);
      setContract(contractInstance);
    };

    init();
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, username: email, password }),
      });
      if (response.ok) {
        alert("Registration successful!");
        window.location.href = "http://localhost:3000/login";
      } else if (response.status === 400 ){
        alert("User already exists. Please log in."); 
        window.location.href = "http://localhost:3000/login";
      } else {
        console.log("email: " + response);
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleGoogleSignUp = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  return (
    <div className='login-page'>
      <div className='login-container'>
        <button onClick={handleClose} className='close-button'>
          X
        </button>
        <h1>Get Verified</h1>
        <button className='google-signup' onClick={handleGoogleSignUp}>
          <img src='/google-.png' alt='Google Logo' className='google-logo' />{" "}
          Sign up with Google
        </button>
        <p>Or use your email address</p>
        <form onSubmit={handleSignUp}>
          <div className='input-group'>
            <input
              type='text'
              placeholder='Your first name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type='text'
              placeholder='Your last name'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <input
            type='email'
            placeholder='Your email address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='Pick a password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className='password-info'>
            Use at least one letter, one numeral, and seven characters.
          </p>
          <button type='submit'>Sign Up for VoteSecure</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
