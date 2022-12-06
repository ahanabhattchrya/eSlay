import React from "react";
import { Box, Button, Grid } from "@material-ui/core";

const Dashboard = () => {
	return (
		<div className="dashboard">
			<Grid>
				<Grid item>
					<UserInfo />
				</Grid>
				<Grid item>
					<Grid className="user-lists" direction="column">
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

const UserInfo = () => {
	return <div className="user-info"></div>;
};

const Listings = () => {
	return <div className="user-items"></div>;
};

const History = () => {
	return <div className="purchase-history"></div>;
};
export default Dashboard;
