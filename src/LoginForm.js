// LoginForm.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Validate fields before submitting
    if (!usernameOrEmail || !password) {
      setError('Please fill in all the fields');
    } else {
      // Perform login action
      loginUser(usernameOrEmail, password);
    }
  };

  const loginUser = (usernameOrEmail, password) => {
    // Make a POST request to the backend for login
    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ usernameOrEmail, password }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Failed to login: ${response.status}`);
        }
      })
      .then(data => {
        console.log('Login successful:', data);
  
        if (data.success) {
          // Navigate to the Main page
          // navigate('/main');
          // Redirect to www.nithin.com
          window.location.href = 'http://www.nithin.com';
        } else {
          // Check the specific error scenario and set appropriate error message
          if (data.error === 'User not found') {
            setError('User not found. Please register.');
          } else if (data.error === 'Incorrect password') {
            setError('Invalid password. Please try again.');
          } else {
            // Display a generic error message
            setError('Invalid username/email or password');
          }
        }
      })
      .catch(error => {
        console.error('Error:', error.message);
        // Handle error scenarios (e.g., show an error message to the user)
        setError('Failed to login');
      });
  };
  
  

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form>
        <TextField
          label="Username or Email"
          fullWidth
          margin="normal"
          value={usernameOrEmail}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
      </form>
      {/* Link to navigate to the sign-up page */}
      <Typography align="center" style={{ marginTop: '10px' }}>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </Typography>
    </Container>
  );
};

export default LoginForm;
