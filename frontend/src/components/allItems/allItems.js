import React, { useState } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";

import "../../assets/css/allItems.scss";

function makeItemRow(itemId, name, price, description, status, curBid, maxBid, minBid) {
	return { itemId, name, price, description, status, curBid, maxBid, minBid };
}

// This will send a request to retreive all of the current items
function getAllItems() {
	let currTable = [];
	axios({
		method: "GET",
		url: "/all-items",
	}).then((response) => {
		console.log(`All items response: ${JSON.stringify(response)}`);
		if (response["status_code"] === 200) {
			currTable = response["item"];
		}
	});

	for (let idx = 0; idx < currTable.length; idx++) {
		let currItem = currTable[idx];
		currTable[idx] = makeItemRow(currItem["itemId"], currItem["name"], currItem["price"], currItem["description"], currItem["status"], currItem["curBid"], currItem["maxBid"], currItem["minBid"]);
	}

	console.log("Retrieved all items");
	return currTable;
}

function addToCart(id, userInfo) {
	axios({
		method: "POST",
		url: "/add-to-cart",
		data: {
			username: userInfo.username,
			itemId: id,
		},
	}).then((response) => {
		if (response.data["status_code"] === 200) {
			window.location.replace("http://localhost:3030/item-listings");
		}
	});
}
export default function ItemListTable(props) {
	const [table, setTable] = useState(getAllItems());

	return (
		<div className="page-container item-listings">
			<h1 className="page-title">Items For Sale</h1>
			<TableContainer className="item-table">
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Image</TableCell>
							<TableCell>Name</TableCell>
							<TableCell className="desc-col">Description</TableCell>
							<TableCell>Price</TableCell>
							<TableCell>Purchase</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{table.map((row) => (
							<TableRow key={row.itemId}>
								<TableCell>
									<img src={row.image} alt={row.name} />
								</TableCell>
								<TableCell>{row.name}</TableCell>
								<TableCell className="desc-col">{row.description}</TableCell>
								<TableCell>{row.price}</TableCell>
								<TableCell>
									<Button variant="contained" value={row.name} className="purchase-button" color="secondary" size="large" onClick={(event) => {
																																									event.preventDefault();
																																									addToCart(event.target.value, props.userInfo);
																																								}} >
										Add to Cart
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				{!(table.length > 0) && <h2 className="empty-cell">There are no items available at this time</h2>}
			</TableContainer>
		</div>
	);
}
