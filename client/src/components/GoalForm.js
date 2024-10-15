import React, { useState } from 'react';
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from '../services/api';

// Styled components for improved UI
const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: '24px',
    marginTop: '24px',
    borderRadius: '12px',
    boxShadow: theme.shadows[4],
    backgroundColor: theme.palette.background.default,
}));

const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: '16px',
    padding: '12px',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
        transform: 'scale(1.03)',
    },
}));

const GoalForm = ({ initialData, onSuccess }) => {
    const [goalType, setGoalType] = useState(initialData?.goalType || '');
    const [targetValue, setTargetValue] = useState(initialData?.targetValue || '');
    const [timeFrame, setTimeFrame] = useState(initialData?.timeFrame || '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const goalData = { goalType, targetValue, timeFrame };
        try {
            if (initialData) {
                await axios.put(`/goals/${initialData._id}`, goalData);
            } else {
                await axios.post('/goals', goalData);
            }
            onSuccess();
        } catch (error) {
            console.error('Goal submission failed', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <StyledPaper elevation={3}>
                <Box mt={2}>
                    <Typography
                        variant="h5"
                        align="center"
                        sx={{ fontWeight: 'bold', color: 'primary.main', marginBottom: '16px' }}
                    >
                        {initialData ? 'Edit' : 'Add'} Goal
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Goal Type"
                            fullWidth
                            margin="normal"
                            value={goalType}
                            onChange={(e) => setGoalType(e.target.value)}
                            required
                            variant="outlined"
                            sx={{ transition: 'box-shadow 0.3s ease', '&:hover': { boxShadow: 2 } }}
                        />
                        <TextField
                            label="Target Value"
                            fullWidth
                            margin="normal"
                            value={targetValue}
                            onChange={(e) => setTargetValue(e.target.value)}
                            required
                            type="number"
                            variant="outlined"
                            sx={{ transition: 'box-shadow 0.3s ease', '&:hover': { boxShadow: 2 } }}
                        />
                        <FormControl fullWidth margin="normal" required variant="outlined">
                            <InputLabel>Time Frame</InputLabel>
                            <Select
                                value={timeFrame}
                                onChange={(e) => setTimeFrame(e.target.value)}
                                label="Time Frame"
                                sx={{ transition: 'box-shadow 0.3s ease', '&:hover': { boxShadow: 2 } }}
                            >
                                <MenuItem value="weekly">Weekly</MenuItem>
                                <MenuItem value="monthly">Monthly</MenuItem>
                            </Select>
                        </FormControl>
                        <StyledButton
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            {initialData ? 'Update' : 'Add'} Goal
                        </StyledButton>
                    </form>
                </Box>
            </StyledPaper>
        </Container>
    );
};

export default GoalForm;
