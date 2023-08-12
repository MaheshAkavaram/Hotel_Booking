// RegistrationForm.js

import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css';

function RegistrationForm({ onSuccess }) {
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
      console.log('Registration data:', { username, password, email, phone_number, address});

      const response = await axios.post('/api/registration/', {
        username,
        password,
        email,
      });

      console.log('Registration API response:', response);

      if (response.status === 201) {
        console.log('Registration successful:', response.data);
        onSuccess();
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
    <div className="registration-form">
      <h3>Register</h3>
      <form onSubmit={handleRegistration}>
        {/* Form inputs and button */}
        {/* ... */}
        {/* Error message */}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export default RegistrationForm;
