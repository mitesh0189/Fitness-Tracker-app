import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Container, Typography, Box, Paper } from '@mui/material';
import { styled } from '@mui/system';

// Styled box to create a profile card effect
const ProfileBox = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: '16px',
    backgroundColor: '#f5f5f5',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
    },
}));

// Styled typography for profile information
const ProfileTypography = styled(Typography)(({ theme }) => ({
    fontSize: '1.2rem',
    marginBottom: theme.spacing(2),
    color: '#333',
    '& span': {
        fontWeight: 'bold',
        color: theme.palette.primary.main,
    },
}));

const ProfilePage = () => {
    const { user } = useContext(AuthContext);

    return (
        <Container>
            <Box mt={5} display="flex" justifyContent="center">
                <ProfileBox elevation={3}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Profile
                    </Typography>
                    <ProfileTypography>
                        <span>Name:</span> {user.name}
                    </ProfileTypography>
                    <ProfileTypography>
                        <span>Email:</span> {user.email}
                    </ProfileTypography>
                    <ProfileTypography>
                        <span>Role:</span> {user.role}
                    </ProfileTypography>
                </ProfileBox>
            </Box>
        </Container>
    );
};

export default ProfilePage;
