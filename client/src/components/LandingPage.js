// src/components/LandingPage.js
import React, { useState, useEffect } from 'react';
import './LandingPage.css';

const LandingPage = () => {
  const [showSecondSection, setShowSecondSection] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setShowSecondSection(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="landing-page">
      <div className="main-content">
        <div className="left-section">
          <h1>Transparent, secure and easy voting technology accessible at your fingertips. Literally.</h1>
          <p>Our mission is to improve electoral integrity and restore public trust in the electoral process.</p>
        </div>
        <div className="image-section">
          <img src="/Mobile.png" alt="VoteSecure Mobile App" />
        </div>
      </div>
      <div className={`second-section ${showSecondSection ? 'show' : ''}`}>
        <h2>VoteSecure</h2>
        <img src="/ThumbPrint.png" alt="VoteSecure App" />
        <div className="features">
          <div className="feature">
            <img src="/SecureIcon.png" alt="Secure" />
            <h3>Secure</h3>
            <p>Our app is protected using blockchain and end-to-end encryption.</p>
          </div>
          <div className="feature">
            <img src="/EasyToUseIcon.png" alt="Easy to Use" />
            <h3>Easy to Use</h3>
            <p>Our app is very user friendly.</p>
          </div>
          <div className="feature">
            <img src="/TransparentIcon.png" alt="Transparent" />
            <h3>Transparent</h3>
            <p>We prioritise and bask in the transparency of the voting process.</p>
          </div>
          <div className="feature">
            <img src="/AccessibleIcon.png" alt="Accessible" />
            <h3>Accessible</h3>
            <p>You can use VoteSecure anywhere in the world. No limits.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
