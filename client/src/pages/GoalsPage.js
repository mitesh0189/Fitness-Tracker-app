import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import { Container, List, ListItem, ListItemText, Typography, Box, Button, Paper, Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import GoalForm from '../components/GoalForm';

// Styled components for buttons with hover effects and transitions
const StyledButton = styled(Button)(({ theme }) => ({
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
    },
}));

const GoalsPage = () => {
    const [goals, setGoals] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [currentGoal, setCurrentGoal] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('/goals');
            setGoals(response.data);
        };
        fetchData();
    }, []);

    const handleAddGoal = () => {
        setCurrentGoal(null);
        setShowForm(true);
    };

    const handleEditGoal = (goal) => {
        setCurrentGoal(goal);
        setShowForm(true);
    };

    const handleDeleteGoal = async (id) => {
        try {
            await axios.delete(`/goals/${id}`);
            const response = await axios.get('/goals');
            setGoals(response.data);
        } catch (error) {
            console.error('Error deleting goal', error);
        }
    };

    const handleFormSuccess = async () => {
        setShowForm(false);
        const response = await axios.get('/goals');
        setGoals(response.data);
    };

    return (
        <Container>
            <Box mt={5} mb={3}>
                <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', color: '#1976d2', marginBottom: '20px' }}>
                    Your Goals
                </Typography>

                <Box display="flex" justifyContent="center">
                    <StyledButton variant="contained" color="primary" onClick={handleAddGoal}>
                        Add Goal
                    </StyledButton>
                </Box>

                {showForm && (
                    <Box mt={3}>
                        <GoalForm initialData={currentGoal} onSuccess={handleFormSuccess} />
                    </Box>
                )}

                <Paper elevation={3} sx={{ padding: '16px', marginTop: '24px', borderRadius: '12px' }}>
                    <List>
                        {goals.length === 0 ? (
                            <Typography variant="body1" color="textSecondary" align="center" sx={{ marginTop: "20px" }}>
                                No recent goals found.
                            </Typography>
                        ) : (
                            goals.map((goal) => (
                                <Card key={goal._id} sx={{ marginBottom: '16px', boxShadow: '0 3px 6px rgba(0,0,0,0.1)' }}>
                                    <CardContent>
                                        <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <ListItemText
                                                primary={`Goal Type: ${goal.goalType}`}
                                                secondary={`Target Value: ${goal.targetValue}, Time Frame: ${goal.timeFrame}`}
                                                primaryTypographyProps={{ fontWeight: 'bold', color: '#1976d2' }}
                                                secondaryTypographyProps={{ color: '#757575' }}
                                            />
                                            <Box>
                                                <StyledButton
                                                    variant="outlined"
                                                    color="primary"
                                                    onClick={() => handleEditGoal(goal)}
                                                    sx={{ marginRight: '8px' }}
                                                >
                                                    Edit
                                                </StyledButton>
                                                <StyledButton
                                                    variant="outlined"
                                                    color="secondary"
                                                    onClick={() => handleDeleteGoal(goal._id)}
                                                >
                                                    Delete
                                                </StyledButton>
                                            </Box>
                                        </ListItem>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </List>
                </Paper>
            </Box>
        </Container>
    );
};

export default GoalsPage;
