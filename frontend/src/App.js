import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { globalTheme } from "./assets/globalTheme.js";

import Navbar from "./components/navbar.js";
import Home from "./components/home.js";
import Register from "./components/register.js";
import Login from "./components/login.js";
import Dashboard from "./components/dashboard/dashboard.js";
import ChangePassword from "./components/changePassword.js";
import ItemListTable from "./components/allItems/allItems.js";
import ShoppingCart from "./components/shoppingCart.js";

import "./assets/css/eslay.scss";

import Cookies from "js-cookie";
import axios from "axios";

const emptyLoginInfo = {
	username: "",
	authenticated: false,
	points: "",
	rewardLevel: "",
	totalProfit: "",
	token: null,
};

function App() {
	const [isLoading, setLoading] = useState(true);
	const [loginInfo, setLoginInfo] = useState(emptyLoginInfo);
	useEffect(() => {
		let token = Cookies.get("token");
		axios({
			method: "POST",
			url: "/check-token",
			data: { token: token },
		}).then(
			(response) => {
				let info = JSON.parse(JSON.stringify(emptyLoginInfo));
				let decodedResponse = response;
				console.log(decodedResponse.data);
				info.username = decodedResponse.data["username"];
				info.authenticated = decodedResponse.data["authenticated"];
				info.points = decodedResponse.data["points"];
				info.rewardLevel = decodedResponse.data["rewardLevel"];
				info.totalProfit = decodedResponse.data["totalProfit"];
				info.token = token;

				setLoginInfo(info);
				setLoading(false);
			},
			(error) => {
				console.log(error);
			}
		);
	}, []);

	if (isLoading) {
		return <div className="App loading">✨Loading . . . ✨</div>;
	}

	return (
		<ThemeProvider theme={globalTheme}>
			<CssBaseline>
				<div className="App">
					<Router>
						<Navbar userInfo={loginInfo} />
						<Routes>
							<Route exact path="/" element={<Home />} />
							<Route exact path="/register" element={<Register />} />
							<Route exact path="/login" element={<Login userInfo={loginInfo} />} />
							<Route exact path="/dashboard" element={<Dashboard userInfo={loginInfo} />} />
							<Route exact path="/" element={<Home />} />
							<Route exact path="/change-password" element={<ChangePassword />} />
							<Route exact path="/item-listings" element={<ItemListTable userInfo={loginInfo} />} />
							<Route exact path="/shopping-cart" element={<ShoppingCart userInfo={loginInfo} />} />
						</Routes>
					</Router>
				</div>
			</CssBaseline>
		</ThemeProvider>
	);
}

export default App;
