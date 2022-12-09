import * as React from "react";
import { Button, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";

import "../assets/css/shoppingCart.scss";

let currTable = [];
function makeItemRow(itemId, name, price, description, status, curBid, maxBid, minBid) {
	return { itemId, name, price, description, status, curBid, maxBid, minBid };
}

// Fill out data once user info connection works
axios({
	method: "POST",
	url: "/shopping-cart-items",
	data: {},
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

export default function ShoppingCart() {
	return (
		<div className="page-container shopping-cart">
			<h1 className="page-title">Shopping Cart</h1>
			<Button variant="contained" className="checkout" component={Link} to="/checkout">
				<b>Checkout All Items</b>
			</Button>
			<TableContainer className="item-table">
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Image</TableCell>
							<TableCell>Name</TableCell>
							<TableCell className="desc-col">Description</TableCell>
							<TableCell>Price</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{currTable.map((row) => (
							<TableRow key={row.itemId}>
								<TableCell>
									<img src={row.image} alt={row.name} />
								</TableCell>
								<TableCell>{row.name}</TableCell>
								<TableCell className="desc-col">{row.description}</TableCell>
								<TableCell>{row.price}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				{!(currTable.length > 0) && <h2 className="empty-cell">There are no items in your cart!</h2>}
			</TableContainer>
		</div>
	);
}
