import React from "react";
import { Button, Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Checkbox } from "@material-ui/core";

// I don't actually know if we'll need this function
function createData(listing, desc, status, price, curTopBid) {
	return { listing, desc, status, price, curTopBid };
}
/*
	Fetch items from backend and insert them into objects like:
	{ image, listing, desc, status, price, curTopBid }
	Example: { "Toy boat", "A tiny boat", "sold", "$20", "$99" }
*/
const rows = [];

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
						{/* This controls the generation of rows for listings */}
						{rows.map((row) => (
							<TableRow key={row.listing}>
								<TableCell xs={1}>
									<Checkbox />
								</TableCell>
								<TableCell>
									<img src="{row.image}" />
								</TableCell>
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

export default Listings;
