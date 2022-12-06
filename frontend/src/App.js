import logo from "./assets/images/logo.svg";
import "./assets/css/eslay.scss";
import React from "react";
import Register from "./components/register.js";
import Login from "./components/login.js";
import Home from './components/home.js'
import Navbar from './components/navbar.js'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { globalTheme } from "./assets/globalTheme.js";

function App() {
	return (
		<ThemeProvider theme={globalTheme}>
			<CssBaseline>
				<div className="App">
					<Router>
						<Navbar/>
						<Routes>
							<Route exact path="/register" element={<Register />} />
							<Route exact path="/login" element={<Login />} />
							<Route exact path="/" element={<Home/>}/>
						</Routes>
					</Router>
				</div>
			</CssBaseline>
		</ThemeProvider>
	);
}

export default App;
