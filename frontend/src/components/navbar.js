import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";
import currLoginInfo from "../App"

const Navbar = () => {
	return (
		<div class="navBar">
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
					<Button variant="text" className="menu-item" color="secondary" size="large" component={Link} to="/">
						<p>
							<b>Items</b>
						</p>
					</Button>
					<Button variant="text" className="menu-item" color="secondary" size="large" component={Link} to="/">
						<p>
							<b>Auctions</b>
						</p>
					</Button>
					<Button variant="text" className="menu-item" color="secondary" size="large" component={Link} to="/login">
						<p>
							<b>Login</b>
						</p>
					</Button>
				</Grid>
			</Grid>
		</div>
	);
};

export default Navbar;
