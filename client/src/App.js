// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import TechnologyPage from "./components/TechnologyPage";
import AboutUsPage from "./components/AboutUsPage";
import BallotPage from './components/BallotPage';
import Dashboard from "./Dashboard";
import Login from "./components/Login";

import IdentityVerificationPage from "./components/IdentityVerificationPage";
import "./App.css";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  return (
    <Router>
      <div className='App'>
        <nav className='navbar'>
          <div className='logo'>
            <img src='/VoteSecureLogo.png' alt='VoteSecure Logo' />
          </div>
          <div className='nav-links'>
            <Link to='/'>Home</Link>
            <Link to='/technology'>Technology</Link>
            <Link to='/about'>About Us</Link>
            <button onClick={handleLoginClick} className='login-toggle'>
              Login
            </button>
          </div>
        </nav>
        <Routes>
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/' element={<LandingPage />} />
          <Route path='/' element={<LoginPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/technology' element={<TechnologyPage />} />
          <Route path='/about' element={<AboutUsPage />} />
          <Route path="/ballot" element={<BallotPage />} />
          <Route
            path='/verify-identity'
            element={<IdentityVerificationPage />}
          />
        </Routes>
        {showLogin && <LoginPage />}
      </div>
    </Router>
  );
}

export default App;
