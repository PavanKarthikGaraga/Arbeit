"use client"

import React, { useState } from 'react';
import './bauthen.css';

const Bauthen = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [verified, setVerified] = useState(false);
  
  // Initialize all form input states
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    companyEmail: '',
    otp: '',
    loginEmail: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleVerification = () => {
    if (formData.companyEmail) {
      setVerified(true);
    }
  };

  return (
    <div className="page-container">
      <div className="outer-container">
        <div className="auth-container">
          <div className="auth-image">
            <div className="dots-pattern"></div>
            <div className="business-icon"></div>
          </div>
          <div className="auth-card">
            <h2>Welcome Back!</h2>
            <p>Let's get you back to being productive</p>
            <div className="toggle-buttons">
              <button onClick={() => setIsSignUp(false)} className={!isSignUp ? 'active' : ''}>Login</button>
              <button onClick={() => setIsSignUp(true)} className={isSignUp ? 'active' : ''}>Sign Up</button>
            </div>
            {isSignUp ? (
              <form>
                <div className="input-group">
                  <input 
                    type="text" 
                    id="name" 
                    placeholder=" " 
                    value={formData.name}
                    onChange={handleInputChange}
                    required 
                  />
                  <label htmlFor="name">Name</label>
                </div>
                <div className="input-group">
                  <input 
                    type="text" 
                    id="phone" 
                    placeholder=" " 
                    value={formData.phone}
                    onChange={handleInputChange}
                    required 
                  />
                  <label htmlFor="phone">Phone Number</label>
                </div>
                <div className="input-group">
                  <input 
                    type="email" 
                    id="email" 
                    placeholder=" " 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                  <label htmlFor="email">Mail</label>
                </div>
                <div className="input-group">
                  <input 
                    type="text" 
                    id="address" 
                    placeholder=" " 
                    value={formData.address}
                    onChange={handleInputChange}
                    required 
                  />
                  <label htmlFor="address">Address</label>
                </div>
                {!verified ? (
                  <>
                    <div className="input-group company-mail-group">
                      <input 
                        type="email" 
                        id="companyEmail"
                        placeholder=" "
                        value={formData.companyEmail}
                        onChange={handleInputChange}
                        required 
                      />
                      <label htmlFor="companyEmail">Company Mail</label>
                      <button 
                        type="button"
                        className="verify-button"
                        onClick={handleVerification}
                      >
                        Verify
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="input-group company-mail-group">
                      <input 
                        type="email" 
                        id="companyEmail"
                        placeholder=" "
                        value={formData.companyEmail}
                        disabled
                        className="disabled-input"
                      />
                      <label htmlFor="companyEmail">Company Mail</label>
                      <button 
                        type="button"
                        className="reset-button"
                        onClick={() => {
                          setVerified(false);
                          setFormData(prev => ({...prev, companyEmail: '', otp: ''}));
                        }}
                      >
                        Reset
                      </button>
                    </div>
                    <div className="input-group">
                      <input 
                        type="text" 
                        id="otp" 
                        placeholder=" " 
                        value={formData.otp}
                        onChange={handleInputChange}
                        required 
                      />
                      <label htmlFor="otp">OTP</label>
                    </div>
                  </>
                )}
                <button type="submit">Sign Up</button>
              </form>
            ) : (
              <form>
                <div className="input-group">
                  <input 
                    type="email" 
                    id="loginEmail" 
                    placeholder=" " 
                    value={formData.loginEmail}
                    onChange={handleInputChange}
                    required 
                  />
                  <label htmlFor="loginEmail">Email</label>
                </div>
                <div className="input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder=" "
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <div className="show-password">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  <label>Show Password</label>
                </div>
                <button type="submit">Sign In</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bauthen;
