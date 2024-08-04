// src/components/TechnologyPage.js
import React from 'react';
import './TechnologyPage.css'; // Make sure to create a CSS file to style this page

const TechnologyPage = () => {
  return (
    <div className="technology-page">
      <h1>Our Technology</h1>
      <div className="tech-features">
        <div className="tech-feature">
          <img src="/Encryption.jpeg" alt="End-to-End Encryption" />
          <h2>End-to-End Encryption</h2>
          <p>VoteSecure employs robust end-to-end encryption to protect voter data throughout the entire process, from the voter's device to our servers, ensuring maximum security.</p>
        </div>
        <div className="tech-feature">
          <img src="/receipt.png" alt="Paper Trail & Digital Receipts" />
          <h2>Paper Trail & Digital Receipts</h2>
          <p>Every vote cast on VoteSecure generates a verifiable digital receipt and a paper trail, enabling election administrators to audit and verify votes for complete transparency.</p>
        </div>
        <div className="tech-feature">
          <img src="/eth.jpg" alt="Blockchain Storage" />
          <h2>Blockchain Storage</h2>
          <p>We leverage blockchain technology to store votes securely across multiple servers, ensuring the integrity and immutability of the voting records.</p>
        </div>
        <div className="tech-feature">
          <img src="/biometric.jpeg" alt="Biometric Verification" />
          <h2>Biometric Verification</h2>
          <p>Our platform uses biometric verification, such as facial recognition, to authenticate voter identities securely, safeguarding against fraud and ensuring privacy.</p>
        </div>
        <div className="tech-feature">
          <img src="/testing.jpeg" alt="Risk Assessment & Audits" />
          <h2>Risk Assessment & Audits</h2>
          <p>We conduct regular independent security audits and penetration tests to identify and address vulnerabilities, ensuring the highest level of cybersecurity.</p>
        </div>
        <div className="tech-feature">
          <img src="/Security.jpeg" alt="Data Security & Privacy" />
          <h2>Data Security & Privacy</h2>
          <p>VoteSecure adheres to strict data security practices, ensuring all personal data is protected and voter information is deleted after successful verification.</p>
        </div>
      </div>
    </div>
  );
};

export default TechnologyPage;
