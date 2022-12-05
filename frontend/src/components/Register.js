// This page is the register page for users to register to their respective accounts
import React from "react";
import { TextField, Button } from "@material-ui/core";
import Box from "@mui/material/Box";
import "../assets/css/eslay.scss";
import "../assets/css/register.scss";

const Register = () => {
	return (
		<div className="register form-container">
			<Box className=" form-box register-box">
				<h2>Register</h2>
				<TextField required id="outlined-required" label="Email" variant="outlined" />
				<TextField required id="outlined-required" label="Username" variant="outlined" />
				<TextField required id="outlined-required" label="Password" variant="outlined" />
				<TextField required id="outlined-required" label="Confirm password" variant="outlined" />
				<Button variant="contained" color="primary" size="large">
					Register Here
				</Button>
				<div>
					<p>
						Already have an account?
						<br />
						Log in <a href="/login">here</a>.
					</p>
					<p></p>
				</div>
			</Box>
		</div>
	);
};

export default Register;
