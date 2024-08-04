import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './IdentityVerificationPage.css';

const IdentityVerificationPage = () => {
  const [pvc, setPvc] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setPvc(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (pvc) formData.append('pvc', pvc);

    fetch('http://localhost:5000/verify', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Verification documents submitted successfully!');
        navigate('/ballot'); // redirect to ballot page for the voter to vote

      } else {
        alert('Failed to submit verification documents.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    });
  };

  return (
    <div className="identity-verification-page">
      <h1>Identity Verification</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="pvc">PVC:</label>
          <input type="file" id="pvc" onChange={handleFileChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default IdentityVerificationPage;
