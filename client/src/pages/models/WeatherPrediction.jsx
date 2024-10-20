import React, { useState, useEffect } from 'react';

const WeatherPrediction = () => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [currentWeather, setCurrentWeather] = useState('');
    const [forecast, setForecast] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                (err) => {
                    setError('Location access denied.');
                }
            );
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    }, []);

    useEffect(() => {
        if (latitude && longitude) {
            getCurrentWeather(latitude, longitude);
            get10DaysForecast(latitude, longitude);
        }
    }, [latitude, longitude]);

    const getCurrentWeather = (lat, lon) => {
        const options = {
            method: 'POST',
            headers: {
                'x-apihub-key': 'nhHlubaiWz3undhsS8sczkZphZSMk2Lm4z9jM8VyXz05SkqADP',
                'x-apihub-host': 'Weather-API.allthingsdev.co',
                'x-apihub-endpoint': 'f5ba59cd-7870-46b6-8f91-3053fcd66349',
            }
        };

        fetch(`https://Weather-API.proxy-production.allthingsdev.co/weather/getForecast?latitude=${lat}&longitude=${lon}&unit=celsius`, options)
            .then(response => response.json())
            .then(data => setCurrentWeather(data))
            .catch(error => console.error('Error fetching current weather:', error));
    };

    const get10DaysForecast = (lat, lon) => {
        const options = {
            method: 'POST',
            headers: {
                'x-apihub-key': 'nhHlubaiWz3undhsS8sczkZphZSMk2Lm4z9jM8VyXz05SkqADP',
                'x-apihub-host': 'Weather-API.allthingsdev.co',
                'x-apihub-endpoint': 'a85e4cad-f8d7-4067-90de-a1f5a3897bb5',
            }
        };

        fetch(`https://Weather-API.proxy-production.allthingsdev.co/weather/getForecast/10daysForecast?latitude=${lat}&longitude=${lon}&unit=celsius`, options)
            .then(response => response.json())
            .then(data => setForecast(data))
            .catch(error => console.error('Error fetching 10-day forecast:', error));
    };

    // Updated styles object
    const styles = {
        container: {
            backgroundColor: '#f0f8ff',
            padding: '30px',
            borderRadius: '10px',
            maxWidth: '800px',
            margin: '20px auto',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif',
            color: '#333',
        },
        title: {
            color: '#008cba',
            fontSize: '2.5rem',
            marginBottom: '20px',
            fontWeight: 600,
        },
        section: {
            backgroundColor: '#ffffff',
            padding: '20px',
            marginBottom: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            textAlign: 'left',
        },
        pre: {
            backgroundColor: '#e0e0e0',
            padding: '10px',
            borderRadius: '5px',
            overflowX: 'auto',
            whiteSpace: 'pre-wrap', // Allows text to wrap
            wordBreak: 'break-word', // Break long words
        },
        error: {
            color: 'red',
            fontSize: '1.25rem',
        },
        location: {
            fontSize: '1.2rem',
            fontWeight: 500,
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Weather Prediction</h1>
            {error ? (
                <p style={styles.error}>{error}</p>
            ) : (
                <div>
                    <div style={styles.section}>
                        <h2 style={styles.location}>Location</h2>
                        <p>Latitude: {latitude}</p>
                        <p>Longitude: {longitude}</p>
                    </div>

                    <div style={styles.section}>
                        <h2>Current Weather</h2>
                        <pre style={styles.pre}>{JSON.stringify(currentWeather, null, 2)}</pre>
                    </div>

                    <div style={styles.section}>
                        <h2>10-Day Forecast</h2>
                        <pre style={styles.pre}>{JSON.stringify(forecast, null, 2)}</pre>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherPrediction;