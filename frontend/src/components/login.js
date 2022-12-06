/* This page is the login page for users to login to their respective accounts*/
import React from "react";
import { TextField, Button, Select, MenuItem, InputLabel, Checkbox } from "@material-ui/core";
import Box from "@mui/material/Box";

const Login = () => {
	return (
		<div className="login form-container">
			<Box className="form-box login-box" sx={{ border: "3px solid black", borderRadius: 2 }}>
				<TextField required id="outlined-required" label="Username" variant="outlined" />
				<TextField required id="outlined-required" label="Password" variant="outlined" />
				<Button variant="contained" size="large" color="primary" path="\login">
					Login
				</Button>
				<p>
					New to E-Slay? Sign Up <a href="/register">Here</a>
					<br />
					Forgot Password?
				</p>
			</Box>
		</div>
	);
};

export default Login;
