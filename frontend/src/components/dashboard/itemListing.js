import React, { useEffect, useState } from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Checkbox } from "@material-ui/core";

import axios from "axios";

function makeItemRow(itemId, name, price, description, image, status, curBid, maxBid, minBid) {
	return { itemId, name, price, description, image, status, curBid, maxBid, minBid };
}

function getCurrentlySelling(userInfo, setTable) {
	let currTable = [];

	axios({
		method: "POST",
		url: "/currently-selling",
		data: { username: userInfo.username },
	}).then((response) => {
		console.log(`Item listing response: ${JSON.stringify(response)}`);
		if (response.data["status_code"] === 200) {
			console.log(response.data["item"])
			currTable = response.data["item"];
			console.log(currTable)
		}
	});

	for (let idx = 0; idx < currTable.length; idx++) {
		let currItem = currTable[idx];
		currTable[idx] = makeItemRow(currItem["itemId"], currItem["name"], currItem["price"], currItem["description"], currItem["image"], currItem["status"], currItem["curBid"], currItem["maxBid"], currItem["minBid"]);
	}

	console.log("Retrieved currently sold items");
	setTable(currTable)
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
	const [table, setTable] = useState([]);
	useEffect(() => {
		let currTable = [];

		axios({
			method: "POST",
			url: "/currently-selling",
			data: { username: props.userInfo.username },
		}).then((response) => {
			console.log(`Item listing response: ${JSON.stringify(response)}`);
			if (response.data["status_code"] === 200) {
				console.log(response.data["item"])
				currTable = response.data["item"];
				console.log(currTable)

				for (let idx = 0; idx < currTable.length; idx++) {
					let currItem = currTable[idx];
					currTable[idx] = makeItemRow(currItem["itemId"], currItem["name"], currItem["price"], currItem["description"], currItem["image"], currItem["status"], currItem["curBid"], currItem["maxBid"], currItem["minBid"]);
				}

				setTable(currTable)
			}
		});
	}, []);
	console.log(table);

	return (
		<div className="user-items">
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
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
								<TableCell>
									<img src={row.image} alt={row.name} width="120px"/>
								</TableCell>
								<TableCell>{row.name}</TableCell>
								<TableCell className="desc-col">{row.description}</TableCell>
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
