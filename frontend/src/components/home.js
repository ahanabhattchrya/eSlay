/*This page is the / path, meaning everything that should rendered when the user visits our site should be here. 
    We will then call this component in <App /> along with all the other paths*/ 
import React from 'react';
import InputMask from 'react-input-mask';
import { TextField, Button, Select, MenuItem, InputLabel, Checkbox, Typography } from '@material-ui/core';
import { spacing } from '@mui/system';
import Box from '@mui/material/Box';
import './css/App.scss';

const Home = () => {
    return (
        <div className = "home">
            <Box className= "home-box1" sx={{ width: 650, height: 400, border: '3px solid black', borderRadius: 2, display: 'flex', alignItems: 'center', mb: 5, mt: 7, ml: 10, lineHeight: 4}}>
                <Typography component="div">
                    <Box sx={{ lineHeight: 2, ml: 22, fontSize: "h3.fontSize", fontWeight: 'bold', mt:-5}}>Why E-Slay?</Box>
                    <Box sx={{ lineHeight: 2, ml: 5, mr: 5, fontSize: "h5.fontSize", textAlign: 'center'}}>Because it's slay and better than ebay! We provide live auctions and various items from other users all within the reach of your fingertips! Keep scrolling to know more about us and what we do!</Box>
                </Typography>
            </Box>
            <Box className= "home-box2" sx={{ width: 650, height: 450, border: '3px solid black', borderRadius: 2, display: 'flex', alignItems: 'center', ml: 116, mt: -30}}>
                <Typography component="div">
                    <Box sx={{ lineHeight: 2, ml: 18, mt:-5, fontSize: "h3.fontSize", fontWeight: 'bold'}}>First Time Here?</Box>
                    <Box sx={{ lineHeight: 2, ml: 5, mr: 5, fontSize: "h5.fontSize", textAlign: 'center'}}>There's a whole world of people ready to buy your used or new items. <br/> Register here now!</Box>
                    <Button variant="contained">Register</Button>
                </Typography>
            </Box>
        </div>
      );
};

export default Home;


