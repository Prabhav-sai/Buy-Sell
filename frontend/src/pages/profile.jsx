import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Button,
    Grid,
    CircularProgress,
    TextField,
    Box,
    Paper,
    Avatar
} from '@mui/material';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthcontext'
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const Profile = () => {
    // ... existing state and logic ...
    const { user } = useAuthContext();
    const [profile, setProfile] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        age: '',
        contactNumber: ''
    });
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/profile', {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                setProfile(response.data);
                setFormData({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    email: response.data.email,
                    age: response.data.age,
                    contactNumber: response.data.contactNumber
                });
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
            setLoading(false);
        };

        fetchProfile();
    }, [user.token]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            await axios.put("http://localhost:5000/api/profile", formData, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            setProfile({ ...profile, ...formData });
            setEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: '80vh', alignItems: 'center' }}>
                <CircularProgress size={60} />
            </Box>
        );
    }

    if (!profile) {
        return (
            <Typography variant="h6" color="error" align="center" sx={{ mt: 4 }}>
                Error loading profile
            </Typography>
        );
    }

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Avatar sx={{
                        width: 100,
                        height: 100,
                        fontSize: '2.5rem',
                        bgcolor: 'primary.main',
                        mb: 2,
                        mx: 'auto'
                    }}>
                        {profile.firstName[0]}{profile.lastName[0]}
                    </Avatar>
                    <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
                        {profile.firstName} {profile.lastName}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {profile.email}
                    </Typography>
                </Box>

                {editing ? (
                    <Box component="form" sx={{ maxWidth: 600, mx: 'auto' }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="First Name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Last Name"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    value={formData.email}
                                    disabled
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Age"
                                    name="age"
                                    type="number"
                                    value={formData.age}
                                    onChange={handleChange}
                                    variant="outlined"
                                    inputProps={{ min: 18 }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Contact Number"
                                    name="contactNumber"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                    variant="outlined"
                                    inputMode="tel"
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ mt: 2 }}>
                                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleUpdate}
                                        startIcon={<SaveIcon />}
                                        size="large"
                                        sx={{ px: 4 }}
                                    >
                                        Save Changes
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => setEditing(false)}
                                        startIcon={<CancelIcon />}
                                        size="large"
                                    >
                                        Cancel
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                ) : (
                    <Box sx={{
                        maxWidth: 600,
                        mx: 'auto',
                        p: 3,
                        bgcolor: 'background.paper',
                        borderRadius: 2
                    }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="text.secondary">
                                    First Name
                                </Typography>
                                <Typography variant="h6">{profile.firstName}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="text.secondary">
                                    Last Name
                                </Typography>
                                <Typography variant="h6">{profile.lastName}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" color="text.secondary">
                                    Email
                                </Typography>
                                <Typography variant="h6">{profile.email}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="text.secondary">
                                    Age
                                </Typography>
                                <Typography variant="h6">{profile.age}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="text.secondary">
                                    Contact Number
                                </Typography>
                                <Typography variant="h6">{profile.contactNumber}</Typography>
                            </Grid>
                            <Grid item xs={12} sx={{ mt: 2 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => setEditing(true)}
                                    startIcon={<EditIcon />}
                                    size="large"
                                    sx={{ px: 4 }}
                                >
                                    Edit Profile
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default Profile;