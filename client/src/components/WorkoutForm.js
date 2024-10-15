import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import axios from '../services/api';

// Styled Button with hover and animation effects
const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(3),
    padding: theme.spacing(1.5),
    borderRadius: '10px',
    backgroundColor: '#4caf50',
    color: '#fff',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    '&:hover': {
        backgroundColor: '#388e3c',
        transform: 'scale(1.05)',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    },
    '&:active': {
        transform: 'scale(1)',
    },
}));

// Styled Box for the form container
const FormContainer = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(4),
    padding: theme.spacing(4),
    borderRadius: '16px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
        boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.15)',
    },
}));

const WorkoutForm = ({ initialData, onSuccess }) => {
    const [activity, setActivity] = useState(initialData?.activity || '');
    const [duration, setDuration] = useState(initialData?.duration || '');
    const [caloriesBurned, setCaloriesBurned] = useState(initialData?.caloriesBurned || '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const workoutData = { activity, duration, caloriesBurned };
        try {
            if (initialData) {
                await axios.put(`/workouts/${initialData._id}`, workoutData);
            } else {
                await axios.post('/workouts', workoutData);
            }
            onSuccess();
        } catch (error) {
            console.error('Workout submission failed', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <FormContainer border={1} borderColor="grey.300">
                <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: '600', fontFamily: 'Poppins, sans-serif' }}>
                    {initialData ? 'Edit' : 'Add'} Workout
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Activity"
                        fullWidth
                        margin="normal"
                        value={activity}
                        onChange={(e) => setActivity(e.target.value)}
                        required
                        sx={{ '& label.Mui-focused': { color: '#4caf50' } }}
                    />
                    <TextField
                        label="Duration (minutes)"
                        fullWidth
                        margin="normal"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        required
                        type="number"
                        sx={{ '& label.Mui-focused': { color: '#4caf50' } }}
                    />
                    <TextField
                        label="Calories Burned"
                        fullWidth
                        margin="normal"
                        value={caloriesBurned}
                        onChange={(e) => setCaloriesBurned(e.target.value)}
                        required
                        type="number"
                        sx={{ '& label.Mui-focused': { color: '#4caf50' } }}
                    />
                    <StyledButton type="submit" fullWidth>
                        {initialData ? 'Update' : 'Add'} Workout
                    </StyledButton>
                </form>
            </FormContainer>
        </Container>
    );
};

export default WorkoutForm;
