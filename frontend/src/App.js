import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { globalTheme } from "./assets/globalTheme.js";

import Register from "./components/register.js";
import Login from "./components/login.js";
import Home from "./components/home.js";
import Navbar from "./components/navbar.js";
import ChangePassword from "./components/changePassword.js";
import "./assets/css/eslay.scss";

export let currLoginInfo = {
	username: "",
	password: "",
	authenticated: true,
};

function App() {
	return (
		<ThemeProvider theme={globalTheme}>
			<CssBaseline>
				<div className="App">
					<Router>
						<Navbar />
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
