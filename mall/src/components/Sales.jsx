import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sales.css';

const LoginPage = () => {
  const [ownerName, setOwnerName] = useState('');
  const [shopDomain, setShopDomain] = useState(''); // For dropdown selection
  const [shopContactNumber, setShopContactNumber] = useState('');
  const [shopDescription, setShopDescription] = useState('');
  const [email, setEmail] = useState('');
  const [gstId, setGstId] = useState('');
  const [error, setError] = useState('');
  const [control, setControl] = useState(0); // 0 for form, 1 for OTP page
  const [message, setMessage] = useState({});
  const [OTP, setOTP] = useState('');
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();

    // Check if all fields are filled
    if (!ownerName || !shopDomain || !shopContactNumber || !shopDescription || !email || !gstId) {
      setError('All fields are required.');
      return;
    }

    // Validate the contact number
    const contactRegex = /^[0-9]{10}$/;
    if (!contactRegex.test(shopContactNumber)) {
      setError('Please enter a valid 10-digit shop contact number.');
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Reset error and send data to backend
    setError('');

    // Send the POST request to the Django backend
    fetch('http://127.0.0.1:8000/api/create-shop/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        owner_name: ownerName,
        shop_domain: shopDomain,
        shop_contact_number: shopContactNumber,
        shop_description: shopDescription,
        email: email,
        gst_id: gstId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          console.log(data.response);
          if (data.response === 'verified') {
            setOwnerName(data.name)
            alert('Shop already verified. Redirecting to main page...');
            navigate('/main', { state: { ownerName } });
          } else {
            setMessage(data);
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
    if (OTP.trim() === String(message.otp).trim()) {
      alert('OTP verified successfully');
      navigate('/main', { state: { ownerName } });
    } else {
      alert('Wrong OTP!');
    }
  };

  if (control === 0) {
    return (
      <div className="login-page-sales">
        <div className="login-container-sales">
          <h2>Shop Registration</h2>
          <form className="login-form" onSubmit={handleClick}>
            <div className="form-group">
              <div className="input-field">
                <input
                  type="text"
                  id="owner-name"
                  placeholder="Owner Name"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-field">
                <select
                  id="shop-domain"
                  value={shopDomain}
                  onChange={(e) => setShopDomain(e.target.value)}
                  required
                >
                  <option value="">Select Shop Domain</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Grocery">Grocery</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <div className="input-field">
                <input
                  type="text"
                  id="shop-contact"
                  placeholder="Shop Contact Number"
                  value={shopContactNumber}
                  onChange={(e) => setShopContactNumber(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="textarea-field">
                <textarea
                  id="shop-description"
                  placeholder="Shop Description"
                  value={shopDescription}
                  onChange={(e) => setShopDescription(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-field">
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-field">
                <input
                  type="text"
                  id="gst-id"
                  placeholder="GST ID"
                  value={gstId}
                  onChange={(e) => setGstId(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button className="login-button" type="submit">
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
        <form onSubmit={handleOTPSubmit}>
          <input
            type="text"
            value={OTP}
            placeholder="Enter OTP"
            onChange={(e) => setOTP(e.target.value)}
            required
          />
          <button type="submit">Submit OTP</button>
        </form>
      </div>
    );
  }
};

export default LoginPage;
