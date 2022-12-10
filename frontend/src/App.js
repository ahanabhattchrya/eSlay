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

import "./assets/css/eslay.scss";

import Cookies from "js-cookie";
import axios from "axios";
import ShoppingCart from "./components/shoppingCart.js";

const prevInfo = {
	username: "",
	authenticated: false,
	points: "",
	rewardLevel: "",
	totalProfit: "",
	token: null,
};

// Expects response that looks like {username: string, authenticated: boolean}
function checkToken() {
	axios({
		method: "POST",
		url: "/check-token",
		data: { token: token },
	}).then(
		(response) => {
			console.log(response);
			let decodedResponse = response;

			if (decodedResponse.status != 200) {
				return {
					username: "",
					authenticated: false,
					points: "",
					rewardLevel: "",
					totalProfit: "",
					token: "",
				};
			}
			console.log(decodedResponse.data);
			console.log(`PrevInfo: ${prevInfo}`);

			return {
				username: decodedResponse.data["username"],
				authenticated: decodedResponse.data["authenticated"],
				points: decodedResponse.data["points"];
				rewardLevel: decodedResponse.data["rewardLevel"],
				totalProfit: decodedResponse.data["totalProfit"],
				token: token
			};
				

		},
		(error) => {
			console.log(error);
		}
	);
}

let token = Cookies.get("token");
function App() {
	let loginInfo = checkToken();
	useEffect(() => {
		setLoginInfo(() => {
			loginInfo = checkToken(loginInfo);
		});
	}, []);

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
							<Route exact path="/item-listings" element={<ItemListTable />} />
							<Route exact path="/shopping-cart" element={<ShoppingCart userInfo={loginInfo} />} />
						</Routes>
					</Router>
				</div>
			</CssBaseline>
		</ThemeProvider>
	);
}

export default App;
