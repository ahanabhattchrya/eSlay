/*This page is the / path, meaning everything that should rendered when the user visits our site should be here. 
    We will then call this component in <App /> along with all the other paths*/ 
import React from 'react';
import InputMask from 'react-input-mask';
import { TextField, Button, Select, MenuItem, InputLabel, Checkbox } from '@material-ui/core';
import { spacing } from '@mui/system';
import Box from '@mui/material/Box';
import './css/App.scss';

const Home = () => {
    return (
        <div className = "home">
            <Box className= "home-box1" sx={{ width: 500, height: 500, border: '3px solid black', borderRadius: 2, display: 'flex', alignItems: 'center', mb: 5}}>
                <h2> Why e-slay?</h2>
                <br/>
                <h6> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</h6>
            </Box>
            <Box className= "home-box2" sx={{ width: 500, height: 500, border: '3px solid black', borderRadius: 2, display: 'flex', alignItems: 'center'}}>
                <h2>Ready to Sign Up?</h2>
                <h3>There's a whole new world of people ready to buy your used or new items. Register here now!</h3>
            </Box>
        </div>
      );
};

export default Home;


