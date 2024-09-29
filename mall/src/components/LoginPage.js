import React, { useState } from 'react';
import './Login.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState('');
  const [control, setControl] = useState(0);
  const [message, setMessage] = useState({});
  const [OTP, setOTP] = useState('');
  //const navigate = useNavigate();

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

    // Reset error and send data
    setError('');
    alert('Done');

    // Assuming the backend will return an OTP in the response
    fetch('http://127.0.0.1:8000/api/create-product/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: username,
        price: mobileNumber,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setMessage({ error: data.error });
        } else {
          setMessage(data); // Store the OTP or any other response data
        }
        setControl(1); // Move to the OTP page
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Failed to send data.');
      });
  };

  const handleBackToLogin = (event) => {
    event.preventDefault();
    // Check if OTP matches
    if (OTP.trim() === String(message.otp).trim()) {
      alert("OTP verified successfully");
      //navigate('/main'); // Go back to login
    } else {
      alert("Wrong OTP!!!");
    }
  };

  if (control === 0) {
    return (
      <div className="login-page">
        <div className="login-container">
          <br />
          <h2>Login</h2>
          <br />
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
          <button onClick={handleBackToLogin}>Submit OTP</button>
        </form>
      </div>
    );
  }
};

export default LoginPage;
