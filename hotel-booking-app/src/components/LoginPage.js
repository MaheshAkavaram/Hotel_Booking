import React, { useState } from 'react';
import './LoginPage.css'; // Import your CSS file

function LoginPage({ onLoginSuccess, onNavigateToRegistration }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Replace this with your API endpoint for logging in
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        onLoginSuccess(data.token); // Call the onLoginSuccess function with the token
      } else {
        setError('Invalid username or password. Please check your details or ');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Replace this with your API endpoint for registration
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Optionally, automatically log in the user after successful registration
        await handleLogin(e);
      } else {
        setError('Error registering. Please check your details or try again later.');
      }
    } catch (error) {
      console.error('Error registering:', error);
      setError('An error occurred');
    }
  };

  const handleSubmit = isRegistering ? handleRegister : handleLogin;

  return (
    <div className="login-page">
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
        {error && (
          <p className="error-message">
            {error}
            <span
              className="register-link"
              onClick={() => setIsRegistering(!isRegistering)}
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
            >
              {isRegistering ? 'Login' : 'Register'}
            </span>
          </p>
        )}
      </form>
    </div>
  );
}

export default LoginPage;
