import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationPage.css';

function RegistrationPage({ onRegistrationSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhoneNumber] = useState(''); // Add phone number
  const [address, setAddress] = useState(''); // Add address
  const [error, setError] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // Track registration success

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/registration/', {
        username,
        password,
        email,
        phone_number, // Add phone number
        address, // Add address
      });

      console.log('Registration API response:', response);

      if (response.status === 200) { // Change to 200 for success status
        console.log('Registration successful:', response.data);
        setRegistrationSuccess(true); // Set registration success state
        onRegistrationSuccess();
      } else {
        console.error('Error registering:', response.data);
        setError('Error registering. Please check your details.');
      }
    } catch (error) {
      console.error('Error registering:', error);
      setError('Error registering. Please check your details.');
    }
  };

  return (
    <div className="registration-page">
      <h3>Register</h3>
      {registrationSuccess ? (
        <p className="success-message">Registration successful! You can now log in.</p>
      ) : (
        <form className="registration-form" onSubmit={handleRegistration}>
          <label>
            Username: <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <label>
            Email: <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          {/* Add the following fields */}
          <label>
            Phone Number: <input type="text" value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} />
          </label>
          <label>
            Address: <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          </label>
          <button type="submit">Register</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      )}
    </div>
  );
}

export default RegistrationPage;
