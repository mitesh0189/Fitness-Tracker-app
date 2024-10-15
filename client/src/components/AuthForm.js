import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
        transform: 'scale(1.05)',
        transition: 'all 0.3s ease',
    },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-root': {
        transition: 'all 0.3s ease',
        '&:hover fieldset': {
            borderColor: theme.palette.primary.main,
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
            borderWidth: '2px',
        },
    },
}));

const AuthForm = ({ onSubmit, isSignup }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            onSubmit(name, email, password);
        } else {
            onSubmit(email, password);
        }
    };

    return (
        <Box
            component={motion.div}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                p: 2,
                backgroundColor: '#f7f7f7',
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    p: 4,
                    maxWidth: 400,
                    width: '100%',
                    borderRadius: '12px',
                    backgroundColor: '#ffffff',
                }}
            >
                <Typography
                    component={motion.h1}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    variant="h5"
                    align="center"
                    gutterBottom
                >
                    {isSignup ? 'Create an Account' : 'Welcome Back'}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    {isSignup && (
                        <StyledTextField
                            label="Name"
                            fullWidth
                            margin="normal"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    )}
                    <StyledTextField
                        label="Email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <StyledTextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <StyledButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, py: 1.5, fontSize: '16px' }}
                        component={motion.div}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                    >
                        {isSignup ? 'Sign Up' : 'Login'}
                    </StyledButton>
                </Box>
            </Paper>
        </Box>
    );
};

export default AuthForm;
