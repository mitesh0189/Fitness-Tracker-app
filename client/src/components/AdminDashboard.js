import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    Box,
    CircularProgress,
    Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { motion } from 'framer-motion';

const StyledCard = styled(motion(Card))(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[3],
    borderRadius: '12px',
    padding: '20px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: theme.shadows[6],
    },
}));

const StyledButton = styled(Button)(({ theme }) => ({
    transition: 'all 0.3s ease',
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        transform: 'scale(1.05)',
    },
}));

const AdminDashboard = () => {
    const [userStatistics, setUserStatistics] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/admin/statistics');
                setUserStatistics(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); 
            }
        };
        fetchData();
    }, []);

    return (
        <Container maxWidth="lg">
            <Box mt={5}>
                <Typography variant="h4" align="center" gutterBottom>
                    Admin Dashboard
                </Typography>

                {loading ? (
                    <Box display="flex" justifyContent="center" mt={5}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {userStatistics.map(({ user, goals, workouts }) => (
                            <Grid item xs={12} sm={6} md={4} key={user._id}>
                                <StyledCard whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            {user.name} ({user.email})
                                        </Typography>
                                        <Divider sx={{ my: 2 }} />
                                        <Box display="flex" alignItems="center" mb={1}>
                                            <EmojiEventsIcon color="primary" />
                                            <Typography variant="subtitle1" ml={1}>
                                                Goals
                                            </Typography>
                                        </Box>
                                        {goals.length === 0 ? (
                                            <Typography variant="body2" color="textSecondary">No goals available</Typography>
                                        ) : (
                                            goals.map((goal) => (
                                                <Typography key={goal._id} variant="body2" color="textSecondary">
                                                    {goal.goalType} - Target: {goal.targetValue} - Progress: {goal.progress}%
                                                </Typography>
                                            ))
                                        )}
                                        <Divider sx={{ my: 2 }} />
                                        <Box display="flex" alignItems="center" mb={1}>
                                            <FitnessCenterIcon color="secondary" />
                                            <Typography variant="subtitle1" ml={1}>
                                                Workouts
                                            </Typography>
                                        </Box>
                                        {workouts.length === 0 ? (
                                            <Typography variant="body2" color="textSecondary">No workouts available</Typography>
                                        ) : (
                                            workouts.map((workout) => (
                                                <Typography key={workout._id} variant="body2" color="textSecondary">
                                                    {workout.activity} - Duration: {workout.duration} min
                                                </Typography>
                                            ))
                                        )}
                                    </CardContent>
                                    <CardActions>
                                        <StyledButton size="small" color="primary">
                                            View Details
                                        </StyledButton>
                                    </CardActions>
                                </StyledCard>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </Container>
    );
};

export default AdminDashboard;
