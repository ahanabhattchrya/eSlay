// This page is the register page for users to register to their respective accounts
import React from "react";
import { TextField, Button, Select, MenuItem, InputLabel, Checkbox } from "@material-ui/core";
import Box from "@mui/material/Box";
import "../assets/css/eslay.scss";

const Register = () => {
	return (
		<div className="register">
			<Box className="register-box">
				<TextField required id="outlined-required" label="Email" variant="outlined" />
				<TextField required id="outlined-required" label="Username" variant="outlined" />
				<TextField required id="outlined-required" label="Password" variant="outlined" />
				<TextField required id="outlined-required" label="Confirm password" variant="outlined" />
				<Button variant="contained">Register Here</Button>
				<h6>Already have an account?</h6>
				<h6>
					Log in <a href="/login">here</a>.
				</h6>
			</Box>
		</div>
	);
};

export default Register;
