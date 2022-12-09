import React from "react";
import { Button, Grid, Dialog } from "@material-ui/core";

import "../../assets/css/dashboard.scss";

import UserInfo from "./userInfo.js";
import Listings from "./itemListing.js";
import History from "./history.js";
import UploadItem from "./uploadItem";

const Dashboard = () => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div className="dashboard">
			<Grid container className="dashboard-wrapper">
				<Grid item xs={4}>
					<UserInfo />
				</Grid>
				<Grid item className="table-wrapper" xs={7}>
					<Button onClick={handleOpen}>List New Item</Button>
					<Dialog open={open} onClose={handleClose}>
						<UploadItem />
					</Dialog>
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
