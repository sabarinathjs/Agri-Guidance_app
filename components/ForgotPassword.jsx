import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Paper, Alert } from '@mui/material';
import axios from 'axios';
import './ForgotPassword.css'; // Import your CSS file for additional styling if needed

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    // e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      setMessage('');
      return;
    }

    try {
      // Replace the URL with your actual backend API endpoint
      await axios.put('http://localhost:8081/api/auth/update', { email, newPassword });
      setMessage('Password has been reset successfully.');
      setError('');
    } catch (err) {
      setMessage('');
      setError('Failed to reset password. Please try again.');
    }
  };

  return (
    <Container className="forgot-password-container">
      <Paper elevation={3} className="forgot-password-paper">
        <Typography variant="h5" gutterBottom>
          Reset Your Password
        </Typography>
        <Typography variant="body1" gutterBottom>
          Enter your email address, new password, and confirm your new password below.
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email Address"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="New Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button variant="contained" color="primary" type="submit" fullWidth onClick={() => handleSubmit}>
            Reset Password
          </Button>
        </form>
        {message && <Alert severity="success" style={{ marginTop: '1rem' }}>{message}</Alert>}
        {error && <Alert severity="error" style={{ marginTop: '1rem' }}>{error}</Alert>}
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
