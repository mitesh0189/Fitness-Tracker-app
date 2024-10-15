import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import { Container, Typography, Box, Button, Grid, Card, CardContent, CardActions } from '@mui/material';
import WorkoutForm from '../components/WorkoutForm';
import { motion } from 'framer-motion';
import { styled } from '@mui/system';

// Styled components for custom design
const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: '16px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s ease',
    '&:hover': {
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
    },
}));

const StyledButton = styled(Button)(({ theme }) => ({
    transition: 'all 0.3s ease',
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
        transform: 'scale(1.05)',
    },
}));

const WorkoutsPage = () => {
    const [workouts, setWorkouts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [currentWorkout, setCurrentWorkout] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('/workouts');
            setWorkouts(response.data);
        };
        fetchData();
    }, []);

    const handleAddWorkout = () => {
        setCurrentWorkout(null);
        setShowForm(true);
    };

    const handleEditWorkout = (workout) => {
        setCurrentWorkout(workout);
        setShowForm(true);
    };

    const handleDeleteWorkout = async (id) => {
        try {
            await axios.delete(`/workouts/${id}`);
            const response = await axios.get('/workouts');
            setWorkouts(response.data);
        } catch (error) {
            console.error('Error deleting workout', error);
        }
    };

    const handleFormSuccess = async () => {
        setShowForm(false);
        const response = await axios.get('/workouts');
        setWorkouts(response.data);
    };

    return (
        <Container>
            <Box mt={5} display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h4" align="center" gutterBottom>
                    Your Workouts
                </Typography>
                <StyledButton variant="contained" color="primary" onClick={handleAddWorkout} sx={{ mb: 3 }}>
                    Add Workout
                </StyledButton>

                {showForm && (
                    <WorkoutForm initialData={currentWorkout} onSuccess={handleFormSuccess} />
                )}

                <Grid container spacing={3} justifyContent="center">
                    {workouts.map((workout) => (
                        <Grid item xs={12} sm={6} md={4} key={workout._id}>
                            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                                <StyledCard>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            {workout.activity}
                                        </Typography>
                                        <Typography color="textSecondary">
                                            Duration: {workout.duration} mins
                                        </Typography>
                                        <Typography color="textSecondary">
                                            Calories Burned: {workout.caloriesBurned}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <StyledButton variant="outlined" color="primary" onClick={() => handleEditWorkout(workout)}>
                                            Edit
                                        </StyledButton>
                                        <StyledButton variant="outlined" color="secondary" onClick={() => handleDeleteWorkout(workout._id)}>
                                            Delete
                                        </StyledButton>
                                    </CardActions>
                                </StyledCard>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default WorkoutsPage;
