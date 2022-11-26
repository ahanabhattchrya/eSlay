/* This page is the register page for users to register to their respective accounts*/
import React from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, Checkbox } from '@material-ui/core';
import Box from '@mui/material/Box';
import './css/App.scss';

const Register = () => {
    return (
        <div className = "register">
            <Box className= "register-box" sx={{ width: 500, height: 500, border: '3px solid black', borderRadius: 2, display: 'flex', alignItems: 'center'}}>
                <TextField required id="outlined-required" label="Username" variant="outlined" />
                <TextField required id="outlined-required" label="Password" variant="outlined" />
                <Button variant="contained">Register Here</Button>
                <h6>New to E-Slay? Sign Up Here</h6>
                <h6>Forgot Password?</h6>
            </Box>
        </div>
      );
};

export default Register;