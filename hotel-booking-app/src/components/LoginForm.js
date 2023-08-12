import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css';

function LoginForm({ onLoginSuccess, onNavigateToRegistration }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/login/', { username, password });
      console.log('Login successful:', response.data);
      onLoginSuccess(response.data.token); // Call the onLoginSuccess function with the token
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-form">
      <h3>Login</h3>
      <form onSubmit={handleLogin}>
        <label>
          Username: <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login</button>
        {error && <p className="error-message">{error}</p>}
        {!error && (
          <p>
            Not registered?{' '}
            <span
              className="register-link"
              onClick={onNavigateToRegistration}
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
            >
              Register here
            </span>
          </p>
        )}
      </form>
    </div>
  );
}

export default LoginForm;
