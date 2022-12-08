/* This page is the login page for users to login to their respective accounts*/
import React from "react";
import { TextField, Button } from "@material-ui/core";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";

import axios from "axios";

let currLoginInfo = {
	username: "",
	password: "",
};

function changeUsername(value) {
	currLoginInfo.username = value;

	console.log("value is: ", value);
}

function changePassword(value) {
	currLoginInfo.password = value;
}

function sendLoginInfo() {
	axios({
		method: "POST",
		url: "/login",
		data: currLoginInfo,
	}).then(
		(response) => {
			console.log(response);
		},
		(error) => {
			console.log(error);
		}
	);

	console.log("request sent");
}

const Login = () => {
	return (
		<div className="login form-container small-form">
			<Box className="form-box login-box" sx={{ border: "3px solid black", borderRadius: 2 }}>
				<TextField required id="outlined-required" label="Username" variant="outlined" onChange={(event) => changeUsername(event.target.value)} />
				<TextField type={"password"} required id="outlined-required" label="Password" variant="outlined" onChange={(event) => changePassword(event.target.value)} />
				<Button variant="contained" size="large" color="primary" onClick={sendLoginInfo}>
					Login
				</Button>
				<p>
					New to E-Slay? Sign Up <a href="/register">Here</a>
					<br />
					<a href="/change-password">Forgot Password?</a>
				</p>
			</Box>
		</div>
	);
};

export default Login;
