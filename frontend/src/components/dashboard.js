import React from "react";
import { Button, Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Checkbox } from "@material-ui/core";

import "../assets/css/dashboard.scss";

import UserInfo from "./userInfo.js";
import Listings from "./itemListing.js";
import History from "./history.js";

const Dashboard = () => {
	return (
		<div className="dashboard">
			<Grid container>
				<Grid item xs={2}>
					<UserInfo />
				</Grid>
				<Grid item xs={10}>
					<Grid container className="user-lists" direction="column">
						<Grid item>
							<Listings />
						</Grid>
						<Grid item>
							<History />
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
};

export default Dashboard;
