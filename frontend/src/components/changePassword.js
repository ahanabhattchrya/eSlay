/* This page is the change password page for users to change their password if they so please */
import React from "react";
import { TextField, Button } from "@material-ui/core";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";

import axios from "axios";

let changePasswordInfo = {
	username: "",
	newPassword: "",
	newPasswordConfirmed: "",
};

/*
 * All change functions needed for the TextField
 */

function changeUsername(value) {
	changePasswordInfo.username = value;
}

function changeNewPassword(value) {
	changePasswordInfo.newPassword = value;
}

function changeConfirmedNewPassword(value) {
	changePasswordInfo.newPasswordConfirmed = value;
}

// Function handler for sending the changed password to the backend.
function sendChangePasswordInfo() {
	axios({
		method: "POST",
		url: "/change-password",
		data: {
			username: changePasswordInfo.username,
			password: changePasswordInfo.newPassword,
		},
	}).then(
		(response) => {
			if (response.data["status_code"] == 200){
				window.location.replace("http://localhost:3030/login")
			}
		},
		(error) => {
			console.log(error);
		}
	);
}

const ChangePassword = () => {
	return (
		<div className="change-password form-container">
			<Box className="form-box change-password-box" sx={{ border: "3px solid black", borderRadius: 2 }}>
				<TextField required id="outlined-required" label="Username" variant="outlined" onChange={(event) => changeUsername(event.target.value)} />
				<TextField type={"password"} required id="outlined-required" label="New Password" variant="outlined" onChange={(event) => changeNewPassword(event.target.value)} />
				<TextField
					type={"password"}
					required
					id="outlined-required"
					label="New Password Confirmation"
					variant="outlined"
					onChange={(event) => changeConfirmedNewPassword(event.target.value)}
				/>
				<Button variant="contained" size="large" color="primary" onClick={sendChangePasswordInfo}>
					Change Password
				</Button>
			</Box>
		</div>
	);
};

export default ChangePassword;
