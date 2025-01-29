// src/components/Signup.jsx
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';
import '../styles/LoginSignup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/dashboard'); // Redirect to the dashboard after successful signup
    } catch (err) {
        if (err.code) {
          setError(err.message);  // Firebase error message
        } else {
          setError('An unknown error occurred');
        }
      }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <Box
        component="form"
        sx={{ maxWidth: 400, margin: 'auto' }}
        onSubmit={handleSignup}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        {error && <Typography color="error" variant="body2">{error}</Typography>}
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Sign Up
        </Button>
      </Box>
    </div>
  );
};

export default Signup;

