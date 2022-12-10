import React, { useState } from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Checkbox } from "@material-ui/core";

import axios from "axios";

function makeItemRow(itemId, name, price, description, status, curBid, maxBid, minBid) {
	return { itemId, name, price, description, status, curBid, maxBid, minBid };
}

function getCurrentlySelling(userInfo) {
	let currTable = [];

	axios({
		method: "POST",
		url: "/currently-selling",
		data: { username: userInfo.username },
	}).then((response) => {
		console.log(`Item listing response: ${JSON.stringify(response)}`);
		if (response["status_code"] === 200) {
			currTable = response["item"];
		}
	});

	for (let idx = 0; idx < currTable.length; idx++) {
		let currItem = currTable[idx];
		currTable[idx] = makeItemRow(currItem["itemId"], currItem["name"], currItem["price"], currItem["description"], currItem["status"], currItem["curBid"], currItem["maxBid"], currItem["minBid"]);
	}

	console.log("Retrieved currently sold items");
	return currTable;
}
/*
	Test Data
	createData("", "Toy boat", "A tiny boat", "sold", "$20", "$99"),
	createData("", "Toy boat", "A tiny boat", "sold", "$20", "$99"),
	createData("", "Toy boat", "A tiny boat", "sold", "$20", "$99"),
	createData("", "Toy boat", "A tiny boat", "sold", "$20", "$99"),
	createData("", "Toy boat", "A tiny boat", "sold", "$20", "$99"),
	createData("", "Toy boat", "A tiny boat", "sold", "$20", "$99"),
*/
const Listings = (props) => {
	const [table, setTable] = useState(getCurrentlySelling(props.userInfo));

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
							<TableCell className="desc-col">Description</TableCell>
							<TableCell>Status</TableCell>
							<TableCell>Price</TableCell>
							<TableCell>Current Top Bid</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{/* This controls the generation of rows for listings */}
						{table.map((row) => (
							<TableRow key={row.listing}>
								<TableCell xs={1}>
									<Checkbox />
								</TableCell>
								<TableCell>
									<img src={row.imageDir} alt={row.listing} />
								</TableCell>
								<TableCell>{row.listing}</TableCell>
								<TableCell className="desc-col">{row.desc}</TableCell>
								<TableCell>{row.status}</TableCell>
								<TableCell>{row.price}</TableCell>
								<TableCell>{row.curTopBid}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				{!(table.length > 0) && <h2 className="empty-cell">You've never sold an item!</h2>}
			</TableContainer>
		</div>
	);
};

export default Listings;
