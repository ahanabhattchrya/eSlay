import React, { useState } from "react";
import { Button, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";

import "../assets/css/shoppingCart.scss";

function makeItemRow(itemId, name, price, description, status, curBid, maxBid, minBid) {
	return { itemId, name, price, description, status, curBid, maxBid, minBid };
}

function getCartItems(userInfo) {
	let currTable = [];

	axios({
		method: "POST",
		url: "/shopping-cart-items",
		data: { username: userInfo.username },
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
	console.log("Retrieved cart items");
	return currTable;
}

// This will checkout the users current cart
function checkout(userInfo){
	axios({
		method : 'POST',
		url : "/checkout",
		data : {
			username : userInfo.username
		}
	})
	.then((response) => {
		if (response.data["status_code"] == 200) {
			window.location.replace("http://localhost:3030/shopping-cart")
		}
	});
};

export default function ShoppingCart(props) {
	const [table, setTable] = useState(getCartItems(props.userInfo));

	return (
		<div className="page-container shopping-cart">
			<h1 className="page-title">Shopping Cart</h1>
			<Button variant="contained" className="checkout" onClick={checkout(props.userInfo)}>
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
						{table.map((row) => (
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
				{!(table.currTable.length > 0) && <h2 className="empty-cell">There are no items in your cart!</h2>}
			</TableContainer>
		</div>
	);
}
