import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from '../services/api';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CircularProgress,
    Box
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Styled Card with hover effects and smooth transitions
const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: '12px',
    boxShadow: theme.shadows[3],
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: theme.shadows[6],
    },
}));

// Container Box for loading
const LoadingBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    flexDirection: 'column',
}));

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [workouts, setWorkouts] = useState([]);
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }

        const fetchData = async () => {
            try {
                const workoutResponse = await axios.get('/workouts');
                const goalResponse = await axios.get('/goals');
                setWorkouts(workoutResponse.data);
                setGoals(goalResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user, navigate]);

    if (loading) {
        return (
            <LoadingBox>
                <Typography variant="h4" align="center" gutterBottom>
                    Loading...
                </Typography>
                <CircularProgress sx={{ marginTop: 2 }} />
            </LoadingBox>
        );
    }

    return (
        <Container>
            <Box mt={5}>
                <Typography variant="h4" align="center" gutterBottom>
                    Welcome, {user?.name}
                </Typography>

                {/* Recent Workouts Section */}
                <Typography variant="h5" gutterBottom align="center" sx={{ marginTop: '20px' }}>
                    Recent Workouts
                </Typography>
                <Grid container spacing={3} justifyContent="center">
                    {workouts.length === 0 ? (
                        <Typography
                            variant="body1"
                            color="textSecondary"
                            align="center"
                            sx={{ marginTop: '20px' }}
                        >
                            No recent workouts found.
                        </Typography>
                    ) : (
                        workouts.map((workout) => (
                            <Grid item xs={12} sm={6} md={4} key={workout._id}>
                                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
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
                                    </StyledCard>
                                </motion.div>
                            </Grid>
                        ))
                    )}
                </Grid>

                {/* Your Goals Section */}
                <Typography variant="h5" gutterBottom align="center" sx={{ marginTop: '40px' }}>
                    Your Goals
                </Typography>
                <Grid container spacing={3} justifyContent="center">
                    {goals.length === 0 ? (
                        <Typography
                            variant="body1"
                            color="textSecondary"
                            align="center"
                            sx={{ marginTop: '20px' }}
                        >
                            No goals found.
                        </Typography>
                    ) : (
                        goals.map((goal) => (
                            <Grid item xs={12} sm={6} md={4} key={goal._id}>
                                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                                    <StyledCard>
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>
                                                Goal: {goal.goalType}
                                            </Typography>
                                            <Typography color="textSecondary">
                                                Progress: {goal.progress}
                                            </Typography>
                                            <Typography color="textSecondary">
                                                Time Frame: {goal.timeFrame}
                                            </Typography>
                                        </CardContent>
                                    </StyledCard>
                                </motion.div>
                            </Grid>
                        ))
                    )}
                </Grid>
            </Box>
        </Container>
    );
};

export default Dashboard;
