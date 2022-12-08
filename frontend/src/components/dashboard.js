import React from "react";
import { Button, Table, Grid } from "@material-ui/core";

const UserInfo = () => {
	return <div className="user-info"></div>;
};

const Listings = () => {
	return <div className="user-items"></div>;
};

const History = () => {
	return <div className="purchase-history"></div>;
};

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
