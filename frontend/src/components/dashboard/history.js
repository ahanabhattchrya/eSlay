import React, { useState } from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Checkbox } from "@material-ui/core";

import axios from "axios";

function makeItemRow(itemId, name, price, description, status, curBid, maxBid, minBid) {
	return { itemId, name, price, description, status, curBid, maxBid, minBid };
}

function getPurchaseHistory(userInfo) {
	let currTable = [];

	axios({
		method: "POST",
		url: "/purchase-history",
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
	console.log("Retrieved purchase history");
	return currTable;
}

const History = (props) => {
	const [table, setTable] = useState(getPurchaseHistory(props.userInfo));
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
									<img src={row.imageDir} />
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
			</TableContainer>
		</div>
	);
};

export default History;
