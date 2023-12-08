import React, { useState } from "react";
import './Signup.css';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
    
        if (!username || !email || !password || !confirmPassword) {
            setError('Please fill in all the fields');
        } else if (password !== confirmPassword) {
            setError('Passwords do not match');
        } else {
            try {
                const response = await fetch('http://localhost:3001/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, email, password }),
                });
    
                if (response.ok) {
                    const data = await response.json();
                    console.log('Success:', data);
                    setError('');
                    toast.success('Registration successful! Please login.');
                    // Reset form fields
                    setUsername('');
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                } else {
                    const errorData = await response.json();
                    console.error('Error:', errorData);
                    setError(errorData.error || 'Failed to sign up');
                }
                
            } catch (error) {
                console.error('Error:', error);
                setError('Failed to sign up');
            }
        }
    };
    
    return (
        <div className="login-page">
            <div className="login-box">
                <h2>Signup</h2>
                <form onSubmit={handleSignUp} method="POST">
                    <div className="user-box">
                        <input
                            label="Username"
                            fullWidth
                            margin="normal"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label className="beauty">Username</label>
                    </div>
                    <div className="user-box">
                        <input
                            label="Email"
                            type="email"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className="beauty">Email</label>
                    </div>
                    <div className="user-box">
                        <input
                            label="Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label className="beauty">Password</label>
                    </div>
                    <div className="user-box">
                        <input
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <label className="beauty">Confirm Password</label>
                    </div>
                    {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}
                    <div className="bts">
                        <button className="btn btn-transparent" type="submit">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Submit
                        </button>
                        <button className="btn btn-transparent" ><Link to="/login" style={{ color: '#03e9f4', textDecoration: 'none' }}>Login</Link></button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Signup;
