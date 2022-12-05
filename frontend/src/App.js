import logo from "./assets/images/logo.svg";
import "./assets/css/App.scss";
import React from "react";
import Register from "./components/register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { globalTheme } from "./assets/globalTheme.js";

function App() {
	return (
		<ThemeProvider theme={globalTheme}>
			<CssBaseline>
				<div className="App">
					<h1>E-Slay</h1> {/* Remove this line later and add to home.js, otherwise it will be rendered in all components*/}
					<Router>
						<Routes>
							<Route exact path="/register" element={<Register />} />
						</Routes>
					</Router>
				</div>
			</CssBaseline>
		</ThemeProvider>
	);
}

export default App;
