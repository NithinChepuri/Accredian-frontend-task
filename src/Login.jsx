import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const apiUrl = 'https://node-mysql-api-9h33.onrender.com';
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
        fetch('https://node-mysql-api-9h33.onrender.com/login', {
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
            if (data.success) {
                // Navigate or handle successful login
                window.location.href = 'https://home.accredian.com/';
            } else {
                // Check the specific error scenario and set appropriate error message
                if (data.error === 'User not found') {
                    setError('User not found. Please register.');
                } else if (data.error === 'Incorrect password') {
                    setError('Invalid password. Please try again.');
                } else {
                    // Display the actual error message received from the server
                    setError(data.error || 'Invalid username/email or password');
                }
            }
        })
        .catch(error => {
            console.error('Error:', error.message);
            // Handle error scenarios (e.g., show an error message to the user)
            setError('Failed to login. Please check your credentials and try again.');
        });
    };

    return (
        <div className="login-page">
            <div className="login-box">
                <h2>Login</h2>
                <form>
                    <div className="user-box">
                        <input
                            type="email"
                            id="loginemail"
                            name="email"
                            value={usernameOrEmail}
                            onChange={(e) => setUsernameOrEmail(e.target.value)}
                            required
                        />
                        <label className="beauty">Username or Email</label>
                    </div>
                    <div className="user-box">
                        <input
                            type="password"
                            id="loginpassword"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label className="beauty">Password</label>
                    </div>
                    {error && <Typography color="error">{error}</Typography>}
                    <div className="bts">
                        <Button
                            className="btn login-btn"
                            variant="contained"
                            color="primary"
                            type="button"
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                        <Link to="/">
                            <Button
                                className="btn login-btn"
                                variant="contained"
                                color="primary"
                                type="button"
                            >
                                SignUp
                            </Button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
