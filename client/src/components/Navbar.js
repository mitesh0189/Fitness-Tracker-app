import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { AppBar, Toolbar, Button, Typography, IconButton, Box } from '@mui/material'; // Added Box here
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

// Styled Button with hover effects and transitions
const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
    padding: theme.spacing(1.5, 3),
    borderRadius: '8px',
    color: '#fff',
    backgroundColor: '#4caf50',
    fontSize: '16px',
    textTransform: 'none',
    transition: 'all 0.3s ease',
    '&:hover': {
        backgroundColor: '#388e3c',
        transform: 'scale(1.08)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    '&:active': {
        transform: 'scale(1)',
    },
}));

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const location = useLocation();

    return (
        <AppBar position="static" sx={{ backgroundColor: '#2e2e2e', padding: '10px 0' }}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2, display: { xs: 'block', md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>

                <Typography
                    variant="h5"
                    component="div"
                    sx={{
                        flexGrow: 1,
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 700,
                        color: '#f0f0f0',
                    }}
                >
                    Fitness Tracker
                </Typography>

                <Box sx={{ display: { xs: 'none', md: 'block' } }}> {/* Using Box here */}
                    {user ? (
                        <>
                            {user.role === 'admin' && (
                                <StyledButton
                                    component={Link}
                                    to="/admin"
                                    sx={{
                                        backgroundColor: location.pathname === '/admin' ? '#388e3c' : '#4caf50',
                                    }}
                                >
                                    Admin
                                </StyledButton>
                            )}
                            <StyledButton
                                component={Link}
                                to="/"
                                sx={{
                                    backgroundColor: location.pathname === '/' ? '#388e3c' : '#4caf50',
                                }}
                            >
                                Dashboard
                            </StyledButton>
                            <StyledButton
                                component={Link}
                                to="/workouts"
                                sx={{
                                    backgroundColor: location.pathname === '/workouts' ? '#388e3c' : '#4caf50',
                                }}
                            >
                                Workouts
                            </StyledButton>
                            <StyledButton
                                component={Link}
                                to="/goals"
                                sx={{
                                    backgroundColor: location.pathname === '/goals' ? '#388e3c' : '#4caf50',
                                }}
                            >
                                Goals
                            </StyledButton>
                            <Button
                                onClick={logout}
                                sx={{
                                    color: '#fff',
                                    fontSize: '16px',
                                    marginLeft: '15px',
                                    textTransform: 'none',
                                    '&:hover': {
                                        color: '#f44336',
                                    },
                                }}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <StyledButton
                                component={Link}
                                to="/login"
                                sx={{
                                    backgroundColor: location.pathname === '/login' ? '#388e3c' : '#4caf50',
                                }}
                            >
                                Login
                            </StyledButton>
                            <StyledButton
                                component={Link}
                                to="/signup"
                                sx={{
                                    backgroundColor: location.pathname === '/signup' ? '#388e3c' : '#4caf50',
                                }}
                            >
                                Sign Up
                            </StyledButton>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
