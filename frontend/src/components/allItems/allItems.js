import React, { useState, useEffect } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog } from "@mui/material";
import axios from "axios";

import UploadItem from "../dashboard/uploadItem";

import "../../assets/css/allItems.scss";

const statuses = ["Sold", "On Market", "Sold at Auction", "In Auction"];
function makeItemRow(itemId, name, price, description, image, status, curBid, maxBid, minBid, userSelling) {
	let statMsg = statuses[status];
	return { itemId, name, price, description, image, statMsg, curBid, maxBid, minBid, userSelling };
}

function addToCart(id, userInfo, userSelling) {
	console.log(id);
	console.log(userInfo);
	if (!userInfo.authenticated) {
		window.location.replace("http://localhost:3030/login");
		return;
	}
	axios({
		method: "POST",
		url: "/add-to-cart",
		data: {
			username: userInfo.username,
			itemId: id,
			sellingUser: userSelling,
		},
	}).then((response) => {
		if (response.data["status_code"] === 200) {
			window.location.replace("http://localhost:3030/item-listings");
		}
	});
}

export default function ItemListTable(props) {
	const [table, setTable] = useState([]);
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	useEffect(() => {
		let currTable = [];
		axios({
			method: "GET",
			url: "/all-items",
		}).then((response) => {
			console.log(`All items response: ${JSON.stringify(response)}`);
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

				console.log("Retrieved all items");
				setTable(currTable);
			}
		});
	}, []);

	return (
		<div className="page-container item-listings">
			<h1 className="page-title">Items For Sale</h1>
			<Button className="list-new-button" color="secondary" variant="contained" onClick={handleOpen}>
				List New Item
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<UploadItem userInfo={props.userInfo} />
			</Dialog>
			<TableContainer className="item-table page-table">
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Image</TableCell>
							<TableCell>Name</TableCell>
							<TableCell className="desc-col">Description</TableCell>
							<TableCell>Price</TableCell>
							<TableCell>User Selling</TableCell>
							<TableCell>Purchase</TableCell>
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
								<TableCell>
									<Button
										variant="contained"
										value={row.name}
										className="purchase-button"
										color="secondary"
										size="large"
										onClick={(event) => {
											addToCart(row.itemId, props.userInfo, row.userSelling);
										}}
									>
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
