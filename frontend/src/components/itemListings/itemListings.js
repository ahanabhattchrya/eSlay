import * as React from "react";
import { Button, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";

import "../../assets/css/itemListings.scss";

let currTable = [];

function makeItemRow(itemId, name, price, description, status, curBid, maxBid, minBid) {
	return { itemId, name, price, description, status, curBid, maxBid, minBid };
}

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

export default function ItemListTable() {
	return (
		<div className="item-table">
			<TableContainer>
				<Table sx={{ minWidth: 650 }} aria-label="simple_table">
					<TableHead>
						<TableRow>
							<TableCell>Image</TableCell>
							<TableCell>Name</TableCell>
							<TableCell className="desc-col">Description</TableCell>
							<TableCell>Price</TableCell>
							<TableCell>Current Status</TableCell>
							<TableCell>Purchase</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{currTable.map((row) => (
							<TableRow key={row.itemId}>
								<TableCell>{row.image}</TableCell>
								<TableCell>{row.name}</TableCell>
								<TableCell className="desc-col">{row.description}</TableCell>
								<TableCell>{row.price}</TableCell>
								<TableCell>{row.status}</TableCell>
								<TableCell>
									<Button variant="contained" value={row.name} className="purchase-button" color="secondary" size="large" component={Link} to="/add-to-cart">
										Add to Cart
									</Button>
								</TableCell>
							</TableRow>
						))}
						{!(currTable.length > 0) && <TableCell align="center">There are no items available at this time</TableCell>}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}
