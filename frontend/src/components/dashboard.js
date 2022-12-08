import React from "react";
import { Button, Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Checkbox } from "@material-ui/core";

import "../assets/css/dashboard.scss";

import UserInfo from "./userInfo.js";
import Listings from "./itemListing.js";
import History from "./history.js";

const Dashboard = () => {
	return (
		<div className="dashboard">
			<Grid container className="dashboard-wrapper">
				<Grid item xs={4}>
					<UserInfo />
				</Grid>
				<Grid item className="table-wrapper" xs={7}>
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
