// src/components/Home.js

import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Container, Box, Menu, MenuItem, Paper, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';
import WebFont from 'webfontloader';
import Footer from './Footer';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import LoginForm from './LoginForm';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Opacity } from '@mui/icons-material';
import "./Home.css";

const Title = styled(Typography)({
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 700,
});

const Home = () => {
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);
  const [signedUpUsers, setSignedUpUsers] = useState([]); // State to keep track of signed-up users

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Poppins:400,700']
      }
    });
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLoginOpen = () => {
    setOpen(true);
    handleMenuClose();
  };

  const handleLogin = (email, password) => {
    const user = signedUpUsers.find(user => user.email === email && user.password === password);
    if (user) {
      setUser(user);
      handleClose(); // Close the login dialog on successful login
    } else {
      alert('You need to sign up first or incorrect email/password');
    }
  };

  const handleSignup = async (username, email, password) => {
    const newUser = { username, email, password };
    setSignedUpUsers([...signedUpUsers, newUser]);
    const response = await axios.post("http://localhost:8081/api/auth/signup", newUser);
    console.log(response);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className='bg'
      style={{
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div className='navbar'>
        <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #ddd' }}>
          <Toolbar>
            <EnergySavingsLeafIcon sx={{ paddingTop: 0.5, fontSize: 40 ,color:"black"}} />
            <Typography className='titlehead' variant="h6" style={{ flexGrow: 1, fontFamily: "Poppins, sans-serif", fontSize: 24, fontWeight: 700 }}>
              FarmEasy
            </Typography>
            {user && (
              <Typography variant="h6" style={{ marginRight: 16 }}>
                {user.username || user.email}
              </Typography>
            )}
            <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
              <MenuIcon />
            </IconButton>
          
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose} 
            >
              <MenuItem onClick={handleMenuClose}>About</MenuItem>
              <MenuItem onClick={handleMenuClose}>Contact</MenuItem>
              <MenuItem onClick={handleMenuClose}>Service</MenuItem>
              <MenuItem component={Link} to="/Weather">Weather</MenuItem> {/* Link to Weather Page */}
              {user ? (
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              ) : (
                <MenuItem onClick={handleLoginOpen}>Login</MenuItem>
              )}
            </Menu>
            
          </Toolbar>
        </AppBar>
      </div>
      <Container maxWidth="lg" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: '80vh', padding: '2rem 0' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            textAlign: 'left',
            justifyContent: 'center',
            padding: 3,
            width: '50%',
          }}
        >
          <Title variant="h2" component="h1"sx={{color:"white",paddingBottom:"25px"}} >
          Sowing seed holds your future, Do it by Today!
          </Title>
          
          <Typography variant="h5" sx={{color:"white"}}gutterBottom>
            Everyone can have a green thumb. Cultivate your garden, and your dreams will grow. Let me show you how!
          </Typography>
          <Link to="./LandManagement">
            <Button variant="contained" color="primary" size="large" sx={{ mt: 3, padding: '0.75rem 2rem', fontSize: '1rem', borderRadius: 2 }}>
              Plant - Now
            </Button>
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
            width: '50%',
            height: '100%',
            backgroundImage: 'url()', // Replace with your image URL
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            borderRadius: '1rem',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        ></Box>
      </Container>
      <Container maxWidth="lg" style={{ padding: '2rem 0' }}>
        
        <Box sx={{ mb: 5 }}>
          <Typography variant="h2" sx={{color:"white",fontFamily:'serif'}} component="h2" gutterBottom>
            Our Services
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h6" component="h3" gutterBottom>
                  Personalized Consultations
                </Typography>
                <Typography variant="body1">
                  Get one-on-one advice tailored to your specific needs. Our experts will help you choose the right plants, troubleshoot issues, and design your dream garden.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h6" component="h3" gutterBottom>
                  Workshops & Tutorials
                </Typography>
                <Typography variant="body1">
                  Join our workshops and learn hands-on techniques from planting basics to advanced gardening skills. Our tutorials will help you grow with confidence.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h6" component="h3" gutterBottom>
                  Community Events
                </Typography>
                <Typography variant="body1">
                  Connect with other plant lovers through our community events. Share experiences, exchange tips, and celebrate the joy of gardening together.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer />
      <LoginForm
        open={open}
        handleClose={handleClose}
        handleLogin={handleLogin}
        handleSignup={handleSignup}
      />
    </div>
  );
};

export default Home;
