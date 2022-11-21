/* This page is the login page for users to login to their respective accounts*/
import React from 'react';
import InputMask from 'react-input-mask';
import { TextField, Button, Select, MenuItem, InputLabel, Checkbox } from '@material-ui/core';
import Box from '@mui/material/Box';

const Login = () => {
    return (
        <Box sx={{ width: 500, height: 500, border: '3px solid black', borderRadius: 2}}>
            <TextField required id="outlined-required" label="Username" variant="outlined" />
            <TextField required id="outlined-required" label="Password" variant="outlined" />
            <Button variant="contained">Login Here</Button>
            <h6>New to E-Slay? Sign Up Here</h6>
            <h6>Forgot Password?</h6>
        </Box>
      );
};

export default Login;