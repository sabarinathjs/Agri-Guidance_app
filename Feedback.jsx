import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Grid, Card, CardContent, CardHeader, Rating } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import './components/Home.css';
const FormContainer = styled(Container)({
  marginTop: '2rem',
  padding: '2rem',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
});

const FeedbackListContainer = styled(Container)({
  marginTop: '2rem',
});

const StyledButton = styled(Button)({
  marginTop: '1rem',
  backgroundColor: '#4caf50',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#45a049',
  },
});

const API_BASE_URL = 'http://localhost:8081/api/feedback';

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: '',
    rating: 0,
  });

  const [feedbackList, setFeedbackList] = useState([]);

  // useEffect(() => {
  //   axios.get(API_BASE_URL)
  //     .then((response) => {
  //       setFeedbackList(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching feedback list:', error);
  //     });
  // }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRatingChange = (event, newValue) => {
    setFormData({ ...formData, rating: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(API_BASE_URL, formData)
      // .then(() => {
      //   return axios.get(API_BASE_URL);
      // })
      .then((response) => {
        setFeedbackList(response.data);
        setFormData({ name: '', email: '', feedback: '', rating: 0 });
      })
      .catch((error) => {
        console.error('Error submitting feedback:', error);
      });
  };

  return (
    <>
    <div className='feed'>
      <FormContainer maxWidth="sm" className='fed'>
        <Typography variant="h4" component="h1" gutterBottom>
          Feedback Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="feedback"
                name="feedback"
                label="Your Feedback"
                variant="outlined"
                multiline
                rows={4}
                value={formData.feedback}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Typography component="legend">Rating</Typography>
              <Rating
                name="rating"
                value={formData.rating}
                onChange={handleRatingChange}
                precision={1}
                size="large"
              />
            </Grid>
            <Grid item xs={12}>
              <StyledButton type="submit" fullWidth variant="contained" onClick={handleSubmit}>
                Submit
              </StyledButton>
            </Grid>
          </Grid>
        </form>
      </FormContainer>
      </div>
    </>

  );
};

export default Feedback;
