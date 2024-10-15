import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import '@fontsource/poppins';  // Import the "Poppins" font

// Custom styles for the button with hover effect and animation
const StyledButton = styled(Button)({
  backgroundColor: '#4CAF50',
  color: '#fff',
  padding: '12px 25px',
  fontSize: '16px',
  fontFamily: 'Poppins, sans-serif',
  borderRadius: '8px',
  transition: 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: '#45a049',
    transform: 'scale(1.05)',
  },
});

// Custom box with subtle animation on page load
const AnimatedBox = styled(Box)({
  animation: 'fadeIn 1s ease-in',
  '@keyframes fadeIn': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
});

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ fontFamily: 'Poppins, sans-serif', textAlign: 'center' }}>
      <AnimatedBox mt={8}>
        <Paper elevation={4} sx={{ padding: '40px 20px', borderRadius: '12px' }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
            Welcome Back
          </Typography>
          <Typography variant="body1" align="center" gutterBottom sx={{ color: '#757575', marginBottom: '20px' }}>
            Please login to your account
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              InputLabelProps={{
                style: { color: '#757575', fontFamily: 'Poppins, sans-serif' },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#4CAF50',
                  },
                },
                fontFamily: 'Poppins, sans-serif',
              }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputLabelProps={{
                style: { color: '#757575', fontFamily: 'Poppins, sans-serif' },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#4CAF50',
                  },
                },
                fontFamily: 'Poppins, sans-serif',
              }}
            />
            <StyledButton type="submit" variant="contained" fullWidth sx={{ marginTop: '20px' }}>
              Login
            </StyledButton>
          </form>
        </Paper>
      </AnimatedBox>
    </Container>
  );
};

export default LoginPage;
