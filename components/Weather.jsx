// src/components/Weather.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Weather.css";
import { Container, Typography, CircularProgress, Grid, Paper } from '@mui/material';

const Weather = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast?lat=11.127123&lon=78.656891&appid=8af40eb2b2bbd78f5e1c250532896dfc', {
          params: {
            lat: 11.127123,
            lon: 78.656891,
            appid: '8af40eb2b2bbd78f5e1c250532896dfc',
            units: 'metric'
          }
        });
        
        // Parsing response to get relevant data for display
        const parsedData = response.data.list.map(entry => ({
          date: entry.dt_txt,
          temperature: entry.main.temp,
          condition: entry.weather[0].description
        }));

        setWeatherData(parsedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div className='wbody'>
    <Container maxWidth="md" style={{ marginTop: '2rem' }} className='wbody'>
      <Typography variant="h4" gutterBottom>
        Weather in Tamil Nadu 
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {weatherData.map((district, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper className='w-p' elevation={3} style={{ padding: '1rem',backgroundColor:' rgb(162, 162, 231)' }}>
                <Typography variant="h6">{district.date}</Typography>
                <Typography variant="body1">{`Temperature: ${district.temperature}°C`}</Typography>
                <Typography variant="body1">{`Condition: ${district.condition}`}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
    </div>
  );
};

export default Weather;
