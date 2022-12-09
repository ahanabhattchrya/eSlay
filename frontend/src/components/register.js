/* This page is the register page for users to register to their respective accounts */
import React from "react";
import { TextField, Button } from "@material-ui/core";
import Box from "@mui/material/Box";

import axios from "axios";

// This will handle all our registration information to send to the backend.
let registerInfo = {
	email : "",
	username: "",
	password: "",
	confirmedPassword: ""
};

// This function will test the passwords to make sure they are exactly alike. 
// If they are not, do not send the data and prompt the user to check their 
// passwords and make sure they match.
function verifyPasswords(password1, password2){ 
	return password1 === password2
}

// This handler will verify passwords are the same, throw error if not
// and then will send our data to the backend through /register
function sendRegisterInfo(){
	axios({
		method:'POST',
		url:'/register', 
		data: {
			email : registerInfo.email,
			username : registerInfo.username,
			password : registerInfo.password
		}
	})
	.then((response) => {
		window.location.replace("http://localhost:3030/login")
	},
	(error) => {
		console.log(error);
	});
};


/*
 * All functions for the onChange events will happen here. 
 * This is to help with updating the registerInfo dict
 * with updated values
 */

function changeEmail(value) { registerInfo.email = value; };

function changeUsername(value) { registerInfo.username = value; };

function changePassword(value) { registerInfo.password = value; };

function changeConfirmedPassword(value) { registerInfo.confirmedPassword = value; };



const Register = () => {
	return (
		<div className="register form-container">
			<Box className=" form-box register-box">
				<TextField required id="outlined-required" label="Email" variant="outlined" onChange={event => changeEmail(event.target.value)} />
				<TextField required id="outlined-required" label="Username" variant="outlined" onChange={event => changeUsername(event.target.value)} />
				<TextField required id="outlined-required" label="Password" variant="outlined" onChange={event => changePassword(event.target.value)} />
				<TextField required id="outlined-required" label="Confirm password" variant="outlined" onChange={event => changeConfirmedPassword(event.target.value)} />
				<Button variant="contained" color="primary" onClick={sendRegisterInfo} size="large">Register</Button>
				<div>
					<p className="redirect">
						Already have an account?
						<br />
						Log In <a href="/login">Here</a>.
					</p>
				</div>
			</Box>
		</div>
	);
};

export default Register;
