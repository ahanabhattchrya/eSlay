import React, { useEffect, useState } from "react";
import { Button, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";

import "../../assets/css/allItems.scss";

let currTable = [];

function makeItemRow(itemId, name, price, description, status, curBid, maxBid, minBid) {
	return { itemId, name, price, description, status, curBid, maxBid, minBid };
}
function getAllItems() {
	axios({
		method: "GET",
		url: "/all-items",
	}).then((response) => {
		let decodedResponse = JSON.parse(response);
		if (decodedResponse["status_code"] == 200) {
			currTable = decodedResponse["item"];
		}
	});

	for (let idx = 0; idx < currTable.length; idx++) {
		let currItem = currTable[idx];
		currTable[idx] = makeItemRow(currItem["itemId"], currItem["name"], currItem["price"], currItem["description"], currItem["status"], currItem["curBid"], currItem["maxBid"], currItem["minBid"]);
	}

	console.log("Retrieved all items");
	return currTable;
}

export default function ItemListTable() {
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
									<Button variant="contained" value={row.itemId} className="purchase-button" color="secondary" size="large" component={Link} to="/add-to-cart">
										Add to Cart
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				{!(currTable.length > 0) && <h2 className="empty-cell">There are no items available at this time</h2>}
			</TableContainer>
		</div>
	);
}
