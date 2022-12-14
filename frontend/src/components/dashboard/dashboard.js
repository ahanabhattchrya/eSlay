import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, Grid, Dialog } from "@material-ui/core";

import Listings from "./itemListing.js";
import History from "./history.js";
import UserInfo from "./userInfo.js";
import UploadItem from "./uploadItem";

import "../../assets/css/dashboard.scss";

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

const Dashboard = (props) => {
	const [value, setValue] = React.useState(0);
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	if (!props.userInfo.authenticated) {
		window.location.replace("/login");
	}
	return (
		<div className="dashboard page-container">
			<Grid container spacing={1}>
				<Grid item xs={4}>
					<UserInfo userInfo={props.userInfo} />
				</Grid>
				<Grid item xs={8}>
					<Box className="dashboard-out-wrapper">
						<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
							<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
								<Tab label="Item List" {...a11yProps(0)} />
								<Tab label="Purchase history" {...a11yProps(1)} />
							</Tabs>
						</Box>
						<TabPanel value={value} index={0}>
							<Button variant="contained" className="list-new-button" color="secondary" onClick={handleOpen}>
								List New Item
							</Button>
							<Dialog open={open} onClose={handleClose}>
								<UploadItem userInfo={props.userInfo} />
							</Dialog>
							<Listings userInfo={props.userInfo} />
						</TabPanel>
						<TabPanel value={value} index={1}>
							<History userInfo={props.userInfo} />
						</TabPanel>
					</Box>
				</Grid>
			</Grid>
		</div>
	);
};

export default Dashboard;
