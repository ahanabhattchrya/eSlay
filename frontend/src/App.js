import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { globalTheme } from "./assets/globalTheme.js";

import Register from "./components/register.js";
import Login from "./components/login.js";
import Home from "./components/home.js";
import Navbar from "./components/navbar.js";
import ChangePassword from "./components/changePassword.js";
import "./assets/css/eslay.scss";

import Cookies from "js-cookie";
import axios from "axios";

let currLoginInfo = {
	username: "",
	authenticated: false,
	token: null,
};

// Expects response that looks like {username: string, authenticated: boolean}
function checkToken() {
	axios({
		method: "POST",
		url: "/check-token",
		data: { token },
	}).then(
		(response) => {
			currLoginInfo.username = response.data.username;
			currLoginInfo.authenticated = response.data.authenticated;
			currLoginInfo.token = token;
			console.log(response);
		},
		(error) => {
			console.log(error);
		}
	);
}

let token = Cookies.get("token");
function App() {
	useEffect(() => {
		checkToken();
		console.log(`Authenticated user? ${currLoginInfo.authenticated}`);
	});
	return (
		<ThemeProvider theme={globalTheme}>
			<CssBaseline>
				<div className="App">
					<Router>
						<Navbar loginInfo={currLoginInfo} />
						<Routes>
							<Route exact path="/register" element={<Register />} />
							<Route exact path="/login" element={<Login />} />
							<Route exact path="/" element={<Home />} />
							<Route exact path="/change-password" element={<ChangePassword />} />
						</Routes>
					</Router>
				</div>
			</CssBaseline>
		</ThemeProvider>
	);
}

export default App;
