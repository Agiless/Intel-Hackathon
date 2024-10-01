import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState('');
  const [control, setControl] = useState(0); // 0 for login page, 1 for OTP page
  const [message, setMessage] = useState({}); // To store the response from the backend
  const [OTP, setOTP] = useState('');
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault(); // Prevent form submission or page reload

    // Check if fields are empty
    if (!username || !mobileNumber) {
      setError('Both fields are required.');
      return;
    }

    // Optional: Check if mobile number is valid
    const mobileRegex = /^[0-9]{10}$/; // Simple regex for a 10-digit number
    if (!mobileRegex.test(mobileNumber)) {
      setError('Please enter a valid mobile number.');
      return;
    }

    // Reset error and send data to backend
    setError('');

    // Send the POST request to the Django backend
    fetch('http://127.0.0.1:8000/api/create-product/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: username,
        mobile_number: mobileNumber, // price is treated as the mobile number in this structure
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          // Handle if the number is verified or if OTP is sent
          console.log(data.response,12345)
          if (data.response === 'verified') {
            alert('Number already verified. Redirecting to main page...');
            navigate('/main', { state: { username } }); // Redirect directly to the main page if verified
          } else {
            setMessage(data); // Store the OTP or any other response data
            setControl(1); // Move to the OTP input page
          }
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Failed to send data.');
      });
  };

  const handleOTPSubmit = (event) => {
    event.preventDefault();

    // Check if OTP matches the one from the backend response
    if (OTP.trim() === String(message.otp).trim()) {
      alert('OTP verified successfully');
      navigate('/main', { state: { username } }); // Navigate to the main page upon successful OTP verification
    } else {
      alert('Wrong OTP!');
    }
  };

  if (control === 0) {
    // Render the login form
    return (
      <div className="login-page">
        <div className="login-container-login">
          <h2>Login</h2>
          <form className="login-form">
            <div className="input-field">
              <input
                type="text"
                id="login"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Track username
                required
              />
            </div>
            <div className="input-field password-field">
              <div className="password-wrapper">
                <input
                  type="text"
                  id="mobile"
                  placeholder="Mobile number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)} // Track mobile number
                  required
                />
              </div>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button className="login-button" onClick={handleClick}>
              Send OTP
            </button>
          </form>
        </div>
      </div>
    );
  } else if (control === 1) {
    // Render the OTP input form
    return (
      <div>
        <h1>Enter OTP</h1>
        <form>
          <input
            type="text"
            value={OTP}
            placeholder="Enter OTP"
            onChange={(e) => setOTP(e.target.value)} // Track OTP input
            required
          />
          <button onClick={handleOTPSubmit}>Submit OTP</button>
        </form>
      </div>
    );
  }
};

export default LoginPage;
