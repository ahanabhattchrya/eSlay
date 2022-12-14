import React, { useEffect, useState } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";

import "../assets/css/shoppingCart.scss";

const statuses = ["Sold", "On Market", "Sold at Auction", "In Auction"];
function makeItemRow(itemId, name, price, description, image, status, curBid, maxBid, minBid, userSelling) {
	let statMsg = statuses[status];
	return { itemId, name, price, description, image, statMsg, curBid, maxBid, minBid, userSelling };
}

// This will checkout the users current cart
function checkout(userInfo) {
	axios({
		method: "POST",
		url: "/checkout",
		data: { username: userInfo.username },
	}).then((response) => {
		if (response.data["status_code"] === 200) {
			window.location.replace("/shopping-cart");
		}
	});
}

export default function ShoppingCart(props) {
	const [table, setTable] = useState([]);

	useEffect(() => {
		let currTable = [];

		axios({
			method: "POST",
			url: "/shopping-cart-items",
			data: { userInfo: props.userInfo },
		}).then((response) => {
			console.log(`Shopping cart response: ${JSON.stringify(response)}`);
			if (response.data["status_code"] === 200) {
				currTable = response.data["item"];

				for (let idx = 0; idx < currTable.length; idx++) {
					let currItem = currTable[idx];
					currTable[idx] = makeItemRow(
						currItem["itemId"],
						currItem["name"],
						currItem["price"],
						currItem["description"],
						currItem["image"],
						currItem["status"],
						currItem["curBid"],
						currItem["maxBid"],
						currItem["minBid"],
						currItem["userSelling"]
					);
				}

				console.log("Retrieved currently sold items");
				setTable(currTable);
			}
		});
	}, []);

	if (!props.userInfo.authenticated) {
		window.location.replace("/login");
	} else {
		return (
			<div className="page-container shopping-cart">
				<h1 className="page-title">Shopping Cart</h1>
				<Button variant="contained" className="checkout" onClick={() => checkout(props.userInfo)}>
					<b>Checkout All Items</b>
				</Button>
				<TableContainer className="item-table page-table">
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Image</TableCell>
								<TableCell>Name</TableCell>
								<TableCell className="desc-col">Description</TableCell>
								<TableCell>Price</TableCell>
								<TableCell>User Selling</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{table.map((row) => (
								<TableRow key={row.itemId}>
									<TableCell>
										<img src={row.image} alt={row.name} width="120px" />
									</TableCell>
									<TableCell>{row.name}</TableCell>
									<TableCell className="desc-col">{row.description}</TableCell>
									<TableCell>${row.price}</TableCell>
									<TableCell>{row.userSelling}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
					{!(table.length > 0) && <h2 className="empty-cell">There are no items in your cart!</h2>}
				</TableContainer>
			</div>
		);
	}
}
