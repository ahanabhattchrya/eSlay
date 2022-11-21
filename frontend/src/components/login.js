/* This page is the login page for users to login to their respective accounts*/
import React from 'react';
import InputMask from 'react-input-mask';
import { TextField, Button, Box, Select, MenuItem, InputLabel, Checkbox } from '@material-ui/core';


const Login = () => {
	return (
		<div>
			<p>Login Page</p>
            <TextField required id="outlined-required" label="Username" variant="outlined" />
            <TextField required id="outlined-required" label="Password" variant="outlined" />
		</div>
	)
};

export default Login;