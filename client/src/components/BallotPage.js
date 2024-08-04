// src/BallotPage.js
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import jsPDF from 'jspdf';
import VoteSecureABI from './VoteSecure.json';
import './BallotPage.css';

const BallotPage = () => {
//   const [web3, setWeb3] = useState(null);
//   const [contract, setContract] = useState(null);
//   const [account, setAccount] = useState(null);
  const [email, setEmail] = useState(''); // Use email for identification
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [voteSuccess, setVoteSuccess] = useState(false);
  const [auditData, setAuditData] = useState(null);

  useEffect(() => {
    const init = async () => {
    //   const web3Instance = new Web3(window.ethereum);
    //   await window.ethereum.enable();
    //   setWeb3(web3Instance);

    //   const networkId = await web3Instance.eth.net.getId();
    //   const deployedNetwork = VoteSecureABI.networks[networkId];
    //   const contractInstance = new web3Instance.eth.Contract(
    //     VoteSecureABI.abi,
    //     deployedNetwork && deployedNetwork.address
    //   );
    //   setContract(contractInstance);

    //   const accounts = await web3Instance.eth.getAccounts();
    //   setAccount(accounts[0]);

      // Define candidates list based on 2023 election with IDs as strings
      setCandidates([
        { id: '1', name: 'Christopher Imumolen', party: 'Accord (A)' },
        { id: '2', name: 'Hamza al-Mustapha', party: 'Action Alliance (AA)' },
        { id: '3', name: 'Yabagi Sani', party: 'Action Democratic Party (ADP)' },
        { id: '4', name: 'Osita Nnadi', party: 'Action Peoples Party (APP)' },
        { id: '5', name: 'Omoyele Sowore', party: 'African Action Congress (AAC)' },
        { id: '6', name: 'Dumebi Kachikwu', party: 'African Democratic Congress (ADC)' },
        { id: '7', name: 'Bola Tinubu', party: 'All Progressives Congress (APC)' },
        { id: '8', name: 'Peter Umeadi', party: 'All Progressives Grand Alliance (APGA)' },
        { id: '9', name: 'Princess Ojei', party: 'Allied Peoples Movement (APM)' },
        { id: '10', name: 'Sunday Adenuga', party: 'Boot Party (BP)' },
        { id: '11', name: 'Peter Obi', party: 'Labour Party (LP)' },
        { id: '12', name: 'Felix Osakwe', party: 'National Rescue Movement (NRM)' },
        { id: '13', name: 'Rabiu Kwankwaso', party: 'New Nigeria Peoples Party (NNPP)' },
        { id: '14', name: 'Kola Abiola', party: 'Peoples Redemption Party (PRP)' },
        { id: '15', name: 'Atiku Abubakar', party: 'Peoples Democratic Party (PDP)' },
        { id: '16', name: 'Adewole Adebayo', party: 'Social Democratic Party (SDP)' },
        { id: '17', name: 'Malik Ado-Ibrahim', party: 'Young Progressive Party (YPP)' },
        { id: '18', name: 'Dan Nwanyanwu', party: 'Zenith Labour Party (ZLP)' },
      ]);

    };

    init();
  }, []);

  const handleVote = async () => {
    if (selectedCandidate) {
      try {
        // await contract.methods.vote(selectedCandidate).send({ from: account });
        setVoteSuccess(true);
        alert('Vote cast successfully!');
        generateReceipt(selectedCandidate);
        saveVote(selectedCandidate); // Call the function to save the vote to the server
      } catch (error) {
        console.error('Error casting vote:', error);
        alert('An error occurred while casting your vote. Please try again.');
      }
    }
  };

  const saveVote = async (candidateId) => {
    const candidate = candidates.find(c => c.id === candidateId);
    if (!candidate) {
      console.error('Candidate not found');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: email, // Send user email or userId
          candidateId: candidate.id,
          candidateName: candidate.name,
          candidateParty: candidate.party
        })
      });
      const data = await response.json();
      if (!data.success) {
        alert('An error occurred while saving your vote. Please try again.');
      }
    } catch (error) {
      console.error('Error saving vote:', error);
      alert('An error occurred while saving your vote. Please try again.');
    }
  };

  const generateReceipt = (candidateId) => {
    const candidate = candidates.find(c => c.id === candidateId);
    if (!candidate) {
      console.error('Candidate not found');
      return;
    }
    const doc = new jsPDF();
    doc.text(`Vote Receipt`, 10, 10);
    doc.text(`Candidate: ${candidate.name}`, 10, 20);
    doc.text(`Party: ${candidate.party}`, 10, 30);
    doc.text(`User Email: ${email}`, 10, 40); // Use email or userId
    doc.save('vote_receipt.pdf');
  };

  const handleAudit = async () => {
    try {
      const response = await fetch('http://localhost:5000/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: email }) // Send user email or userId
      });
      const data = await response.json();
      if (data.success) {
        setAuditData(data.voteDetails);
      } else {
        alert('Audit failed. No vote found for the provided email.');
      }
    } catch (error) {
      console.error('Error auditing vote:', error);
      alert('An error occurred while auditing your vote. Please try again.');
    }
  };

  return (
    <div className="ballot-page">
      <h1>Vote for Your Candidate</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleVote(); }}>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="candidate">Select Candidate:</label>
          <select
            id="candidate"
            value={selectedCandidate}
            onChange={(e) => setSelectedCandidate(e.target.value)}
          >
            <option value="">Select a candidate</option>
            {candidates.map(candidate => (
              <option key={candidate.id} value={candidate.id}>
                {candidate.name} ({candidate.party})
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Vote</button>
      </form>

      {voteSuccess && (
        <div className="post-vote-actions">
          <button onClick={() => generateReceipt(selectedCandidate)}>Download Receipt</button>
          <button onClick={handleAudit}>Audit Vote</button>
          <button onClick={() => window.location.href = '/'}>Exit</button>
        </div>
      )}

      {auditData && (
        <div className="audit-results">
          <h2>Audit Results</h2>
          <p>Candidate: {auditData.candidateName}</p>
          <p>Party: {auditData.candidateParty}</p>
          <p>User Email: {auditData.userId}</p> {/* Use email or userId */}
        </div>
      )}
    </div>
  );
};

export default BallotPage;
