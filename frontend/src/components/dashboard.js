import React from "react";
import { Button, Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Checkbox } from "@material-ui/core";

import "../assets/css/dashboard.scss";
const UserInfo = () => {
	return <div className="user-info"></div>;
};

function createData(listing, desc, status, price, curTopBid) {
	return { listing, desc, status, price, curTopBid };
}
/*
	Fetch items from backend and insert them into objects like:
	{ image, listing, desc, status, price, curTopBid }
*/
const rows = [createData("Broken toy", "Toy that my great great great grandfather's grandfather owned when he was 2", "sold", "$20", "$99")];

const Listings = () => {
	return (
		<div className="user-items">
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>
								<Checkbox />
							</TableCell>
							<TableCell>Image</TableCell>
							<TableCell>Listing</TableCell>
							<TableCell>Description</TableCell>
							<TableCell>Status</TableCell>
							<TableCell>Price</TableCell>
							<TableCell>Current Top Bid</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow key={row.listing}>
								<TableCell xs={1}>
									<Checkbox />
								</TableCell>
								<TableCell>{row.image}</TableCell>
								<TableCell>{row.listing}</TableCell>
								<TableCell xs={3}>{row.desc}</TableCell>
								<TableCell>{row.status}</TableCell>
								<TableCell>{row.price}</TableCell>
								<TableCell>{row.curTopBid}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
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
