import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";

function Navbar(props) {
	console.log(`Navbar props: ${JSON.stringify(props)}`);

	return (
		<div class="navBar" key={props.userInfo}>
			<Grid container direction="row" justifyContent="space-between" alignItems="center">
				<Grid item className="title-container">
					<h1 className="title">eSlay</h1>
				</Grid>
				<Grid item className="menu-bar">
					<Button variant="text" className="menu-item" color="secondary" size="large" component={Link} to="/">
						<p>
							<b>Home</b>
						</p>
					</Button>
					<Button variant="text" className="menu-item" color="secondary" size="large" component={Link} to="/item-listings">
						<p>
							<b>Items</b>
						</p>
					</Button>
					<Button variant="text" className="menu-item" color="secondary" size="large" component={Link} to="/">
						<p>
							<b>Auctions</b>
						</p>
					</Button>
					{!props.userInfo.authenticated && (
						<Button variant="text" className="menu-item" color="secondary" size="large" component={Link} to="/login">
							<p>
								<b>Login</b>
							</p>
						</Button>
					)}
					{!props.userInfo.authenticated && (
						<Button variant="text" className="menu-item" color="secondary" component={Link} to="/register">
							<p>
								<b>Register</b>
							</p>
						</Button>
					)}
					{props.userInfo.authenticated && (
						<Button variant="text" className="menu-item" color="secondary" size="large" component={Link} to="/dashboard">
							<p>
								<b>Dashboard</b>
							</p>
						</Button>
					)}
					{props.userInfo.authenticated && (
						<Button variant="text" className="menu-item" color="secondary" component={Link} to="/logout">
							<p>
								<b>Logout</b>
							</p>
						</Button>
					)}
				</Grid>
			</Grid>
		</div>
	);
}

export default Navbar;
