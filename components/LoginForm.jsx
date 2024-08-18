import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { auth } from './Firebase'; // Import auth from your firebaseConfig file
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import logo from '../images/logo-blue.jpg'; // Import the logo image
import { Link } from 'react-router-dom';

const LoginForm = ({ open, handleClose, handleLogin, handleSignup }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async () => {
    if (isLogin) {
      handleLogin(email, password);
    } else {
      await handleSignup(username, email, password);
      setIsLogin(true); // Switch to login form after sign up
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Google sign-in successful:', user);
      handleClose(); // Close the dialog
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      sx={{ '& .MuiDialog-paper': { padding: '20px', borderRadius: '55px', width: '500px', height: '600px' ,  backgroundColor: '#91d9f9'} }}
    >
      <DialogTitle sx={{ textAlign: 'center', paddingTop: '40px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src={logo} alt="Logo" style={{ width: '50px', height: '50px', marginBottom: '20px', borderRadius: '50%' }} />
          <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
            {isLogin ? 'Login' : 'Sign Up'}
          </span>
        </div>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 19,
            top: 18,
            color: (theme) => theme.palette.grey[1000],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {!isLogin && (
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            type="text"
            fullWidth
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ marginBottom: '16px' }}
          />
        )}
        <TextField
          autoFocus={isLogin}
          margin="dense"
          id="email"
          label="Email Address"
          type="email"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginBottom: '16px' }}
        />
        <TextField
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginBottom: '16px' }}
        />
      </DialogContent>
     
      <DialogActions sx={{ flexDirection: 'column', gap: '8px', padding: '20px' }}>
        <Button onClick={handleToggle} sx={{ width: '100%', fontSize: '16px', textTransform: 'none', borderRadius: '10px' }}>
          {isLogin ? 'Sign Up' : 'Login Instead'}
        </Button>
        <Button onClick={handleSubmit} sx={{ width: '50%', fontSize: '16px', textTransform: 'none', backgroundColor: 'black', color: '#fff', borderRadius: '20px', '&:hover': { backgroundColor: '#1565c0' } }}>
          {isLogin ? 'Login' : 'Sign Up'}
        </Button>
        <Button onClick={handleGoogleSignIn} sx={{ width: '75%', fontSize: '16px', textTransform: 'none', backgroundColor: '#d90c02', color: '#fff', borderRadius: '20px', '&:hover': { backgroundColor: '#c23321' } }}>
          {isLogin ? 'Login with Google' : 'Sign Up with Google'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginForm;
