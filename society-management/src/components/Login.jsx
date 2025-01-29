
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';
import '../styles/LoginSignup.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard'); // Redirect to the dashboard after successful login
    } catch (err) {
        if (err.code) {
          setError(err.message);  // Firebase error message
        } else {
          setError('An unknown error occurred');
        }
      }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <Box
        component="form"
        sx={{ maxWidth: 400, margin: 'auto' }}
        onSubmit={handleLogin}
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
          Login
        </Button>
      </Box>
    </div>
  );
};

export default Login;

