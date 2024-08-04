// src/components/AboutUsPage.js
import React from 'react';
import './AboutUsPage.css';

const AboutUsPage = () => {
  return (
    <div className="about-page">
      <div className="about-content">
        <div className="about-text">
          <h2>OUR STORY</h2>
          <h1>Empowering Democracy, One Vote at a Time.</h1>
          <p>
            The current voting system in Nigeria is ripe for disruption. With a vision for a more transparent and secure electoral process, VoteSecure emerged as a beacon of hope for millions of Nigerian voters.
          </p>
          <p>
            The idea for VoteSecure was conceived in 2023, following the contentious general elections marred by allegations of fraud, ballot snatching, and violence. Observing the persistent challenges faced by Nigeria's electoral system, our founders were inspired to create a solution that could restore trust and integrity in the voting process.
          </p>
          <p>
            Armed with expertise in blockchain technology and a deep understanding of Nigeria's electoral landscape, the team set out to develop a secure, transparent, and user-friendly voting application. VoteSecure was born from the desire to ensure that every Nigerian can cast their vote with confidence, knowing that their electoral choices are secure and accurately counted.
          </p>
          <p>
            And so, VoteSecure was established.
          </p>
        </div>
        <div className="about-image">
          <img src="/ThumbPrint.png" alt="VoteSecure illustration" />
        </div>
      </div>
      <div className="mission-section">
        <h2>OUR MISSION</h2>
        <p>
          VoteSecure's mission is to empower Nigerian voters by providing a secure, transparent, and user-friendly voting platform. Our goal is to eliminate electoral fraud, reduce voter intimidation, and uphold democratic values by leveraging blockchain technology.
        </p>
        <p>
          We believe that a fair and transparent voting system is the cornerstone of a healthy democracy. By offering a platform that ensures the integrity of each vote, we aim to restore public trust in the electoral process. VoteSecure is committed to addressing the challenges faced by Nigeria's elections, ensuring that every vote counts and is counted correctly.
        </p>
        <p>
          Join us in our mission to transform Nigeria's electoral system and promote a more transparent, secure, and democratic future for all.
        </p>
      </div>
    </div>
  );
};

export default AboutUsPage;
